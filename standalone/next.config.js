/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@uniswap/widgets', '@uniswap/conedison', '@reservoir0x/reservoir-kit-ui'],
    webpack: config => {
      config.resolve.fallback = { fs: false, net: false, tls: false };
      return config;
    },
    env: {
      title: "My App",
      description: "My App description",
    },
  };
  
  module.exports = nextConfig;
  