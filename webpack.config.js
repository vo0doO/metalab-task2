const 
	CopyPlugin = require( 'copy-webpack-plugin' );
	HtmlWebpackPlugin = require( 'html-webpack-plugin' );
	path = require( 'path' );
	MiniCssExtractPlugin = require('mini-css-extract-plugin');

	cache = {
		type: 'filesystem',

		buildDependencies: {
			// 2. Добавьте конфигурацию как buildDependency, чтобы получить недействительность кэша при изменении конфигурации
			config: [__filename],

			//  3. Если у вас есть другие вещи, от которых зависит сборка, вы можете добавить их здесь
			// Обратите внимание, что веб-пакет, загрузчики и все модули, на которые ссылается ваша конфигурация, добавляются автоматически.
		},
};
	paths = {
		src: path.resolve( __dirname, 'src' ),
		dist: path.resolve( __dirname, 'dist' ),
		intern: path.resolve( __dirname, './node_modules/intern/browser/intern.js' ),
		inputmaskdependencyLib: path.resolve(
			__dirname,
			'./node_modules/jquery.inputmask/extra/dependencyLibs/inputmask.dependencyLib.js'
		),
		inputmask: path.resolve(
			__dirname,
			'/node_modules/jquery.inputmask/dist/inputmask/inputmask.js'
		)
	};

	resolve = {
		alias: {

			intern: paths.intern,

			'inputmask.dependencyLib': paths.inputmaskdependencyLib,

			'inputmask': paths.inputmask

		}
};

	entry = {
		index: [
			'intern',
			'./src/index.js'
		]
	}

	output = {
		path: paths.dist,
		publicPath: '/',
		asyncChunks: true,
		filename: 'js/[name]/[contenthash].bundle.js',
		hotUpdateChunkFilename: '[id].[fullhash].bundle-update.js',
		sourceMapFilename: 'js/[name]/[contenthash].js.map',
		chunkFilename: 'js/[name]/[contenthash].js',
		clean: true
	}
	
	recordsPath = path.join( __dirname, '/records.json' )


	plugins = [
		new CopyPlugin( {
			patterns: [

				{
					from: path.resolve( __dirname, 'src/assets/favicons' ),
					to: './assets/favicons'
				},

				{
					from: path.resolve( __dirname, 'src/assets/img' ),
					to: './assets/img'
				},

				{
					from: path.resolve( __dirname, 'node_modules/intern/loaders' ),
					to: './loaders'
				}
			]
		} ),

		new HtmlWebpackPlugin(
			{
				template: '!!pug-loader!./src/index.pug'
			}
		),

		new MiniCssExtractPlugin( {
			filename: 'css/[name]/[contenthash].bundle.css',
			chunkFilename: 'css/[name]/[contenthash].css',
		} ),
	]
	optimization = {
		splitChunks: {
			chunks: 'all'
		}
	}
	devServer = {
		static: [
			{
				directory: path.join( __dirname, './' )
			},
		],
		watchFiles: ['src/**/**/*'],
		liveReload: true,
		hot: true,
		client: {
			progress: false

		},
		devMiddleware: {
			writeToDisk: true
		},
	}

	experiments = {
		topLevelAwait: true,
		layers: true,
		futureDefaults: true,
		cacheUnaffected: true,
	}
	mode = "development";
	devtool= mode === 'production' ? false : 'inline-source-map'; // 'eval-cheap-module-source-map',

module.exports = {
	mode,
	cache,
	resolve,

	devtool,

	entry,

	output,
	recordsPath,
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

	plugins: plugins,
	optimization,
	devServer,

	experiments,
};
