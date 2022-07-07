const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 123打包之后去除map文件，打包npm run build
  productionSourceMap: false,
  transpileDependencies: true,
  // 代码检查
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        // 目标地址
        target: 'http://gmall-h5-api.atguigu.cn',
        // 重写请求地址
        // pathRewrite: {
        //   '^api': ''
        // },
        ws: true,//用于支持websocket
        changeOrigin: true//发送请求头host会被设置target
      }
    }
  },

})
