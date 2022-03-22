/*
 * @Author: Zhang Huan
 * @Date: 2022-03-05 14:03:24
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-03-06 21:34:09
 * @Description: file content
 * @FilePath: \screen-word-selection\src\utils\request.js
 */

import axios from "axios"; 
import {getCookie} from "@/utils/cookie";
import { message } from 'antd';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['Authorization']='JWT  '+getCookie("token");
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const {code} = response.data;
    if(code===401){
       message.warning("log in again");
       window.location.pathname="/login";
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios;