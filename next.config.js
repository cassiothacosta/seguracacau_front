/** @type {import('next').NextConfig} */

const MS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 86400;
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: SECONDS_PER_DAY * MS_PER_SECOND,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 100
  },
  output: 'standalone',
  env: {
    'BACKEND_API': 'http://localhost:3000'
  },
  i18n
}

module.exports = nextConfig