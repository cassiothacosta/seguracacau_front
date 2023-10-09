/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  output: 'standalone',
  env: {
    'BACKEND_API': 'http://localhost:3000'
  },
  i18n
}

module.exports = nextConfig