/*
 * @Author: Zhang Huan
 * @Date: 2022-01-14 11:30:10
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-03-05 21:20:23
 * @Description: file content
 * @FilePath: \screen-word-selection\src\API\index.js
 */
import axios from "@/utils/request";


export const getBabel=(pk)=>axios({ //获取标签
    url: `/api/match/label/${pk}/`,
})


export const getBabelHistory=(pk)=>axios({//获取标签记录
    url: `/api/match/label_log/${pk}/`,
})


export const getLogin=(data)=>axios({//登录
    url:`/api/login/`,
    method:"post",
    data
})

export const getReg=(data)=>axios({//注册
    url:`/api/auth/register/`,
    method:"post",
    data
})