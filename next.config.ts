const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              frame-ancestors 'self' http://localhost:3000 https://your-main-site.com;
              frame-src 'self' http://localhost:3001/;
            `.replace(/\n/g, "")
          }
        ]
      }
    ];
  }
};

export default nextConfig;