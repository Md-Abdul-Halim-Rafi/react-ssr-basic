require('ignore-styles')
require("babel-polyfill");
require("babel-plugin-file-loader");

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ["file-loader"]
})

require('./server')