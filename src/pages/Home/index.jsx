import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading, Upload,Message } from "element-react";
import axios from "axios";
import "./index.css"
const Home = () => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleUploadBefore =(files )=>{
        if (!files) {
            return false
        }
        const fileName = files.name;
        const arr = fileName.split(".");
        const isUpload = arr[arr.length - 1] === "pdf" || arr[arr.length - 1] === "docx";
        if (!isUpload) {
            Message.error("Please upload PDF or DOCX file")
             return false
        }
        const isPDF = arr[arr.length - 1] === "pdf" ? true : false;
        setVisible(true);

        //创建fromdata数据 供后端解析
        const formData = new FormData();
        formData.append("file", files);
        axios({
            url: "/api/parser/",
            method: "post",
            data: formData,
        }).then(res => {
            if (res.data.code === 200) {
                // 生成二进制流
                const reader = new FileReader();
                reader.readAsDataURL(files);
                reader.onload = function () {
                    //二进制和字典数据放到仓库
                    dispatch({
                        type: "UPLOAD_FILE",
                        payload: {
                            file: this.result,
                            dictionaries: res.data.data,
                            isPDF,
                        },

                    })
                    localStorage.setItem("files", JSON.stringify(this.result))
                    setVisible(false);
                    window.localStorage.setItem("pdf", JSON.stringify(res.data.data))
                    navigate("/read", { state: { isPDF, mark: res.data.mark,keyword_count:res.data.keyword_count } })
                }

            }
            return false
        }).catch(res => {
            Message.error("Loading fail");
            setVisible(false);
            return false
        })
        return false
    }
    return <div className="home">

        {
            visible && <Loading fullscreen text="Loading await..." />
        }
        <Upload
            className="upload-demo"
            drag
            action="//jsonplaceholder.typicode.com/posts/"
            tip={<div className="el-upload__tip">Please upload PDF or DOCX file</div>}
            beforeUpload={handleUploadBefore}
            accept=".docx,.pdf"
        >
            <i className="el-icon-upload"></i>
            <div className="el-upload__text">Drag  or <em>Click</em></div>
        </Upload>




    </div>
}
export default Home