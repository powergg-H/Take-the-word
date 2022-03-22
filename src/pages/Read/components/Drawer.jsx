import React, { useEffect, useRef, useMemo, memo, useState } from 'react';
import { Drawer } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import axios from "@/utils/request";
import { Message, Tree, Button, Collapse, Input } from "element-react";
const formatKey = {
    key: "key",    //树形控件的key值
    formatKey: "is_select",//需要根据什么字段进行格式化
}
const Drawers = memo((props) => {
    const { visible, onClose, data, dataLog, loading } = props;
    const [activeName, setActiveName] = useState("");//标签历史当前展开项
    const [note,setNote] =useState("");//笔记value
    const { pk, } = useSelector((state) => state.pdfData);
    const sdg_count = useSelector((state) => state.sdg_count)
    const dispatch = useDispatch();
    const treeRef = useRef(null);
    useEffect(() => {
        //  console.log(formatData(data),"formatData(data)")
        treeRef.current.setCheckedKeys(formatData(data))
    }, [])
    const handleSetChecked = (data1, checked) => {
        data1.is_select = checked
    }
    const handleSubmit = () => { //提交按钮
        axios({
            url: `/api/match/label/${pk}/`,
            data: {
                result: data,
                note
            },
            method: "post"
        }).then(res => {
            const { code, msg } = res.data;
            Message({
                message: msg,
                type: code === 200 ? 'success' : 'error',
                customClass: "msg"
            })
            onClose()
        })
    }

    const handleNoChecked = (data, node) => {
        //标签历史中的复选框不允许改变状态
        node.props.nodeModel.checked = data.is_select;
    }
    const handleHistory = (activeName) => { //激活标签历史
        setActiveName(activeName[0])
    }
    const handleSetNote =(value)=>{
          setNote(value);
    }
    const renderLogHistory = useMemo(() => {
        return <Collapse accordion onChange={handleHistory} value={activeName}>
            {
                dataLog.map((item, index) => (
                    <Collapse.Item
                        title={
                            <span style={{ padding: '0 10%' }}>
                                <span style={{ marginRight: '10%' }}>{item.username}</span>
                                <span style={{ marginRight: '10%' }}>{item.create_datetime}</span>
                                <span >{item.note}</span>
                            </span>
                        }
                        name={String(index)}
                        key={index}>
                        {
                            activeName === String(index) && <Tree
                                data={item.result}
                                options={{
                                    children: 'children',
                                    label: 'name',
                                }}
                                isShowCheckbox={true}
                                nodeKey={formatKey.key}
                                defaultExpandAll={false}
                                expandOnClickNode={false}
                                isShowCheckbox={true}
                                accordion={true}
                                onCurrentChange={handleNoChecked}
                                defaultCheckedKeys={formatData(item.result)}
                                style={{ height: '30vh', overflowY: 'scroll' }}
                            />
                        }
                    </Collapse.Item>
                ))
            }


        </Collapse>
    }, [dataLog.length, activeName])

    return <Drawer
        title={<div>SDG count:   <span>keywords appear <span style={{ color: "red" }}>{sdg_count}</span> times</span> </div>}
        placement="left"
        onClose={onClose}
        visible={visible}
        width="50%"
    >
        <div className="box">

            <div className="box-top">
                <Tree
                    data={data}
                    options={{
                        children: 'children',
                        label: 'name',
                    }}
                    isShowCheckbox={true}
                    nodeKey={formatKey.key}
                    defaultExpandAll={false}
                    expandOnClickNode={false}
                    onCheckChange={handleSetChecked}
                    isShowCheckbox={true}
                    ref={treeRef}
                    accordion={true}
                    defaultCheckedKeys={formatData(data)}
                    style={{ height: '30vh', overflowY: 'scroll' }}
                />



                <div style={{ marginTop: '5%' }}>
                    <Input
                        type="textarea"
                        autosize={{ minRows: 1, maxRows: 1 }}
                        placeholder="note"
                        onChange={handleSetNote}
                        value={note}
                    />
                    <Button onClick={handleSubmit} type="primary" >Submit</Button>
                </div>



            </div>
            <div className="history">
                <h3>history</h3>
                {/* 历史记录 */}

                {renderLogHistory}


            </div>

        </div>
    </Drawer>
})




/**
    * 格式化数据
    * 将后台数据格式化，生成默认选中的数组
    * 
    */
function formatData(dataList) {
    let arr = [];
    dataList.forEach(item => {
        if (item[formatKey.formatKey]) {
            arr.push(item[formatKey.key])
        } else {
            if (item.children) {
                arr = arr.concat(formatData(item.children))
            }
        }

    })
    return arr

}
export default Drawers