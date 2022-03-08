const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfiguration = require('./webpack.common.js')

module.exports = webpackMerge.merge(
  commonConfiguration, {
    mode: 'production',
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin()
    ],
    module: {
      rules: [{
          test: /\.styl$/,
          use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './',
              },
            },
            'css-loader',
            'stylus-loader'
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ]
    }
  }
)