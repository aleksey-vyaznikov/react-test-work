var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {};
var args = require('args');
args.option('production', 'Enable production environment');
var options = args.parse(process.argv);
var isProd = options.production;
console.log('!!!', isProd);

// devtool
if (!isProd) config.devtool = 'eval';

// entry
var commonEntry = [
	'babel-polyfill',
	path.join(__dirname, 'src/index.js')
];

var additionalEntry = isProd ? [] : [
	'react-hot-loader/patch',
	'webpack-dev-server/client?http://localhost:3009',
	'webpack/hot/only-dev-server',
];

config.entry = [ ...additionalEntry, ...commonEntry ];

// output
config.output = {
	path: path.join(__dirname, 'src/www'),
	filename: 'main.js',
	publicPath: '/'
};


// plugins
var additionalPlugins = isProd ? [
	new CleanWebpackPlugin(['www/*'], {
		root: __dirname,
		verbose: true,
		dry: false
	}),
	new CopyWebpackPlugin([{
		from: __dirname + '/src/www'
	}], {
		copyUnmodified: true
	}),
	new webpack.optimize.UglifyJsPlugin(),
	new ExtractTextPlugin('style.css')
] : [
	new webpack.HotModuleReplacementPlugin()
];

config.plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
		}
	}),
	...additionalPlugins
];

// module
var cssLoader = 'css-loader!stylus-loader';

config.module = {
	loaders: [
		{
			test: /\.(?:js|jsx)$/,
			loaders: ['babel-loader'],
			include: path.join(__dirname, 'src')
		},
		{
			test: /.(css|styl)$/,
			loader: isProd ? ExtractTextPlugin.extract(cssLoader) : 'style-loader!'+cssLoader
		},
		{
			test: /\.json$/,
			use: 'json-loader'
		}
	]
};

// resolve
config.resolve = {
	extensions: ['.styl', '.js', '.jsx'],
	alias: {
		src: path.resolve(__dirname + '/src'),
		components: path.resolve(__dirname + '/src/components'),
		containers: path.resolve(__dirname + '/src/containers'),
		actions: path.resolve(__dirname + '/src/actions'),
		constants: path.resolve(__dirname + '/src/constants'),
		utils: path.resolve(__dirname + '/src/utils'),
		images: path.resolve(__dirname + '/src/www/images'),
		config: path.resolve(__dirname + '/src/config'),
	}
};

// export config
module.exports = config;