const path = require("path")

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + "/build/js",
        filename: 'bundle.js'
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
