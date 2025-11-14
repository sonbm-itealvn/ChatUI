/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Proxy /chat requests to the backend server
  async rewrites() {
    return [
      {
        source: "/chat",
        destination: "https://chatserver-3ntj.onrender.com/chat",
      },
    ];
  },
};

export default nextConfig;
