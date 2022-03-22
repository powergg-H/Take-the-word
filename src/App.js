/*
 * @Author: Zhang Huan
 * @Date: 2021-12-20 11:49:29
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2022-03-06 23:20:55
 * @Description: file content
 * @FilePath: \screen-word-selection\src\App.js
 */
import routes from "@/routes/routes_config";
import RouteView from "@/routes";
import Header from "@/components/Header.jsx"
function App() {
  return (
    <div className="App">
      <Header></Header>
      <RouteView routes={routes}></RouteView>
    </div>
  );
}

export default App;