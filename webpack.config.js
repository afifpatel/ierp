const webpack = require('webpack'); // The first line, where we require webpack, is needed because the plugin i.e.CommonsChunkPlugin is available as part of the webpack module.   

module.exports = {
    // entry: './src/App.jsx',
    entry: {                                                    //2 bundles --
        app: './src/App.jsx',                                   //for application 
        vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router', 'prop-types', 'react-bootstrap',
                 'react-router-bootstrap' ],         //for libraries
    },
    output: {
        path : __dirname+'/static',
        filename: 'app.bundle.js'
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })  
    ],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react' , 'es2015'],
                    plugins: ['transform-decorators-legacy','transform-object-rest-spread']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            },
            {       test: /\.css$/, 
                    loaders: ['style-loader', 'css-loader', 'sass-loader']
             },
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 8000,
        contentBase: 'static',
        proxy: {
            '/api/*' : {
                target: 'http://localhost:3000'
            }
        }
    },
    devtool : 'source-map'
};