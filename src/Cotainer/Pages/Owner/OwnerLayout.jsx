import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  User,
  ChevronLeft,
  ChevronRight,
  Calendar,
  LayoutDashboard,
  MapPin,
  CalendarCheck,
  Bell,
} from "lucide-react";

const menuItems = [
  {
    key: "2",
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: "OwnerDashboard",
    route: "/OwnerDashboard",
    description: "OwnerDashboard",
    color: "text-orange-400",
  },
  {
    key: "1",
    icon: <MapPin className="w-5 h-5" />,
    label: "OwnerPlacess",
    route: "/OwnerPlacess",
    description: "OwnerPlacess",
    color: "text-blue-400",
  },
  {
    key: "3",
    icon: <CalendarCheck className="w-5 h-5" />,
    label: "Bookings",
    route: "/ownerBookings",
    description: "OwnerBookings",
    color: "text-orange-400",
  },
];

const OwnerSidebar = () => {
  const [activeKey, setActiveKey] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Sample notifications data (replace with actual data source as needed)
  const notifications = [
    { id: 1, status: "pending", message: "New booking received" },
    { id: 2, status: "pending", message: "Maintenance request" },
    { id: 3, status: "completed", message: "Booking confirmed" },
  ];

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

  // Notification popover content (simplified for Tailwind)
  const notificationContent = (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-xs">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        Notifications
      </h3>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="py-1 text-sm text-gray-600 border-b border-gray-200 last:border-b-0"
        >
          {notification.message}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-4  transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="text-xl font-bold text-gray-800"></div>
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <div className="relative cursor-pointer">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {notifications.filter((n) => n.status === "pending").length}
              </span>
              <Bell className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors" />
            </div>
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-white rounded-lg shadow-lg p-4 max-w-xs">
              {notificationContent}
            </div>
          </div>
        </div>
      </header>

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
              <div className={item.color}>{item.icon}</div>
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
        className={`flex-1 p-6 pt-20 transition-all duration-300 bg-gray-100`}
        style={{ marginLeft: isCollapsed ? 80 : 256 }}
      >
        <div className="min-h-screen overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OwnerSidebar;
