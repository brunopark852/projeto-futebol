import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function PoliticaPrivacidadePage() {
  return (
    <Layout title="Política de Privacidade - Futebol" description="Política de privacidade do Projeto Futebol - como coletamos, usamos, compartilhamos e protegemos suas informações.">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Política de Privacidade</h1>
        <p className="text-slate-600 mb-6"><strong>Última atualização:</strong> 10/10/2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Introdução</h2>
          <p className="text-slate-700 mb-4">
            O Projeto Futebol ("nós", "nosso", "nos") está comprometido em proteger a privacidade e os dados pessoais dos visitantes do nosso site. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos suas informações ao acessar nosso portal de estatísticas de futebol, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Dados que Coletamos e Finalidades</h2>
          <p className="text-slate-700 mb-4">
            Coletamos o mínimo de dados necessários para o correto funcionamento do site e para a melhoria contínua da sua experiência de navegação:
          </p>
          
          <p className="text-slate-700 mb-4"><strong>2.1 Dados de Navegação e Registros de Acesso</strong></p>
          <p className="text-slate-700 mb-4">
            Ao acessar o site, coletamos automaticamente dados técnicos de navegação para garantir a segurança e cumprir obrigações legais:
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Endereço IP;</li>
            <li>Tipo e versão do navegador;</li>
            <li>Sistema operacional;</li>
            <li>Páginas visitadas, tempo de permanência e URL de origem;</li>
            <li>Data e hora do acesso.</li>
          </ul>
          <p className="text-slate-700 mb-4"><strong>Base Legal:</strong> Cumprimento de obrigação legal e Legítimo Interesse.</p>

          <p className="text-slate-700 mb-4"><strong>2.2 Cookies e Tecnologias Semelhantes</strong></p>
          <p className="text-slate-700 mb-4">
            Utilizamos cookies e tecnologias semelhantes para garantir o funcionamento do site, analisar métricas e exibir conteúdos publicitários:
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Cookies Essenciais: Necessários para a navegação básica e segurança da plataforma.</li>
            <li>Cookies de Desempenho e Análise: Utilizados para compreender estatísticas agregadas e anônimas sobre o fluxo de visitantes.</li>
            <li>Cookies de Publicidade: Utilizados por redes de anúncios parceiras para veicular anúncios relevantes aos usuários.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Gestão de Cookies e Publicidade</h2>
          <p className="text-slate-700 mb-4">
            Os usuários podem, a qualquer momento, gerenciar ou desativar a coleta de cookies de publicidade e análise diretamente através das configurações do seu navegador de internet ou das ferramentas de privacidade do seu dispositivo.
          </p>
          <p className="text-slate-700 mb-4">
            A desativação de cookies de publicidade não impede a exibição de anúncios, apenas faz com que estes deixem de ser personalizados com base no seu histórico de navegação.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Compartilhamento de Dados Pessoais</h2>
          <p className="text-slate-700 mb-4">
            Não vendemos nem alugamos seus dados pessoais. O compartilhamento de informações ocorre estritamente no limite necessário para a operação da plataforma:
          </p>
          <ul className="list-disc list-inside text-slate-700 mb-4 space-y-1">
            <li>Provedores de Serviços e Redes Parceiras: Para medição de audiência e veiculação de anúncios digitais, respeitando as escolhas de privacidade do usuário.</li>
            <li>Cumprimento de Obrigação Legal: Quando exigido por ordem judicial, autoridades administrativas ou legislação aplicável.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Seus Direitos (LGPD)</h2>
          <p className="text-slate-700 mb-4">
            Nos termos do artigo 18 da LGPD, você possui os seguintes direitos em relação aos seus dados pessoais:   
            
            Confirmação e Acesso: Confirmar a existência de tratamento e acessar seus dados;   
            
            Correção: Solicitar a correção de dados incompletos, inexatos ou desatualizados;   
            
            Anonimização, Bloqueio ou Eliminação: Para dados desnecessários ou tratados em desacordo com a legislação;   
            
            Revogação do Consentimento: Revogar as autorizações concedidas anteriormente para o uso de cookies não essenciais;
            
            Informação sobre Compartilhamento: Saber com quais categorias de entidades seus dados são compartilhados.
          </p>
          <p className="text-slate-700 mb-4">
            Para exercer seus direitos, entre em contato conosco por meio dos canais indicados nesta política.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Retenção e Segurança dos Dados</h2>
          <p className="text-slate-700 mb-4"><strong>Retenção:</strong> Armazenamos os dados apenas pelo tempo estritamente necessário para atingir as finalidades para as quais foram coletados ou para cumprimento de prazos legais.</p>
          <p className="text-slate-700 mb-4"><strong>Segurança:</strong> Adotamos medidas técnicas e organizacionais adequadas para proteger os dados contra acessos não autorizados, destruição, perda ou alteração.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Links para Sites de Terceiros</h2>
          <p className="text-slate-700 mb-4">
            Nosso site pode conter links para conteúdos ou plataformas externas. Não nos responsabilizamos pelas práticas de privacidade adotados por esses terceiros. Recomendamos a leitura das políticas de privacidade de cada site visitado.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">8. Alterações nesta Política</h2>
          <p className="text-slate-700 mb-4">
            Esta Política de Privacidade poderá ser atualizada periodicamente. Quaisquer alterações entram em vigor a partir da data de publicação indicada no topo deste documento.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">9. Contato</h2>
          <p className="text-slate-700 mb-4">
            Se você tiver dúvidas, sugestões ou desejar exercer qualquer um dos seus direitos previstos pela LGPD, entre em contato conosco através da nossa página de Contato.
          </p>
        </section>
      </div>
    </Layout>
  );
}