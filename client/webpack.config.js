const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/build/static'),
        filename: 'js/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: './media/images/[name].[ext]',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true,
            favicon: "./public/favicon.ico"
        }),
        new MiniCssExtractPlugin({
            filename: 'css/styles.css'
        })
    ],
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:5000"
            }
        },
        port: 3000,
        hot: true,
        open: true,
        writeToDisk: true
    }
}