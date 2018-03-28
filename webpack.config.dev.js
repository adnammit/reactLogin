var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        filename: 'bundle.js',
        path: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: [ '*', '.js' ]
    }
};
