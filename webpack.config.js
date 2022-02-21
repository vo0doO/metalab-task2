const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const paths = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist'),
	intern: path.join(__dirname, './node_modules/intern/browser/intern.js'),
	inputmaskdependencyLib: path.join(
		__dirname,
		'./node_modules/jquery.inputmask/extra/dependencyLibs/inputmask.dependencyLib.js'
	),
	inputmask: path.join(
		__dirname,
		'./node_modules/jquery.inputmask/dist/inputmask/inputmask.js'
	)
};

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
	mode = 'production';
}

module.exports = {
	mode,
	cache: {
		type: 'filesystem',

		buildDependencies: {
		// 2. Добавьте конфигурацию как buildDependency, чтобы получить недействительность кэша при изменении конфигурации
			config: [__filename],

		//  3. Если у вас есть другие вещи, от которых зависит сборка, вы можете добавить их здесь
		// Обратите внимание, что веб-пакет, загрузчики и все модули, на которые ссылается ваша конфигурация, добавляются автоматически.
		},
	},
	resolve: {

		alias: {

			intern: paths.intern,

			'inputmask.dependencyLib': paths.inputmaskdependencyLib,

			inputmask: paths.inputmask

		},
	},

	devtool: mode === 'production' ? false : 'cheap-module-source-map', // 'eval-cheap-module-source-map',

	entry: {
		index: [
			'intern',
			'./src/index.js'
		]

	},

	output: {
		path: paths.dist,
		publicPath: '/',
		asyncChunks: true,
		filename: 'js/[name]/[contenthash].bundle.js',
		hotUpdateChunkFilename: '[id].[fullhash].bundle-update.js',
		sourceMapFilename: 'js/[name]/[contenthash].js.map',
		chunkFilename: 'js/[name]/[contenthash].js',
		clean: true
	},
	recordsPath: path.join(__dirname, '/records.json'), // this is not required for the webpack-dev-server, but when compiled.
	module: {

		rules: [
			{
				test: /\.pug$/,
				loader: 'pug-loader',
			},

			{
				test: /\.html$/,
				loader: 'html-loader'
			},

			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},

			{
				test: /\.(png|svg|jpg|jpeg|gif|bmp)$/i,
				type: 'asset/resource',
				exclude: '/assets/fonts',
				generator: {
					filename: 'assets/img/[name].[contenthash].[ext]'
				}
			},

			{
				test: /\.(woff|svg|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				exclude: '/assets/img',
				generator: {
					filename: 'assets/fonts/[name].[contenthash].[ext]'
				}
			},

			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			}
		]
	},

	plugins: [
		new CopyPlugin({
			patterns: [

				{
					from: path.resolve(__dirname, 'src/assets/favicons'),
					to: './assets/favicons'
				},

				{
					from: path.resolve(__dirname, 'src/assets/img'),
					to: './assets/img'
				},

				{
					from: path.resolve(__dirname, 'node_modules/intern/loaders'),
					to: './loaders'
				}
			]
		}),

		new HtmlWebpackPlugin(
			{
				template: '!!pug-loader!./src/index.pug'
			}
		),

		new MiniCssExtractPlugin({
			filename: 'css/[name]/[contenthash].bundle.css',
			chunkFilename: 'css/[name]/[contenthash].css',
		}),
	],
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	devServer: {
		static: [
			{
				directory: path.join(__dirname, 'assest')
			},
		],
		https: true,
		port: 8080,
		liveReload: true,
		hot: true,
		client: {
			progress: false,
			logging: 'info',

		},
	},

	experiments: {
		topLevelAwait: true,
		layers: true,
		futureDefaults: true,
		cacheUnaffected: true
	}
};
