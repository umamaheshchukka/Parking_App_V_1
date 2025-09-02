import Sidebar from "./Cotainer/Layout/SideBar";
import Bar from "./Cotainer/Layout/Layout";
import ParkingSidebar from "./Cotainer/Pages/User/UserLayout";
import OwnerSidebar from "./Cotainer/Pages/Owner/OwnerLayout";
import AdminDashboard from "./Cotainer/Pages/Admin/AdminDashboard";
import { ConfigProvider } from "antd";

function App() {
  const token = localStorage.getItem("token");

  return (
    <ConfigProvider>{token ? <ParkingSidebar /> : <Bar />}</ConfigProvider>
  );
}

export default App;
