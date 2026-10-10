/**
 * Example: Fetching Brasileirão Série A data using the footballApi service
 * Demonstrates usage of getLeagueTable and getUpcomingMatches for league ID 4328
 */

import { footballApi } from '@/lib/footballApi';

/**
 * Get Brasileirão Série A data (TheSportsDB ID: 4328)
 * This function can be used in:
 * - Next.js API routes (pages/api/brasileirao.ts)
 * - Server-side props (getServerSideProps)
 * - Server components (React 18)
 * - Background jobs/cron jobs
 */
export async function getBrasileiraoSerieAData() {
  const LEAGUE_ID_BRASILEIRAO_SERIE_A = 4328; // TheSportsDB ID

  try {
    // Fetch table and upcoming matches in parallel
    const [table, upcomingMatches] = await Promise.all([
      footballApi.getLeagueTable(LEAGUE_ID_BRASILEIRAO_SERIE_A),
      footballApi.getUpcomingMatches(LEAGUE_ID_BRASILEIRAO_SERIE_A),
    ]);

    return {
      success: true,
      data: {
        league: 'Brasileirão Série A',
        leagueId: LEAGUE_ID_BRASILEIRAO_SERIE_A,
        table: table || [], // Empty array if null
        upcomingMatches: upcomingMatches || [], // Empty array if null
        lastUpdated: new Date().toISOString(),
      },
      timestamp: Date.now(),
    };
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching Brasileirão data:', err);
    
    // Return fallback response - in production you might want to serve stale cache
    return {
      success: false,
      error: err.message || 'Failed to fetch data',
      data: {
        league: 'Brasileirão Série A',
        leagueId: LEAGUE_ID_BRASILEIRAO_SERIE_A,
        table: [],
        upcomingMatches: [],
        lastUpdated: new Date().toISOString(),
      },
      timestamp: Date.now(),
    };
  }
}

/**
 * Example usage in a Next.js API route:
 * 
 * // pages/api/brasileirao.ts
 * import type { NextApiRequest, NextApiResponse } from 'next';
 * import { getBrasileiraoSerieAData } from '@/lib/brasileirao-example';
 * 
 * export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 *   if (req.method !== 'GET') {
 *     return res.status(405).json({ error: 'Method not allowed' });
 *   }
 * 
 *   const result = await getBrasileiraoSerieAData();
 *   
 *   if (result.success) {
 *     return res.status(200).json(result.data);
 *   } else {
 *     return res.status(500).json({ error: result.error });
 *   }
 * }
 */

/**
 * Example usage in React Query (frontend):
 * 
 * import { useQuery } from '@tanstack/react-query';
 * import { getBrasileiraoSerieAData } from '@/lib/brasileirao-example';
 * 
 * function BrasileiraoTable() {
 *   const { data, isLoading, error } = useQuery({
 *     queryKey: ['brasileirao-serie-a'],
 *     queryFn: getBrasileiraoSerieAData,
 *     staleTime: 1000 * 60 * 15, // 15 minutes
 *     // Data will be refetched in background after stale time
 *   });
 * 
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   
 *   return (
 *     <div>
 *       <h1>{data.league}</h1>
 *       <Table data={data.table} />
 *       <UpcomingMatches matches={data.upcomingMatches} />
 *     </div>
 *   );
 * }
 */

export default getBrasileiraoSerieAData;