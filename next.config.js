const { isPostfixUnaryExpression } = require('typescript')

/**
 * @type {import('next').NextConfig}
 */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  basePath: isProd ? '/artfestarg-1.github.io' : '',
  output: 'export',
  distDir: 'dist',
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
  
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
  
  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}
   
module.exports = nextConfig

// import { NextConfig } from 'next';

// const isProd = process.env.NODE_ENV === 'production';

// const nextConfig: NextConfig = {
//   basePath: isProd ? '/artfestarg-1.github.io' : '',
//   output: 'export',
//   distDir: 'dist',
// };

// export default nextConfig;