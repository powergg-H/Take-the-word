/*
 * @Author: Zhang Huan
 * @Date: 2022-03-03 16:37:04
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-03-06 23:32:54
 * @Description: file content
 * @FilePath: \screen-word-selection\src\pages\Reg\index.jsx
 */
import { Form, Input, Button, Checkbox, message } from 'antd';
import "./index.css";
import { getReg } from "@/API/index.js";
import { setCookie } from "@/utils/cookie.js"
const Reg = () => {
    const onFinish = (values) => {
        getReg(values).then(res => {
            const { code } = res.data;
            if (code === 200) {
                message.success("success");
                setCookie({
                    token: res.data.data.token, //设置cookie
                })
                window.location.pathname = "/"
            }
            return  message.error("error");
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <div className="reg">
        <div className="reg-box">
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="password2"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}
export default Reg