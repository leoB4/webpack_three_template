const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[fullhash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      '@fonts': path.resolve(__dirname, '../src/fonts/'),
      '@scss': path.resolve(__dirname, '../src/scss/'),
      '@models': path.resolve(__dirname, '../src/models/'),
      '@shaders': path.resolve(__dirname, '../src/shaders/'),
      '@sounds': path.resolve(__dirname, '../src/sounds/'),
      '@textures': path.resolve(__dirname, '../src/textures/'),
      '@js': path.resolve(__dirname, '../src/js/'),
      '@tools': path.resolve(__dirname, '../src/js/tools/'),
      '@world': path.resolve(__dirname, '../src/js/World/'),
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
          from: 'static',
          to: ''
        },
        {
          from: '*.json',
          to: 'assets/fonts',
          context: "src/fonts",
          noErrorOnMissing: true
        },
        {
          from: 'node_modules/three/examples/js/libs/draco/',
          to: './draco'
        }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Three Template',
      favicon: path.resolve(__dirname, '../static/favicon.ico'),
      template: path.resolve(__dirname, '../src/index.html'),
      minify: true,
    }),
  ],
  module: {
    rules: [{
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/images/'
          },
        }, ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/fonts/'
          },
        }, ],
      },
      {
        test: /\.(html)$/,
        use: [{
          loader: 'html-loader',
          options: {
            sources: false
          }
        }],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(fbx|glb|obj|3ds|gltf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/models/'
          },
        }, ],
      },
      {
        test: /\.(bin)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/models/'
          },
        }, ],
      },
      {
        test: /\.(mp3|wav)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/audios/'
          }
        }, ]
      },
      {
        test: /\.(mp4|webm)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'assets/videos/'
          }
        }, ]
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify-loader'
        ]
      },
      {
        test: /\.(md)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
        ]
      },
    ],
  },
}