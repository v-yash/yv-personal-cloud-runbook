/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: "export",
  basePath: isProd ? "/yv-personal-cloud-runbook" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
