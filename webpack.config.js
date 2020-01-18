const path = require("path")

module.exports = {
    entry: {
        popup: './src/app.js',
        upload_panel: './src/upload_panel.js',
        background: './src/background.js',
        settings_options: './src/settings/options.js',
        settings_image_manage: './src/settings/image_manage.js',
        content: './src/content.js',
        token: './src/token.js'
    },
    output: {
        path: __dirname + "/build/js",
        filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    module: {
    rules: [{
      exclude: ['/node_modules/', '/node_modules/idb-file-storage'],
      test: /\.js$/,
      use: [
        // This transpiles all code (except for third party modules) using Babel.
        {
          // Babel options are in .babelrc
          loader: 'babel-loader',
        },
      ]
    }]
  }
}
