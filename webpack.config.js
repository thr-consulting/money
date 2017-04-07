var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname);

module.exports = {
	entry: './src/index.js',
	target: 'node',
	devtool: 'source-map',
	externals: [nodeExternals()],
	output: {
		path: path.resolve(root, 'lib'),
		filename: "index.js",
		library: "money",
		libraryTarget: "umd"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								['es2015', {loose: true, modules: false}],
								'stage-1',
								'react'
							]
						}
					}
				],
			}
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 	},
		// 	sourceMap: true,
		// }),
	],
	resolve: {
		alias: {
			'inputmask.dependencyLib': path.join(root, 'node_modules/jquery.inputmask/dist/inputmask/inputmask.dependencyLib.js'),
			'inputmask.extensions': path.join(root, 'node_modules/jquery.inputmask/dist/inputmask/inputmask.extensions.js'),
			'inputmask.numeric.extensions': path.join(root, 'node_modules/jquery.inputmask/dist/inputmask/inputmask.numeric.extensions.js'),
			'inputmask': path.join(root, 'node_modules/jquery.inputmask/dist/inputmask/inputmask.js')
		},
	},
};
