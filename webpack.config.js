const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + ' mode')

module.exports = {

    mode: mode,
    entry: {
        scripts: "./src/index.js",
        user: "./src/user.js"
    },
    output: {
        filename: "[name].[contenthash].js",
        assetModuleFilename: "assets/[hash][ext][query]",
        clean: true,
    },
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
        new HtmlWebpackPlugin({
        template: "./src/index.pug"
    })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
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
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff|oet|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                exclude: /(node_modules|bower_comonents)/,
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },

    devServer: {
        static: {
            directory: path.join(__dirname, '')
        }
    }
}