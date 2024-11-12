/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
    includePaths: [path.join(process.cwd(), 'styles')],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'next-starter-blob.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;