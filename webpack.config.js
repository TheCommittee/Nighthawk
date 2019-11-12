const path = require('path');

module.exports = {
 mode: 'development',
 entry: './src/index.js',
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, './build/')
 },
 devServer: {
   publicPath: '/build',
   compress: true,
   port: 8080,
   proxy: {
     '/': 'http://localhost:3000'
   }
 },
 module: {
   rules: [
     {
       test: /\.jsx?/,
       exclude: /node_modules/,
       use: {
         loader: 'babel-loader',
         options: {
           presets: ['@babel/preset-env', '@babel/preset-react']
         }
       }
     },
     {
       test: /\.css$/,
       use: [
         {
           loader: "style-loader" // creates style nodes from JS strings
         },
         {
           loader: "css-loader" // translates CSS into CommonJS
         }
       ]
     },
   ]
 }
}