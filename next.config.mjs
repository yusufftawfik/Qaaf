/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — `npm run build` emits a fully static site to ./out
  // that any static/CDN host (Cloudflare Pages, Netlify, S3, Nginx) can serve.
  // Remove this line if you ever switch back to an SSR/Node server (see DEPLOYMENT.md).
  output: "export",

  reactStrictMode: true,

  // Emit folder-per-route (/map/index.html) for maximum host portability.
  trailingSlash: true,

  // No server image optimizer in a static export.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
