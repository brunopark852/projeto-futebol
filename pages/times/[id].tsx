import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import axios from 'axios';

interface Team {
  time_id: number;
  nome: string;
  nome_popular: string;
  sigla: string;
  apelido: string;
  escudo: string;
}

export default function TimePage({ time }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout
      title={`${time.nome_popular} - Futebol`}
      description={`Detalhes, identificação e informações do time ${time.nome_popular}.`}
    >
      <div className="max-w-3xl mx-auto">
        <Link href="/tabela" className="text-sm text-emerald-700 hover:underline">← Voltar para a tabela</Link>
        <section className="mt-4 rounded-2xl bg-white border border-gray-200 shadow-sm p-6 sm:p-10 text-center">
          <Image src={time.escudo} alt={`Escudo do ${time.nome_popular}`} width={120} height={120} className="mx-auto object-contain" priority />
          <p className="mt-5 text-sm font-semibold text-emerald-700 uppercase tracking-wider">{time.sigla}</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{time.nome_popular}</h1>
          <p className="mt-1 text-slate-600">{time.apelido || 'Clube de futebol'}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 text-left">
            <div className="rounded-lg bg-slate-50 p-4"><dt className="text-xs uppercase text-slate-500">Nome oficial</dt><dd className="mt-1 font-medium text-slate-900">{time.nome}</dd></div>
            <div className="rounded-lg bg-slate-50 p-4"><dt className="text-xs uppercase text-slate-500">ID do time</dt><dd className="mt-1 font-medium text-slate-900">{time.time_id}</dd></div>
          </dl>
        </section>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{ time: Team }> = async ({ params, res }) => {
  const id = String(params?.id || '');
  if (!/^\d+$/.test(id)) return { notFound: true };
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  try {
    const response = await axios.get(`https://api.api-futebol.com.br/v1/times/${id}`, {
      headers: { Authorization: `Bearer ${process.env.API_FUTEBOL_KEY}` },
      timeout: 8000,
    });
    return { props: { time: response.data } };
  } catch (error) {
    console.error('Erro ao buscar detalhes do time:', error);
    return { notFound: true };
  }
};
