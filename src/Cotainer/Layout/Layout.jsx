import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Home, LogIn, Menu, X } from "lucide-react";
import logo from "../../../public/p.png";

const AdvancedParkingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    setMobileMenuOpen(false);
    navigate(tab.path);
  };

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
    ${
      isScrolled
        ? "bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg"
        : "bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-sm"
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col">
      <header className={headerClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-15 h-15 bg-gradient-to-br from-gray-700 via-gray-900 to-pink-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img
                    src={logo}
                    alt="Car"
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  ParkSmart
                </h1>
                <p className="text-xs text-blue-200/70">
                  Smart Parking Solutions
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: "home", label: "Home", icon: Home, path: "/home" },
                {
                  id: "signin",
                  label: "Sign In",
                  icon: LogIn,
                  path: "/siginin",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`
                    relative px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 
                    group flex items-center space-x-2 overflow-hidden
                    ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30"
                        : "text-blue-100 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-r from-blue-400/0 via-cyan-400/20 to-blue-400/0 
                      transform transition-transform duration-500 
                      ${
                        activeTab === tab.id
                          ? "translate-x-0"
                          : "-translate-x-full group-hover:translate-x-0"
                      }
                    `}
                  ></div>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden transition-all duration-500 ease-in-out overflow-hidden
            ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="bg-white/5 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-6 space-y-3">
              {[
                { id: "home", label: "Home", icon: Home, path: "/home" },
                {
                  id: "signin",
                  label: "Sign In",
                  icon: LogIn,
                  path: "/siginin",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300
                    ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white shadow-lg border border-white/30"
                        : "text-blue-100 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 mt-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className=" mx-auto px-2 sm:px-5 lg:px-5 py-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdvancedParkingHeader;
