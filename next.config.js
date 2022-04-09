module.exports = {
    async redirects() {
      return [
        {
          source: '/sketch-book/2021-06-14',
          destination: 'https://yw6rc.csb.app/',
          permanent: true
        }
      ]
    },
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        // fixes next-mdx-remote: Package path ./jsx-runtime.js is not exported from package react
        // https://github.com/hashicorp/next-mdx-remote/issues/237
        "react/jsx-runtime.js": require.resolve("react/jsx-runtime"),
      };

      return config;
    }
  }