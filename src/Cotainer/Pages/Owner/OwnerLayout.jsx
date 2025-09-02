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
    key: "2",
    icon: <LayoutDashboard />,
    label: "OwnerDashboard",
    route: "/OwnerDashboard",
    description: "OwnerDashboard",
    color: "orange",
  },
  {
    key: "1",
    icon: <MapPin />,
    label: "OwnerPlacess",
    route: "/OwnerPlacess",
    description: "OwnerPlacess",
    color: "blue",
  },
  {
    key: "3",
    icon: <CalendarCheck />,
    label: "Bookings",
    route: "/ownerBookings",
    description: "OwnerBookings",
    color: "orange",
  },
];
const OwnerSidebar = () => {
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
  const handleNotificationAction = (notificationId, action) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, status: action } : notif
      )
    );
  };
  const notificationContent = (
    <div className="w-80 max-h-96 overflow-y-auto bg-white rounded-lg shadow-xl p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Notifications
      </h3>
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No new notifications</p>
      ) : (
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              className="flex flex-col items-start p-3 border-b border-gray-200 hover:bg-gray-50"
              key={item.id}
            >
              <div className="flex items-center w-full">
                <Avatar
                  className="bg-blue-500"
                  icon={<User className="w-4 h-4 text-white" />}
                />
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {item.message}
                  </p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
              {item.status === "pending" && (
                <div className="flex space-x-2 mt-2">
                  <Button
                    type="primary"
                    size="small"
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() =>
                      handleNotificationAction(item.id, "accepted")
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    type="default"
                    size="small"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() =>
                      handleNotificationAction(item.id, "rejected")
                    }
                  >
                    Reject
                  </Button>
                </div>
              )}
              {item.status !== "pending" && (
                <p
                  className={`text-xs mt-2 ${
                    item.status === "accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </p>
              )}
            </List.Item>
          )}
        />
      )}
    </div>
  );
  return (
    <Layout className="h-screen">
      <Header
        className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center px-6 bg-transparent"
        style={{
          marginLeft: isCollapsed ? 80 : 256,
          height: 64,
          lineHeight: "64px",
        }}
      >
        <div className="text-xl font-bold text-gray-800"></div>

        <div className="flex items-center space-x-4">
          <Popover
            content={notificationContent}
            trigger="click"
            placement="bottomRight"
            overlayClassName="notification-popover"
          >
            <div className="relative cursor-pointer">
              <Badge
                count={
                  notifications.filter((n) => n.status === "pending").length
                }
                className="text-gray-600"
              >
                <Bell className="w-6 h-6 hover:text-blue-500 transition-colors" />
              </Badge>
            </div>
          </Popover>
        </div>
      </Header>
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
            paddingTop: 64,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default OwnerSidebar;
