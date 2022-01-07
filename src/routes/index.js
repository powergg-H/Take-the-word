/*
 * @Author: Zhang Huan
 * @Date: 2021-12-20 12:47:58
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2021-12-21 10:56:38
 * @Description: 路由组件
 * @FilePath: \app\src\routes\index.js
 */

import React, { Fragment } from 'react'
import { Routes, Route ,Navigate} from "react-router-dom";
const RouteView = ({ routes }) => {
    const result = routes.find(item => item.to);
    return (<Fragment>
        <Routes>
            {
                routes && routes.map((item, index) => item.path ? <Route
                    key={index}
                    path={item.path}
                    element={<item.component routes={item.children ? item.children : []}>
                        {
                            item.children ? <RouteView routes={item.children} /> : null
                        }
                    </item.component>}
                ></Route> : null)
            }
        </Routes>
        {
            result ? <Navigate {...result} /> : null
        }

    </Fragment>)
}

export default RouteView