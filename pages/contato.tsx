import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function ContatoPage() {
  return (
    <Layout title="Contato - Projeto Futebol" description="Entre em contato com o Projeto Futebol - dúvidas, sugestões, parcerias ou exercício de direitos LGPD.">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Contato</h1>
        <p className="text-slate-600 mb-8">Tem dúvidas, sugestões ou precisa exercer seus direitos de dados? Estamos à disposição.</p>

        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Formulário de Contato</h2>
          <form className="space-y-6" action="https://formspree.io/f/SEU_ID_AQUI" method="POST">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-slate-700 mb-1">Nome completo *</label>
              <input type="text" id="nome" name="nome" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">E-mail *</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition" />
            </div>
            <div>
              <label htmlFor="assunto" className="block text-sm font-medium text-slate-700 mb-1">Assunto *</label>
              <select id="assunto" name="assunto" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition bg-white">
                <option value="">Selecione...</option>
                <option value="duvida">Dúvida geral</option>
                <option value="sugestao">Sugestão de melhoria</option>
                <option value="parceria">Parceria / Publicidade</option>
                <option value="lgpd">Exercício de direitos LGPD</option>
                <option value="erro">Reportar erro / Bug</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-slate-700 mb-1">Mensagem *</label>
              <textarea id="mensagem" name="mensagem" rows={5} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-y" placeholder="Descreva sua solicitação..."></textarea>
            </div>
            <button type="submit" className="w-full bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition">
              Enviar Mensagem
            </button>
            <p className="text-xs text-slate-500 text-center">Campos marcados com * são obrigatórios. Responderemos em até 2 dias úteis.</p>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">E-mail</h3>
            <p className="text-slate-600 text-sm">contato@projetofutebol.com.br</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">LGPD / Dados</h3>
            <p className="text-slate-600 text-sm">dpo@projetofutebol.com.br</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Parcerias</h3>
            <p className="text-slate-600 text-sm">parcerias@projetofutebol.com.br</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Perguntas Frequentes</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium text-slate-900">Como faço para exercer meus direitos LGPD?</dt>
              <dd className="text-slate-600 mt-1">Envie um e-mail para <a href="mailto:dpo@projetofutebol.com.br" className="text-emerald-700 hover:underline">dpo@projetofutebol.com.br</a> com o assunto &quot;LGPD&quot; e descreva qual direito deseja exercer (acesso, correção, exclusão, etc.). Responderemos em até 15 dias.</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900">Os dados das partidas são em tempo real?</dt>
              <dd className="text-slate-600 mt-1">Buscamos atualizar o mais rápido possível via API Futebol, mas pode haver atrasos de alguns minutos. Não nos responsabilizamos por decisões baseadas nesses dados.</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900">Posso usar os dados do site para meu projeto?</dt>
              <dd className="text-slate-600 mt-1">Os dados pertencem às entidades organizadoras e são licenciados via API Futebol. Para uso comercial, entre em contato conosco para avaliar licenciamento adequado.</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900">Como funciona a publicidade no site?</dt>
              <dd className="text-slate-600 mt-1">Utilizamos Google AdSense para exibir anúncios. Eles podem usar cookies para personalização. Veja nossa <Link href="/privacidade" className="text-emerald-700 hover:underline">Política de Privacidade</Link> para detalhes e como optar por não participar.</dd>
            </div>
          </dl>
        </div>
      </div>
    </Layout>
  );
}