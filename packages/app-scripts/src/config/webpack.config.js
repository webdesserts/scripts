const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const os = require("os");
const PrettyWebpack = require("./pretty-webpack-plugin");
const { getEnv } = require("../env");
const { getProjectPaths, getScriptsPaths } = require("../paths");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

/**
 * @typedef {import('webpack').Configuration} WebpackConfiguration
 *
 * @type {() => WebpackConfiguration & { devServer: any }}
 */
module.exports = () => {
  const projectPaths = getProjectPaths();
  const scriptsPaths = getScriptsPaths();
  const env = getEnv();

  const routes = {
    assets: "/assets/",
  };

  let swrc = require(scriptsPaths.swcConfig);

  let swcOptions = {
    ...swrc,
    jsc: {
      ...swrc.jsc,
      transform: {
        react: {
          refresh: env.isDev,
        },
      },
    },
  };

  /** @type any[] */
  let plugins = [new PrettyWebpack(), new CleanWebpackPlugin()];

  if (env.isDev) {
    plugins.push(
      new ForkTsCheckerWebpackPlugin({
        async: true,
        typescript: {
          typescriptPath: projectPaths.typescript,
        },
      }),
      new ReactRefreshWebpackPlugin()
    );
  }

  return {
    context: projectPaths.root,
    stats: "none",
    infrastructureLogging: {
      level: "error",
    },
    mode: env.mode,
    devtool: "source-map",
    node: false,
    optimization: {
      chunkIds: "named",
    },
    output: {
      path: projectPaths.assets,
      publicPath: routes.assets,
      filename: "[name].js",
      chunkFilename: "[name].[chunkhash:8].bundle.js",
    },
    plugins,
    devServer: {
      hot: true,
      open: true,
      host: os.hostname(),
      port: env.port,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      devMiddleware: {
        index: true,
        publicPath: routes.assets,
        writeToDisk: env.isProd,
      },
      static: {
        directory: projectPaths.webRoot,
      },
      historyApiFallback: true,
    },
    resolve: {
      symlinks: false,
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js|md)x?$/,
          exclude: /node_modules/,
          loader: require.resolve("swc-loader"),
          options: swcOptions,
          rules: [
            {
              test: /\.mdx?$/,
              loader: require.resolve("@mdx-js/loader"),
            },
          ],
        },
        {
          test: /\.svg$/,
          issuer: /\.(ts|js|md)x?$/,
          use: [
            {
              loader: require.resolve("@svgr/webpack"),
              options: { svgo: false },
            },
          ],
        },
      ],
    },
  };
};
