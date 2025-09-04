import Sidebar from "./Cotainer/Layout/SideBar";
import Bar from "./Cotainer/Layout/Layout";
import ParkingSidebar from "./Cotainer/Pages/User/UserLayout";
import OwnerSidebar from "./Cotainer/Pages/Owner/OwnerLayout";
import AdminDashboard from "./Cotainer/Pages/Admin/AdminDashboard";
import React from "react";
import ShowNotification from "./Cotainer/Components/Notification";
import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError } from "./Actions/errorSlice/errorSlice";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const errorSlice = useSelector((state) => state.errorSlice || "");
  const { open, msg, title, type, placement } = errorSlice;
  useEffect(() => {
    if (open && type === "error") {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [open]);
  useEffect(() => {
    if (token && role) {
      if (role === "customer") {
        navigate("/userDashboard");
      } else if (role === "owner") {
        navigate("/OwnerDashboard");
      } else if (role === "admin") {
        navigate("/AdminDashboard");
      }
    } else {
      navigate("/siginin");
    }
  }, [token, role]);
  return (
    <>
      <ShowNotification
        open={open}
        onClose={() => dispatch(clearError())}
        msg={msg}
        severity={type}
      />
      <ConfigProvider>
        {token ? (
          role == "customer" ? (
            <ParkingSidebar />
          ) : role == "owner" ? (
            <OwnerSidebar />
          ) : (
            <AdminDashboard />
          )
        ) : (
          <Bar />
        )}
      </ConfigProvider>
    </>
  );
}

export default App;
