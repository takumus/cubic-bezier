var path = require('path');
var WebpacModuleExports = require("./webpack-add-module-exports");
module.exports = {
    entry: {
        app :'./index.ts'
    },
    output: {
        filename: 'index.js',
        library: 'CubicBezier',
        libraryTarget: "umd"
    },
    resolve: {
        root:[path.join(__dirname,'node_modules')],
        extensions:['', '.ts', '.webpack.js', '.web.js', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new WebpacModuleExports()
    ]
}