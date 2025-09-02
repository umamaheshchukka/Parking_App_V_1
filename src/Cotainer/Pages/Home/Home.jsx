import React, { useState, useEffect } from "react";
import {
  Home,
  LogIn,
  Menu,
  X,
  Car,
  MapPin,
  Clock,
  Shield,
  Star,
  Users,
} from "lucide-react";

const HomeContent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Demo content for showcase
  const features = [
    { icon: Car, title: "Smart Parking", desc: "AI-powered spot detection" },
    { icon: MapPin, title: "Live Maps", desc: "Real-time availability" },
    { icon: Clock, title: "Quick Booking", desc: "Reserve in seconds" },
    { icon: Shield, title: "Secure Payment", desc: "Safe transactions" },
    { icon: Star, title: "Premium Spots", desc: "VIP parking areas" },
    { icon: Users, title: "Community", desc: "Shared parking network" },
  ];

  return (
    <div className="min-h-screen">
      <main>
        <section className="relative min-h-[70vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 lg:w-96 h-48 sm:h-64 lg:h-96 bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-3/4 left-1/2 w-24 sm:w-36 lg:w-48 h-24 sm:h-36 lg:h-48 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
              Smart Parking
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl">
                Made Simple
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-200/80 mb-8 sm:mb-12 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed">
              Find, reserve, and pay for parking spots instantly with our
              platform
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-md sm:shadow-xl">
                Find Parking Now
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base hover:bg-white/10 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-12 lg:mb-16 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              Why Choose ParkSmart?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-lg transition-all duration-300">
                    <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-blue-200/70 text-sm sm:text-base leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              {[
                { number: "50K+", label: "Happy Users" },
                { number: "1000+", label: "Parking Spots" },
                { number: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-blue-200/80 text-base sm:text-lg font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Space */}
        <div className="h-16 sm:h-20 lg:h-24"></div>
      </main>
    </div>
  );
};

export default HomeContent;
