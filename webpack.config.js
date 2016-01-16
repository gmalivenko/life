var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './es6/app.js',
  output: {
    path: __dirname,
    filename: 'dist/bundle.js',
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: path.join(__dirname, 'es6'),
        query: {
          presets: 'es2015',
        },
      },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
  ],
  stats: {
    colors: true,
  },
};
