var path = require('path');
var WebpacModuleExports = require("./webpack-add-module-exports");
var DtsBundlerPlugin = require('dtsbundler-webpack-plugin');
module.exports = {
    entry: {
        app :'./src/index.ts'
    },
    output: {
        filename: './dest/index.js',
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
        new DtsBundlerPlugin({
            out:'./dest/index.d.ts',
        }),
        new WebpacModuleExports()
    ]
}