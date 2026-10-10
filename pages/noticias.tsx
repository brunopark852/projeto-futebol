import type { NextPage } from 'next';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type NewsItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  source: {
    name: string;
  };
};

const Noticias: NextPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For now, we're using mock data since we don't have API keys configured for real news services
    // To integrate a real news API (like NewsAPI.org, GNews, or TheSportsDB), you would:
    // 1. Add the API key to .env.local
    // 2. Replace the mock data fetch with a call to the real API
    // 3. Adjust the data mapping to match the API's response format
    
    const loadMockNews = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock football news data
        const mockNews: NewsItem[] = [
          {
            id: '1',
            title: 'Brasileirão Série A: Flamengo lidera com 100% de aproveitamento',
            description: 'O Flamengo conseguiu mais uma vitória e mantém 100% de aproveitamento no Brasileirão Série A, abrindo vantagem sobre os concorrentes diretos.',
            url: '#',
            image: 'https://via.placeholder.com/400x200?text=Flamengo+Lidera+Brasileirao',
            publishedAt: new Date().toISOString(),
            source: { name: 'Projeto Futebol' }
          },
          {
            id: '2',
            title: 'Palmeiras anuncia contratação de novo atacante para sequência do campeonato',
            description: 'O Palmeiras fechou com um atacante experiente que passou pelos principais clubes europeus para fortalecer o elenco nas próximas rodadas do Brasileirão.',
            url: '#',
            image: 'https://via.placeholder.com/400x200?text=Palmeiras+Contratacao+Atacante',
            publishedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
            source: { name: 'Projeto Futebol' }
          },
          {
            id: '3',
            title: 'Árbitro da partida entre Corinthians e Santos é suspenso por erro de julgamento',
            description: 'O árbitro que apitou o clássico entre Corinthians e Santos foi suspenso após cometer erro considerado grave na marcação de um pênalti controverso.',
            url: '#',
            image: 'https://via.placeholder.com/400x200?text=Arbitro+Suspenso+Corinthians+Santos',
            publishedAt: new Date(Date.now() - 7200000).toISOString(), // 2 horas atrás
            source: { name: 'Projeto Futebol' }
          },
          {
            id: '4',
            title: 'Seleção Brasileira convoca jovens talentos para preparação da Copa do Mundo',
            description: 'Tite anunciou a convocação de três jogadoresSub-20 para os próximos amistosos da seleção, visando a renovação do elenco para futuras competições.',
            url: '#',
            image: 'https://via.placeholder.com/400x200?text=Selecao+Brasileira+Convoca+jovens',
            publishedAt: new Date(Date.now() - 10800000).toISOString(), // 3 horas atrás
            source: { name: 'Projeto Futebol' }
          },
          {
            id: '5',
            title: 'Copa do Brasil: Atlético-MG avança às semifinais após vitória sobre o Grêmio',
            description: 'Em jogo emocionante nas oitavas de final, o Atlético-MG venceu o Grêmio por 2-1 e garantiu vaga nas semifinais da Copa do Brasil 2026.',
            url: '#',
            image: 'https://via.placeholder.com/400x200?text=Atletico+MG+avanca+Copa+do+Brasil',
            publishedAt: new Date(Date.now() - 14400000).toISOString(), // 4 horas atrás
            source: { name: 'Projeto Futebol' }
          }
        ];
        
        setNews(mockNews);
      } catch (err) {
        console.error('Error loading mock news:', err);
        setError('Erro ao carregar notícias de exemplo.');
      } finally {
        setLoading(false);
      }
    };

    loadMockNews();
  }, []);

  return (
    <Layout title="Notícias de Futebol - Projeto Futebol" description="Últimas notícias e atualizações sobre futebol brasileiro e internacional">
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-800">{error}</p>
        </div>
      )}
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Notícias de Futebol
        </h1>
        <p className="text-slate-600">
          Fique por dentro das últimas notícias, resultados e atualizações do mundo do futebol.
          {news.length > 0 && (
            <span className="ml-3 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              Dados de exemplo
            </span>
          )}
        </p>
      </div>

      {loading ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {news.map((article) => (
            <div key={article.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              {article.image && (
                <div className="relative">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 object-cover"
                    width={400}
                    height={200}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                    {article.source.name}
                  </div>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-3 line-clamp-3">
                  {article.description}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700">
                      Ler mais →
                    </a>
                  </span>
                  <span>
                    {new Date(article.publishedAt).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {news.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">Nenhuma notícia encontrada.</p>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Noticias;