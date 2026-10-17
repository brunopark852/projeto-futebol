import Layout from '@/components/Layout';
import Link from 'next/link';

export default function GuiaDoFutebolPage() {
  return (
    <Layout
      title="Guia do Futebol: como ler tabelas e estatísticas"
      description="Entenda pontos, jogos disputados, vitórias, empates, derrotas, saldo de gols, status das partidas e limites dos dados esportivos."
    >
      <article className="prose prose-slate mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 sm:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700">Guia do torcedor</p>
        <h1 className="mb-5 text-3xl font-bold text-slate-900">Como ler uma tabela de futebol</h1>
        <p className="text-lg leading-8 text-slate-700">
          A classificação resume o desempenho dos clubes ao longo de uma competição. Para interpretar a posição de um time, vale olhar além do número que aparece na primeira coluna: partidas disputadas, vitórias, gols marcados e sofridos ajudam a explicar como os pontos foram conquistados.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-semibold">O que significa cada coluna?</h2>
        <dl className="space-y-4">
          <div><dt className="font-semibold">Pontos (PTS)</dt><dd>Em ligas que usam o sistema tradicional, a vitória vale três pontos, o empate vale um para cada equipe e a derrota não soma pontos. Confira o regulamento específico da competição.</dd></div>
          <div><dt className="font-semibold">Jogos (J)</dt><dd>Quantidade de partidas contabilizadas para o clube. Equipes com jogos a menos podem aparecer abaixo de adversários que já disputaram mais rodadas, mesmo que ainda tenham partidas pendentes.</dd></div>
          <div><dt className="font-semibold">Vitórias, empates e derrotas (V, E, D)</dt><dd>Mostram como os resultados se distribuem. Duas equipes com a mesma pontuação podem ter chegado a ela por combinações diferentes de resultados.</dd></div>
          <div><dt className="font-semibold">Gols pró e gols contra (GP, GC)</dt><dd>São, respectivamente, os gols marcados e sofridos. Eles ajudam a avaliar a produção ofensiva e a quantidade de gols concedidos.</dd></div>
          <div><dt className="font-semibold">Saldo de gols (SG)</dt><dd>É a diferença entre gols marcados e gols sofridos. Um saldo positivo significa que o time marcou mais gols do que sofreu no conjunto dos jogos contabilizados.</dd></div>
          <div><dt className="font-semibold">Aproveitamento</dt><dd>Expressa a proporção dos pontos conquistados em relação ao máximo possível nos jogos contabilizados. A fórmula pode variar em competições com regulamentos especiais.</dd></div>
        </dl>

        <h2 className="mb-2 mt-8 text-xl font-semibold">Como funcionam os critérios de desempate?</h2>
        <p className="leading-7">
          Quando clubes terminam com a mesma pontuação, a organização aplica os critérios definidos no regulamento da edição. Eles podem incluir número de vitórias, saldo de gols, gols marcados e outros critérios previstos oficialmente. A ordem e os critérios não são iguais em todos os torneios; por isso, a classificação deve ser interpretada de acordo com o regulamento vigente, e não por uma regra presumida.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-semibold">Como interpretar o status de uma partida?</h2>
        <ul className="list-disc space-y-2 pl-6 leading-7">
          <li><strong>Agendado:</strong> a partida está prevista para uma data e horário, que podem ser alterados.</li>
          <li><strong>Ao vivo:</strong> a partida está em andamento segundo o status fornecido pela fonte de dados.</li>
          <li><strong>Intervalo:</strong> o jogo está na pausa entre períodos, quando esse status é fornecido.</li>
          <li><strong>Encerrado:</strong> a fonte indica que a partida terminou.</li>
          <li><strong>Adiado ou cancelado:</strong> o evento não segue o agendamento original; procure a comunicação oficial para saber a nova programação.</li>
        </ul>

        <h2 className="mb-2 mt-8 text-xl font-semibold">Por que os dados podem mudar?</h2>
        <p className="leading-7">
          Serviços de dados podem atualizar horários, status e estatísticas após receberem informações novas ou correções. Uma página também pode ficar temporariamente sem dados se a fonte estiver indisponível ou se a competição não fizer parte da cobertura contratada. Ausência de informação não significa necessariamente que a partida foi cancelada.
        </p>
        <p className="leading-7">
          Para decisões importantes, como confirmar o horário de um jogo ou verificar uma classificação oficial, compare os dados do portal com os canais oficiais da liga, federação ou clube.
        </p>

        <h2 className="mb-2 mt-8 text-xl font-semibold">Explore o portal</h2>
        <p className="leading-7">
          Consulte a <Link href="/tabela" className="font-semibold text-emerald-700 hover:underline">tabela de classificação</Link>, acompanhe os <Link href="/ao-vivo" className="font-semibold text-emerald-700 hover:underline">jogos e resultados</Link> e conheça a proposta do <Link href="/sobre" className="font-semibold text-emerald-700 hover:underline">Projeto Futebol Hoje</Link>.
        </p>
      </article>
    </Layout>
  );
}
