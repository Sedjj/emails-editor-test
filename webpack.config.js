const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	root: path.resolve(__dirname, 'src'),
	index: path.resolve(__dirname, 'src/index.ts'),
};

const isDev = process.env.NODE_ENV === 'development';

const plugins = isDev ? [new HtmlWebpackPlugin({
	filename: 'index.html',
	template: path.resolve(PATHS.root, 'index.html'),
	hash: true,
})] : [];

module.exports = {
	context: PATHS.root,
	devtool: isDev ? 'cheap-module-eval-source-map' : false,
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'emails-editor.js',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	entry: PATHS.index,
	devServer: {
		stats: {
			children: false,
			maxModules: 0
		},
		hot: true,
		port: 3000,
		watchOptions: {
			aggregateTimeout: 900,
			ignored: ['test/**/*.test.ts', 'node_modules'],
		},
		progress: true,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					babelrc: true,
					extends: path.resolve(__dirname, '.babelrc'),
					/*cacheDirectory: true*/
				}
			},
			{
				test: /\.(ts)?$/,
				enforce: 'pre',
				exclude: ['/node_modules/'],
				use: [
					{
						options: {
							eslintPath: require.resolve('eslint'),
							cache: true
						},
						loader: 'eslint-loader'
					}
				]
			},
			{
				test: /\.(less|css)$/,
				exclude: ['/node_modules/'],
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {sourceMap: true},
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true
						}
					}
				]
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
		]
	},
	plugins,
	resolve: {
		extensions: [' ', '.ts', '.js', '.less'],
		modules: [
			PATHS.root,
			'node_modules'
		]
	},
};