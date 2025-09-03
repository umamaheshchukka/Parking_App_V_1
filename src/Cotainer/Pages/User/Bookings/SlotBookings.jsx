import React, { useState, useEffect } from "react";
import {
  Form,
  Select,
  DatePicker,
  TimePicker,
  Button,
  Card,
  Modal,
  Steps,
  Row,
  Col,
  message,
  Typography,
  Tag,
  Divider,
  Rate,
  List,
} from "antd";
import {
  CarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  WifiOutlined,
  SafetyOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = TimePicker;

// Mock data
const parkingLotData = {
  name: "City Center Parking Plaza",
  address: "123 Main Street, Downtown District",
  totalSlots: 50,
  availableSlots: 23,
  pricePerHour: 5,
  coordinates: { lat: 40.7128, lng: -74.006 },
  rating: 4.5,
  reviews: 128,
  amenities: ["CCTV Surveillance", "24/7 Security", "Free WiFi", "EV Charging"],
  operatingHours: "24/7",
};

const generateSlots = (vehicleType, date, timeRange) => {
  const slots = [];
  const totalSlots =
    vehicleType === "bike" ? 20 : vehicleType === "ev" ? 8 : 15;

  for (let i = 1; i <= totalSlots; i++) {
    slots.push({
      id: `${vehicleType}-${i}`,
      number: `${vehicleType.toUpperCase()}-${i.toString().padStart(2, "0")}`,
      type: vehicleType,
      available: Math.random() > 0.3, // 70% availability
      price: vehicleType === "ev" ? 8 : vehicleType === "bike" ? 3 : 5,
    });
  }
  return slots;
};

const SlotBooking = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingData, setBookingData] = useState({});
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const vehicleTypes = [
    { value: "car", label: "Car", icon: "🚗" },
    { value: "bike", label: "Motorcycle", icon: "🏍️" },
    { value: "ev", label: "Electric Vehicle", icon: "⚡" },
  ];

  const steps = [
    {
      title: "Details",
      description: "Vehicle & Time",
    },
    {
      title: "Select Slot",
      description: "Choose parking spot",
    },
    {
      title: "Confirm",
      description: "Review & book",
    },
  ];

  const handleFormSubmit = (values) => {
    setBookingData(values);
    const slots = generateSlots(
      values.vehicleType,
      values.date,
      values.timeRange
    );
    setAvailableSlots(slots);
    setCurrentStep(1);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setCurrentStep(2);
  };

  const handleBookingConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setConfirmModalVisible(true);
      message.success("Parking slot booked successfully!");
    }, 1500);
  };

  const handleModalClose = () => {
    setConfirmModalVisible(false);
    form.resetFields();
    setCurrentStep(0);
    setSelectedSlot(null);
    setAvailableSlots([]);
    setBookingData({});
  };

  const calculateDuration = () => {
    if (bookingData.timeRange) {
      const start = bookingData.timeRange[0];
      const end = bookingData.timeRange[1];
      return end.diff(start, "hour", true);
    }
    return 0;
  };

  const calculateTotal = () => {
    if (selectedSlot) {
      return (selectedSlot.price * calculateDuration()).toFixed(2);
    }
    return 0;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 p-4 lg:p-8">
      <div className=" mx-auto">
        {/* Enhanced Steps Progress */}
        <div className="flex justify-center mb-12">
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl p-6 shadow-lg border border-white/50">
            <Steps
              current={currentStep}
              items={steps}
              className="max-w-md mx-auto"
              size="small"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Left Column - Enhanced Info Cards */}
          <div className="xl:col-span-2 space-y-6">
            {/* Main Info Card */}
            <div className="group">
              <Card className="shadow-xl border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div class="flex items-center gap-10 w-full mb-6">
                  <div className="flex flex-col space-y-2">
                    <Title
                      level={3}
                      className="mb-0 text-slate-800 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                    >
                      {parkingLotData.name}
                    </Title>
                    <div className="flex items-center space-x-4">
                      <Tag className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 px-3 py-1 rounded-full font-medium shadow-lg">
                        <span className="animate-pulse inline-block w-2 h-2 bg-white rounded-full mr-2"></span>
                        {parkingLotData.availableSlots} available
                      </Tag>
                      <div className="flex items-center space-x-1">
                        <Rate
                          disabled
                          allowHalf
                          value={parkingLotData.rating}
                          className="text-amber-400"
                        />
                        <Text className="text-slate-600 font-medium">
                          ({parkingLotData.reviews})
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center text-slate-600 group-hover:text-slate-800 transition-colors">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <EnvironmentOutlined className="text-blue-600" />
                      </div>
                      <Text className="font-medium">
                        {parkingLotData.address}
                      </Text>
                    </div>
                    <div className="flex items-center text-slate-600 group-hover:text-slate-800 transition-colors">
                      <div className="p-2 bg-amber-100 rounded-lg mr-3">
                        <ClockCircleOutlined className="text-amber-600" />
                      </div>
                      <Text className="font-medium">
                        Operating: {parkingLotData.operatingHours}
                      </Text>
                    </div>
                  </div>
                  <img
                    class="mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-right ..."
                    src="https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <Text className="text-blue-100 text-sm font-medium">
                        Total Slots
                      </Text>
                      <div className="text-3xl font-bold">
                        {parkingLotData.totalSlots}
                      </div>
                    </div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                      <Text className="text-green-100 text-sm font-medium">
                        From
                      </Text>
                      <div className="text-3xl font-bold">
                        ${parkingLotData.pricePerHour}
                        <span className="text-lg">/hr</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                  <Text className="text-slate-700 font-semibold text-lg">
                    Premium Amenities
                  </Text>
                  <div className="grid grid-cols-2 gap-3">
                    {parkingLotData.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300 hover:border-blue-200"
                      >
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {amenity.includes("CCTV") ? (
                            <CameraOutlined className="text-blue-600" />
                          ) : amenity.includes("Security") ? (
                            <SafetyOutlined className="text-blue-600" />
                          ) : (
                            <WifiOutlined className="text-blue-600" />
                          )}
                        </div>
                        <Text className="font-medium text-slate-700">
                          {amenity}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="xl:col-span-3 space-y-6">
            {/* Step 1: Enhanced Booking Form */}
            {currentStep === 0 && (
              <div className="animate-slide-in">
                <Card className="shadow-xl border-0 rounded-2xl bg-gradient-to-br from-white via-white to-blue-50/30 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl">
                        <CalendarOutlined className="text-white text-xl" />
                      </div>
                      <Title level={3} className="mb-0 text-slate-800">
                        Booking Details
                      </Title>
                    </div>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleFormSubmit}
                      className="space-y-6"
                    >
                      <Form.Item
                        name="vehicleType"
                        label={
                          <span className="text-slate-700 font-semibold">
                            Vehicle Type
                          </span>
                        }
                        rules={[
                          {
                            required: true,
                            message: "Please select vehicle type",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select your vehicle type"
                          size="large"
                          className="rounded-xl"
                        >
                          {vehicleTypes.map((type) => (
                            <Option key={type.value} value={type.value}>
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{type.icon}</span>
                                <span className="font-medium">
                                  {type.label}
                                </span>
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Form.Item
                          name="date"
                          label={
                            <span className="text-slate-700 font-semibold">
                              Booking Date
                            </span>
                          }
                          rules={[
                            { required: true, message: "Please select date" },
                          ]}
                        >
                          <DatePicker
                            className="w-full rounded-xl"
                            size="large"
                            disabledDate={(current) =>
                              current && current < dayjs().startOf("day")
                            }
                          />
                        </Form.Item>
                        <Form.Item
                          name="timeRange"
                          label={
                            <span className="text-slate-700 font-semibold">
                              Time Range
                            </span>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Please select time range",
                            },
                          ]}
                        >
                          <RangePicker
                            className="w-full rounded-xl"
                            size="large"
                            format="HH:mm"
                          />
                        </Form.Item>
                      </div>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          size="large"
                          className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <span className="flex items-center justify-center space-x-2">
                            <CarOutlined />
                            <span>Search Available Slots</span>
                          </span>
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </Card>
              </div>
            )}

            {/* Step 2: Enhanced Slot Selection */}
            {currentStep === 1 && (
              <div className="animate-slide-in space-y-6">
                <Card className="shadow-xl border-0 rounded-2xl bg-white/95 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <Title level={3} className="mb-0 text-slate-800">
                      Available Slots
                    </Title>
                    <Button
                      onClick={() => setCurrentStep(0)}
                      className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl font-medium px-6"
                    >
                      ← Back to Details
                    </Button>
                  </div>

                  <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl mb-1">
                          {
                            vehicleTypes.find(
                              (v) => v.value === bookingData.vehicleType
                            )?.icon
                          }
                        </div>
                        <Text className="text-slate-700 font-medium">
                          {
                            vehicleTypes.find(
                              (v) => v.value === bookingData.vehicleType
                            )?.label
                          }
                        </Text>
                      </div>
                      <div>
                        <div className="text-blue-600 font-bold text-lg">
                          {bookingData.date?.format("MMM DD, YYYY")}
                        </div>
                        <Text className="text-slate-600">Date</Text>
                      </div>
                      <div>
                        <div className="text-indigo-600 font-bold text-lg">
                          {bookingData.timeRange?.[0]?.format("HH:mm")} -{" "}
                          {bookingData.timeRange?.[1]?.format("HH:mm")}
                        </div>
                        <Text className="text-slate-600">Time</Text>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto custom-scrollbar">
                    {availableSlots.map((slot, index) => (
                      <div
                        key={slot.id}
                        onClick={() => slot.available && handleSlotSelect(slot)}
                        className={`
                          relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform
                          ${
                            slot.available
                              ? "border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 hover:border-emerald-400 hover:shadow-lg hover:scale-105 hover:-translate-y-1"
                              : "border-red-200 bg-gradient-to-br from-red-50 to-pink-50 cursor-not-allowed opacity-70"
                          }
                        `}
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        {slot.available && (
                          <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                        )}
                        <div className="text-center space-y-2">
                          <div className="text-xl font-bold text-slate-800">
                            {slot.number}
                          </div>
                          <div className="text-lg font-semibold text-blue-600">
                            ${slot.price}/hr
                          </div>
                          <div
                            className={`text-sm font-medium px-3 py-1 rounded-full ${
                              slot.available
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {slot.available ? "Available" : "Occupied"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Step 3: Enhanced Confirmation */}
            {currentStep === 2 && selectedSlot && (
              <div className="animate-slide-in space-y-6">
                <Card className="shadow-xl border-0 rounded-2xl bg-gradient-to-br from-white via-green-50/20 to-emerald-50/30 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full -mr-20 -mt-20"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl">
                          <CheckCircleOutlined className="text-white text-2xl" />
                        </div>
                        <Title level={3} className="mb-0 text-slate-800">
                          Confirm Booking
                        </Title>
                      </div>
                      <Button
                        onClick={() => setCurrentStep(1)}
                        className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl font-medium px-6"
                      >
                        ← Change Slot
                      </Button>
                    </div>

                    <div className="space-y-8">
                      {/* Selected Slot Highlight */}
                      <div className="text-center p-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white">
                        <div className="text-4xl font-bold mb-2">
                          {selectedSlot.number}
                        </div>
                        <div className="text-blue-100 text-lg">
                          Selected Parking Slot
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200">
                        <Title
                          level={4}
                          className="mb-6 text-slate-800 flex items-center"
                        >
                          <span className="mr-2">📋</span>
                          Booking Summary
                        </Title>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-slate-200">
                              <Text className="text-slate-600">
                                Parking Lot:
                              </Text>
                              <Text className="font-semibold text-slate-800">
                                {parkingLotData.name}
                              </Text>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-200">
                              <Text className="text-slate-600">Vehicle:</Text>
                              <div className="flex items-center space-x-2">
                                <span>
                                  {
                                    vehicleTypes.find(
                                      (v) => v.value === bookingData.vehicleType
                                    )?.icon
                                  }
                                </span>
                                <Text className="font-semibold text-slate-800">
                                  {
                                    vehicleTypes.find(
                                      (v) => v.value === bookingData.vehicleType
                                    )?.label
                                  }
                                </Text>
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-3">
                              <Text className="text-slate-600">Date:</Text>
                              <Text className="font-semibold text-slate-800">
                                {bookingData.date?.format("MMM DD, YYYY")}
                              </Text>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-slate-200">
                              <Text className="text-slate-600">Time:</Text>
                              <Text className="font-semibold text-slate-800">
                                {bookingData.timeRange?.[0]?.format("HH:mm")} -{" "}
                                {bookingData.timeRange?.[1]?.format("HH:mm")}
                              </Text>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-slate-200">
                              <Text className="text-slate-600">Duration:</Text>
                              <Text className="font-semibold text-slate-800">
                                {calculateDuration().toFixed(1)} hours
                              </Text>
                            </div>
                            <div className="flex justify-between items-center py-3">
                              <Text className="text-slate-600">Rate:</Text>
                              <Text className="font-semibold text-slate-800">
                                ${selectedSlot.price}/hour
                              </Text>
                            </div>
                          </div>
                        </div>

                        <Divider className="my-6" />

                        <div className="flex justify-between items-center p-6 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl">
                          <Text className="text-2xl font-bold text-slate-800">
                            Total Amount:
                          </Text>
                          <Text className="text-3xl font-bold text-emerald-600">
                            ${calculateTotal()}
                          </Text>
                        </div>
                      </div>

                      <Button
                        type="primary"
                        size="large"
                        loading={loading}
                        onClick={handleBookingConfirm}
                        className="w-full h-16 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 border-0 rounded-2xl font-bold text-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      >
                        {loading ? (
                          <span>Processing...</span>
                        ) : (
                          <span className="flex items-center justify-center space-x-3">
                            <CheckCircleOutlined className="text-2xl" />
                            <span>
                              Confirm Booking & Pay ${calculateTotal()}
                            </span>
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
        <Modal
          open={confirmModalVisible}
          onCancel={handleModalClose}
          footer={null}
          centered
          width={600}
          className="booking-success-modal"
        >
          <div className="text-center space-y-6 py-8">
            <div className="animate-bounce">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <CheckCircleOutlined className="text-4xl text-white" />
              </div>
            </div>

            <div>
              <Title level={2} className="text-slate-800 mb-4">
                🎉 Booking Confirmed!
              </Title>
              <Text className="text-lg text-slate-600">
                Your parking slot has been successfully reserved!
              </Text>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Text className="text-slate-600">Booking ID:</Text>
                    <Text className="font-bold text-slate-800">
                      PB{Date.now().toString().slice(-6)}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text className="text-slate-600">Slot:</Text>
                    <Text className="font-bold text-emerald-600">
                      {selectedSlot?.number}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text className="text-slate-600">Date:</Text>
                    <Text className="font-bold text-slate-800">
                      {bookingData.date?.format("MMM DD, YYYY")}
                    </Text>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Text className="text-slate-600">Time:</Text>
                    <Text className="font-bold text-slate-800">
                      {bookingData.timeRange?.[0]?.format("HH:mm")} -{" "}
                      {bookingData.timeRange?.[1]?.format("HH:mm")}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text className="text-slate-600">Duration:</Text>
                    <Text className="font-bold text-slate-800">
                      {calculateDuration().toFixed(1)} hours
                    </Text>
                  </div>
                  <div className="flex justify-between border-t border-emerald-200 pt-3">
                    <Text className="text-slate-600 font-semibold">
                      Total Paid:
                    </Text>
                    <Text className="font-bold text-2xl text-emerald-600">
                      ${calculateTotal()}
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <Text className="text-slate-700 flex items-center justify-center space-x-2">
                <span>📱</span>
                <span>
                  Please arrive on time and present this booking confirmation
                </span>
              </Text>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                type="primary"
                onClick={handleModalClose}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 rounded-xl px-8 py-3 font-semibold"
                size="large"
              >
                Close
              </Button>
              <Button
                className="border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-xl px-8 py-3 font-semibold"
                size="large"
              >
                Download Receipt
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SlotBooking;
