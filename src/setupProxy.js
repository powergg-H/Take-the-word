/*
 * @Author: Zhang Huan
 * @Date: 2021-12-21 15:59:42
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2021-12-29 13:02:48
 * @Description: file content
 * @FilePath: \app\src\setupProxy.js
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    "target": "http://112.124.23.96:8001",
    changeOrigin: true,
  }
  ));
}