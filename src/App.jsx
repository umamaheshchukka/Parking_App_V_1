import Sidebar from "./Cotainer/Layout/SideBar";
import Bar from "./Cotainer/Layout/Layout";
import { ConfigProvider } from "antd";
function App() {
  const token=localStorage.getItem("token")
  
  return (
    <ConfigProvider>
      {token?<Sidebar/>:<Bar/>}
    </ConfigProvider>
  );
}

export default App;
