/*
 * @Author: Zhang Huan
 * @Date: 2022-03-05 12:01:22
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-03-05 13:29:08
 * @Description: 获取和设置cookie
 * @FilePath: \screen-word-selection\src\utils\cookie.js
 */


/**
 * @param {String}  需要获取cookie的key
 * 
 */
export const getCookie =(key)=>{
  const cookie= document.cookie;
  const result=cookie.split("; ").find( item=> item.split("=")[0]===key);
  return  result?result.split("=")[1]:result;
}

/**
 * @param {Object} 需要设定cookie的键值对
 * 
 * 
 */
export const setCookie =(options)=>{
   const {time=0,...rest} =options;
   const date = new Date();
   date.setMinutes(date.getMinutes()+time)
   Object.keys(rest).forEach( item=>{
       document.cookie = `${item}=${rest[item]}; expires=${date.toGMTString()}`
   })
}