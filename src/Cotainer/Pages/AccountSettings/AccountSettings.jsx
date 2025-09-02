import React, { useState, useRef } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Camera,
  Save,
  Trash2,
  Settings,
  Moon,
  Sun,
  Globe,
  Smartphone,
  Mail,
  AlertTriangle,
  Check,
  X,
  Edit3,
  Download,
  Upload,
} from "lucide-react";

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userDetails, setUserDetails] = useState({
    username: "johndoe",
    email: "john.doe@example.com",
    fullName: "John Doe",
    bio: "Frontend developer passionate about creating amazing user experiences",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    profileImage: null,
  });

  const [settings, setSettings] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
    profileVisibility: "public",
    language: "en",
    timezone: "America/Los_Angeles",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  );
  const [isEditing, setIsEditing] = useState({});
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        setUserDetails({ ...userDetails, profileImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (section) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing({ ...isEditing, [section]: false });
      // Show success message
    }, 1000);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords don't match!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPasswords({ current: "", new: "", confirm: "" });
      alert("Password updated successfully!");
    }, 1000);
  };

  const toggleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const updateField = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const updateSetting = (setting, value) => {
    setSettings({ ...settings, [setting]: value });
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Picture Section */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <img
            src={imageUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Camera className="w-6 h-6 text-white" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            {userDetails.fullName}
          </h3>
          <p className="text-gray-500">@{userDetails.username}</p>
        </div>
      </div>

      {/* Editable Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <div className="flex items-center space-x-2">
            {isEditing.fullName ? (
              <input
                type="text"
                value={userDetails.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="flex-1 px-3 py-2 text-gray-900">
                {userDetails.fullName}
              </span>
            )}
            <button
              onClick={() => toggleEdit("fullName")}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="flex items-center space-x-2">
            {isEditing.email ? (
              <input
                type="email"
                value={userDetails.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="flex-1 px-3 py-2 text-gray-900">
                {userDetails.email}
              </span>
            )}
            <button
              onClick={() => toggleEdit("email")}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <div className="flex items-center space-x-2">
            {isEditing.phone ? (
              <input
                type="tel"
                value={userDetails.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="flex-1 px-3 py-2 text-gray-900">
                {userDetails.phone}
              </span>
            )}
            <button
              onClick={() => toggleEdit("phone")}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <div className="flex items-center space-x-2">
            {isEditing.location ? (
              <input
                type="text"
                value={userDetails.location}
                onChange={(e) => updateField("location", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="flex-1 px-3 py-2 text-gray-900">
                {userDetails.location}
              </span>
            )}
            <button
              onClick={() => toggleEdit("location")}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Bio</label>
        <div className="flex items-start space-x-2">
          {isEditing.bio ? (
            <textarea
              value={userDetails.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              rows={3}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          ) : (
            <p className="flex-1 px-3 py-2 text-gray-900">{userDetails.bio}</p>
          )}
          <button
            onClick={() => toggleEdit("bio")}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={() => handleSave("profile")}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Save className="w-4 h-4" />
        <span>Save Changes</span>
      </button>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-8">
      {/* Password Change */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Change Password
        </h4>
        <div className="space-y-4">
          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={passwords.current}
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    current: !showPasswords.current,
                  })
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={passwords.new}
                onChange={(e) =>
                  setPasswords({ ...passwords, new: e.target.value })
                }
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    new: !showPasswords.new,
                  })
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) =>
                  setPasswords({ ...passwords, confirm: e.target.value })
                }
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords({
                    ...showPasswords,
                    confirm: !showPasswords.confirm,
                  })
                }
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handlePasswordChange}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "security":
        return renderSecurityTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
              <nav className="p-6">
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-blue-600 text-white shadow-lg transform scale-105"
                            : "text-gray-700 hover:bg-gray-100 hover:transform hover:scale-105"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            </div>

            <div className="flex-1 p-6 lg:p-8">
              <div className="max-w-2xl">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
