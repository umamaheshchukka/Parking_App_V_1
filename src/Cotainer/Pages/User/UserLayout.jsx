import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  Map,
  BarChart,
  Calendar,
  Truck,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    key: "1",
    icon: <Map className="w-5 h-5" />,
    label: "Map",
    route: "/mapComponent",
    description: "Map Component",
    color: "blue",
  },
  {
    key: "2",
    icon: <BarChart className="w-5 h-5" />,
    label: "Dashboard",
    route: "/userDashboard",
    description: "User Dashboard",
    color: "orange",
  },
  {
    key: "3",
    icon: <Calendar className="w-5 h-5" />,
    label: "Bookings",
    route: "/UserBookings",
    description: "User Bookings",
    color: "orange",
  },
  {
    key: "4",
    icon: <Truck className="w-5 h-5" />,
    label: "Vehicle Dashboard",
    route: "/VehicleDashboard",
    description: "Vehicle Dashboard",
    color: "orange",
  },
  {
    key: "5",
    icon: <LogOut className="w-5 h-5" />,
    label: "Logout",
    route: "/logout",
    description: "Logout",
    color: "red",
  },
];

const UserSidebar = () => {
  const [activeKey, setActiveKey] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find((item) => item.route === currentPath);
    if (activeItem) {
      setActiveKey(activeItem.key);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-red-900 to-gray-800 text-white shadow-lg transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } overflow-y-auto rounded-r-3xl z-10 flex flex-col`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-700 flex items-center">
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

        {/* User Profile Section */}
        <div className="p-1 border-b border-white/10">
          <div
            className="group flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
            onClick={() => navigate("/accountSettings")}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <div className="text-sm font-semibold text-white group-hover:text-blue-200 transition-colors">
                  John Doe
                </div>
                <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
                  Fleet Manager
                </div>
                <div className="flex items-center mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
            )}
            {!isCollapsed && (
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-all group-hover:translate-x-1" />
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="mt-4 flex-1">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-700 transition-colors ${
                activeKey === item.key ? "bg-gray-700" : ""
              }`}
              onClick={() => {
                if (item.route === "/logout") {
                  handleLogout();
                } else if (item.route) {
                  navigate(item.route);
                }
              }}
            >
              <div className={`text-${item.color}-400`}>{item.icon}</div>
              {!isCollapsed && (
                <div className="ml-3">
                  <div className="text-sm font-medium text-white">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.description}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Toggle Button at Bottom */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white focus:outline-none w-full flex justify-center"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-2 bg-gray-100 transition-all duration-300`}
        style={{ marginLeft: isCollapsed ? 80 : 256 }}
      >
        <div className="min-h-screen overflow-y-auto thin-chat-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
