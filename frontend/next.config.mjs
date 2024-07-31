/** @type {import('next').NextConfig} */



const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'mw.ts'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '45.59.167.43', port: '5353', pathname: '/**' }
    ]
  },
  async redirects() {
    return [{ source: '/', destination: '/my-movies', permanent: true }]
  },
}

export default nextConfig
