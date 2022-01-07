/*
 * @Author: Zhang Huan
 * @Date: 2021-12-20 12:56:37
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2021-12-29 10:50:47
 * @Description: 路由表
 * @FilePath: \app\src\routes\routes_config.js
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
