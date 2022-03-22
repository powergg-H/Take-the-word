/*
 * @Author: Zhang Huan
 * @Date: 2022-03-06 23:16:45
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-03-06 23:49:16
 * @Description: file content
 * @FilePath: \screen-word-selection\src\components\Header.jsx
 */

import React, { useState } from 'react';
import { Affix, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {setCookie} from "@/utils/cookie.js";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;
const Header = () => {
    const [top, setTop] = useState(1);
    const navigate = useNavigate();
    const handleLogOut = () => { //退出登录
        confirm({
            title: 'Do you Want to  log out?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                setCookie({
                    token:"",
                    time:0,
                })
                return navigate("/login")
                
            },
            onCancel() {
                return false
            },
        });
    }
    return <div className="header">
        <Affix offsetTop={top}>
            <Button type="primary" onClick={handleLogOut}>
                logout
            </Button>
        </Affix>

    </div>
}

export default Header
