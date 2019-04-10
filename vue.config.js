const path = require('path')
var PrerenderSpaPlugin = require('prerender-spa-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: "/",
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,

  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets',resolve('src/assets'))
      .set('Components',resolve('src/components'))
  },
  configureWebpack: {
    module: {},
    plugins: process.env.NODE_ENV === 'production' ? [
      new PrerenderSpaPlugin(
        // 编译后的html需要存放的路径
        path.join(__dirname, '../dist'),
        // 列出哪些路由需要预渲染
        [ '/']
      )
    ] : []
  },

  devServer: {
    open: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
          target: 'http://120.27.232.146:8081',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': '/api'
          }
      }
    }
  },

  css: {
    sourceMap: true
  },

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
