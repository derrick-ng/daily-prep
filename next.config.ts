import nextPwa from "next-pwa";

const isDev = process.env.NODE_ENV !== "production";

//the service worker(sw.js) next-pwa generates from /worker/index.js tries to precache some Next.js build files
//the precached files are not created in development, so they must be excluded
const withPWA = nextPwa({
  dest: "public",
  disable: isDev,
  register: true,
  buildExcludes: [/app-build-manifest\.json$/, /middleware-manifest\.json$/],
});

const config = withPWA({});

export default config;
