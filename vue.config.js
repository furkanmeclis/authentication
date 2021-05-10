module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  transpileDependencies: [
    'quasar'
  ],

  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Blog Script By Furkan Meclis'
      return args
    })
  },

  pwa: {
    name: 'Furkan Meclis',
    themeColor: '#00C0FF'
  }
}
