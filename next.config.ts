import type { NextConfig } from "next";

// Headers de segurança — mitigam:
//  - HSTS: força HTTPS (protege contra MITM e downgrade)
//  - X-Content-Type-Options: impede MIME sniffing (mitiga XSS via upload)
//  - X-Frame-Options: bloqueia clickjacking (DENY é mais restritivo que SAMEORIGIN)
//  - Referrer-Policy: limita vazamento de URL para origens cruzadas
//  - Permissions-Policy: desabilita APIs de browser que o site não usa
//  - COOP/COEP/CORP: isolam contexto de navegação contra side-channel (Spectre)
//  - CSP: whitelista fontes de script, estilo, imagem, conexão, frame, etc.
//    Mantemos 'unsafe-inline' em script e style para o AdSense inline;
//    em produção ideal é mover para nonce, mas isso exige proxy AdSense.
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // 'unsafe-inline' em script: necessário para o AdSense script inline
      // e para o bootstrap do Next.js. Endureça via nonce quando mover para produção madura.
      "script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagservices.com https://*.googlesyndication.com https://*.google.com",
      // 'unsafe-inline' em style: necessário para estilos inline do Tailwind/Next
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      // img-src https: para escudos externos via next/image (que faz proxy via /_next/image)
      "img-src 'self' data: blob: https:",
      // connect-src permite chamadas client-side para /api/* e para a API Futebol
      "connect-src 'self' https://api.api-futebol.com.br https://api-futebol.com.br",
      // frame-src para iframes do AdSense
      "frame-src https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://formspree.io",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Configuração de imagens otimizadas do Next.js.
  // Como vamos trocar <img> por <Image /> nas páginas, e os escudos vêm
  // de URLs externas (api.api-futebol.com.br e possivelmente CDN),
  // precisamos liberar esses hosts em remotePatterns (substituiu `domains`
  // deprecado no Next 14+ e endurecido no Next 16).
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.api-futebol.com.br',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.api-futebol.com.br',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'crests.football-data.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;