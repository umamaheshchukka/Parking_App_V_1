// import React from "react";
// import { Form, Input, Button, Radio, Checkbox, Typography, Space } from "antd";
// import { CheckCircleOutlined } from "@ant-design/icons";
// import { startRegUser } from "../../../Actions/Auth/Auth";
// import { useDispatch } from "react-redux";
// import { ImageCarousel } from "./ImageShow";

// const { Title, Paragraph } = Typography;
// const url = import.meta.env.VITE_PARKING_URL;

// const RegisterComponent = () => {
//   console.log(url, "url");
//   const [form] = Form.useForm();
//   const dispatch = useDispatch();

//   const onFinish = (values) => {
//     dispatch(startRegUser(values)).then((res) => {
//       console.log(res);
//     });
//   };

//   return (
//     <>
//       <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-10">
//         {/* Image Carousel Section */}
//         <div className="lg:col-span-2 flex items-center justify-center">
//           <ImageCarousel />
//         </div>

//         {/* Form Section */}
//         <div className="flex items-center justify-center">
//           <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-2 sm:p-6 transform transition-all duration-300 hover:scale-[1.01]">
//             <div className="flex justify-center mb-4">
//               <Title
//                 level={2}
//                 className="!text-xl sm:!text-2xl !font-bold !text-transparent !bg-clip-text !bg-gradient-to-r !from-red-500 !to-yellow-500"
//               >
//                 🚙 Create an Account
//               </Title>
//             </div>

//             <Form
//               form={form}
//               layout="vertical"
//               onFinish={onFinish}
//               autoComplete="off"
//               className="space-y-3"
//             >
//               <Form.Item
//                 label={
//                   <span className="text-gray-700 font-medium">📧 Email</span>
//                 }
//                 name="email"
//                 rules={[
//                   { required: true, message: "Email is required" },
//                   { type: "email", message: "Please enter a valid email" },
//                 ]}
//               >
//                 <Input
//                   className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
//                   placeholder="you@example.com"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label={
//                   <span className="text-gray-700 font-medium">👤 Username</span>
//                 }
//                 name="name"
//                 rules={[{ required: true, message: "Username is required" }]}
//               >
//                 <Input
//                   className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
//                   placeholder="Choose a username"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label={
//                   <span className="text-gray-700 font-medium">🔒 Password</span>
//                 }
//                 name="password"
//                 rules={[{ required: true, message: "Password is required" }]}
//               >
//                 <Input.Password
//                   className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
//                   placeholder="Create a password"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label={
//                   <span className="text-gray-700 font-medium">📱 Phone</span>
//                 }
//                 name="phone"
//                 rules={[
//                   { required: true, message: "Phone number is required" },
//                 ]}
//               >
//                 <Input
//                   maxLength={10}
//                   className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
//                   placeholder="Enter phone number"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label={
//                   <span className="text-gray-700 font-medium">
//                     🧾 Account Type
//                   </span>
//                 }
//                 name="role"
//                 rules={[
//                   { required: true, message: "Please select an account type" },
//                 ]}
//               >
//                 <Radio.Group className="flex flex-col sm:flex-row gap-4">
//                   <Radio value="customer" className="text-gray-700">
//                     🅿️ Looking for Parking
//                   </Radio>
//                   <Radio value="owner" className="text-gray-700">
//                     🏠 Have Parking Space
//                   </Radio>
//                 </Radio.Group>
//               </Form.Item>

//               <Form.Item
//                 name="agreement"
//                 valuePropName="checked"
//                 rules={[
//                   {
//                     validator: (_, value) =>
//                       value
//                         ? Promise.resolve()
//                         : Promise.reject("You must agree to the terms"),
//                   },
//                 ]}
//               >
//                 <Checkbox className="text-gray-700">
//                   ✅ I agree to the{" "}
//                   <a href="#" className="text-blue-500 hover:underline">
//                     Terms & Privacy
//                   </a>
//                 </Checkbox>
//               </Form.Item>

//               <Form.Item>
//                 <Button
//                   type="primary"
//                   htmlType="submit"
//                   block
//                   className="!bg-blue-600 hover:!bg-blue-700 !border-none !rounded-full !h-9 !font-semibold !text-white transition-colors"
//                 >
//                   🚀 Create Account
//                 </Button>
//               </Form.Item>

//               <Paragraph className="text-center text-gray-600 text-sm">
//                 Already have an account?{" "}
//                 <a href="/siginin" className="text-blue-500 hover:underline">
//                   Login
//                 </a>
//               </Paragraph>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RegisterComponent;
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  Typography,
  Space,
  message,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { startRegUser } from "../../../Actions/Auth/Auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImageCarousel } from "./ImageShow";

const { Title, Paragraph } = Typography;
const url = import.meta.env.VITE_PARKING_URL;

const RegisterComponent = () => {
  console.log(url, "url");
  const [form] = Form.useForm();
  const [otpForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOtpStage, setIsOtpStage] = useState(true);
  const [email, setEmail] = useState("");

  const onFinish = (values) => {
    setEmail(values.email);
    dispatch(startRegUser(values))
      .then((res) => {
        if (res.success) {
          message.success(
            "Registration successful! Please check your email for OTP."
          );
          setIsOtpStage(true);
        } else {
          message.error(
            res.message || "Registration failed. Please try again."
          );
        }
      })
      .catch((error) => {
        message.error("An error occurred during registration.");
        console.error(error);
      });
  };

  const onOtpFinish = (values) => {
    // dispatch(verifyOtp({ email, otp: values.otp }))
    //   .then((res) => {
    //     if (res.success) {
    //       message.success("OTP verified successfully!");
    //       navigate("/siginin");
    //     } else {
    //       message.error(res.message || "Invalid OTP. Please try again.");
    //     }
    //   })
    //   .catch((error) => {
    //     message.error("An error occurred during OTP verification.");
    //     console.error(error);
    //   });
  };

  return (
    <>
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-10 px-4 sm:px-6 lg:px-8 py-10">
        {/* Image Carousel Section */}
        <div className="lg:col-span-2 flex items-center justify-center min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] w-full">
          <ImageCarousel />
        </div>

        {/* Form Section */}
        <div className="flex items-center justify-center min-h-[400px] sm:min-h-[500px]">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-2 sm:p-6 transform transition-all duration-300 hover:scale-[1.01]">
            <div className="flex justify-center mb-4">
              <Title
                level={2}
                className="!text-xl sm:!text-2xl !font-bold !text-transparent !bg-clip-text !bg-gradient-to-r !from-red-500 !to-yellow-500"
              >
                {isOtpStage ? "🔐 Verify OTP" : "🚙 Create an Account"}
              </Title>
            </div>

            {!isOtpStage ? (
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="space-y-3"
              >
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">📧 Email</span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Email is required" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                    placeholder="you@example.com"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      👤 Username
                    </span>
                  }
                  name="name"
                  rules={[{ required: true, message: "Username is required" }]}
                >
                  <Input
                    className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                    placeholder="Choose a username"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      🔒 Password
                    </span>
                  }
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password
                    className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                    placeholder="Create a password"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">📱 Phone</span>
                  }
                  name="phone"
                  rules={[
                    { required: true, message: "Phone number is required" },
                  ]}
                >
                  <Input
                    maxLength={10}
                    className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                    placeholder="Enter phone number"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      🧾 Account Type
                    </span>
                  }
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please select an account type",
                    },
                  ]}
                >
                  <Radio.Group className="flex flex-col sm:flex-row gap-4">
                    <Radio value="customer" className="text-gray-700">
                      🅿️ Looking for Parking
                    </Radio>
                    <Radio value="owner" className="text-gray-700">
                      🏠 Have Parking Space
                    </Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("You must agree to the terms"),
                    },
                  ]}
                >
                  <Checkbox className="text-gray-700">
                    ✅ I agree to the{" "}
                    <a href="#" className="text-blue-500 hover:underline">
                      Terms & Privacy
                    </a>
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="!bg-blue-600 hover:!bg-blue-700 !border-none !rounded-full !h-9 !font-semibold !text-white transition-colors"
                  >
                    🚀 Create Account
                  </Button>
                </Form.Item>

                <Paragraph className="text-center text-gray-600 text-sm">
                  Already have an account?{" "}
                  <a href="/siginin" className="text-blue-500 hover:underline">
                    Login
                  </a>
                </Paragraph>
              </Form>
            ) : (
              <Form
                form={otpForm}
                layout="vertical"
                onFinish={onOtpFinish}
                autoComplete="off"
                className="space-y-3"
              >
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">🔢 OTP</span>
                  }
                  name="otp"
                  rules={[
                    { required: true, message: "OTP is required" },
                    { len: 6, message: "OTP must be 6 digits" },
                    { pattern: /^\d{6}$/, message: "OTP must be 6 digits" },
                  ]}
                >
                  <Input
                    className="rounded-lg border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    className="!bg-blue-600 hover:!bg-blue-700 !border-none !rounded-full !h-9 !font-semibold !text-white transition-colors"
                  >
                    ✅ Verify OTP
                  </Button>
                </Form.Item>

                <Paragraph className="text-center text-gray-600 text-sm">
                  Back to{" "}
                  <a
                    href="#"
                    onClick={() => setIsOtpStage(false)}
                    className="text-blue-500 hover:underline"
                  >
                    Registration
                  </a>
                </Paragraph>
              </Form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
