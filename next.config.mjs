/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: false,
  devIndicators: false,
  // Allows a production build next to the running dev server (e.g. for verification).
  distDir: process.env.NEXT_DIST_DIR || ".next",
};
