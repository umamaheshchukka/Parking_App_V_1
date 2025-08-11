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

const { Sider, Content } = Layout;

const Sidebar = () => {
  const [activeKey, setActiveKey] = useState(""); // State in Chinese for consistency
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRefs = useRef({});

  const items = [
    {
      icon: LayoutGrid,
      label: "mapComponent", // Dashboard in Chinese
      route: "/mapComponent",
      description: "mapComponent", // Agent performance metrics
      color: "blue",
    },
    {
      icon: Calendar,
      label: "userDashboard", // Form
      route: "/userDashboard",
      description: "userDashboard", // Manage patient information
      color: "orange",
    },
    {
      icon: BarChart3,
      label: "OwnerDashboard", // Statistics
      description: "OwnerDashboard", // Advanced analytics and insights
      color: "teal",
      subItems: [
        {
          icon: History,
          label: "OwnerDashboard",
          route: "/OwnerDashboard",
          description: "OwnerDashboard",
        }, // Call History
        {
          icon: ArrowDown,
          label: "siginin",
          route: "/siginin",
          description: "siginin",
        }, // Inbound
      ],
    },
  ].map((item, index) => ({
    key: String(index + 1),
    icon: item.icon,
    label: item.label,
    route: item.route,
    subItems: item.subItems || null,
    description: item.description,
    color: item.color,
  }));

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
    <Layout className="min-h-screen">
      <Sider
        width={256}
        collapsible
        collapsed={isCollapsed}
        onCollapse={(collapsed) => setIsCollapsed(collapsed)}
        className="bg-gradient-to-b from-gray-900 to-gray-800 text-white"
        theme="dark"
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
                <div className="text-sm font-medium text-white">张伟</div>{" "}
                {/* John Doe in Chinese */}
                <div className="text-xs text-gray-400">代理</div> {/* Agent */}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4">
          {items.map((item, index) => (
            <div
              key={item.key}
              className="relative"
              ref={(el) => (dropdownRefs.current[index] = el)}
            >
              <button
                onClick={() => handleItemClick(item, index)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeKey === item.key
                    ? `${getColorClasses(item.color, true)} bg-opacity-20`
                    : `text-gray-200 ${getColorClasses(item.color)}`
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.subItems && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          openDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </button>

              {!isCollapsed && item.subItems && openDropdown === index && (
                <div className="ml-4 mt-1 bg-gray-700 rounded-lg shadow-lg">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleSubItemClick(subItem, index)}
                      className={`w-full flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded-md transition-all duration-200 ${
                        location.pathname === subItem.route ? "bg-gray-600" : ""
                      }`}
                    >
                      <subItem.icon className="w-4 h-4 mr-3" />
                      <div className="flex-1 text-left">
                        <div>{subItem.label}</div>
                        <div className="text-xs text-gray-400">
                          {subItem.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 w-full px-4">
          <button
            className="w-full flex items-center px-4 py-3 text-sm text-gray-200 hover:bg-gray-700 rounded-md transition-all duration-200"
            onClick={() => navigate("/settings")}
          >
            <Settings className="w-5 h-5 mr-3" />
            {!isCollapsed && <span>设置</span>} {/* Settings */}
          </button>
        </div>
      </Sider>
      <Layout>
        <Content className="p-2 bg-gray-100 min-h-screen">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
