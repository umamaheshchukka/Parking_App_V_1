import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Row, Col, Avatar, Typography, Card, Space, message, Steps, Alert } from "antd";
import { MailOutlined, LockOutlined, KeyOutlined, ArrowLeftOutlined, CheckCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { FaCar, FaParking, FaShieldAlt } from "react-icons/fa";
import { HiCheckCircle, HiMap } from "react-icons/hi";
import { IoFingerPrint } from "react-icons/io5";
import { startLoginUser } from "../../../Actions/Auth/Auth";
import { useDispatch } from "react-redux";

const { Title, Text } = Typography;
const { Step } = Steps;

const mockSendOTP = (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "OTP sent successfully" });
    }, 1500);
  });
};

const mockVerifyOTP = (email, otp) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (otp === "123456") {
        resolve({ success: true, message: "OTP verified successfully" });
      } else {
        resolve({ success: false, message: "Invalid OTP" });
      }
    }, 1000);
  });
};

const mockResetPassword = (email, newPassword) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Password reset successfully" });
    }, 1000);
  });
};

const Login = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("signIn");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);

  const [form] = Form.useForm();
  const [forgotForm] = Form.useForm();
  const [otpForm] = Form.useForm();
  const [resetForm] = Form.useForm();

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(otpTimer - 1);
      }, 1000);
    } else if (otpTimer === 0 && currentView === "otpVerification") {
      setCanResendOtp(true);
    }
    return () => clearInterval(interval);
  }, [otpTimer, currentView]);

  const handleSignIn = (values) => {
    dispatch(startLoginUser(values)).then((res)=>{
      setIsLoading(true);
      setFormErrors({});
      setTimeout(() => {
        message.success("Signed in successfully!");
        setIsLoading(false);
        navigate("/userDashboard");
      }, 1500);
    })
   
  };

  const handleForgotPassword = async (values) => {
    setIsLoading(true);
    setEmail(values.email);

    try {
      const response = await mockSendOTP(values.email);
      if (response.success) {
        message.success("OTP sent to your email!");
        setCurrentView("otpVerification");
        setCurrentStep(1);
        setOtpTimer(300);
        setCanResendOtp(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (values) => {
    setIsLoading(true);

    try {
      const response = await mockVerifyOTP(email, values.otp);
      if (response.success) {
        message.success("OTP verified successfully!");
        setCurrentView("resetPassword");
        setCurrentStep(2);
      } else {
        message.error(response.message);
        setFormErrors({ otp: response.message });
      }
    } catch (error) {
      message.error("OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      setFormErrors({ confirmPassword: "Passwords don't match" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await mockResetPassword(email, values.newPassword);
      if (response.success) {
        message.success("Password reset successfully!");
        setCurrentView("success");
        setCurrentStep(3);
        setTimeout(() => {
          handleBackToSignIn();
        }, 3000);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Password reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);

    try {
      const response = await mockSendOTP(email);
      if (response.success) {
        message.success("New OTP sent!");
        setOtpTimer(300);
        setCanResendOtp(false);
        otpForm.resetFields();
      }
    } catch (error) {
      message.error("Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignIn = () => {
    setCurrentView("signIn");
    setCurrentStep(0);
    setFormErrors({});
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    form.resetFields();
    forgotForm.resetFields();
    otpForm.resetFields();
    resetForm.resetFields();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderSignInForm = () => (
    <Space direction="vertical" className="w-full">
      <div className="text-center mb-8">
        <Title className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Welcome to Pick Parking
        </Title>
        <Text className="text-gray-500 text-base">
          Sign in to find and manage your parking
        </Text>
      </div>

      <Form
        form={form}
        name="loginForm"
        onFinish={handleSignIn}
        autoComplete="off"
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label={<span className="text-gray-700 font-semibold">Email Address</span>}
          name="email_id"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-gray-700 font-semibold">Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Enter your password"
            className="h-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
        </Form.Item>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-4 h-4 bg-blue-600 rounded border-2 border-gray-300 flex items-center justify-center">
              <HiCheckCircle className="w-3 h-3 text-white" />
            </div>
            <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
              Remember me
            </span>
          </div>
          <Button
            type="link"
            onClick={() => {
              setCurrentView("forgotPassword");
              setCurrentStep(0);
            }}
            className="text-blue-600 hover:text-blue-800 p-0 font-semibold"
          >
            Forgot password?
          </Button>
        </div>

        {formErrors.invalid && (
          <Alert
            message={formErrors.invalid}
            type="error"
            className="mb-4 rounded-lg"
            showIcon
          />
        )}

        <Form.Item className="mb-0">
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={isLoading}
            className="h-12 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <FaCar className="inline mr-2" />
            Sign In
          </Button>
        </Form.Item>

        <div className="text-center mt-4">
          <Button
            type="link"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Create New Account
          </Button>
        </div>
      </Form>
    </Space>
  );

  const renderForgotPasswordForm = () => (
    <Space direction="vertical" className="w-full">
      <div className="text-center mb-8">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={handleBackToSignIn}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 p-0"
        >
          Back
        </Button>
        <Title className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Forgot Password
        </Title>
        <Text className="text-gray-500 text-base">
          Enter your email to receive a parking pass code
        </Text>
      </div>

      <Steps current={currentStep} className="mb-8">
        <Step title="Email" icon={<MailOutlined />} />
        <Step title="Verify Pass" icon={<KeyOutlined />} />
        <Step title="Reset Password" icon={<LockOutlined />} />
        <Step title="Success" icon={<CheckCircleOutlined />} />
      </Steps>

      <Form
        form={forgotForm}
        onFinish={handleForgotPassword}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label={<span className="text-gray-700 font-semibold">Email Address</span>}
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-gray-400" />}
            placeholder="Enter your registered email"
            className="h-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={isLoading}
            className="h-12 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Send Parking Pass Code
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );

  const renderOTPVerificationForm = () => (
    <Space direction="vertical" className="w-full">
      <div className="text-center mb-8">
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => setCurrentView("forgotPassword")}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 p-0"
        >
          Back
        </Button>
        <Title className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Verify Parking Pass
        </Title>
        <Text className="text-gray-500 text-base">
          Enter the 6-digit code sent to {email}
        </Text>
      </div>

      <Steps current={currentStep} className="mb-8">
        <Step title="Email" icon={<MailOutlined />} />
        <Step title="Verify Pass" icon={<KeyOutlined />} />
        <Step title="Reset Password" icon={<LockOutlined />} />
        <Step title="Success" icon={<CheckCircleOutlined />} />
      </Steps>

      <Form
        form={otpForm}
        onFinish={handleVerifyOTP}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label={<span className="text-gray-700 font-semibold">Parking Pass Code</span>}
          name="otp"
          rules={[
            { required: true, message: "Please input the pass code!" },
            { len: 6, message: "Pass code must be 6 digits" },
          ]}
          validateStatus={formErrors.otp ? "error" : ""}
          help={formErrors.otp}
        >
          <Input
            prefix={<KeyOutlined className="text-gray-400" />}
            placeholder="Enter 6-digit code"
            maxLength={6}
            className="h-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center tracking-widest"
            style={{ letterSpacing: "8px" }}
          />
        </Form.Item>

        <div className="text-center mb-6">
          {otpTimer > 0 ? (
            <Text className="text-gray-500">
              Resend code in {formatTime(otpTimer)}
            </Text>
          ) : (
            <Button
              type="link"
              onClick={handleResendOTP}
              loading={isLoading}
              disabled={!canResendOtp}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              <ReloadOutlined /> Resend Code
            </Button>
          )}
        </div>

        <Form.Item className="mb-0">
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={isLoading}
            className="h-12 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Verify Pass Code
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );

  const renderResetPasswordForm = () => (
    <Space direction="vertical" className="w-full">
      <div className="text-center mb-8">
        <Title className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Reset Password
        </Title>
        <Text className="text-gray-500 text-base">
          Create a new password for your parking account
        </Text>
      </div>

      <Steps current={currentStep} className="mb-8">
        <Step title="Email" icon={<MailOutlined />} />
        <Step title="Verify Pass" icon={<KeyOutlined />} />
        <Step title="Reset Password" icon={<LockOutlined />} />
        <Step title="Success" icon={<CheckCircleOutlined />} />
      </Steps>

      <Form
        form={resetForm}
        onFinish={handleResetPassword}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          label={<span className="text-gray-700 font-semibold">New Password</span>}
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
            { min: 8, message: "Password must be at least 8 characters!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Enter new password"
            className="h-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-gray-700 font-semibold">Confirm Password</span>}
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
          validateStatus={formErrors.confirmPassword ? "error" : ""}
          help={formErrors.confirmPassword}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="Confirm new password"
            className="h-12 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            htmlType="submit"
            type="primary"
            block
            loading={isLoading}
            className="h-12 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );

  const renderSuccessView = () => (
    <Space direction="vertical" className="w-full text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleOutlined className="text-3xl text-white" />
        </div>
        <Title className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Password Reset Successful!
        </Title>
        <Text className="text-gray-500 text-base">
          Your parking account password has been reset. You can now sign in.
        </Text>
      </div>

      <Steps current={currentStep} className="mb-8">
        <Step title="Email" icon={<MailOutlined />} />
        <Step title="Verify Pass" icon={<KeyOutlined />} />
        <Step title="Reset Password" icon={<LockOutlined />} />
        <Step title="Success" icon={<CheckCircleOutlined />} />
      </Steps>

      <Button
        type="primary"
        onClick={handleBackToSignIn}
        className="h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] px-8"
      >
        Continue to Sign In
      </Button>
    </Space>
  );

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="absolute top-20 left-20 text-white/20 animate-bounce">
        <FaCar className="w-8 h-8" />
      </div>
      <div className="absolute top-32 right-32 text-white/20 animate-bounce delay-500">
        <HiMap className="w-6 h-6" />
      </div>
      <div className="absolute bottom-40 left-40 text-white/20 animate-bounce delay-1000">
        <FaParking className="w-7 h-7" />
      </div>

      <Row className="min-h-screen w-full">
        <Col xs={0} sm={0} md={8} lg={14} className="hidden md:flex flex-col justify-center items-center p-8 text-white">
          <div className="max-w-lg text-center">
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-400 rounded-2xl flex items-center justify-center shadow-2xl mb-6 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <FaParking className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <HiCheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
                <span className="text-2xl text-blue-100 font-light tracking-wider">Pick Parking</span>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent flex-1"></div>
              </div>
              <p className="text-xl text-blue-100 font-light">
                Smart Parking Solutions
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <FaShieldAlt className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Secure Access</h3>
                  <p className="text-blue-100 text-sm">
                    Protected parking account management
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <HiMap className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Real-Time Navigation</h3>
                  <p className="text-blue-100 text-sm">
                    Find parking spots instantly
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-green-500 rounded-xl flex items-center justify-center">
                  <FaCar className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Seamless Booking</h3>
                  <p className="text-blue-100 text-sm">
                    Reserve spots with ease
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-blue-100 text-sm">Uptime</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-white">100K+</div>
                <div className="text-blue-100 text-sm">Parking Spots</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-blue-100 text-sm">Support</div>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={24} md={14} lg={10} className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-lg">
            <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500"></div>

              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Avatar
                    size={80}
                    className="bg-gradient-to-br from-blue-500 to-teal-600 shadow-2xl border-4 border-white flex items-center justify-center"
                  >
                    <FaParking className="w-10 h-10 text-white" />
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <IoFingerPrint className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {currentView === "signIn" && renderSignInForm()}
              {currentView === "forgotPassword" && renderForgotPasswordForm()}
              {currentView === "otpVerification" && renderOTPVerificationForm()}
              {currentView === "resetPassword" && renderResetPasswordForm()}
              {currentView === "success" && renderSuccessView()}
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;