import nextPwa from "next-pwa";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https" as const,
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https" as const,
      },
      {
        hostname: "zpapagojlfddtjyciyum.supabase.co",
        protocol: "https" as const,
      },
    ],
  },
};

const withPWA = nextPwa({
  dest: "public",
  register: true,
});

const config = withPWA({
  ...nextConfig,
});

export default config;
