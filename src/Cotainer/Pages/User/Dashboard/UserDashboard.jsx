import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Modal,
  Table,
  Card,
  Avatar,
  Badge,
  Tabs,
  Space,
  Typography,
  Row,
  Col,
  Statistic,
  notification,
  Tag,
  Rate,
  DatePicker,
  TimePicker,
  Steps,
  Progress,
  Tooltip,
  Popconfirm,
  Image,
  Drawer,
  List,
  Radio,
  Divider,
  message,
} from "antd";
import {
  CarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  HistoryOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DashboardOutlined,
  BellOutlined,
  SettingOutlined,
  SearchOutlined,
  CreditCardOutlined,
  HeartOutlined,
  WalletOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import VehiclesAdd from "../Vehicles/VehiclesAdd";
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [form] = Form.useForm();
  const [bookingForm] = Form.useForm();
  const [paymentForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  // Modal states
  const [isVehicleModalVisible, setIsVehicleModalVisible] = useState(false);
  const [isNotificationDrawerVisible, setIsNotificationDrawerVisible] =
    useState(false);

  // Edit states
  const [editingVehicle, setEditingVehicle] = useState(null);

  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 234 567 8900",
    membershipTier: "Gold",
    walletBalance: 125.5,
    loyaltyPoints: 2450,
  });

  // Vehicles data
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      type: "car",
      brand: "Toyota",
      model: "Camry",
      plateNumber: "ABC-1234",
      color: "Blue",
      year: "2022",
      isDefault: true,
      isVerified: true,
      addedDate: "2024-01-15",
      image: "/api/placeholder/150/100",
    },
    {
      id: 2,
      type: "motorcycle",
      brand: "Honda",
      model: "CBR600RR",
      plateNumber: "XYZ-5678",
      color: "Red",
      year: "2023",
      isDefault: false,
      isVerified: true,
      addedDate: "2024-02-10",
      image: "/api/placeholder/150/100",
    },
  ]);

  // Bookings data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      location: "City Mall Parking",
      address: "123 Main St, Downtown",
      date: "2024-08-07",
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      vehicle: "Toyota Camry (ABC-1234)",
      vehicleId: 1,
      status: "confirmed",
      price: 15.0,
      slotNumber: "A-101",
      ownerName: "Sarah Johnson",
      ownerRating: 4.8,
      paymentStatus: "paid",
      bookingCode: "PK001234",
      features: ["Covered", "Security Camera", "EV Charging"],
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: 2,
      location: "Office Complex",
      address: "456 Business Ave",
      date: "2024-08-05",
      startTime: "9:00 AM",
      endTime: "6:00 PM",
      vehicle: "Honda CBR (XYZ-5678)",
      vehicleId: 2,
      status: "completed",
      price: 25.0,
      slotNumber: "B-205",
      ownerName: "Mike Chen",
      ownerRating: 4.6,
      paymentStatus: "paid",
      bookingCode: "PK001235",
      features: ["Indoor", "24/7 Access"],
      rating: 5,
      review: "Great parking spot, very convenient location!",
    },
    {
      id: 3,
      location: "Airport Terminal 1",
      address: "789 Airport Rd",
      date: "2024-08-10",
      startTime: "6:00 AM",
      endTime: "8:00 PM",
      vehicle: "Toyota Camry (ABC-1234)",
      vehicleId: 1,
      status: "pending",
      price: 45.0,
      slotNumber: "C-312",
      ownerName: "Lisa Park",
      ownerRating: 4.9,
      paymentStatus: "pending",
      bookingCode: "PK001236",
      features: ["Shuttle Service", "Long-term", "Security"],
    },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking_accepted",
      title: "Booking Accepted!",
      message:
        "Your parking request for City Mall has been accepted by Sarah Johnson.",
      timestamp: "5 minutes ago",
      read: false,
      bookingId: 1,
    },
    {
      id: 2,
      type: "payment_reminder",
      title: "Payment Due",
      message: "Please complete payment for your Airport Terminal 1 booking.",
      timestamp: "1 hour ago",
      read: false,
      bookingId: 3,
    },
    {
      id: 3,
      type: "booking_completed",
      title: "Booking Completed",
      message:
        "Your parking session at Office Complex has ended. Rate your experience!",
      timestamp: "2 days ago",
      read: true,
      bookingId: 2,
    },
  ]);

  // Handle vehicle operations
  const showVehicleModal = (vehicle = null) => {
    setEditingVehicle(vehicle);
    setIsVehicleModalVisible(true);
    if (vehicle) {
      form.setFieldsValue(vehicle);
    } else {
      form.resetFields();
    }
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(
      notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className=" sticky top-0 z-50">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-16">
            <div className="flex items-center space-x-4">
              <Badge count={unreadNotifications}>
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  onClick={() => setIsNotificationDrawerVisible(true)}
                  className="text-gray-600 hover:text-blue-600"
                />
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <Title level={2} className="text-white mb-2">
                  Welcome back, {userProfile.name}!
                </Title>
                <Text className="text-blue-100 text-lg">
                  Find and book your perfect parking spot
                </Text>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <GiftOutlined className="text-yellow-300" />
                    <Text className="text-white">
                      {userProfile.membershipTier} Member
                    </Text>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThunderboltOutlined className="text-yellow-300" />
                    <Text className="text-white">
                      {userProfile.loyaltyPoints} Points
                    </Text>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Avatar
                  size={80}
                  icon={<UserOutlined />}
                  className="bg-white text-blue-600 mb-2"
                />
                <div className="text-white text-sm">
                  Wallet: ${userProfile.walletBalance}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-green-50 to-green-100"
              onClick={() => {
                navigate("/slotBooking");
              }}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <PlusOutlined className="text-white text-xl" />
                </div>
                <div className="font-semibold text-green-700">Book Parking</div>
                <div className="text-sm text-green-600">Find nearby slots</div>
              </div>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-blue-50 to-blue-100"
              onClick={() => showVehicleModal()}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CarOutlined className="text-white text-xl" />
                </div>
                <div className="font-semibold text-blue-700">Add Vehicle</div>
                <div className="text-sm text-blue-600">
                  Manage your vehicles
                </div>
              </div>
            </Card>

            <Card
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-purple-50 to-purple-100"
              onClick={() => navigate("/UserBookings")}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <HistoryOutlined className="text-white text-xl" />
                </div>
                <div className="font-semibold text-purple-700">My Bookings</div>
                <div className="text-sm text-purple-600">View history</div>
              </div>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <WalletOutlined className="text-white text-xl" />
                </div>
                <div className="font-semibold text-orange-700">
                  Top Up Wallet
                </div>
                <div className="text-sm text-orange-600">Add funds</div>
              </div>
            </Card>
          </div>

          {/* Stats Cards */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <Statistic
                  title="Total Bookings"
                  value={bookings.length}
                  prefix={<CalendarOutlined className="text-blue-500" />}
                  valueStyle={{ color: "#1890ff" }}
                />
                <Progress
                  percent={75}
                  size="small"
                  showInfo={false}
                  strokeColor="#1890ff"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-green-50 to-green-100">
                <Statistic
                  title="Active Bookings"
                  value={
                    bookings.filter((b) => b.status === "confirmed").length
                  }
                  prefix={<ClockCircleOutlined className="text-green-500" />}
                  valueStyle={{ color: "#52c41a" }}
                />
                <Progress
                  percent={40}
                  size="small"
                  showInfo={false}
                  strokeColor="#52c41a"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                <Statistic
                  title="My Vehicles"
                  value={vehicles.length}
                  prefix={<CarOutlined className="text-purple-500" />}
                  valueStyle={{ color: "#722ed1" }}
                />
                <Progress
                  percent={60}
                  size="small"
                  showInfo={false}
                  strokeColor="#722ed1"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-orange-50 to-orange-100">
                <Statistic
                  title="Total Spent"
                  value={bookings.reduce((sum, b) => sum + b.price, 0)}
                  prefix="$"
                  valueStyle={{ color: "#fa541c" }}
                />
                <Progress
                  percent={85}
                  size="small"
                  showInfo={false}
                  strokeColor="#fa541c"
                />
              </Card>
            </Col>
          </Row>

          {/* Recent Activity */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="Recent Bookings" className="shadow-sm">
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-green-500"
                                : booking.status === "pending"
                                ? "bg-orange-500"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-semibold">
                            {booking.location}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.date} • {booking.startTime} -{" "}
                            {booking.endTime}
                          </div>
                          <div className="text-xs text-gray-400">
                            {booking.slotNumber} •{" "}
                            {booking.vehicle.split("(")[0]}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          ${booking.price}
                        </div>
                        <div
                          className={`text-sm capitalize ${
                            booking.status === "confirmed"
                              ? "text-green-600"
                              : booking.status === "pending"
                              ? "text-orange-600"
                              : "text-gray-500"
                          }`}
                        >
                          {booking.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {bookings.length > 3 && (
                  <div className="mt-4 text-center">
                    <Button
                      type="link"
                      onClick={() => setActiveTab("bookings")}
                    >
                      View All Bookings
                    </Button>
                  </div>
                )}
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="Quick Stats" className="shadow-sm mb-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Success Rate</span>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">94%</div>
                      <Progress percent={94} size="small" showInfo={false} />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg. Rating</span>
                    <div className="flex items-center space-x-1">
                      <Rate disabled defaultValue={4.8} className="text-sm" />
                      <span className="text-sm font-semibold">4.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Month</span>
                    <div className="text-right">
                      <div className="font-semibold">3 bookings</div>
                      <div className="text-sm text-green-600">
                        +25% from last month
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title="Favorite Locations" className="shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HeartOutlined className="text-red-500" />
                      <span className="text-sm">City Mall Parking</span>
                    </div>
                    <span className="text-xs text-gray-500">5 visits</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HeartOutlined className="text-red-500" />
                      <span className="text-sm">Office Complex</span>
                    </div>
                    <span className="text-xs text-gray-500">3 visits</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HeartOutlined className="text-red-500" />
                      <span className="text-sm">Airport Terminal</span>
                    </div>
                    <span className="text-xs text-gray-500">2 visits</span>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Vehicle Modal */}
      <Modal
        title={"Add New Vehicle"}
        open={isVehicleModalVisible}
        onCancel={() => {
          setIsVehicleModalVisible(false);
        }}
        width={600}
      >
        <VehiclesAdd />
      </Modal>
      {/* Notifications Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span>Notifications</span>
            <Badge count={unreadNotifications} size="small" />
          </div>
        }
        placement="right"
        onClose={() => setIsNotificationDrawerVisible(false)}
        open={isNotificationDrawerVisible}
        width={600}
      >
        <List
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item
              className={`cursor-pointer hover:bg-gray-50 ${
                !notification.read ? "bg-blue-50" : ""
              }`}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div className="w-full">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          notification.type === "booking_accepted"
                            ? "bg-green-500"
                            : notification.type === "payment_reminder"
                            ? "bg-orange-500"
                            : notification.type === "booking_completed"
                            ? "bg-blue-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <Text strong className="text-sm">
                        {notification.title}
                      </Text>
                    </div>
                    <Paragraph className="text-xs text-gray-600 mt-1 mb-0">
                      {notification.message}
                    </Paragraph>
                    <Text type="secondary" className="text-xs">
                      {notification.timestamp}
                    </Text>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1" />
                  )}
                </div>
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
};

export default UserDashboard;
