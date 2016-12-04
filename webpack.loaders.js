const loaders = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|public)/,
		loader: "babel"
	}, {
		test: /\.json$/,
		loader: 'json'
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		loader: "file"
	},
	{
		test: /\.(woff|woff2)$/,
		loader: "url?prefix=font/&limit=5000"
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=application/octet-stream"
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		loader: "url?limit=10000&mimetype=image/svg+xml"
	},
	{
		test: /\.gif/,
		loader: "url-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg/,
		loader: "url-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	}
];
// global css
// loaders.push({
// 	test: /\.css$/,
// 	exclude: /[\/\\]src[\/\\]/,
// 	loaders: [
// 		'style?sourceMap',
// 		'css'
// 	]
// });
// // local scss modules
// loaders.push({
// 	test: /\.scss$/,
// 	exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
// 	loaders: [
// 		'style?sourceMap',
// 		'css',
// 		'sass'
// 	]
// });

// // local css modules
// loaders.push({
// 	test: /\.css$/,
// 	exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
// 	loaders: [
// 		'style?sourceMap',
// 		'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
// 	]
// });

module.exports = loaders;