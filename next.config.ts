import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        mdxRs: false,
    },
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
