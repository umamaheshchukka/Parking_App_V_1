import React, { useState } from "react";
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
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const UserDashboard = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      type: "4",
      brand: "Toyota",
      model: "Camry",
      plateNumber: "ABC-1234",
      color: "Blue",
      isDefault: true,
      addedDate: "2024-01-15",
    },
    {
      id: 2,
      type: "2",
      brand: "Honda",
      model: "CBR",
      plateNumber: "XYZ-5678",
      color: "Red",
      isDefault: false,
      addedDate: "2024-02-10",
    },
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      location: "City Mall Parking",
      address: "123 Main St, Downtown",
      date: "2024-08-07",
      time: "10:00 AM - 2:00 PM",
      vehicle: "Toyota Camry (ABC-1234)",
      status: "active",
      price: "$15",
    },
    {
      id: 2,
      location: "Office Complex",
      address: "456 Business Ave",
      date: "2024-08-05",
      time: "9:00 AM - 6:00 PM",
      vehicle: "Honda CBR (XYZ-5678)",
      status: "completed",
      price: "$25",
    },
  ]);

  // Show modal for adding/editing vehicles
  const showModal = (vehicle = null) => {
    setEditingVehicle(vehicle);
    setIsModalVisible(true);
    if (vehicle) {
      form.setFieldsValue(vehicle);
    } else {
      form.resetFields();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <Title level={2} className="text-white mb-2">
                  Welcome back, John!
                </Title>
                <Text className="text-blue-100">
                  Find and book your perfect parking spot
                </Text>
              </div>
              <Avatar
                size={64}
                icon={<UserOutlined />}
                className="bg-white text-blue-500"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <Statistic
                  title="Total Bookings"
                  value={12}
                  prefix={<CalendarOutlined className="text-blue-500" />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <Statistic
                  title="Active Bookings"
                  value={1}
                  prefix={<ClockCircleOutlined className="text-green-500" />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <Statistic
                  title="My Vehicles"
                  value={vehicles.length}
                  prefix={<CarOutlined className="text-purple-500" />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <Statistic
                  title="Total Spent"
                  value={248}
                  prefix="$"
                  valueStyle={{ color: "#fa541c" }}
                />
              </Card>
            </Col>
          </Row>
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
                          booking.status === "active"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{booking.location}</div>
                      <div className="text-sm text-gray-500">
                        {booking.date} • {booking.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      {booking.price}
                    </div>
                    <div
                      className={`text-sm capitalize ${
                        booking.status === "active"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {booking.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
