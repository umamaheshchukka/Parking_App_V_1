import React from "react";

const AIBrainBackground = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="flex items-center justify-between w-full max-w-6xl">
          {/* Left side - AI Brain Visualization */}
          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Main Brain Shape */}
            <div className="relative w-80 h-80">
              {/* Left Brain Hemisphere */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-36 h-64 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-2xl shadow-red-500/30">
                <div className="absolute inset-2 bg-gradient-to-br from-red-400 to-red-500 rounded-full">
                  {/* Brain texture patterns */}
                  <div className="absolute top-4 left-4 w-8 h-8 bg-red-300/30 rounded-full"></div>
                  <div className="absolute top-12 right-6 w-6 h-6 bg-red-300/30 rounded-full"></div>
                  <div className="absolute bottom-8 left-6 w-10 h-10 bg-red-300/30 rounded-full"></div>
                  <div className="absolute bottom-16 right-4 w-4 h-4 bg-red-300/30 rounded-full"></div>
                </div>
              </div>

              {/* Right Brain Hemisphere */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-36 h-64 bg-gradient-to-bl from-red-500 to-red-600 rounded-full shadow-2xl shadow-red-500/30">
                <div className="absolute inset-2 bg-gradient-to-bl from-red-400 to-red-500 rounded-full">
                  {/* Brain texture patterns */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-red-300/30 rounded-full"></div>
                  <div className="absolute top-12 left-6 w-6 h-6 bg-red-300/30 rounded-full"></div>
                  <div className="absolute bottom-8 right-6 w-10 h-10 bg-red-300/30 rounded-full"></div>
                  <div className="absolute bottom-16 left-4 w-4 h-4 bg-red-300/30 rounded-full"></div>
                </div>
              </div>

              {/* Central Connection */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-32 bg-gradient-to-b from-red-400 to-red-500 rounded-lg shadow-lg"></div>

              {/* Circuit Patterns */}
              {/* Left side circuits */}
              <div className="absolute left-8 top-16 w-16 h-0.5 bg-white rounded-full shadow-lg shadow-white/50">
                <div className="absolute -left-2 -top-2 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50"></div>
                <div className="absolute -right-2 -top-2 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50"></div>
              </div>

              <div className="absolute left-6 top-32 w-20 h-0.5 bg-white rounded-full shadow-lg shadow-white/50">
                <div className="absolute -left-2 -top-2 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50"></div>
                <div className="absolute right-4 -top-6 w-0.5 h-12 bg-white rounded-full shadow-lg shadow-white/50"></div>
                <div className="absolute right-4 -top-8 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50"></div>
              </div>

              {/* Right side circuits */}
              <div className="absolute right-8 top-20 w-16 h-0.5 bg-white rounded-full shadow-lg shadow-white/50">
                <div className="absolute -left-2 -top-2 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50"></div>
                <div className="absolute -right-2 -top-2 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50"></div>
              </div>

              <div className="absolute right-6 top-36 w-18 h-0.5 bg-white rounded-full shadow-lg shadow-white/50">
                <div className="absolute -right-2 -top-2 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50"></div>
                <div className="absolute left-6 -top-8 w-0.5 h-16 bg-white rounded-full shadow-lg shadow-white/50"></div>
                <div className="absolute left-6 -top-10 w-4 h-4 bg-white rounded-full shadow-lg shadow-white/50"></div>
              </div>

              {/* Animated pulse effects */}
              <div className="absolute left-8 top-14 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="absolute right-12 top-28 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-500"></div>
              <div className="absolute left-1/2 top-12 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000"></div>
            </div>

            {/* Floating data particles */}
            <div className="absolute top-8 right-16 w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-12 left-20 w-1 h-1 bg-blue-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-1/3 right-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce delay-700"></div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 ml-24">
            <div className="max-w-lg">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 rounded-full mb-8 backdrop-blur-sm">
                <span className="text-red-300 text-sm font-semibold tracking-wider uppercase">
                  ARTIFICIAL INTELLIGENCE
                </span>
              </div>

              <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                Think Beyond
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">
                  Human Limits
                </span>
              </h1>

              <p className="text-slate-300 text-xl leading-relaxed mb-8">
                Harness the power of neural networks and machine learning to
                unlock unprecedented computational intelligence and creative
                possibilities.
              </p>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400">Neural Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                  <span className="text-slate-400">Deep Learning</span>
                </div>
              </div>

              {/* Decorative tech elements */}
              {/* <div className="mt-16 flex space-x-2">
                <div className="w-1 h-20 bg-gradient-to-b from-red-500 to-pink-500 rounded-full opacity-60 animate-pulse"></div>
                <div className="w-1 h-16 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full opacity-40 animate-pulse delay-200"></div>
                <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full opacity-30 animate-pulse delay-400"></div>
                <div className="w-1 h-24 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-50 animate-pulse delay-600"></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Additional tech grid overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-px h-full">
          {[...Array(144)].map((_, i) => (
            <div key={i} className="border border-white/10"></div>
          ))}
        </div>
      </div>

      {/* Scanning line effect */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
    </div>
  );
};

export default AIBrainBackground;
