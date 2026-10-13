# Projeto Futebol - Referência Rápida para Agentes

## Visão Geral
Portal de estatísticas de futebol brasileiro (Brasileirão Série A) com monetização via Google AdSense.
Stack: **Next.js 16 (Pages Router) + TypeScript + Tailwind CSS 4 + API Futebol**

## Estrutura de Arquivos

```
projeto-futebol/
├── pages/
│   ├── _app.tsx                 # Global styles, providers
│   ├── api/                     # BACKEND (goku)
│   │   ├── tabela.ts            # GET /api/tabela?id=10
│   │   ├── artilheiros.ts       # GET /api/artilheiros?id=10
│   │   ├── ao-vivo.ts           # GET /api/ao-vivo
│   │   └── partida.ts           # GET /api/partida?id=xxx
│   ├── tabela.tsx               # SSR - Classificação completa
│   ├── artilheiros.tsx          # SSR - Ranking goleadores
│   ├── ao-vivo.tsx              # SSR - Jogos hoje/próximos/recentes
│   ├── partida/[id].tsx         # SSR dinâmico - Detalhes partida
│   ├── privacidade.tsx          # Static - LGPD/AdSense obrigatório
│   ├── termos.tsx               # Static - Termos de uso
│   ├── contato.tsx              # Static - Formulário + FAQ
│   ├── sitemap.xml.tsx          # Dynamic XML (SEO)
│   └── index.tsx                # Home - Hero + cards + jogos hoje
├── components/                  # FRONTEND (vegeta)
│   ├── Layout.tsx               # Wrapper global
│   ├── Header.tsx               # Nav responsiva
│   ├── Footer.tsx               # Links institucionais
│   └── AdSlot.tsx               # 3 slots: header/table/match
├── lib/
│   └── api.ts                   # axios.create({ baseURL: '/api' })
├── styles/
│   └── globals.css              # Tailwind directives
├── public/
│   ├── robots.txt               # Sitemap + allow all
│   └── favicon.ico
├── .env.local                   # API_FUTEBOL_KEY (server only)
├── next.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## APIs Externas (API Futebol)

| Endpoint | Rota Proxy | Descrição |
|----------|------------|-----------|
| `/v1/campeonatos/{id}/tabela` | `/api/tabela?id={id}` | Classificação |
| `/v1/campeonatos/{id}/artilharia` | `/api/artilheiros?id={id}` | Artilheiros |
| `/v1/ao-vivo` | `/api/ao-vivo` | Jogos ao vivo |
| `/v1/partidas/{id}` | `/api/partida?id={id}` | Detalhes partida |

**Autenticação:** `Authorization: Bearer ${process.env.API_FUTEBOL_KEY}` (apenas server-side)

**Campeonato principal:** Brasileirão Série A = `id=10`

## Convenções de Código

### Backend (goku)
- API Routes em `/pages/api/*.ts` (TypeScript)
- Sempre validar `req.query` params obrigatórios
- Error handling: try/catch + status codes + JSON padronizado
- NUNCA expor `API_FUTEBOL_KEY` no cliente
- Headers CORS não necessários (same-origin)

### Frontend (vegeta)
- Todas as páginas usam `<Layout>` (Header, AdSlot header, Footer)
- SSR via `getServerSideProps` para dados dinâmicos
- `AdSlot` em 3 posições: header (leaderboard), table (in-feed after 10th), match (square between lineups)
- Design system: slate/emerald/red palette, Inter font
- Mobile-first, acessível (aria-labels, semantic HTML)

### AdSense/SEO
- `robots.txt` + `sitemap.xml` dinâmico
- Páginas institucionais obrigatórias: `/privacidade`, `/termos`, `/contato`
- Links no footer para `/privacidade`
- Script AdSense async no `<Head>` do Layout
- Publisher ID: `ca-pub-XXXXXXXXXXXXXXXX` (substituir em produção)

## Comandos Úteis

```bash
# Desenvolvimento
cd /home/brunopark/projeto-futebol && npm run dev

# Build produção
npm run build

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

## Variáveis de Ambiente

| Variável | Onde | Descrição |
|----------|------|-----------|
| `API_FUTEBOL_KEY` | `.env.local` + Vercel | Chave da API Futebol (server-only) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Vercel (opcional) | Publisher ID AdSense |

## Status da Publicação (Fase 4-5)

- [x] **AdSense Real**: Configurado `ca-pub-6873487845862850` e arquivo `public/ads.txt`
- [x] **Deploy Vercel**: Realizado com chave de produção `live_...`
- [x] **Domínio Oficial**: `https://futebolagora.blog` (Cloudflare DNS apontando para Vercel)
- [x] **SEO**: `robots.txt` e `sitemap.xml` dinâmico configurados com domínio oficial
- [ ] **Google Search Console**: Enviar `https://futebolagora.blog/sitemap.xml`
- [ ] **Formulário Contato**: Configurar endpoint real (Formspree/Backend) caso necessário

## Contatos dos Agentes

- **goku** (backend): `goku chat -q "..."` — API routes, proxy, types, API Futebol integration
- **vegeta** (frontend): `vegeta chat -q "..."` — Páginas, componentes, Layout, AdSlot, Tailwind, SSR
- **park** (security): `park chat -q "..."` — OWASP audit, CSP, headers, LGPD compliance
- **testador** (QA): `testador chat -q "..."` — Browser testing, console errors, AdSense validation

## Notas Importantes

- **SSR obrigatório** para páginas com dados (AdSense requer conteúdo no HTML)
- **Zero secrets no cliente** — `API_FUTEBOL_KEY` só em `getServerSideProps` e `/pages/api/*`
- **Mobile-first** — testar em viewport 375px+
- **Performance** — `next build` deve passar sem erros TypeScript