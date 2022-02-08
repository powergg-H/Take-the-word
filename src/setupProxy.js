/*
 * @Author: Zhang Huan
 * @Date: 2021-12-21 15:59:42
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-01-14 16:11:58
 * @Description: file content
 * @FilePath: \screen-word-selection\src\setupProxy.js
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  // app.use(createProxyMiddleware('/api', {
  //   "target": "http://192.168.0.104:8010",
  //   changeOrigin: true,
  //   pathRewrite: {
  //         '^/api': ''
  //       }
  // },
  app.use(createProxyMiddleware('/api', {
    "target": "http://112.124.23.96:8001",
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
  ));
}