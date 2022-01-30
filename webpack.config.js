const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const PugPlugin = require('pug-plugin');

const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  inputmaskdependencyLib: path.join(
    __dirname,
    './node_modules/jquery.inputmask/extra/dependencyLibs/inputmask.dependencyLib.js',
  ),
  inputmask: path.join(
    __dirname,
    './node_modules/jquery.inputmask/dist/inputmask/inputmask.js',
  ),
};

const pugLoaderOptions = {
  method: 'render',
  esModule: true,
};

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}
console.log(`${mode} mode`);

module.exports = {
  mode,
  resolve: {
    alias: {
      Components: path.join(paths.src, '/components/'),
      Images: path.join(paths.src, '/assets/img/'),
      Templates: path.join(paths.src, '/templates/'),
      'inputmask.dependencyLib': paths.inputmaskdependencyLib,
      inputmask: paths.inputmask,
    },
  },
  resolveLoader: {
    alias: {
      'pug-loader2': '@webdiscus/pug-loader',
    },
  },

  devtool: mode == 'production' ? false : 'source-map', // 'eval-cheap-module-source-map',
  externals: {
    paths,
  },
  entry: {
    scripts: './src/index.js',
  },

  output: {
    path: paths.dist,
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: pugLoaderOptions,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif|bmp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext][query]',
        },
      },
      {
        test: /\.(woff|svg|woff2|oet|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  require('postcss-flexbugs-fixes'),
                  require('postcss-combine-media-query'),
                  require('css-mqpacker'),
                  require('cssnano')({
                    preset: [
                      'default',
                      {
                        discardComments: {
                          removeAll: true,
                        },
                      },
                    ],
                  }),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  require('postcss-combine-media-query'),
                  require('css-mqpacker'),
                  require('cssnano')({
                    preset: [
                      'default',
                      {
                        discardComments: {
                          removeAll: true,
                        },
                      },
                    ],
                  }),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new PugPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicons'),
          to: './assets/favicons',
        },
        {
          from: path.resolve(__dirname, 'src/assets/img'),
          to: './assets/img',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: '!!pug-loader!./src/index.pug',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      // maxSize: 500000,
      // minSize: 500000,
    },
  },
  //
  // performance: {
  //   hints: mode == 'production' ? 'error' : 'warning',
  //   maxEntrypointSize: mode === 'production' ? 1024000000 : 4096000000,
  //   maxAssetSize: mode === 'production' ? 1024000000 : 4096000000,
  // },
  devServer: {
    static: {
      directory: path.join(__dirname, ''),
    },
    compress: true,
    https: false,
    port: 8080,
    open: {
      app: {
        name: 'firefox',
      },
    },
    liveReload: true,
    hot: true,
    client: {
      progress: true,
    },
  },
};
