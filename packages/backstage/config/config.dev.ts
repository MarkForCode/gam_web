// https://umijs.org/config/
import { defineConfig } from "umi";
import path from "path";

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    "react-dev-inspector/plugins/umi/react-inspector",
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },

  chainWebpack(config) {
    config.resolve.alias.set(
      "@gam/shared",
      path.resolve(__dirname, "../shared/src")
    );
    return config;
  },

  define: {
    API_URL: "http://localhost:8833", // API address
    API_SECRET_KEY: "XXXXXXXXXXXXXXXX", // API call key
  },
});
