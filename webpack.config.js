// http://www.jbrantly.com/typescript-and-webpack/
// http://stackoverflow.com/questions/25956937/how-to-build-minified-and-uncompressed-bundle-with-webpack

var path = require('path'),
    pkg = require('./package.json'),
    webpack = require('webpack'),
    minimize = process.argv.indexOf('--no-minimize') === -1 ? true : false,
    plugins = [];


minimize && plugins.push(new webpack.optimize.UglifyJsPlugin());       


module.exports = {
  entry: {'kendo-settings-builder': './src/index.ts'},
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]' + (minimize ? '.min.' : '.') + 'js'
  },
  // Turn on sourcemaps
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  // Add minification
  plugins: plugins, // [ new webpack.optimize.UglifyJsPlugin() ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts' }
    ]
  }
}
