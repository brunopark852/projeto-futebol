import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'ID da partida é obrigatório' });
  }

  try {
    const response = await axios.get(`https://api.api-futebol.com.br/v1/partidas/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_FUTEBOL_KEY}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    return res.status(status).json({ 
      error: 'Erro ao buscar dados da partida',
      message: error.response?.data?.message || error.message
    });
  }
}
