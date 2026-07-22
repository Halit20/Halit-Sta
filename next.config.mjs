/** @type {import('next').NextConfig} */
const nextConfig = {
  // Produce a fully static site in /out that can be opened directly
  // from the filesystem (file://) by double-clicking index.html.
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  // file:// has no image optimization server, so serve images as-is.
  images: {
    unoptimized: true,
  },
  // Use relative asset paths (./_next/...) instead of absolute (/_next/...)
  // so chunks/fonts/styles resolve correctly under file://.
  // Production-only: in dev the relative prefix breaks the blur-placeholder
  // image requests (/_next/image rejects non-absolute URLs with a 400).
  assetPrefix: process.env.NODE_ENV === "production" ? "." : undefined,
  trailingSlash: false,
};

export default nextConfig;
