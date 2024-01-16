import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config: webpack.Configuration = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		index: path.resolve(__dirname, '../src/index.ts'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/index.js',
		assetModuleFilename: 'images/[hash][ext][query]',
	},
	resolve: {
		extensions: ['.js', '.ts', '.less'],
		alias: {
			'@native': path.resolve(__dirname, '../src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										browsers: ['cover 99.5%'],
									},
								},
							],
						],
						plugins: [
							[
								/* A plugin that enables the re-use of Babel's injected helper code to save on codesize. */
								'@babel/plugin-transform-runtime',
								{
									corejs: { version: 3 },
								},
							],
						],
					},
				},
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'less-loader',
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/index.css',
		}),
		new HtmlWebpackPlugin({
			chunks: ['index'],
			title: 'Native',
			filename: 'index.html',
			favicon: path.resolve(__dirname, '../src/images/favicon.ico'),
			template: path.resolve(__dirname, '../html/index.ejs'),
		}),
	],
}

export default config
