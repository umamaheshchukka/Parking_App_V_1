import React, { useState, useEffect, useRef } from "react";
import {
  CreditCard,
  LayoutGrid,
  Calendar,
  User,
  Volume2,
  List,
  Clock,
  MinusCircle,
  GitBranch,
  Mail,
  BarChart3,
  History,
  ArrowDown,
  ArrowUp,
  Phone,
  Container,
  Plus,
  MessageSquare,
  Zap,
  X,
  Bell,
  Settings,
  Search,
  ChevronDown,
  Activity,
} from "lucide-react";
import { Layout } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../public/voxpro.ico";

const { Header, Content } = Layout;

const Bar = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRefs = useRef({});

  const items = [
    {
      icon: LayoutGrid,
      label: "Map Component",
      route: "/mapComponent",
      color: "green",
    },

    {
      icon: BarChart3,
      label: "Dashboard",
      color: "teal",
      subItems: [
        {
          icon: History,
          label: "OwnerDashboard",
          route: "/OwnerDashboard",
        },
        {
          icon: Calendar,
          label: "User",
          route: "/userDashboard",
          color: "orange",
        },
      ],
    },
  ].map((item, index) => ({
    key: String(index + 1),
    ...item,
  }));

  useEffect(() => {
    const currentPath = location.pathname;
    items.forEach((item, index) => {
      if (item.route === currentPath) setActiveItem(index);
      if (item.subItems) {
        item.subItems.forEach((sub, subIndex) => {
          if (sub.route === currentPath) {
            setActiveItem(index);
            setActiveSubItem(`${index}-${subIndex}`);
            setOpenDropdown(index);
          }
        });
      }
    });
  }, [location.pathname]);

  const handleItemClick = (item, index) => {
    if (item.subItems) {
      setOpenDropdown(openDropdown === index ? null : index);
    } else {
      setActiveItem(index);
      setActiveSubItem(null);
      setOpenDropdown(null);
      setMobileMenuOpen(false);
      navigate(item.route);
    }
  };

  const handleSubItemClick = (subItem, parentIndex, subIndex) => {
    setActiveItem(parentIndex);
    setActiveSubItem(`${parentIndex}-${subIndex}`);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    navigate(subItem.route);
  };

  const getColorClasses = (color, isActive = false) => {
    const map = {
      green: isActive ? "bg-green-50 text-green-700" : "hover:bg-green-100",
      orange: isActive ? "bg-orange-50 text-orange-700" : "hover:bg-orange-100",
      teal: isActive ? "bg-teal-50 text-teal-700" : "hover:bg-teal-100",
      blue: isActive ? "bg-blue-50 text-blue-700" : "hover:bg-blue-100",
    };
    return map[color] || map.blue;
  };

  return (
    <Layout>
      <Header className="sticky top-0 z-50 bg-[#101111] px-4 shadow-md">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/mapComponent")}
            className="cursor-pointer flex items-center gap-2"
          >
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <span className="text-white font-semibold hidden sm:block">
              VoxPro
            </span>
          </div>

          {/* Center Nav - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto">
            {items.map((item, index) => (
              <div
                key={item.key}
                className="relative"
                ref={(el) => (dropdownRefs.current[index] = el)}
              >
                <button
                  onClick={() => handleItemClick(item, index)}
                  className={`group flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border border-transparent text-white ${
                    activeItem === index
                      ? getColorClasses(item.color, true)
                      : getColorClasses(item.color)
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                  {item.subItems && (
                    <ChevronDown
                      className={`h-3 w-3 ml-2 transition-transform duration-300 ${
                        openDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                {item.subItems && openDropdown === index && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white text-black rounded-xl shadow-lg border border-gray-200 z-50 max-h-72 overflow-y-auto">
                    <div className="p-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          onClick={() =>
                            handleSubItemClick(subItem, index, subIndex)
                          }
                          className={`flex items-center w-full px-3 py-2 rounded-lg text-sm ${
                            activeSubItem === `${index}-${subIndex}`
                              ? "bg-blue-50 text-blue-700"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <subItem.icon className="h-4 w-4 mr-2" />
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right - Profile + Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-3 bg-gray-800/50 rounded-xl px-3 py-1 border border-gray-600/50">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <LayoutGrid className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </Header>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-black px-4 py-4 border-t border-gray-200 shadow-md space-y-4">
          {/* Profile Section */}
          <div className="flex items-center space-x-3 bg-gray-100 rounded-xl px-3 py-2 border border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>

          {/* Navigation Items */}
          {items.map((item, index) => (
            <div key={item.key}>
              <button
                onClick={() => handleItemClick(item, index)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-base hover:bg-gray-100"
              >
                <span className="flex items-center">
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </span>
                {item.subItems && (
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === index ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {item.subItems && openDropdown === index && (
                <div className="pl-6 space-y-1 mt-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() =>
                        handleSubItemClick(subItem, index, subIndex)
                      }
                      className={`flex items-center w-full px-2 py-1 rounded-lg text-sm ${
                        activeSubItem === `${index}-${subIndex}`
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <subItem.icon className="h-4 w-4 mr-2" />
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <Content className="h-[calc(100vh-64px)] bg-gray-50 overflow-y-auto ">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Bar;
