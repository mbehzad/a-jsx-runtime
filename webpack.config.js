const path = require("path");

module.exports = {
  entry: {
    examples: ['./examples/example.tsx'],
  },
  output: {
    filename: '[name].js',
  },
  devtool: 'inline-source-map',//'none',
  module: {
    rules: [
      {
        // JS / Babel Loader
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    "targets": {
                      "chrome": "84",
                    }
                  }
                ],
                '@babel/preset-typescript',
              ],
              plugins: [
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-proposal-numeric-separator',
              ]
            }
          },
        ],
      },
      {
        // JS / Babel Loader
        test: /\.tsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    "targets": {
                      "chrome": "84",
                    }
                  }
                ],
                '@babel/preset-typescript',
              ],
              plugins: [
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                [
                  "@babel/plugin-transform-react-jsx",
                  {
                    "runtime": "automatic", // add the import etc automatic.
                    "importSource": path.resolve(__dirname, './jsx'), // use jsx functions from the given folder
                  }
                ],
              ]
            }
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [

  ],
  devServer: {
    contentBase: path.join(__dirname, './examples'),
    compress: true,
    //publicPath
    hot: true,
    quiet: false,
    port: 9000,
    host: "0.0.0.0",
    disableHostCheck: true,
    open: false,
    // turn on if you have lot of changes in static assets and want a reload after each change
    watchContentBase: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  },
};