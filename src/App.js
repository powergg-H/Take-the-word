/*
 * @Author: Zhang Huan
 * @Date: 2021-12-20 11:49:29
 * @LastEditors: Zhang Huan
 * @LastEditTime: 2021-12-22 15:17:41
 * @Description: file content
 * @FilePath: \app\src\App.js
 */
import routes from "@/routes/routes_config";
import RouteView from "@/routes";
function App() {
  return (
    <div className="App">
      <RouteView routes={routes}></RouteView>
    </div>
  );
}

export default App;