const path = require('path')
const config = require('./src/config')
const cp = require('child_process')

let isClean = false
let commit = ''

try {
  isClean = !String(cp.execSync('git status -s')).trim()
  commit = String(cp.execSync('git log -1 --format="%H"')).trim()

  console.log('Work tree is clean: ', isClean)
  console.log('commit: ', commit)
} catch (err) {
  console.log('Warning: ' + err.message)
}

const publicPath = './'

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  publicPath: publicPath,
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  },

  css: {
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        modules: {
          // https://github.com/webpack-contrib/css-loader#localidentname
          // https://github.com/webpack/loader-utils#interpolatename
          localIdentName:
            process.env.NODE_ENV == 'production'
              ? '[sha256:hash:base64:8]'
              : '[name]_[local]_[hash:base64:5]'
        }
      },

      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "${path.resolve(
              __dirname,
              './src/asset/styles/variables.less'
            )}";`
          }
        }
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/asset/styles/variables.less')]
    }
  },

  chainWebpack: conf => {
    // conf.plugins.delete('prefetch')
    conf.plugin('html').tap(args => {
      args[0].title = config.title
      args[0].commit = commit
      args[0].isClean = isClean
      return args
    })

    conf.resolve.alias.set('@root', __dirname)
  }
}
