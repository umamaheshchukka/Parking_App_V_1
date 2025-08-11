import React from "react";
import { ImageCarousel } from "./ImageShow";

const RegisterComponent = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Form values:", Object.fromEntries(formData));
  };

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="lg:w-1/2 w-full flex items-center justify-center bg-gray-500 rounded-lg">
        {/* <div className="w-full max-w-2xl"> */}
        <ImageCarousel />
        {/* </div> */}
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400 text-center mb-6">
            🚙 Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">📧 Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">
                👤 Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                🔒 Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                🧾 Account Type
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="accountType"
                    value="looking"
                    required
                  />
                  🅿️ Looking for Parking
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="accountType"
                    value="offering"
                    required
                  />
                  🏠 Have Parking Space
                </label>
              </div>
            </div>

            {/* Agreement */}
            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="agreement" required />✅ I agree to
                the{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Terms & Privacy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition"
            >
              🚀 Create Account
            </button>

            {/* Login Link */}
            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
