var path = require('path');
var testHelperPath = path.resolve('test/loadtests.js')

module.exports = function(config) {
  config.set({
    // use the PhantomJS browser
    browsers: ['PhantomJS'],
    // use mocha and chai
    frameworks: ['mocha', 'chai'],
    reporters: [ 'mocha', 'coverage' ],

    // files that Karma will server to the browser
    files: [
      // entry file for Webpack
      testHelperPath
    ],

    // before serving test/loadtests.js to the browser
    preprocessors: {
      [testHelperPath]: [
        // use karma-webpack to preprocess the file via webpack
        'webpack',
        // use karma-sourcemap-loader to utilize sourcemaps generated by webpack
        'sourcemap'
      ]     
    },

    // webpack configuration used by karma-webpack
    webpack: {
      // generate sourcemaps
      devtool: 'inline-source-map',
      // enzyme-specific setup
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
          },
          {
            exclude: [
              /\.(js|jsx)$/,
              /\.css$/,
              /\.json$/,
            ],
            loader: 'file-loader',
            query: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          },
          {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json-loader'
          }
        ]
      },
      // relative path starts out at the src folder when importing modules
      resolve: {
        modules: [__dirname, 'node_modules']
      }
    },

    webpackMiddleware: {
      // only output webpack error messages
      stats: 'errors-only'
    },
    
    coverageReporter: {
      dir: '../coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' }
      ]
    }
  })
}