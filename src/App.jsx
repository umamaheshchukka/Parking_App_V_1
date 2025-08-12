import Sidebar from "./Cotainer/Layout/SideBar";
import Bar from "./Cotainer/Layout/Layout";
import ParkingSidebar from "./Cotainer/Pages/User/UserLayout";
import { ConfigProvider } from "antd";
function App() {
  const token = localStorage.getItem("token");

  return (
    <ConfigProvider>{!token ? <ParkingSidebar /> : <Bar />}</ConfigProvider>
  );
}

export default App;
