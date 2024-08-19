const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.clerk.com',
            },
        ],
    },
};

export default nextConfig;