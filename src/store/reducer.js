/*
 * @Author: Zhang Huan
 * @Date: 2021-12-18 12:10:10
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2021-12-28 16:24:27
 * @Description: file content
 * @FilePath: \app\src\store\reducer.js
 */
const initState = {
    files: JSON.parse(localStorage.getItem("files")) || null,//需要读取的文件
    pdfData:JSON.parse(localStorage.getItem("pdf")) || [] ,//解析的pdf数据
    isPDF:true,
}

const reducer=(state = initState, action) => {
    const { payload, type } = action;
    switch (type) {
        case "UPLOAD_FILE":
            state.files = payload.file;
            state.pdfData = payload.dictionaries;
            state.isPDF =payload.isPDF;
            return { ...state }
        case "SORT_DATA":
            const {key,type} = payload;
            if(key==="key"){
                state.pdfData.sort( (a,b)=>type==="ascending"?a[key].localeCompare(b[key]):b[key].localeCompare(a[key]));
            }else{
                state.pdfData.sort( (a,b)=>type==="ascending"?a[key]-b[key]:b[key]-a[key]);
            }
            return {
                ...state,
                pdfData:[...state.pdfData]
            }
        default:
            return state
    }
}
export default reducer