/*
 * @Author: Zhang Huan
 * @Date: 2021-12-20 12:47:58
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-03-05 15:21:11
 * @Description: 路由组件
 * @FilePath: \screen-word-selection\src\routes\index.js
 */

import React, { Fragment } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { getCookie } from "@/utils/cookie";

const beforeEnter = (item) => { //路由拦截
    const token = getCookie("token");
    if (item.path === "login" || item.path === "reg") {
        return <item.component routes={item.children ? item.children : []}>
            {
                item.children ? <RouteView routes={item.children} /> : null
            }
        </item.component>
    }
    if (!token) {
        return <Navigate to="/login" />
    }
    return <item.component routes={item.children ? item.children : []}>
        {
            item.children ? <RouteView routes={item.children} /> : null
        }
    </item.component>
}


const RouteView = ({ routes }) => {
    const result = routes.find(item => item.to);
    return (<Fragment>
        <Routes>
            {
                routes && routes.map((item, index) => item.path ? <Route
                    key={index}
                    path={item.path}
                    element={beforeEnter(item)}
                ></Route> : null)
            }
        </Routes>
        {
            result ? <Navigate {...result} /> : null
        }

    </Fragment>)
}

export default RouteView