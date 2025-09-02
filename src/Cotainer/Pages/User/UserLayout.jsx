import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Layout, Menu, Badge, Popover, List, Avatar, Button } from "antd";
import {
  LayoutGrid,
  Calendar,
  BarChart3,
  History,
  ArrowDown,
  ArrowUp,
  Phone,
  Mail,
  Bell,
  Settings,
  Search,
  ChevronDown,
  User,
} from "lucide-react";
import { LayoutDashboard, MapPin, CalendarCheck } from "lucide-react";
const { Sider, Content, Header } = Layout;
const siderStyle = {
  background:
    "linear-gradient(135deg,rgb(31, 41, 83) 0%,rgb(80, 37, 123) 100%)",
  boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "0 20px 20px 0",
  overflow: "hidden",
};
const menuStyle = {
  background: "transparent",
  border: "none",
  fontSize: "14px",
  fontWeight: "500",
};
const items = [
  {
    key: "1",
    icon: <LayoutGrid />,
    label: "mapComponent",
    route: "/mapComponent",
    description: "mapComponent",
    color: "blue",
  },
  {
    key: "2",
    icon: <BarChart3 />,
    label: "userDashboard",
    route: "/userDashboard",
    description: "userDashboard",
    color: "orange",
  },
  {
    key: "3",
    icon: <ArrowUp />,
    label: "Bookings",
    route: "/UserBookings",
    description: "UserBookings",
    color: "orange",
  },
  {
    key: "4",
    icon: <ChevronDown />,
    label: "VehicleDashboard",
    route: "/VehicleDashboard",
    description: "VehicleDashboard",
    color: "orange",
  },
];
const UserSidebar = () => {
  const [activeKey, setActiveKey] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRefs = useRef({});
  const handleClick = (info) => {
    // `info.item.props` contains the original props passed to the Menu.Item
    console.log("Selected label:", info);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown !== null && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown].contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = items.find((item) => {
      if (item.subItems) {
        return item.subItems.some((subItem) => subItem.route === currentPath);
      }
      return item.route === currentPath;
    });
    if (activeItem) {
      setActiveKey(activeItem.key);
    }
  }, [location.pathname]);

  const handleItemClick = (item, index) => {
    if (item.subItems) {
      setOpenDropdown(openDropdown === index ? null : index);
    } else {
      setOpenDropdown(null);
      navigate(item.route);
    }
  };
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New booking request for Parking Spot A by Jane Doe",
      place: "Parking Spot A",
      user: "Jane Doe",
      time: "2025-09-01 14:30",
      status: "pending",
    },
    {
      id: 2,
      message: "Booking request for Parking Spot B by John Smith",
      place: "Parking Spot B",
      user: "John Smith",
      time: "2025-09-01 13:15",
      status: "pending",
    },
  ]);

  return (
    <Layout className="h-screen">
      <Sider
        width={256}
        collapsible
        collapsed={isCollapsed}
        onCollapse={(collapsed) => setIsCollapsed(collapsed)}
        className="bg-gradient-to-b from-red-900 to-gray-800 text-white"
        theme="dark"
        style={{
          // ...siderStyle,
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src="/voxpro.ico"
              alt="Logo"
              className="w-8 h-8 rounded-full"
            />
            {!isCollapsed && (
              <span className="text-lg font-bold text-white">VoxPro</span>
            )}
          </div>
        </div>

        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer"
              onClick={() => navigate("/accountSettings")}
            >
              <User className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="text-sm font-medium text-white">John</div>{" "}
                <div className="text-xs text-gray-400">CHess</div>
              </div>
            )}
          </div>
        </div>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          items={items}
          style={menuStyle}
          onClick={(info) => {
            const route = info.item.props.route;
            if (route) navigate(route);
          }}
        />
      </Sider>
      <Layout style={{ marginLeft: `${isCollapsed ? 80 : 256}px` }}>
        <Content
          className="p-2 bg-gray-100 thin-chat-scrollbar"
          style={{
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserSidebar;
