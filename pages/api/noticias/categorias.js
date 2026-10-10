import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const response = await axios.get('https://api.api-futebol.com.br/v1/noticias/categorias', {
      headers: {
        Authorization: `Bearer ${process.env.API_FUTEBOL_KEY}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    return res.status(status).json({
      error: 'Erro ao buscar categorias de notícias',
      message: error.response?.data?.message || error.message,
    });
  }
}