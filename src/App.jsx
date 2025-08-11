import Sidebar from "./Cotainer/Layout/SideBar";
import Bar from "./Cotainer/Layout/Layout";
import { ConfigProvider } from "antd";
function App() {
  return (
    <ConfigProvider>
      <Bar />
    </ConfigProvider>
  );
}

export default App;
