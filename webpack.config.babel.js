import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body',
})

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
}

// Determines what environment you're running.
//'process.env.npm_lifecycle_event' determines what command was ran in order to
// start webpack ("npm run dev" or "npm run production") that's present in 
// package.json for scripts. LAUNCH_COMMAND will be 'dev' or 'production'
const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProduction = LAUNCH_COMMAND === 'production'

// let .babelrc file know you're in production
process.env.BABEL_ENV = LAUNCH_COMMAND

// Tells React you're in production mode. React will optimize your build
// by excluding dev processes, like propType checks. Saves memory
const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

// Config for both dev and prod
const base = {
  entry: [
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'}
    ]
  },
  resolve: {
    // Allows you to grab import paths straight from root directory instead of
    // with ../. All imports start at /app
    root: path.resolve('./app')
  }
}

// Config for development
const devConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}

//Config for production
const prodConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, productionPlugin]
}

export default Object.assign(
  {}, base, isProduction === true ? prodConfig : devConfig)