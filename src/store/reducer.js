/*
 * @Author: Zhang Huan
 * @Date: 2021-12-18 12:10:10
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-03-06 13:35:07
 * @Description: file content
 * @FilePath: \screen-word-selection\src\store\reducer.js
 */
const initState = JSON.parse(localStorage.getItem("pdfStore")) ||
{
    files: null,
    pdfData: {
        keyword_count: 0,
        mark: 0,
        data: []
    },
    isPDF: true,
    historyData:[],
    historyDataLog:[],
    sdg_count:0,
}


window.addEventListener("beforeunload", () => {
    localStorage.setItem("pdfStore", JSON.stringify(initState));
})
const reducer = (state = initState, action) => {
    const { payload, type } = action;
    switch (type) {
        case "UPLOAD_FILE":
            state.files = payload.file;
            state.pdfData = payload.dictionaries;
            state.isPDF = payload.isPDF;
            return { ...state }
        case "SORT_DATA":
            const { key, type } = payload;
            if (key === "key") {
                state.pdfData.sort((a, b) => type === "ascending" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]));
            } else {
                state.pdfData.sort((a, b) => type === "ascending" ? a[key] - b[key] : b[key] - a[key]);
            }
            return {
                ...state,
                pdfData: [...state.pdfData]
            }
        case "ADD_HISTORYDATA":
            state.historyData =payload.labels;
            state.sdg_count=payload.sdg_count
            return {
                ...state
            }
            case "ADD_HISTORYDATA_LOG":
            state.historyDataLog =payload;
            return {
                ...state
            }
        
        default:
            return state
    }
}
export default reducer