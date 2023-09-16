/**
 * @desc this file sets up the basic configuration for the game development
 * environment for the webpack 
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: "./src/scripts/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(mp3|wav)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'sounds/[name].[ext]',
                        },
                    },
                ],
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, "../")
        }),
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true)
        }),
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ]
};