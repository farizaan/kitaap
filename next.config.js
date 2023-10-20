/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  images: {
    domains: [
      'static-01.daraz.com.np',
      'images-na.ssl-images-amazon.com',
      'm.media-amazon.com',
      'cdn.pixabay.com',
      'localhost',
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// module.exports = nextConfig;
// const withPWA = require('next-pwa');
// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//     register: true,
//     disable: process.env.NODE_ENV === 'development',
//     skipWaiting: true,
//   },
// });
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(nextConfig);
