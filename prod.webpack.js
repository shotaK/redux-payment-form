const _ = require('lodash');
const config = module.exports = require('./dev.webpack.js');
const path = require('path');

config.entry = './src/components/App.js';

config.output = _.merge(config.output, {
  path: path.resolve('lib'),
  filename: 'redux-payment-form.js',
  libraryTarget: 'umd',
  library: 'ReduxPaymentForm'
});

config.resolve = {
  symlinks: false,
  extensions: ['.js', '.jsx'],
};

config.externals = {
  "react": {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
  },
  'redux': {
    root: 'Redux',
    commonjs2: 'redux',
    commonjs: 'redux',
    amd: 'redux'
  },
  'react-redux': {
    commonjs2: 'react-redux',
    commonjs: 'react-redux',
    amd: 'react-redux'
  },
  'redux-form': {
    commonjs2: 'redux-form',
    commonjs: 'redux-form',
    amd: 'redux-form'
  },
};

config.module.rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  },
];

