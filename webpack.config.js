const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "r",
    projectName: "r",
    webpackConfigEnv,
    argv,
    outputSystemJS: true,
  });

  const plugins = defaultConfig.plugins.filter(
    (plugin) => plugin.constructor.name !== "HtmlWebpackPlugin"
  );

  return merge(defaultConfig, {
    plugins: plugins,
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  });
};
