/** @type {import('next').NextConfig} */
const nextConfig = {
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

import path from 'path';

export const sassOptions = {
  includePaths: [path.join(process.cwd(), 'styles')],
}