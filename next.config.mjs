/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Proxy /chat requests to the backend server
  async rewrites() {
    return [
      {
        source: "/chat",
        destination: "https://127.0.0.1:8000/chat",
      },
    ];
  },
};

export default nextConfig;
