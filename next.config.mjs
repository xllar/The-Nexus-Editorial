/** @type {import('next').NextConfig} */

import path from 'path';

const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
    prependData: `@import "./src/app/styles/base.scss";`,
  },
};

export default nextConfig;