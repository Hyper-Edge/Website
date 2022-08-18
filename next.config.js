/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  images: {
    loader: 'imgix',
    path: 'https://hyperedge.web.app/',
  },
  env: {
    SERVER: 'http://localhost:3000',
    REACT_APP_GOOGLE_AUTH_CLIENT_ID:
      '1095872982542-ppkjufapgdsq865bfraeqldimlaeaf9a.apps.googleusercontent.com',
  },
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching,
  },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
});
