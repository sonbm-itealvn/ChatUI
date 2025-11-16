/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  // Proxy /chat requests to the backend server
  async rewrites() {
    return [
      {
        source: "/chat",
        destination: "https://chat-server-omega-six.vercel.app/chat",
      },
    ];
  },
};

export default nextConfig;
