
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
loaders.push({
	test: /\.scss$/,
	exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
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
		'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
	]
});

// // global css files
// loaders.push({
// 	test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
// 	loader: ExtractTextPlugin.extract('style', 'css')
// });

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
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[chunkhash].js',
		publicPath: '/',
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
	plugins: [
		new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			},
			API_URL: JSON.stringify(process.env.API_URL) || "'https://coursemanager.azurewebsites.net/'"
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				drop_debugger: true
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new ExtractTextPlugin('[contenthash].css', {
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: './src/template.html',
			title: '🤡Scheduler😁'
		}),
		new webpack.optimize.DedupePlugin(),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.html$|.css$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
};
