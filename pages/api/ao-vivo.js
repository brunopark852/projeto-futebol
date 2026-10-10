import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_BASE = 'https://api.api-futebol.com.br/v1';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // retry on network errors, 429, 5xx
    if (axiosRetry.isNetworkError(error)) return true;
    if (axiosRetry.isRetryableError(error)) return true;
    return error.response?.status >= 500;
  },
});

// Simple in-memory TTL cache
const cache = new Map();

function getCached(key, ttlMs) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }
  return item.value;
}

function setCached(key, value, ttlMs) {
  const expiry = Date.now() + ttlMs;
  cache.set(key, { value, expiry });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const cacheKey = 'ao-vivo';
  const cached = getCached(cacheKey, 20000); // 20 seconds cache for live data
  if (cached !== null) {
    return res.status(200).json(cached);
  }

  try {
    const response = await api.get('/ao-vivo', {
      headers: {
        Authorization: `Bearer ${process.env.API_FUTEBOL_KEY}`,
      },
    });

    setCached(cacheKey, response.data, 20000);
    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    return res.status(status).json({ 
      error: 'Erro ao buscar partidas ao vivo',
      message: error.response?.data?.message || error.message
    });
  }
}
