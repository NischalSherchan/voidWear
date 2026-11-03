import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com","leaves-designer-truth-inspiration.trycloudflare.com"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    
  },
  
};

export default nextConfig;