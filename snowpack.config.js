// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
  },
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: 'index.html' },
  ],
  plugins: [
    '@snowpack/plugin-typescript',

  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    preventAssignment: true
    /* ... */
  },
  buildOptions: {
    preventAssignment: true
    /* ... */
  },
};
