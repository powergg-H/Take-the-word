/*
 * @Author: Zhang Huan
 * @Date: 2021-12-20 12:56:37
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-03-03 16:35:55
 * @Description: 路由表
 * @FilePath: \screen-word-selection\src\routes\routes_config.js
 */
import Lazy from "@/components/LazyLoad"
const Home = Lazy(() => import("@/pages/Home"));
const Read = Lazy(() => import("@/pages/Read"));
const Login = Lazy(() => import("@/pages/Login"));
const Reg = Lazy(() => import("@/pages/Reg"));
const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "read",
        component: Read
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "reg",
        component: Reg
    },
]
export default routes;
