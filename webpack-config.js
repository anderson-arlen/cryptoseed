const
	webpack = require('webpack'),
	path = require('path'),
	buildPath = path.resolve(__dirname, '.compiled'),
	nodeModulesPath = path.resolve(__dirname, 'node_modules'),
	TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
	target: 'electron',
	entry: './src/index.jsx',
	resolve: {
		extensions: ['.jsx', '', '.js']
	},
	devtool: 'source-map',
	output: {
		path: buildPath,
		filename: 'app.js'
	},
	plugins: [
		new TransferWebpackPlugin([
			{ from: 'static' }
		], path.resolve(__dirname, 'src')),
		new TransferWebpackPlugin([
			{ from: 'flexboxgrid/css'}
		], path.resolve(__dirname, 'node_modules'))
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/, // all .js and .jsx files
				loaders: ['babel-loader'],
				exclude: [nodeModulesPath]
			},
			{
				test: /\.css$/,
				loader: 'style!css?modules',
				include: /flexboxgrid/
			}
		]
	}
};

if (process.env.NODE_ENV === 'production') {
	config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
		}
	}));
}

module.exports = config;
