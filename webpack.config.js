const path = require('path');

module.exports = {
    // the output bundle won't be optimized for production but suitable for development
    mode: 'development',
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
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
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
    resolve: { extensions: ["*", ".js", ".jsx", ".scss", ".svg"] },
    output: {
        // the output of the webpack build will be in /dist directory
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        // the filename of the JS bundle will be bundle.js
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
    }
};