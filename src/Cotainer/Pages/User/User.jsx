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

  // Vehicle type options for the form
  const vehicleTypeOptions = [
    {
      value: "2",
      label: "2 Wheeler (Bike/Scooter)",
      icon: <CarOutlined />, // Replaced MotorcycleOutlined with CarOutlined
    },
    { value: "4", label: "4 Wheeler (Car/SUV)", icon: <CarOutlined /> },
    { value: "6", label: "6+ Wheeler (Truck/Bus)", icon: <CarOutlined /> },
  ];

  // Function to render vehicle icons based on type
  const getVehicleIcon = (type) => {
    switch (type) {
      case "2":
        return <CarOutlined className="text-2xl text-blue-500" />; // Replaced MotorcycleOutlined
      case "4":
        return <CarOutlined className="text-2xl text-green-500" />;
      case "6":
        return <CarOutlined className="text-2xl text-orange-500" />;
      default:
        return <CarOutlined className="text-2xl text-gray-500" />;
    }
  };

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

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingVehicle(null);
    form.resetFields();
  };

  // Handle form submission for adding/editing vehicles
  const handleSubmit = (values) => {
    if (editingVehicle) {
      setVehicles((prev) =>
        prev.map((v) => (v.id === editingVehicle.id ? { ...v, ...values } : v))
      );
    } else {
      const newVehicle = {
        ...values,
        id: Date.now(),
        addedDate: new Date().toISOString().split("T")[0],
        isDefault: vehicles.length === 0,
      };
      setVehicles((prev) => [...prev, newVehicle]);
    }
    setIsModalVisible(false);
    form.resetFields();
    setEditingVehicle(null);
  };

  // Delete a vehicle
  const deleteVehicle = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  // Set a vehicle as default
  const setDefaultVehicle = (id) => {
    setVehicles((prev) =>
      prev.map((v) => ({
        ...v,
        isDefault: v.id === id,
      }))
    );
  };

  // Table columns for vehicles
  const vehicleColumns = [
    {
      title: "Vehicle",
      key: "vehicle",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          {getVehicleIcon(record.type)}
          <div>
            <div className="font-semibold">
              {record.brand} {record.model}
            </div>
            <div className="text-sm text-gray-500">{record.plateNumber}</div>
          </div>
          {record.isDefault && <Badge count="Default" className="ml-2" />}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {type} Wheeler
        </span>
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (color) => (
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: color.toLowerCase() }}
          />
          <span>{color}</span>
        </div>
      ),
    },
    {
      title: "Added Date",
      dataIndex: "addedDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
            className="text-blue-600 hover:text-blue-800"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => deleteVehicle(record.id)}
            className="text-red-600 hover:text-red-800"
          />
          {!record.isDefault && (
            <Button
              size="small"
              onClick={() => setDefaultVehicle(record.id)}
              className="text-green-600 hover:text-green-800"
            >
              Set Default
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Dashboard tab content
  const renderDashboard = () => (
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

      {/* Quick Actions */}
      <Card title="Quick Actions" className="shadow-sm">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              className="w-full h-16 text-lg bg-gradient-to-r from-blue-500 to-blue-600 border-0"
              onClick={() => setActiveTab("search")}
            >
              Find Parking
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button
              size="large"
              icon={<PlusOutlined />}
              className="w-full h-16 text-lg border-2 border-dashed border-blue-300 hover:border-blue-500"
              onClick={() => showModal()}
            >
              Add Vehicle
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button
              size="large"
              icon={<HistoryOutlined />}
              className="w-full h-16 text-lg"
              onClick={() => setActiveTab("bookings")}
            >
              View History
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Recent Bookings */}
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
  );

  // Vehicles tab content
  const renderVehicles = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title level={3}>My Vehicles</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Add New Vehicle
        </Button>
      </div>

      <Card className="shadow-sm">
        <Table
          columns={vehicleColumns}
          dataSource={vehicles}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          className="overflow-x-auto"
        />
      </Card>
    </div>
  );

  // Bookings tab content
  const renderBookings = () => (
    <div className="space-y-6">
      <Title level={3}>My Bookings</Title>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card
            key={booking.id}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <EnvironmentOutlined className="text-blue-500 text-xl" />
                </div>
                <div className="flex-1">
                  <Title level={5} className="mb-1">
                    {booking.location}
                  </Title>
                  <Text className="text-gray-600 block">{booking.address}</Text>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>
                      <CalendarOutlined className="mr-1" />
                      {booking.date}
                    </span>
                    <span>
                      <ClockCircleOutlined className="mr-1" />
                      {booking.time}
                    </span>
                    <span>
                      <CarOutlined className="mr-1" />
                      {booking.vehicle}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">
                    {booking.price}
                  </div>
                  <Badge
                    status={
                      booking.status === "active" ? "processing" : "success"
                    }
                    text={
                      booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)
                    }
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // Search Parking tab content
  const renderSearchParking = () => (
    <div className="space-y-6">
      <Title level={3}>Find Parking</Title>
      <Card className="shadow-sm">
        <div className="text-center py-12">
          <SearchOutlined className="text-6xl text-gray-300 mb-4" />
          <Title level={4} className="text-gray-500">
            Search Parking Feature
          </Title>
          <Text className="text-gray-400">
            This feature will allow users to search and book parking spots
          </Text>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="bg-white rounded-lg shadow-sm p-6"
          size="large"
        >
          <TabPane
            tab={
              <span>
                <DashboardOutlined />
                Dashboard
              </span>
            }
            key="dashboard"
          >
            {renderDashboard()}
          </TabPane>
          <TabPane
            tab={
              <span>
                <CarOutlined />
                My Vehicles
              </span>
            }
            key="vehicles"
          >
            {renderVehicles()}
          </TabPane>
          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                My Bookings
              </span>
            }
            key="bookings"
          >
            {renderBookings()}
          </TabPane>
          <TabPane
            tab={
              <span>
                <SearchOutlined />
                Find Parking
              </span>
            }
            key="search"
          >
            {renderSearchParking()}
          </TabPane>
        </Tabs>
      </div>

      {/* Add/Edit Vehicle Modal */}
      <Modal
        title={editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        className="top-8"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-6"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="type"
                label="Vehicle Type"
                rules={[
                  { required: true, message: "Please select vehicle type" },
                ]}
              >
                <Select placeholder="Select vehicle type" size="large">
                  {vehicleTypeOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      <div className="flex items-center space-x-2">
                        {option.icon}
                        <span>{option.label}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Brand"
                rules={[{ required: true, message: "Please enter brand" }]}
              >
                <Input placeholder="e.g., Toyota, Honda" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="model"
                label="Model"
                rules={[{ required: true, message: "Please enter model" }]}
              >
                <Input placeholder="e.g., Camry, Civic" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="plateNumber"
                label="License Plate Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter license plate number",
                  },
                  { pattern: /^[A-Z0-9-]+$/, message: "Invalid format" },
                ]}
              >
                <Input
                  placeholder="ABC-1234"
                  size="large"
                  style={{ textTransform: "uppercase" }}
                  onChange={(e) =>
                    form.setFieldsValue({
                      plateNumber: e.target.value.toUpperCase(),
                    })
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="color"
                label="Color"
                rules={[{ required: true, message: "Please select color" }]}
              >
                <Select placeholder="Select color" size="large">
                  {[
                    "White",
                    "Black",
                    "Gray",
                    "Silver",
                    "Blue",
                    "Red",
                    "Green",
                    "Yellow",
                    "Brown",
                    "Orange",
                  ].map((color) => (
                    <Option key={color} value={color}>
                      {color}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={handleCancel} size="large">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="bg-blue-500 hover:bg-blue-600"
            >
              {editingVehicle ? "Update Vehicle" : "Add Vehicle"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UserDashboard;
