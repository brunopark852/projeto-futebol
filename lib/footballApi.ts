/**
 * Football API Integration Module
 * Optimized for TheSportsDB with caching, fallback providers, and rate limit protection
 * 
 * Rate Limits (Free Tier):
 * - TheSportsDB: 300 requests/month, 100 requests/day
 * - OpenLigaDB: Unlimited (no key required)
 * - football-data.org: Limited free tier (requires key)
 */

import axios from 'axios';

/**
 * Simple TTLCache implementation to avoid external dependency type issues
 */
class TTLCache {
  private store = new Map<string, { value: unknown; expiry: number }>();

  constructor() {}

  get<T>(key: string): T | null {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }
    return item.value as T;
  }

  set(key: string, value: unknown, ttlMs: number): void {
    const expiry = Date.now() + ttlMs;
    this.store.set(key, { value, expiry });
  }

  clear(): void {
    this.store.clear();
  }
}

/**
 * Configuration
 */
const CONFIG = {
  THE_SPORTS_DB: {
    BASE_URL: 'https://www.thesportsdb.com/api/v1/json',
    KEY: process.env.THE_SPORTS_DB_KEY || 'YOUR_KEY_HERE', // Set in .env.local
    ENDPOINTS: {
      EVENTS_NEXT_LEAGUE: '/eventsnextleague.php',
      LOOKUP_TABLE: '/lookuptable.php',
    },
    TTL: {
      TABLE: 6 * 60 * 60 * 1000, // 6 hours
      NEXT_EVENTS: 2 * 60 * 60 * 1000, // 2 hours
    },
  },
  OPEN_LIGA_DB: {
    BASE_URL: 'https://api.openligadb.de',
    ENDPOINTS: {
      MATCHES: '/getmatchdata',
      TABLE: '/getbltable',
    },
  },
  FOOTBALL_DATA_ORG: {
    BASE_URL: 'https://api.football-data.org/v2',
    KEY: process.env.FOOTBALL_DATA_ORG_KEY || '',
    ENDPOINTS: {
      COMPETITIONS: '/competitions',
      MATCHES: '/matches',
    },
  },
};

const cache = new TTLCache();

/**
 * Generic API fetcher with error handling and fallback support
 */
class FootballApiFetcher {
  private axiosInstance;

  constructor(baseURL: string, apiKey?: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: apiKey ? { 'X-Auth-Token': apiKey } : {}, // football-data.org uses X-Auth-Token
    });
  }

  async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response = await this.axiosInstance.get(endpoint, { params });
      return response.data as T;
    } catch (error: any) {
      // Handle rate limits and other errors
      if (error.response?.status === 429) {
        throw new Error(`Rate limit exceeded for ${this.axiosInstance.defaults.baseURL}`);
      }
      throw error;
    }
  }
}

/**
 * Main API wrapper with caching and fallback logic
 */
export class FootballApiService {
  private readonly tsdb: FootballApiFetcher;
  private readonly openliga: FootballApiFetcher;
  private readonly footballData: FootballApiFetcher;

  constructor() {
    this.tsdb = new FootballApiFetcher(CONFIG.THE_SPORTS_DB.BASE_URL, CONFIG.THE_SPORTS_DB.KEY);
    this.openliga = new FootballApiFetcher(CONFIG.OPEN_LIGA_DB.BASE_URL);
    this.footballData = new FootballApiFetcher(
      CONFIG.FOOTBALL_DATA_ORG.BASE_URL,
      CONFIG.FOOTBALL_DATA_ORG.KEY
    );
  }

  /**
   * Get league table with caching and fallback
   * @param leagueId TheSportsDB league ID (e.g., 4328 for Brasileirão Série A)
   * @returns Table data or null if all providers fail
   */
  async getLeagueTable(leagueId: number): Promise<any> {
    const cacheKey = `table:${leagueId}`;
    const cached = cache.get<any>(cacheKey);
    if (cached) return cached;

    try {
      // Try TheSportsDB first
      const response = await this.tsdb.get<any>(
        `${CONFIG.THE_SPORTS_DB.ENDPOINTS.LOOKUP_TABLE}?id=${leagueId}`
      );
      if (response && response.table) {
        cache.set(cacheKey, response.table, CONFIG.THE_SPORTS_DB.TTL.TABLE);
        return response.table;
      }
    } catch (error) {
      console.warn('TheSportsDB table failed, trying fallback:', error instanceof Error ? error.message : String(error));
    }

    try {
      // Fallback: OpenLigaDB (primarily for German leagues - adjust mapping as needed)
      // Note: OpenLigaDB doesn't cover Brasileirão; this is example logic for demonstration
      // In a real app, you would map league IDs appropriately or use a different fallback
      const openligaResponse = await this.openliga.get<any>(
        `${CONFIG.OPEN_LIGA_DB.ENDPOINTS.TABLE}?liga=bl1&saison=2023` // Example for Bundesliga
      );
      // Transform OpenLigaDB response to match expected format if needed
      if (openligaResponse) {
        cache.set(cacheKey, openligaResponse, CONFIG.THE_SPORTS_DB.TTL.TABLE);
        return openligaResponse;
      }
    } catch (error) {
      console.warn('OpenLigaDB table failed:', error instanceof Error ? error.message : String(error));
    }

    // All providers failed
    return null;
  }

  /**
   * Get upcoming matches with caching and fallback
   * @param leagueId TheSportsDB league ID
   * @returns Upcoming matches or null if all providers fail
   */
  async getUpcomingMatches(leagueId: number): Promise<any> {
    const cacheKey = `upcoming:${leagueId}`;
    const cached = cache.get<any>(cacheKey);
    if (cached) return cached;

    try {
      // Try TheSportsDB first
      const response = await this.tsdb.get<any>(
        `${CONFIG.THE_SPORTS_DB.ENDPOINTS.EVENTS_NEXT_LEAGUE}?id=${leagueId}`
      );
      if (response && response.event) {
        cache.set(cacheKey, response.event, CONFIG.THE_SPORTS_DB.TTL.NEXT_EVENTS);
        return response.event;
      }
    } catch (error) {
      console.warn('TheSportsDB upcoming failed, trying fallback:', error instanceof Error ? error.message : String(error));
    }

    try {
      // Fallback: football-data.org (requires competition code mapping)
      // This would need a mapping layer from TheSportsDB ID to football-data.org code
      // Example placeholder - actual implementation needs league-specific mapping
      if (CONFIG.FOOTBALL_DATA_ORG.KEY) {
        const footballDataResponse = await this.footballData.get<any>(
          `/competitions/${leagueId}/matches?status=SCHEDULED`
        );
        if (footballDataResponse && footballDataResponse.matches) {
          cache.set(cacheKey, footballDataResponse.matches, CONFIG.THE_SPORTS_DB.TTL.NEXT_EVENTS);
          return footballDataResponse.matches;
        }
      }
    } catch (error) {
      console.warn('football-data.org upcoming failed:', error instanceof Error ? error.message : String(error));
    }

    // All providers failed
    return null;
  }

  /**
   * Clear cache for a specific league (useful after match updates)
   */
  clearLeagueCache(leagueId: number): void {
    cache.clear();
    // In production with Redis, you'd delete specific keys:
    // redis.del(`table:${leagueId}`, `upcoming:${leagueId}`);
  }
}

/**
 * Singleton instance for application-wide use
 */
export const footballApi = new FootballApiService();

/**
 * Example usage for Brasileirão Série A (TheSportsDB ID: 4328)
// In a Next.js API route or server-side component:
// import { footballApi } from '@/lib/footballApi';
//
// export async function getBrasileiraoData() {
//   const leagueId = 4328;
//   
//   try {
//     const [table, upcoming] = await Promise.all([
//       footballApi.getLeagueTable(leagueId),
//       footballApi.getUpcomingMatches(leagueId),
//     ]);
//     
//     return {
//       table,
//       upcomingMatches: upcoming,
//       lastUpdated: new Date().toISOString(),
//     };
//   } catch (error) {
//     console.error('Failed to fetch Brasileirão data:', error);
//     // Return cached/stale data or empty state as fallback
//     return {
//       table: null,
//       upcomingMatches: null,
//       error: 'Failed to load data',
//     };
//   }
// }

/**
 * Frontend Optimization Best Practices
 * 
 * 1. Use React Query or SWR for automatic caching and deduplication
 * 2. Implement request deduplication at the service layer
 * 3. Use stale-while-revalidate patterns:
 *    - Show cached data immediately (stale)
 *    - Fetch fresh data in background (revalidate)
 * 4. For navigation between pages:
 *    - Prefetch data for likely next routes (e.g., on hover)
 *    - Use Next.js built-in prefetching for Link components
 * 5. Implement optimistic updates for user interactions
 * 6. Use Intersection Observer for lazy-loading non-critical data
 * 
 * Example with React Query:
 * 
 * import { useQuery } from '@tanstack/react-query';
 * import { footballApi } from '@/lib/footballApi';
 * 
 * function BrasileiraoTable() {
 *   const { data, isLoading, error } = useQuery({
 *     queryKey: ['brasileirao-table', 4328],
 *     queryFn: () => footballApi.getLeagueTable(4328),
 *     staleTime: 1000 * 60 * 30, // 30 minutes
 *     cacheTime: 1000 * 60 * 60 * 2, // 2 hours
 *   });
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error loading data</div>;
 *   
 *   return renderTable(data);
 * }
 */

/**
 * Background Job Recommendation (for Vercel/serverless)
 * 
 * Since Vercel serverless functions don't support long-running processes,
 * use:
 * 
 * 1. Vercel Cron Jobs (if on Pro/Enterprise):
 *    - Configure in vercel.json to hit /api/refresh-football-data every 6 hours
 * 
 * 2. External cron service (e.g., cron-job.org, GitHub Actions):
 *    - Schedule requests to your own endpoint that updates a database/cache
 * 
 * 3. Hybrid approach:
 *    - Serve stale data immediately from cache
 *    - Trigger background refresh on first request after TTL expiry
 *    - Use a simple API route like:
 * 
 *    // pages/api/refresh-football-data.ts
 *    import type { NextApiRequest, NextApiResponse } from 'next';
 *    import { footballApi } from '@/lib/footballApi';
 *    import { prisma } from '@/lib/prisma'; // Assuming you have a DB
 * 
 *    export default async function handler(
 *      req: NextApiRequest,
 *      res: NextApiResponse
 *    ) {
 *      if (req.method !== 'POST') {
 *        return res.status(405).end();
 *      }
 *      
 *      try {
 *        // Refresh data for key leagues
 *        const leagueIds = [4328]; // Brasileirão Série A
 *        const results = {};
 *        
 *        for (const leagueId of leagueIds) {
 *          const [table, upcoming] = await Promise.all([
 *            footballApi.getLeagueTable(leagueId),
 *            footballApi.getUpcomingMatches(leagueId),
 *          ]);
 *          results[leagueId] = { table, upcoming, timestamp: new Date() };
 *        }
 *        
 *        // Optionally save to database for even faster access
 *        // await prisma.footballData.upsert({ ... });
 *        
 *        return res.status(200).json({ success: true, data: results });
 *      } catch (error) {
 *        console.error('Refresh failed:', error);
 *        return res.status(500).json({ error: 'Refresh failed' });
 *      }
 *    }
 * 
 *    Then call this endpoint via external cron every 2-4 hours.
 */

export default footballApi;