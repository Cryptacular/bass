const path = require('path');

module.exports = {
  entry: './src/bass.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          tsConfigFile: 'tsconfig.json'
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bass.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
