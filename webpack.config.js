const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const deps = require('./package.json').dependencies;
const federationConfig = require('./federation.config.json');
module.exports = {
  output: {},

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },

  devServer: {
    port: 2000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 
          'postcss-loader'
      ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  plugins: [
    
    new ModuleFederationPlugin({
      ...federationConfig,
      filename: 'remoteEntry.js',
      remotes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
