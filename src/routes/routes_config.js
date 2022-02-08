/*
 * @Author: Zhang Huan
 * @Date: 2021-12-20 12:56:37
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-01-13 11:11:38
 * @Description: 路由表
 * @FilePath: \screen-word-selection\src\routes\routes_config.js
 */
import Lazy from "@/components/LazyLoad"
const Home = Lazy(() => import("@/pages/Home"));
const Read = Lazy(() => import("@/pages/Read"));
const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "read",
        component: Read
    },
]
export default routes;
