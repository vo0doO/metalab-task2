const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
}

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
    mode: mode,
    devtool: "source-map",
    externals: {
        paths: PATHS,
    },
    entry: {
        scripts: "./src/index.js",
    },

    output: {
        path: PATHS.dist,
        filename: '[name].[contenthash].js',
        clean: true,
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.pug$/,
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
                    }
                }
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif|bmp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "assets/img/[name][ext][query]",
                },

            },
            {
                test: /\.(woff|woff2|oet|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: "assets/fonts/[name][ext][query]",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ]
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, "src/assets/favicons"), to: "./assets/favicons" },
                { from: path.resolve(__dirname, "src/assets/img"), to: "./assets/img" },
            ],
        }),
        new HtmlWebpackPlugin({
            template: "!!pug-loader!/src/index.pug"
        }),

        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, '')
        }
    }
}