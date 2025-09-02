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
    <div className="min-h-screen ">
      <main>
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight">
              Smart Parking
              <br />
              <span className="text-3xl md:text-5xl">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Find, reserve, and pay for parking spots instantly with our
              platform
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-xl">
                Find Parking Now
              </button>
              <button className="px-8 py-4 border-2 border-white/30 rounded-2xl text-white font-semibold hover:bg-white/10 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white via-red-100 to-cyan-200 bg-clip-text text-transparent">
              Why Choose ParkSmart?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-blue-200/70 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-4 bg-white/5 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { number: "50K+", label: "Happy Users" },
                { number: "1000+", label: "Parking Spots" },
                { number: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-blue-200/80 text-lg font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Space */}
        <div className="h-24"></div>
      </main>
    </div>
  );
};

export default HomeContent;
