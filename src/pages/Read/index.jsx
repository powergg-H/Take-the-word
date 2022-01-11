import React, { useState, useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Lazy from "@/components/LazyLoad"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import "./index.css";
import { targetList } from "./config";
import Tip from "./components/Tip";
import { Table, Button, Form, Card, Message, Dropdown, Upload,Loading } from "element-react";
import { Resizable } from "re-resizable";
const FileViewer = Lazy(() => import("react-file-viewer"));
const Read = () => {
    const [count, setCount] = useState(0); //要展示的查找结果第几个结果
    const [showCount, setShowCount] = useState(false); //是否展示count
    const [algin, setAlign] = useState(""); //检测是否再次点击了同一行
    const [allPageSum, setAllPageSum] = useState(1); //总页
    const [pos, setPos] = useState({ left: 0, top: 0 }); //tip位置
    const [tipShow, setTipShow] = useState(false); //tip状态开关
    const [content, setContent] = useState("");// 页面选取的文字内容
    const [activeIndex, setActiveIndex] = useState(-1); // 高亮索引
    const [textDoms, setTextDom] = useState(null); //页面所有文本
    const [loading, setLoading] = useState(false); //加载中
    const dispatch = useDispatch();
    //获取上传的文件
    const files = useSelector((state) => state.files);
    const isPDF = useSelector((state) => state.isPDF);
    const { keyword_count, mark, data: pdfData } = useSelector((state) => state.pdfData);
    const columns = useMemo(() => {
        return [
            {
                type: 'expand',
                expandPannel: function (row) {
                    const { values } = row;
                    return (
                        <Form labelPosition="left" inline={true} className="demo-table-expand">

                            {
                                values.map((item, i) => <Form.Item key={i}><Button onClick={() => { handdleTarget(item) }}>{item}</Button></Form.Item>)
                            }

                        </Form>
                    )
                }
            },
            {
                label: "keyword",
                prop: "key",
                sortable: 'custom',
            },

            {
                label: "count",
                prop: "count",
                width: 150,
                sortable: 'custom',
                render(row,a,index){
                    return <div >
                        <span>{row.count}</span>
                        {
                            count>=0 && index===activeIndex &&showCount?<span style={{float:"right",color:"red",fontSize:"0.5vw"}}>now {count}</span>:null
                        }
                    </div>
                }
            }
        ]
    }, [pdfData,activeIndex,count,showCount])



    const posWord = (content, data) => { //定位文字
        const index = data.findIndex((item) => item.key.includes(content.trim()));
        if (index) {
            setActiveIndex(index)
        }
    }
    const handleClickSelect = (e) => { //选择文字
        const { clientX, clientY } = e;
        const getSelection = window.getSelection || document.getSelection;
        const text = getSelection().toString(); //获取被选中的文字内容
        setShowCount(false)
        if (tipShow) { //如果tip弹窗开启着
            getSelection().empty();
            setContent("");
            setTipShow(false);
            return
        }
        if (text) { //文字被选中
            setPos({ left: clientX - 20, top: clientY - 50 });
            setContent(text);
            setTipShow(true);
            posWord(text, pdfData)
            return
        }
        
    }
    const handleDocumentLoadSuccess = ({ numPages }) => { //文件加载成功
        setAllPageSum(numPages) //更新总页数
    }
    const renderPage = useMemo(() => { //渲染pdf页面
        const arr = [...new Array(allPageSum)].map((item, index) => {
            return <Page pageNumber={index + 1} key={index}></Page>
        })
        return arr;
    }, [allPageSum])
    const handleSortChange = ({ _, prop, order }) => { //排序
        dispatch({
            type: "SORT_DATA",
            payload: {
                key: prop,
                type: order,
            }
        })
        setActiveIndex(-1)
    }

    const handleGetTextNode = useCallback((dom) => { //获取元素中所有文本节点
        let arr = [];
        dom.forEach(item => {
            if (item.nodeType === 3) {
                arr.push(item)
            } else {
                const newArr = handleGetTextNode(item.childNodes.length ? [...item.childNodes] : [])
                arr = [...newArr, ...arr]
            }

        })
        return arr;
    }, [])

    const handleExport = (value) => {
        axios({
            url: "/api/export/",
            params: {
                mark,
                file_type: value
            },
            responseType: "blob"
        }).then(res => {
            const { status, data, msg, headers } = res;
            if (status === 200) {
                const str = headers['content-disposition'];
                let fileName = str.split("filename=")[1];
                const a = document.createElement("a");
                const url = window.URL.createObjectURL(data);
                a.href = url;
                if (fileName.indexOf(".csv") !== -1) {
                    fileName = fileName.split(".csv")[0] + ".csv"
                }
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url)
                return
            }
            Message.error(msg)
        })
    }
    const handleCellClcik = (currentRow, column) => { //点击单元格
        const { prop } = column;
        if (prop === "key" || prop === "count") { //判断点击的是否为 key或count一列单元格
            const isAlgin = currentRow.key === algin; //首先判断 用户是否在重复点击同一行
            const index = pdfData.findIndex(item => {
                return item.key === currentRow.key
            });
            let doms = textDoms;
            let scrollDom;
            if (isPDF) { //读取的是pdf
                doms = [...document.querySelectorAll(".react-pdf__Page__textContent span")];
                scrollDom = document.querySelector(".react-pdf__Document");
            }
            if (!isPDF) {
                const alldoms = [...document.querySelectorAll("#docx .document-container p")];
                if (!textDoms) {
                    doms = handleGetTextNode(alldoms);
                    setTextDom(doms)
                }
                scrollDom = document.querySelector(".pg-viewer-wrapper");
            }
            const reg = new RegExp(currentRow.key, "gi");
            scrollDom.scrollTo(0, 0);  // 现将滚动条回复初始状态，否则接下来的高度获取的会出现偏差
            //在所有文本里将符合条件的过滤出来
            const result = doms.filter(item => item.textContent.search(reg) !== -1);
            if (!result.length) {
                return
            }
            /**
             * 先判断 是否为重复点击同一个keyword ，是还要分两种情况：1. count是否已经为当前单词的最大次数  2.还未到达
             * 否则重置为0
             * 
             */
            let newCount =  isAlgin? count<result.length?count:0:0;
            /**
             * 用户读取的pdf 或者docx文件， 它们操作的dom是不一样的，所有需要先判断
             */
            const { top } = isPDF ? result[newCount].getBoundingClientRect() : result[newCount].parentElement.getBoundingClientRect();
            const screenH = document.body.clientHeight || document.documentElement.clientHeight;
            const textNodes = isPDF ? result[newCount].childNodes[0] : result[newCount];
            /**
             * 创建range对象，此对象结合 section 可以实现文字选中效果
             */
            let range = document.createRange();
            let startIndex = 0;
            if (textNodes.textContent.search(reg) !== -1) {
                startIndex = textNodes.textContent.search(reg)
            }
            const endIndex = startIndex + currentRow.key.trim().length;
            //设置文字起点和终点
            range.setStart(textNodes, startIndex);
            range.setEnd(textNodes, endIndex);
            const section = window.getSelection || document.getSelection;
            //实现文字选中效果前，先清空一下section ，保证选中效果
            section().empty();
            section().addRange(range);
            range = null;
            scrollDom.scrollTo(0, top - screenH / 2);
            setTipShow(true);
            setContent("");
            setAlign(currentRow.key);
            setCount(newCount + 1)
            setActiveIndex(index);
            setShowCount(true)
        }
    }

    const handdleTarget = (value) => { //跳转外部链接
        const text = value.trim();
        if (!text.length) {
            return
        }
        const result = text.indexOf(".");
        if (result === -1) {
            return
        }
        const index = Number(text.split(".")[0]);

        if (!index || index - 1 > targetList.length) {
            return
        }

        window.open(targetList[index - 1])
    }

    const handleUploadBefore = (files) => {  //上传文件
        if (!files) {
            return false
        }
        const fileName = files.name;
        const arr = fileName.split(".");
        const fileEndName = arr[arr.length - 1];
        const isUpload = fileEndName === "pdf" || fileEndName === "docx";
        if (!isUpload) {
            Message.error("Please upload PDF or DOCX file")
            return false
        }
        const isPDF = fileEndName === "pdf" ? true : false;
        //创建fromdata数据 供后端解析
        const formData = new FormData();
        formData.append("file", files);
        setLoading(true)
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
                            dictionaries: res.data,
                            isPDF,
                        },
                    })
                    setLoading(false)
                }

            }
            return false
        }).catch(res => {
            Message.error("Loading fail");
            return false
        })
        return false
    }
    return <div className="read">
        <Resizable
            defaultSize={{
                width: "70%",
                height: "100%"
            }}
        >
             <Loading  text="Loading await..."  loading={loading}>
            <div className="pdf-box" onClick={handleClickSelect}>
           
                {isPDF && <Document
                    file={files}
                    onLoadSuccess={handleDocumentLoadSuccess}
                    renderMode="svg"
                >
                    {
                        renderPage
                    }

                </Document>}
                {
                    !isPDF && <FileViewer
                        fileType="docx"
                        filePath={files}
                    ></FileViewer>
                }
                <Tip position={pos} content={content} visible={tipShow}></Tip>
            
            </div>
            </Loading>
        </Resizable>
        <div className="right">

            <Card style={{ height: '100%' }}>
                <div className="table-title">
                    <div className="title-left">
                        keyword_count
                        <span>{keyword_count}</span>
                    </div>


                    <div className="upload_download">
                        <Upload
                            className="upload-demo"
                            action="//jsonplaceholder.typicode.com/posts/"
                            beforeUpload={handleUploadBefore}
                            accept=".docx,.pdf"
                            showFileList={false}
                        >
                            <a className="el-icon-upload2" onClick={(e) => { e.preventDefault() }}></a>
                        </Upload>
                        <Dropdown trigger="click" onCommand={handleExport} menu={(
                            <Dropdown.Menu>
                                <Dropdown.Item command="excel">excel</Dropdown.Item>
                                <Dropdown.Item command="csv">csv</Dropdown.Item>
                            </Dropdown.Menu>
                        )}>
                            <a className="el-icon-caret-bottom" title="export" onClick={(e) => { e.preventDefault() }}> </a>
                        </Dropdown>
                    </div>

                </div>
                <Table
                    style={{ width: '100%' }}
                    columns={columns}
                    data={pdfData}
                    border={true}
                    height="95vh"
                    highlightCurrentRow
                    currentRowKey={activeIndex}
                    onSortChange={handleSortChange}
                    onCellClick={handleCellClcik}
                />
            </Card>


        </div>
    </div>
}

export default Read;