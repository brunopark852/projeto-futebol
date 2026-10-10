import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function PrivacidadePage() {
  return (
    <Layout title="Política de Privacidade - Projeto Futebol" description="Política de privacidade do Projeto Futebol - como coletamos, usamos e protegemos seus dados.">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Política de Privacidade</h1>
        <p className="text-slate-600 mb-6"><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Introdução</h2>
          <p className="text-slate-700 mb-4">
            O Projeto Futebol (&quot;nós&quot;, &quot;nosso&quot;, &quot;nos&quot;) está comprometido em proteger a privacidade dos visitantes do nosso site.
            Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você acessa nosso portal de estatísticas de futebol.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Informações que Coletamos</h2>
          <h3 className="text-lg font-medium text-slate-900 mb-2">2.1 Dados de Navegação</h3>
          <p className="text-slate-700 mb-4">
            Ao acessar nosso site, coletamos automaticamente certas informações sobre seu dispositivo e navegação, incluindo:
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Endereço IP</li>
            <li>Tipo e versão do navegador</li>
            <li>Sistema operacional</li>
            <li>Páginas visitadas e tempo de permanência</li>
            <li>URL de referência (de onde você veio)</li>
            <li>Data e hora do acesso</li>
          </ul>

          <h3 className="text-lg font-medium text-slate-900 mb-2">2.2 Cookies e Tecnologias Similares</h3>
          <p className="text-slate-700 mb-4">
            Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência, analisar tráfego e exibir anúncios personalizados.
            Os tipos de cookies que utilizamos incluem:
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site</li>
            <li><strong>Cookies de Análise:</strong> Google Analytics para entender o uso do site</li>
            <li><strong>Cookies de Publicidade:</strong> Google AdSense para exibir anúncios relevantes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Como Usamos suas Informações</h2>
          <p className="text-slate-700 mb-4">Utilizamos os dados coletados para:</p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Fornecer e manter nosso serviço de estatísticas de futebol</li>
            <li>Melhorar a experiência do usuário e performance do site</li>
            <li>Analisar tendências de uso e tráfego</li>
            <li>Exibir anúncios personalizados via Google AdSense</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Google AdSense e Publicidade</h2>
          <p className="text-slate-700 mb-4">
            Utilizamos o Google AdSense para exibir anúncios. O Google usa cookies (como o cookie DART) para exibir anúncios baseados
            nas visitas anteriores do usuário ao nosso site e a outros sites na internet. Os usuários podem desativar o uso do cookie DART
            visitando a <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">Política de Privacidade da Rede de Conteúdo e Anúncios do Google</a>.
          </p>
          <p className="text-slate-700 mb-4">
            Também utilizamos o Google Analytics para análise de tráfego. Você pode optar por não ser rastreado pelo Google Analytics
            instalando o <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">add-on do navegador para desativação do Google Analytics</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Compartilhamento de Dados</h2>
          <p className="text-slate-700 mb-4">Não vendemos suas informações pessoais. Podemos compartilhar dados com:</p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Google (AdSense, Analytics) - conforme descrito acima</li>
            <li>Provedores de hospedagem e CDN (Vercel)</li>
            <li>API Futebol (fornecedor de dados esportivos)</li>
            <li>Autoridades legais, quando exigido por lei</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Seus Direitos (LGPD)</h2>
          <p className="text-slate-700 mb-4">
            Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), você tem direito a:
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Confirmação da existência de tratamento de dados</li>
            <li>Acesso aos dados</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
            <li>Portabilidade dos dados</li>
            <li>Eliminação dos dados tratados com consentimento</li>
            <li>Informação sobre compartilhamento</li>
            <li>Revogação do consentimento</li>
          </ul>
          <p className="text-slate-700 mb-4">
            Para exercer seus direitos, entre em contato conosco através da página de <Link href="/contato" className="text-emerald-700 hover:underline">Contato</Link>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Retenção de Dados</h2>
          <p className="text-slate-700 mb-4">
            Mantemos os dados de navegação pelo tempo necessário para cumprir as finalidades descritas nesta política,
            ou conforme exigido por lei. Dados do Google Analytics são retidos por 26 meses. Cookies de publicidade seguem
            as políticas do Google.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Segurança</h2>
          <p className="text-slate-700 mb-4">
            Implementamos medidas técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado,
            alteração, divulgação ou destruição. No entanto, nenhuma transmissão pela internet é 100% segura.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Links para Sites de Terceiros</h2>
          <p className="text-slate-700 mb-4">
            Nosso site pode conter links para sites de terceiros (ex: API Futebol, redes sociais). Não somos responsáveis pelas
            práticas de privacidade desses sites. Recomendamos ler as políticas de privacidade de cada site visitado.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">10. Alterações nesta Política</h2>
          <p className="text-slate-700 mb-4">
            Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas publicando
            a nova versão nesta página com a data de atualização revisada.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">11. Contato</h2>
          <p className="text-slate-700 mb-4">
            Se tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através da nossa página de
            <Link href="/contato" className="text-emerald-700 hover:underline">Contato</Link>.
          </p>
        </section>
      </div>
    </Layout>
  );
}