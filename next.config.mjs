/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

import path from 'path';

export const sassOptions = {
  includePaths: [path.join(process.cwd(), 'styles')],
};