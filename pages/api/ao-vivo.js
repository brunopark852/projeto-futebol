import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const response = await axios.get('https://api.api-futebol.com.br/v1/ao-vivo', {
      headers: {
        Authorization: `Bearer ${process.env.API_FUTEBOL_KEY}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    return res.status(status).json({ 
      error: 'Erro ao buscar partidas ao vivo',
      message: error.response?.data?.message || error.message
    });
  }
}
