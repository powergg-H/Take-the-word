/*
 * @Author: Zhang Huan
 * @Date: 2022-01-14 11:30:10
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-01-14 11:35:13
 * @Description: file content
 * @FilePath: \screen-word-selection\src\API\index.js
 */
import axios from "axios";


export const getBabel=(pk)=>axios({ //获取标签
    url: `/api/label/${pk}/`,
})


export const getBabelHistory=(pk)=>axios({
    url: `/api/label_log/${pk}/`,
})