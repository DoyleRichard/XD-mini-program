import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config: webpack.Configuration = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: {
		logic: path.resolve(__dirname, '../src/index.ts'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'core.js',
	},
	resolve: {
		extensions: ['.js', '.ts', '.less', '.html'],
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
}

export default config
