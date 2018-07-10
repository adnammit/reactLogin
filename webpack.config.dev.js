var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, '/client/index.js'),
    ],
    output: {
        filename: 'bundle.js',
        path: '/',
        publicPath: '/'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loaders: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ '*', '.js' ]
    }
};
