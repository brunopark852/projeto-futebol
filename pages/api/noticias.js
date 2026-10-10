import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Build query string from req.query (excluding any internal ones if needed)
  const queryParams = new URLSearchParams();
  Object.keys(req.query).forEach(key => {
    if (req.query[key] !== undefined && req.query[key] !== '') {
      queryParams.append(key, req.query[key]);
    }
  });

  try {
    const response = await axios.get(`https://api.api-futebol.com.br/v1/noticias?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_FUTEBOL_KEY}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    return res.status(status).json({
      error: 'Erro ao buscar lista de notícias',
      message: error.response?.data?.message || error.message,
    });
  }
}