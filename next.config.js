/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  env: {
    'BACKEND_API': 'http://localhost:3000'
  }
}

module.exports = nextConfig
 
