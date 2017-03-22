var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: "./build/",
        filename: "app.js"
    },
    module: {
        loaders: [
            {
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loaders: ['ts-loader']
			},
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
			include: [],
			exclude: 'vendor',
			filename: '[file].map',
			moduleFilenameTemplate: '[absoluteResourcePath]',
			columns: true
		}),
        new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html'
		})
    ],
    resolve: {
		extensions: ['.js', '.ts', '.tsx']
    },
    devtool: 'source-map'
};