// import React, { useState } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Radio,
//   Checkbox,
//   Typography,
//   message,
// } from "antd";
// import { CheckCircleOutlined } from "@ant-design/icons";
// import { startRegUser } from "../../../Actions/Auth/Auth";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { ImageCarousel } from "./ImageShow";

// const { Title, Paragraph, Text } = Typography;

// const RegisterComponent = () => {
//   const [form] = Form.useForm();
//   const [otpForm] = Form.useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isOtpStage, setIsOtpStage] = useState(false);
//   const [email, setEmail] = useState("");

//   const onFinish = (values) => {
//     setEmail(values.email);
//     dispatch(startRegUser(values))
//       .then((res) => {
//         if (res.success) {
//           message.success(
//             "Registration successful! Please check your email for OTP."
//           );
//           setIsOtpStage(true);
//         } else {
//           message.error(
//             res.message || "Registration failed. Please try again."
//           );
//         }
//       })
//       .catch((error) => {
//         message.error("An error occurred during registration.");
//         console.error(error);
//       });
//   };

//   const onOtpFinish = (values) => {
//     // Placeholder for OTP verification
//     // dispatch(verifyOtp({ email, otp: values.otp }))
//     //   .then((res) => {
//     //     if (res.success) {
//     //       message.success("OTP verified successfully!");
//     //       navigate("/siginin");
//     //     } else {
//     //       message.error(res.message || "Invalid OTP. Please try again.");
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     message.error("An error occurred during OTP verification.");
//     //     console.error(error);
//     //   });
//     message.success("OTP verified successfully!");
//     navigate("/siginin");
//   };

//   return (
//     <div className="min-h-screen  flex items-center  p-4 sm:p-6">
//       <div className=" mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 w-full max-w-7xl">
//         <div className="hidden lg:flex lg:col-span-1 items-center justify-center min-h-[400px] w-full">
//           <ImageCarousel />
//         </div>

//         {/* Form Section - Takes more space */}
//         <div className="lg:col-span-2 flex items-center justify-center min-h-[500px] w-full">
//           <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-2xl">
//             <div className="text-center mb-8">
//               <div className="relative inline-block">
//                 <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
//                   <span className="text-3xl text-white">🅿️</span>
//                 </div>
//                 <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
//                   <span className="text-sm text-white">🔒</span>
//                 </div>
//               </div>
//             </div>
//             <div className="text-center mb-6">
//               <Title
//                 level={2}
//                 className="!text-3xl sm:!text-4xl !font-bold !text-transparent !bg-clip-text !bg-gradient-to-r !from-blue-600 !to-teal-500"
//               >
//                 {isOtpStage ? "🔐 Verify OTP" : "Welcome to Pick Parking"}
//               </Title>
//               {!isOtpStage && (
//                 <Text className="text-gray-500 text-base">
//                   Sign up to find and manage your parking
//                 </Text>
//               )}
//             </div>

//             {!isOtpStage ? (
//               <Form
//                 form={form}
//                 layout="vertical"
//                 onFinish={onFinish}
//                 autoComplete="off"
//                 className="space-y-4"
//               >
//                 <Form.Item
//                   label={
//                     <span className="text-gray-700 font-medium">📧 Email</span>
//                   }
//                   name="email"
//                   rules={[
//                     { required: true, message: "Email is required" },
//                     { type: "email", message: "Please enter a valid email" },
//                   ]}
//                 >
//                   <Input
//                     className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors h-10"
//                     placeholder="you@example.com"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   label={
//                     <span className="text-gray-700 font-medium">
//                       👤 Username
//                     </span>
//                   }
//                   name="name"
//                   rules={[{ required: true, message: "Username is required" }]}
//                 >
//                   <Input
//                     className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors h-10"
//                     placeholder="Choose a username"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   label={
//                     <span className="text-gray-700 font-medium">
//                       🔒 Password
//                     </span>
//                   }
//                   name="password"
//                   rules={[{ required: true, message: "Password is required" }]}
//                 >
//                   <Input.Password
//                     className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors h-10"
//                     placeholder="Create a password"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   label={
//                     <span className="text-gray-700 font-medium">📱 Phone</span>
//                   }
//                   name="phone"
//                   rules={[
//                     { required: true, message: "Phone number is required" },
//                   ]}
//                 >
//                   <Input
//                     maxLength={10}
//                     className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors h-10"
//                     placeholder="Enter phone number"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   label={
//                     <span className="text-gray-700 font-medium">
//                       🧾 Account Type
//                     </span>
//                   }
//                   name="role"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please select an account type",
//                     },
//                   ]}
//                 >
//                   <Radio.Group className="flex flex-col sm:flex-row gap-4">
//                     <Radio value="customer" className="text-gray-700">
//                       🅿️ Looking for Parking
//                     </Radio>
//                     <Radio value="owner" className="text-gray-700">
//                       🏠 Have Parking Space
//                     </Radio>
//                   </Radio.Group>
//                 </Form.Item>

//                 <Form.Item
//                   name="agreement"
//                   valuePropName="checked"
//                   rules={[
//                     {
//                       validator: (_, value) =>
//                         value
//                           ? Promise.resolve()
//                           : Promise.reject("You must agree to the terms"),
//                     },
//                   ]}
//                 >
//                   <Checkbox className="text-gray-700">
//                     ✅ I agree to the{" "}
//                     <a href="#" className="text-blue-500 hover:underline">
//                       Terms & Privacy
//                     </a>
//                   </Checkbox>
//                 </Form.Item>

//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     block
//                     className="!bg-blue-600 hover:!bg-blue-700 !border-none !rounded-full !h-12 !font-semibold !text-white transition-colors"
//                   >
//                     🚀 Create Account
//                   </Button>
//                 </Form.Item>

//                 <Paragraph className="text-center text-gray-600 text-sm">
//                   Already have an account?{" "}
//                   <a href="/siginin" className="text-blue-500 hover:underline">
//                     Login
//                   </a>
//                 </Paragraph>
//               </Form>
//             ) : (
//               <Form
//                 form={otpForm}
//                 layout="vertical"
//                 onFinish={onOtpFinish}
//                 autoComplete="off"
//                 className="space-y-4"
//               >
//                 <Form.Item
//                   label={
//                     <span className="text-gray-700 font-medium">🔢 OTP</span>
//                   }
//                   name="otp"
//                   rules={[
//                     { required: true, message: "OTP is required" },
//                     { len: 6, message: "OTP must be 6 digits" },
//                     { pattern: /^\d{6}$/, message: "OTP must be 6 digits" },
//                   ]}
//                 >
//                   <Input
//                     className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors h-10"
//                     placeholder="Enter 6-digit OTP"
//                     maxLength={6}
//                   />
//                 </Form.Item>

//                 <Form.Item>
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     block
//                     className="!bg-blue-600 hover:!bg-blue-700 !border-none !rounded-full !h-12 !font-semibold !text-white transition-colors"
//                   >
//                     ✅ Verify OTP
//                   </Button>
//                 </Form.Item>

//                 <Paragraph className="text-center text-gray-600 text-sm">
//                   Back to{" "}
//                   <a
//                     href="#"
//                     onClick={() => setIsOtpStage(false)}
//                     className="text-blue-500 hover:underline"
//                   >
//                     Registration
//                   </a>
//                 </Paragraph>
//               </Form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterComponent;
import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Phone,
  Car,
  Home,
  CheckCircle2,
  Eye,
  EyeOff,
  Shield,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

const AdvancedRegisterComponent = () => {
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    phone: "",
    role: "",
    agreement: false,
  });
  const [otpValue, setOtpValue] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.name) newErrors.name = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";

    if (!formData.role) newErrors.role = "Please select an account type";
    if (!formData.agreement)
      newErrors.agreement = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setEmail(formData.email);

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setIsOtpStage(true);
      }, 1500);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpValue.length === 6 && /^\d{6}$/.test(otpValue)) {
      setLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setLoading(false);
        console.log("Registration completed!");
        // Redirect to sign-in page (uncomment when using react-router-dom)
        // navigate("/signin");
      }, 1000);
    } else {
      setErrors({ otp: "OTP must be a 6-digit number" });
    }
  };

  const ImageCarousel = () => (
    <div className="relative h-full w-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

      {/* Floating Elements */}
      <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl animate-pulse"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl animate-bounce"></div>

      <div className="relative h-full flex flex-col items-center justify-center p-8 text-white">
        <div className="mb-8 text-center">
          <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
            <Car className="w-14 h-14 animate-pulse" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Pick Parking
          </h2>
          <p className="text-lg sm:text-xl text-center text-white/90 leading-relaxed">
            Your smart parking solution for the modern world
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 w-full max-w-lg">
          {[
            {
              icon: CheckCircle2,
              text: "Smart booking system",
              color: "text-green-300",
            },
            { icon: Shield, text: "Secure payments", color: "text-blue-300" },
            {
              icon: Sparkles,
              text: "Real-time updates",
              color: "text-purple-300",
            },
            { icon: Phone, text: "24/7 support", color: "text-orange-300" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <item.icon className={`w-6 h-6 ${item.color}`} />
              <span className="text-sm sm:text-base font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}

      <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-center min-h-[600px]">
          {/* Image Carousel Section - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2 h-[400px] sm:h-[500px] lg:h-[600px] order-2">
            <ImageCarousel />
          </div>

          {/* Form Section - Takes more space */}
          <div className="flex items-center justify-center lg:col-span-3 order-1">
            <div className="w-full max-w-md sm:max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 transform transition-all duration-500 hover:shadow-3xl">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    {isOtpStage ? (
                      <Shield className="w-10 h-10 text-white" />
                    ) : (
                      <Sparkles className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-teal-600 bg-clip-text text-transparent mb-3">
                  {isOtpStage
                    ? "Verify Your Email"
                    : "Welcome to Pick Parking!"}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  {isOtpStage
                    ? `We've sent a code to ${email}`
                    : "Create your account to start parking smarter"}
                </p>
              </div>

              {/* Registration Form */}
              {!isOtpStage ? (
                <div className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`w-full px-5 py-3 sm:py-4 rounded-2xl border-2 transition-all duration-300 bg-white/70 backdrop-blur-sm text-sm sm:text-base ${
                          errors.email
                            ? "border-red-400 focus:border-red-500 bg-red-50/50"
                            : "border-gray-200 focus:border-blue-500 hover:border-blue-300"
                        } focus:outline-none focus:ring-4 focus:ring-blue-500/20 placeholder-gray-400`}
                        placeholder="your@email.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                    </div>
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-red-500 text-sm font-medium"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Username Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-green-500" />
                      Username
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className={`w-full px-5 py-3 sm:py-4 rounded-2xl border-2 transition-all duration-300 bg-white/70 backdrop-blur-sm text-sm sm:text-base ${
                        errors.name
                          ? "border-red-400 focus:border-red-500 bg-red-50/50"
                          : "border-gray-200 focus:border-blue-500 hover:border-blue-300"
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20 placeholder-gray-400`}
                      placeholder="Choose your username"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        className="text-red-500 text-sm font-medium"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-purple-500" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className={`w-full px-5 py-3 sm:py-4 pr-14 rounded-2xl border-2 transition-all duration-300 bg-white/70 backdrop-blur-sm text-sm sm:text-base ${
                          errors.password
                            ? "border-red-400 focus:border-red-500 bg-red-50/50"
                            : "border-gray-200 focus:border-blue-500 hover:border-blue-300"
                        } focus:outline-none focus:ring-4 focus:ring-blue-500/20 placeholder-gray-400`}
                        placeholder="Create a secure password"
                        aria-invalid={!!errors.password}
                        aria-describedby={
                          errors.password ? "password-error" : undefined
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p
                        id="password-error"
                        className="text-red-500 text-sm font-medium"
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-orange-500" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange(
                          "phone",
                          e.target.value.replace(/\D/g, "").slice(0, 10)
                        )
                      }
                      className={`w-full px-5 py-3 sm:py-4 rounded-2xl border-2 transition-all duration-300 bg-white/70 backdrop-blur-sm text-sm sm:text-base ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500 bg-red-50/50"
                          : "border-gray-200 focus:border-blue-500 hover:border-blue-300"
                      } focus:outline-none focus:ring-4 focus:ring-blue-500/20 placeholder-gray-400`}
                      placeholder="Enter your phone number"
                      maxLength={10}
                      aria-invalid={!!errors.phone}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                    />
                    {errors.phone && (
                      <p
                        id="phone-error"
                        className="text-red-500 text-sm font-medium"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700">
                      Choose Account Type
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                      <label
                        className={`group flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                          formData.role === "customer"
                            ? "border-blue-500 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg"
                            : "border-gray-200 hover:border-blue-300 bg-white/50 hover:bg-white/80"
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value="customer"
                          checked={formData.role === "customer"}
                          onChange={(e) =>
                            handleInputChange("role", e.target.value)
                          }
                          className="sr-only"
                          aria-label="Customer role"
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                            formData.role === "customer"
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.role === "customer" && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <Car className="w-6 h-6 text-blue-600 mr-4" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            Looking for Parking
                          </div>
                          <div className="text-sm text-gray-600">
                            Find and book available parking spaces
                          </div>
                        </div>
                      </label>

                      <label
                        className={`group flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                          formData.role === "owner"
                            ? "border-green-500 bg-gradient-to-r from-green-50 to-green-100 shadow-lg"
                            : "border-gray-200 hover:border-green-300 bg-white/50 hover:bg-white/80"
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value="owner"
                          checked={formData.role === "owner"}
                          onChange={(e) =>
                            handleInputChange("role", e.target.value)
                          }
                          className="sr-only"
                          aria-label="Owner role"
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${
                            formData.role === "owner"
                              ? "border-green-500 bg-green-500"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.role === "owner" && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <Home className="w-6 h-6 text-green-600 mr-4" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            Have Parking Space
                          </div>
                          <div className="text-sm text-gray-600">
                            List and rent out your parking space
                          </div>
                        </div>
                      </label>
                    </div>
                    {errors.role && (
                      <p
                        id="role-error"
                        className="text-red-500 text-sm font-medium"
                      >
                        {errors.role}
                      </p>
                    )}
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="space-y-2">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="relative mt-1">
                        <input
                          type="checkbox"
                          checked={formData.agreement}
                          onChange={(e) =>
                            handleInputChange("agreement", e.target.checked)
                          }
                          className="sr-only"
                          aria-label="Agree to terms"
                        />
                        <div
                          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            formData.agreement
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300 group-hover:border-blue-400"
                          }`}
                        >
                          {formData.agreement && (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-2"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-2"
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    {errors.agreement && (
                      <p
                        id="agreement-error"
                        className="text-red-500 text-sm font-medium"
                      >
                        {errors.agreement}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-500 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Create Account
                      </div>
                    )}
                  </button>

                  {/* Sign In Link */}
                  <div className="text-center pt-4 border-t border-gray-200">
                    <p className="text-gray-600 text-sm sm:text-base">
                      Already have an account?{" "}
                      <a
                        href="/signin"
                        className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-2 transition-colors"
                      >
                        Sign In
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                /* OTP Form */
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 justify-center">
                      <Shield className="w-4 h-4 text-green-500" />
                      Enter Verification Code
                    </label>
                    <input
                      type="text"
                      value={otpValue}
                      onChange={(e) =>
                        setOtpValue(
                          e.target.value.replace(/\D/g, "").slice(0, 6)
                        )
                      }
                      className={`w-full px-6 py-4 sm:py-5 rounded-2xl border-2 text-center text-2xl sm:text-3xl font-mono tracking-[0.5em] transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                        errors.otp
                          ? "border-red-400 focus:border-red-500 bg-red-50/50"
                          : "border-gray-200 focus:border-green-500 hover:border-green-300"
                      } focus:outline-none focus:ring-4 focus:ring-green-500/20 placeholder-gray-400`}
                      placeholder="000000"
                      maxLength={6}
                      aria-invalid={!!errors.otp}
                      aria-describedby={errors.otp ? "otp-error" : undefined}
                    />
                    {errors.otp && (
                      <p
                        id="otp-error"
                        className="text-red-500 text-sm font-medium text-center"
                      >
                        {errors.otp}
                      </p>
                    )}
                    <p className="text-center text-sm text-gray-500">
                      Didn't receive the code?{" "}
                      <button
                        className="text-blue-600 hover:text-blue-800 font-semibold underline"
                        onClick={() => console.log("Resend OTP")}
                        disabled={loading}
                      >
                        Resend
                      </button>
                    </p>
                  </div>

                  <button
                    onClick={handleOtpSubmit}
                    disabled={loading || otpValue.length !== 6}
                    className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-green-600 via-green-700 to-emerald-500 text-white font-bold text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Verify Code
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => setIsOtpStage(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm sm:text-base"
                    disabled={loading}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Registration
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedRegisterComponent;
