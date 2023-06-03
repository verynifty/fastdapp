/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@uniswap/widgets', '@uniswap/conedison'],
    webpack: config => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      return config;
    },
    env: {
    }
  };
  
  module.exports = nextConfig;
  