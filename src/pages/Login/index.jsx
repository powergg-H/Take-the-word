/*
 * @Author: Zhang Huan
 * @Date: 2022-03-03 16:37:04
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-03-06 23:32:43
 * @Description: file content
 * @FilePath: \screen-word-selection\src\pages\Login\index.jsx
 */
import { Form, Input, Button, message } from 'antd';
import "./index.css";
import { getLogin } from "@/API";
import { setCookie } from "@/utils/cookie.js"
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = (values) => {//登录
        getLogin(values).then(res => {
            const { code, msg, data } = res.data;
            if (code === 200) {
                setCookie({
                    token: data.token, //设置cookie
                })
               return  window.location.pathname = "/"
            }
            return message.error(msg)

        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleReg = () => { //跳转注册页
        navigate("/reg")
    }
    return <div className="login">
        <div className="login-box">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="/reg">register now!</a>
                </Form.Item>
            </Form>
        </div>

    </div>
}
export default Login