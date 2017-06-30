var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
	contentBase: config.output.path,
	hot: true,
	historyApiFallback: true,
	headers: {
		'Access-Control-Allow-Origin': '*'
	},
	stats: { colors: true },
	inline: true
}).listen(3009, 'localhost', function (err, result) {
	if (err) {
		return console.log(err);
	}
	console.log('Listening at http://localhost:3009/');
})