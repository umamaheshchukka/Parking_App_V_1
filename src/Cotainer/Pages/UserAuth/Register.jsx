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
import { Form, Input, Button, Radio, Checkbox, Spin, message } from "antd";
import { ImageCarousel } from "./ImageShow";
import { startRegUser } from "../../../Actions/Auth/Auth";
import { useDispatch } from "react-redux";

const AdvancedRegisterComponent = () => {
  const [form] = Form.useForm();
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    setEmail(values.email);
    dispatch(startRegUser(values)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        setIsOtpStage(true);
        message.success("OTP sent to your email!");
      }
    });
  };

  const handleOtpSubmit = () => {
    if (otpValue.length === 4 && /^\d{4}$/.test(otpValue)) {
      setLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setLoading(false);
        message.success("Registration completed!");
        // Redirect to sign-in page (uncomment when using react-router-dom)
        // navigate("/signin");
      }, 1000);
    } else {
      message.error("OTP must be a 6-digit number");
    }
  };

  const responsiveLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 24 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
  };

  return (
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6 items-center min-h-[500px]">
        <div className="flex items-center justify-center lg:col-span-3 order-2 mt-6 lg:mt-0 px-4 sm:px-6">
          <div className="w-full max-w-md sm:max-w-3xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-4 sm:p-6 transform transition-all duration-300 hover:shadow-2xl">
            {/* Header */}
            <div className="text-center mb-3">
              <div className="relative inline-block mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  {isOtpStage ? (
                    <Shield className="w-8 h-8 text-white" />
                  ) : (
                    <Sparkles className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-teal-600 bg-clip-text text-transparent mb-2">
                {isOtpStage ? "Verify Your Email" : "Welcome to Pick Parking!"}
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                {isOtpStage
                  ? `We've sent a code to ${email}`
                  : "Create your account to start parking smarter"}
              </p>
            </div>

            {!isOtpStage ? (
              <Spin spinning={loading}>
                <Form
                  form={form}
                  onFinish={handleSubmit}
                  {...responsiveLayout}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Email Field */}
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Invalid email format" },
                      ]}
                    >
                      <Input
                        prefix={<Mail className="w-4 h-4 text-blue-500" />}
                        placeholder="your@email.com"
                        className="rounded-xl border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 bg-white/70 backdrop-blur-sm py-2 sm:py-3 text-xs sm:text-sm"
                      />
                    </Form.Item>

                    {/* Username Field */}
                    <Form.Item
                      name="name"
                      rules={[
                        { required: true, message: "Username is required" },
                      ]}
                    >
                      <Input
                        prefix={<User className="w-4 h-4 text-green-500" />}
                        placeholder="Choose your username"
                        className="rounded-xl border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 bg-white/70 backdrop-blur-sm py-2 sm:py-3 text-xs sm:text-sm"
                      />
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Password is required" },
                        {
                          min: 6,
                          message: "Password must be at least 6 characters",
                        },
                        {
                          validator: (_, value) => {
                            if (!value) {
                              return Promise.reject("Password is required");
                            }

                            // Regex checks
                            const uppercase =
                              (value.match(/[A-Z]/g) || []).length >= 2;
                            const lowercase =
                              (value.match(/[a-z]/g) || []).length >= 2;
                            const numbers =
                              (value.match(/[0-9]/g) || []).length >= 2;
                            const symbol = /[^A-Za-z0-9]/.test(value);

                            if (!uppercase) {
                              return Promise.reject(
                                "Password must contain at least 2 uppercase letters"
                              );
                            }
                            if (!lowercase) {
                              return Promise.reject(
                                "Password must contain at least 2 lowercase letters"
                              );
                            }
                            if (!numbers) {
                              return Promise.reject(
                                "Password must contain at least 2 numbers"
                              );
                            }
                            if (!symbol) {
                              return Promise.reject(
                                "Password must contain at least 1 special symbol"
                              );
                            }

                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    {/* Phone Field */}
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Phone number is required",
                        },
                        {
                          pattern: /^\d{10}$/,
                          message: "Phone number must be 10 digits",
                        },
                      ]}
                    >
                      <Input
                        prefix={<Phone className="w-4 h-4 text-orange-500" />}
                        placeholder="Enter your phone number"
                        maxLength={10}
                        className="rounded-xl border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 bg-white/70 backdrop-blur-sm py-2 sm:py-3 text-xs sm:text-sm"
                        onChange={(e) =>
                          form.setFieldsValue({
                            phone: e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10),
                          })
                        }
                      />
                    </Form.Item>
                  </div>

                  {/* Role Selection */}
                  <Form.Item
                    name="role"
                    rules={[
                      {
                        required: true,
                        message: "Please select an account type",
                      },
                    ]}
                  >
                    <Radio.Group className="grid grid-cols-1 gap-3">
                      <Radio
                        value="customer"
                        className="group flex items-center p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 bg-white/50 hover:bg-white/80 transition-all duration-300 transform hover:scale-[1.01]"
                      >
                        <Car className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            Looking for Parking
                          </div>
                          <div className="text-xs text-gray-600">
                            Find and book available parking spaces
                          </div>
                        </div>
                      </Radio>
                      <Radio
                        value="owner"
                        className="group flex items-center p-4 rounded-xl border-2 border-gray-200 hover:border-green-300 bg-white/50 hover:bg-white/80 transition-all duration-300 transform hover:scale-[1.01]"
                      >
                        <Home className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            Have Parking Space
                          </div>
                          <div className="text-xs text-gray-600">
                            List and rent out your parking space
                          </div>
                        </div>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>

                  {/* Agreement Checkbox */}
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("You must agree to the terms")
                              ),
                      },
                    ]}
                  >
                    <Checkbox className="text-xs sm:text-sm">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 font-semibold underline"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 font-semibold underline"
                      >
                        Privacy Policy
                      </a>
                    </Checkbox>
                  </Form.Item>

                  {/* Submit Button */}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300"
                    >
                      {loading ? (
                        "Creating Account..."
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Create Account
                        </div>
                      )}
                    </Button>
                  </Form.Item>

                  {/* Sign In Link */}
                  <div className="text-center pt-3 border-t border-gray-200">
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Already have an account?{" "}
                      <a
                        href="/siginin"
                        className="text-blue-600 hover:text-blue-800 font-semibold underline"
                      >
                        Sign In
                      </a>
                    </p>
                  </div>
                </Form>
              </Spin>
            ) : (
              <Spin spinning={loading}>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-2 justify-center">
                      <Shield className="w-4 h-4 text-green-500" />
                      Enter Verification Code
                    </label>
                    <Input
                      value={otpValue}
                      onChange={(e) =>
                        setOtpValue(
                          e.target.value.replace(/\D/g, "").slice(0, 4)
                        )
                      }
                      placeholder="000000"
                      maxLength={4}
                      className="rounded-xl border-2 border-gray-200 hover:border-green-300 focus:border-green-500 bg-white/70 backdrop-blur-sm py-3 sm:py-4 text-center text-xl sm:text-2xl font-mono tracking-[0.4em]"
                    />
                    <p className="text-center text-xs text-gray-500">
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

                  <Button
                    type="primary"
                    onClick={handleOtpSubmit}
                    disabled={loading || otpValue.length !== 4}
                    className="w-full py-2 sm:py-3 bg-gradient-to-r from-green-600 via-green-700 to-emerald-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300"
                  >
                    {loading ? (
                      "Verifying..."
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Verify Code
                      </div>
                    )}
                  </Button>

                  <Button
                    type="link"
                    onClick={() => setIsOtpStage(false)}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-gray-800 font-medium text-xs sm:text-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Registration
                  </Button>
                </div>
              </Spin>
            )}
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-4 h-[700px] order-1 p-0 m-0">
          <ImageCarousel className="w-full h-full bg-transparent" />
        </div>
      </div>
    </div>
  );
};

export default AdvancedRegisterComponent;
