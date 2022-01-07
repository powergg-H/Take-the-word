/*
 * @Author: Zhang Huan
 * @Date: 2021-12-18 12:08:57
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2021-12-18 12:12:08
 * @Description: file content
 * @FilePath: \apps\src\store\index.js
 */

import  {createStore} from "redux";
import reducer from "./reducer";

const store = createStore(reducer);
export default store;
