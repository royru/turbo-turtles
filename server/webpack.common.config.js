const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './public') // for zeit deployment
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // {
      //    test: [/.js$/],
      //    exclude: [/node_modules/, /data-input-card.js/],
      //    use: {
      //       loader: 'babel-loader',
      //       options: {
      //          presets: ['@babel/preset-env']
      //       }
      //    }
      // },
      {
        test: [/.css$|.scss$/],
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png | jpg | gif | svg)$ /,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'public/assets'
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __BASIC_PLAN_ID_STRIPE__: JSON.stringify(process.env.BASIC_PLAN_ID_STRIPE),
      __ORCHID_PLAN_ID_STRIPE__: JSON.stringify(process.env.ORCHID_PLAN_ID_STRIPE),
      __BASIC_PRICE_ID_STRIPE__: JSON.stringify(process.env.BASIC_PRICE_ID_STRIPE),
      __ORCHID_PRICE_ID_STRIPE__: JSON.stringify(process.env.ORCHID_PRICE_ID_STRIPE),
      __PK_STRIPE__: JSON.stringify(process.env.PK_STRIPE)
    }),
    new Dotenv(), // resolves .env environment variables from vercel during development
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        to: 'assets'
      }
    ])
  ],

  resolve: {
    extensions: ['.js', '.ts']
  }
}
