const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    if (isServer) {
      config.externals = [...(config.externals ?? []), '@midnight-ntwrk/dapp-connector-api'];
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        'isomorphic-ws': path.resolve(__dirname, 'src/lib/isomorphic-ws-browser-shim.ts'),
      };
    }

    return config;
  },
};

module.exports = nextConfig;
