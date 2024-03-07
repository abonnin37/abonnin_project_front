require('dotenv').config();
const path = require('path');
const isDevelopment = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =  {
    // the output bundle won't be optimized for production but suitable for development
    mode: isDevelopment ? 'development' : 'production',
    // the app entry point is /src/index.js
    entry: path.resolve(__dirname, 'src', 'index.js'),
    module: {
        rules: [
            {
                // for any file with a suffix of js or jsx
                test: /\.jsx?$/,
                // ignore transpiling JavaScript from node_modules as it should be that state
                exclude: /node_modules/,
                // use the babel-loader for transpiling JavaScript to a suitable format
                loader: 'babel-loader',
            },
            { // Fix SourceMap Warning
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [
                    isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                compileType: "module",
                                mode: "local", // Possible values - local, global, and pure.
                                auto: true, // Allow .module personalization (ex : "auto: /\.custom-module\.\w+$/i,")
                                exportGlobals: true,
                                localIdentName: isDevelopment ? "[name]___[local]___[hash:base64:5]" : "[hash:base64]", // Allows to configure the generated local ident name.
                                localIdentHashPrefix: "abonnin", // Allows to add custom hash to generate more unique classes.
                                exportOnlyLocals: false,
                            },
                            sourceMap: isDevelopment,
                        },
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                },
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        // the output of the webpack build will be in /dist directory
        path: path.resolve(__dirname, 'dist'),
        // the filename of the JS bundle will be bundle.js
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        host: "0.0.0.0",
        hot: true,
        watchOptions: {
            poll: 1000,
            ignored: '**/node_modules/',
        },
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html", // to import index.html file inside index.js
          }),
        new MiniCssExtractPlugin(
            {
                filename: isDevelopment ? '[name].css' : '[name].[fullhash].css',
                chunkFilename: isDevelopment ? '[id].css' : '[id].[fullhash].css'
            },
        ),
    ]
};