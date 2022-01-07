/*
 * @Author: Zhang Huan
 * @Date: 2021-12-20 11:49:29
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2021-12-29 11:38:08
 * @Description: file content
 * @FilePath: \app\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from "@/store";
import { Provider } from "react-redux";
import 'element-theme-default';
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
