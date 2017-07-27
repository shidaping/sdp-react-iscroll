var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var AssetsWebpackPlugin = require('assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeModulesDir = path.join(__dirname, 'node_modules');
var webackConfig = {
  entry: {
    example: ['./src/modules/example/index.js'],
  },
  output: {
    path: './assets',
    filename: '[name].js',
    publicPath: '/',
      // chunkFilename: "[id].js"
  },

  // externals: {
  // require('jquery') is external and available
  //  on the global var jQuery
  //   'jquery': 'jQuery'
  // },
  resolve: {
    alias: {

    },
    modulesDirectories: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'src'),
    ],
    // root: [
    //   path.resolve('./src')
    // ],
    extensions: ['', '.js', '.jsx', '.less'],
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin(
      '[name].css', { allChunks: true }
    ),
  ],
  module: {
    noParse: ['./src/noparse/*'],
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /(node_modules)/,
      // }, {
      //   test: /\.less$/,
      //  css?-autoprefixer!postcss!less
      //   loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss!less')
      // }, {
      //   test: /\.css$/,
      //   loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!less'),
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
    }, {
      test: /\.jpg|\.png$/,
      loader: 'file-loader',
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff',
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    }],

  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
    historyApiFallback: {
      index: '/index.html',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
// if (env === 'production') {
webackConfig.plugins.push(new webpack.DefinePlugin({
  ENV: 'devepoment',
}));

webackConfig.plugins.push(new HtmlWebpackPlugin({
  template: path.join(__dirname, 'src/views/index.html'),
  chunks: ['example'],
  minify: {
    collapseWhitespace: true,
  },
}));
module.exports = webackConfig;
