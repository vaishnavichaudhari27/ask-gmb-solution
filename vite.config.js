import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import siteConfig from './src/siteConfig.js'
import siteRoutes from './src/siteRoutes.js'

function seoFiles() {
  return {
    name: 'ask-gmb-seo-files',
    apply: 'build',
    generateBundle() {
      const siteUrl = siteConfig.siteUrl.trim().replace(/\/+$/, '')
      let productionUrl
      try {
        productionUrl = new URL(siteUrl)
      } catch {
        productionUrl = null
      }
      const isValidSiteUrl =
        productionUrl?.protocol === 'https:' &&
        productionUrl.origin === siteUrl &&
        productionUrl.pathname === '/'

      if (siteUrl && !isValidSiteUrl) {
        throw new Error('Set siteConfig.siteUrl to the verified HTTPS production origin before building.')
      }

      const sitemapLine = isValidSiteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${sitemapLine}`,
      })

      if (isValidSiteUrl) {
        const urls = siteRoutes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`).join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoFiles()],
  build: {
    rolldownOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const assetName = assetInfo.names?.[0] || assetInfo.name || ''
          return /\.(?:png|jpe?g|gif|webp|avif|svg)$/i.test(assetName)
            ? '[name]-[hash][extname]'
            : 'assets/[name]-[hash][extname]'
        },
        codeSplitting: {
          groups: [
            {
              name: 'motion',
              test: /[\\/]node_modules[\\/](?:framer-motion|motion-dom|motion-utils)[\\/]/,
            },
          ],
        },
      },
    },
  },
})
