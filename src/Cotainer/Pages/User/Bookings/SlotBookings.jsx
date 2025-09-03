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

  const MapPlaceholder = () => (
    <div className="w-full h-64 lg:h-96 rounded-lg overflow-hidden border-2 border-gray-200">
      <img
        src="https://images.unsplash.com/photo-1590595979850-8014f717a4a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
        alt="Parking lot map placeholder"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded">
        <Text className="text-gray-600 flex items-center">
          <EnvironmentOutlined className="mr-2" />
          {parkingLotData.address}
        </Text>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className=" mx-auto">
        {/* Steps Progress */}
        <div className="mb-8">
          <Steps
            current={currentStep}
            items={steps}
            className="max-w-md mx-auto"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Title level={3} className="mb-0 text-gray-800">
                    {parkingLotData.name}
                  </Title>
                  <Tag color="green" className="text-sm">
                    {parkingLotData.availableSlots} available
                  </Tag>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <EnvironmentOutlined className="mr-2" />
                    <Text>{parkingLotData.address}</Text>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Rate
                      disabled
                      allowHalf
                      value={parkingLotData.rating}
                      className="text-sm mr-2"
                    />
                    <Text>
                      {parkingLotData.rating} ({parkingLotData.reviews} reviews)
                    </Text>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <ClockCircleOutlined className="mr-2" />
                    <Text>
                      Operating Hours: {parkingLotData.operatingHours}
                    </Text>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Text className="text-sm text-gray-600">Total Slots</Text>
                    <div className="text-2xl font-bold text-blue-600">
                      {parkingLotData.totalSlots}
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <Text className="text-sm text-gray-600">Price/Hour</Text>
                    <div className="text-2xl font-bold text-green-600">
                      ${parkingLotData.pricePerHour}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Text className="text-sm text-gray-600">Amenities</Text>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {parkingLotData.amenities.map((amenity, index) => (
                      <Tag
                        key={index}
                        icon={
                          amenity.includes("CCTV") ? (
                            <CameraOutlined />
                          ) : amenity.includes("Security") ? (
                            <SafetyOutlined />
                          ) : (
                            <WifiOutlined />
                          )
                        }
                        color="blue"
                      >
                        {amenity}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Map */}
            <Card className="shadow-lg">
              <MapPlaceholder />
            </Card>
          </div>

          {/* Right Column - Booking Form & Slots */}
          <div className="space-y-6">
            {/* Step 1: Booking Form */}
            {currentStep === 0 && (
              <Card className="shadow-lg">
                <Title level={3} className="mb-6">
                  <CalendarOutlined className="mr-2" />
                  Booking Details
                </Title>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleFormSubmit}
                  className="space-y-4"
                >
                  <Form.Item
                    name="vehicleType"
                    label="Vehicle Type"
                    rules={[
                      { required: true, message: "Please select vehicle type" },
                    ]}
                  >
                    <Select placeholder="Select your vehicle type" size="large">
                      {vehicleTypes.map((type) => (
                        <Option key={type.value} value={type.value}>
                          <span className="mr-2">{type.icon}</span>
                          {type.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="date"
                    label="Booking Date"
                    rules={[{ required: true, message: "Please select date" }]}
                  >
                    <DatePicker
                      className="w-full"
                      size="large"
                      disabledDate={(current) =>
                        current && current < dayjs().startOf("day")
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name="timeRange"
                    label="Time Range"
                    rules={[
                      { required: true, message: "Please select time range" },
                    ]}
                  >
                    <RangePicker
                      className="w-full"
                      size="large"
                      format="HH:mm"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Search Available Slots
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            )}

            {/* Step 2: Slot Selection */}
            {currentStep === 1 && (
              <Card className="shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <Title level={3} className="mb-0">
                    Available Slots
                  </Title>
                  <Button
                    onClick={() => setCurrentStep(0)}
                    className="text-blue-600"
                  >
                    ← Back to Details
                  </Button>
                </div>
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <Text className="text-sm">
                    Selected:{" "}
                    {
                      vehicleTypes.find(
                        (v) => v.value === bookingData.vehicleType
                      )?.label
                    }{" "}
                    | {bookingData.date?.format("MMM DD, YYYY")} |{" "}
                    {bookingData.timeRange?.[0]?.format("HH:mm")} -{" "}
                    {bookingData.timeRange?.[1]?.format("HH:mm")}
                  </Text>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                  {availableSlots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => slot.available && handleSlotSelect(slot)}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${
                          slot.available
                            ? "border-green-200 bg-green-50 hover:border-green-400 hover:shadow-md"
                            : "border-red-200 bg-red-50 cursor-not-allowed opacity-60"
                        }
                      `}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">
                          {slot.number}
                        </div>
                        <div className="text-sm text-gray-600">
                          ${slot.price}/hr
                        </div>
                        <div
                          className={`text-xs mt-1 ${
                            slot.available ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {slot.available ? "Available" : "Occupied"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 2 && selectedSlot && (
              <Card className="shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <Title level={3} className="mb-0">
                    <CheckCircleOutlined className="mr-2 text-green-600" />
                    Confirm Booking
                  </Title>
                  <Button
                    onClick={() => setCurrentStep(1)}
                    className="text-blue-600"
                  >
                    ← Change Slot
                  </Button>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Title level={4} className="mb-3">
                      Booking Summary
                    </Title>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Text>Parking Lot:</Text>
                        <Text strong>{parkingLotData.name}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text>Slot:</Text>
                        <Text strong>{selectedSlot.number}</Text>
                      </div>
                      <div className="flex justify-between">
                        <Text>Vehicle:</Text>
                        <Text strong>
                          {
                            vehicleTypes.find(
                              (v) => v.value === bookingData.vehicleType
                            )?.label
                          }
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text>Date:</Text>
                        <Text strong>
                          {bookingData.date?.format("MMM DD, YYYY")}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text>Time:</Text>
                        <Text strong>
                          {bookingData.timeRange?.[0]?.format("HH:mm")} -{" "}
                          {bookingData.timeRange?.[1]?.format("HH:mm")}
                        </Text>
                      </div>
                      <Divider />
                      <div className="flex justify-between">
                        <Text>Duration:</Text>
                        <Text strong>
                          {calculateDuration().toFixed(1)} hours
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text>Rate:</Text>
                        <Text strong>${selectedSlot.price}/hour</Text>
                      </div>
                      <div className="flex justify-between text-lg">
                        <Text strong>Total Amount:</Text>
                        <Text strong className="text-green-600">
                          ${calculateTotal()}
                        </Text>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    loading={loading}
                    onClick={handleBookingConfirm}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Confirm Booking & Pay ${calculateTotal()}
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
        <Modal
          title={
            <div className="text-center">
              <CheckCircleOutlined className="text-4xl text-green-600 mb-2" />
              <div>Booking Confirmed!</div>
            </div>
          }
          open={confirmModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button
              key="close"
              type="primary"
              onClick={handleModalClose}
              className="bg-blue-600"
            >
              Close
            </Button>,
          ]}
          centered
        >
          <div className="text-center space-y-4 py-4">
            <Text className="text-lg">
              Your parking slot has been successfully booked!
            </Text>
            <div className="bg-green-50 p-4 rounded-lg space-y-2">
              <div>
                <strong>Booking ID:</strong> PB{Date.now().toString().slice(-6)}
              </div>
              <div>
                <strong>Slot:</strong> {selectedSlot?.number}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {bookingData.date?.format("MMM DD, YYYY")}
              </div>
              <div>
                <strong>Time:</strong>{" "}
                {bookingData.timeRange?.[0]?.format("HH:mm")} -{" "}
                {bookingData.timeRange?.[1]?.format("HH:mm")}
              </div>
              <div>
                <strong>Total Paid:</strong> ${calculateTotal()}
              </div>
            </div>
            <Text className="text-sm text-gray-600">
              Please arrive on time and present this booking confirmation.
            </Text>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SlotBooking;
