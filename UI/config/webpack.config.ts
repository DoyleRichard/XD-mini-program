import path from 'path'
import webpack from 'webpack'

const config: webpack.Configuration = {
	mode: 'development',
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
			'@ui': path.resolve(__dirname, '../src'),
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
		],
	},
}

export default config
