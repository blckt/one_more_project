"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

// 
// local scss modules
loaders.push({
	test: /\.scss$/,
	loaders: [
		'style?sourceMap',
		'css',
		'sass'
	]
});

// local css modules
loaders.push({
	test: /\.css$/,
	loaders: [
		'style?sourceMap',
		'css'
	]
});

module.exports = {
	entry: {
		app: [
			'react-hot-loader/patch',
			'./src/index.jsx' // your app's entry point
		],
		vendors: [
			'material-ui',
			'react',
			'react-dom',
			'muicss',
			'react-router',
			'react-redux',
			'react-router-redux',
			'guid',
			'firebase'
		]
	},
	devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/',
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: path.resolve(__dirname),
		alias: {
			utils: path.resolve(__dirname, 'src', 'utils'),
			components: path.resolve(__dirname,'src','components'),
			action: path.resolve(__dirname, 'src', 'actions')
		}
	},
	module: {
		loaders
	},
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendors"
		}),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery',
			fetch: 'isomorphic-fetch'
		}),
		new webpack.DefinePlugin({
			API_URL: JSON.stringify(process.env.API_URL) || "'https://coursemanager.azurewebsites.net/'"
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: './src/template.html'
		}),
	]
};
