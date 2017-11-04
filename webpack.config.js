const path = require("path")

module.exports = {
    entry: {
        popup: './src/app.js',
        upload_panel: './src/upload_panel.js',
        background: './src/background.js'
    },
    output: {
        path: __dirname + "/build/js",
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',

    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['babel-preset-es2015']
                }
            }
        ]
    }
};
