const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const program = require('commander')
const webpack = require('webpack')

require('colors')

program
    .version('0.0.1')
    .option('--env <env>', 'env')
    .parse(process.argv)

console.log('Start Building...'.yellow)

const __enviroment__ = program.env
const IS_DEV = __enviroment__ === 'dev'

// console.log(__enviroment__)
// console.log(IS_DEV)
// console.log(process.env.NODE_ENV)

function resolve (name) {
    return path.resolve(__dirname, name)
}

const __webpackConfig__ = {
    mode: 'production',
    devtool: false,
    entry: {
        app: './src/main.js'
    },
    output: {
        path: resolve('dist'),
        filename: IS_DEV ? 'js/[name].js' : 'js/[name].[contenthash:8].js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true,
        overlay: true,
        stats: 'errors-only',
        port: 8085
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: ['vue-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: IS_DEV
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: IS_DEV
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                // localIdentName: '[name]'
                                localIdentName: '[local]'
                                // localIdentName: '[name]_[local]_[hash:base64:5]'
                            }
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|appcache)(\?|$)/,
                loader: 'file-loader?name=font/[name]_[hash:8].[ext]'
            },
            {
                test: /\.(bmp|gif|jpeg|jpg|png)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name]_[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            favicon: './public/favicon.ico'
        }),
        new VueLoaderPlugin(),
        new ProgressBarPlugin({
            format: 'build [:bar] :percent (:elapsed seconds)',
            clear: false,
            width: 50,
            complete: '>'
        }),
        new MiniCssExtractPlugin({
            allChunks: true,
            filename: IS_DEV ? 'css/[name].css' : 'css/[name].[contenthash:8].css'
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(__enviroment__)
        })
    ]
}

if (IS_DEV) {
    __webpackConfig__.mode = 'development'
    __webpackConfig__.devtool = 'cheap-module-eval-source-map'
} else {}

module.exports = __webpackConfig__
