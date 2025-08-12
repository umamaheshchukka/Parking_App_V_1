import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Layout } from "antd";
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
import { Button, Menu } from "antd";
const { Sider, Content } = Layout;
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
const OwnerSidebar = () => {
  const [activeKey, setActiveKey] = useState(""); // State in Chinese for consistency
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

  const handleSubItemClick = (subItem, index) => {
    setOpenDropdown(null);
    navigate(subItem.route);
  };

  const getColorClasses = (color, isActive = false) => {
    const colors = {
      blue: isActive
        ? "bg-blue-100 text-blue-700"
        : "hover:bg-blue-50 hover:text-blue-700",
      orange: isActive
        ? "bg-orange-100 text-orange-700"
        : "hover:bg-orange-50 hover:text-orange-700",
      teal: isActive
        ? "bg-teal-100 text-teal-700"
        : "hover:bg-teal-50 hover:text-teal-700",
    };
    return colors[color] || colors.blue;
  };

  return (
    <Layout className="h-screen">
      <Sider
        width={256}
        collapsible
        collapsed={isCollapsed}
        onCollapse={(collapsed) => setIsCollapsed(collapsed)}
        className="bg-gradient-to-b from-gray-900 to-gray-800 text-white"
        theme="dark"
        style={{
          ...siderStyle,
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
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
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
            console.log("Route:", route);
            if (route) navigate(route);
          }}
        />
      </Sider>
      <Layout style={{ marginLeft: `${isCollapsed ? 80 : 256}px` }}>
        <Content
          className="p-2 bg-gray-100 thin-chat-scrollbar"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default OwnerSidebar;
