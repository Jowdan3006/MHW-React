const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
      filename: 'main.js',
      filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      }
    ]
  }
};