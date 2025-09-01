import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Switch,
  Upload,
  message,
  Space,
  Tag,
  Tooltip,
  Statistic,
  Row,
  Col,
  Popconfirm,
  Rate,
  TimePicker,
  Checkbox,
  Badge,
  Tabs,
  DatePicker,
  Avatar,
  Progress,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CarOutlined,
  DollarOutlined,
  CalendarOutlined,
  StarOutlined,
  UploadOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  BellOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  TrophyOutlined,
  FireOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = TimePicker;
const { TabPane } = Tabs;

export default function AdvancedParkingDashboard() {
  // State for places
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: "Downtown Premium Parking",
      address: "123 Main St, Downtown",
      capacity: 50,
      availableSpots: 32,
      pricePerHour: 15,
      rating: 4.5,
      status: "active",
      vehicleTypes: ["car", "motorcycle"],
      amenities: ["security", "covered", "ev-charging"],
      operatingHours: "06:00 - 22:00",
      totalEarnings: 12500,
      totalBookings: 245,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Mall Side Parking",
      address: "456 Shopping Ave",
      capacity: 80,
      availableSpots: 65,
      pricePerHour: 10,
      rating: 4.2,
      status: "active",
      vehicleTypes: ["car", "suv"],
      amenities: ["security", "covered"],
      operatingHours: "24/7",
      totalEarnings: 8750,
      totalBookings: 180,
      image:
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Airport Express Lot",
      address: "789 Airport Rd",
      capacity: 120,
      availableSpots: 0,
      pricePerHour: 25,
      rating: 4.8,
      status: "maintenance",
      vehicleTypes: ["car", "suv", "van"],
      amenities: ["security", "shuttle", "ev-charging"],
      operatingHours: "24/7",
      totalEarnings: 22100,
      totalBookings: 420,
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Business District Hub",
      address: "321 Corporate Blvd",
      capacity: 200,
      availableSpots: 145,
      pricePerHour: 20,
      rating: 4.6,
      status: "active",
      vehicleTypes: ["car", "suv", "motorcycle"],
      amenities: ["security", "valet", "ev-charging", "car-wash"],
      operatingHours: "05:00 - 23:00",
      totalEarnings: 18900,
      totalBookings: 380,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    },
  ]);

  // State for bookings
  const [bookings, setBookings] = useState([
    {
      id: 1,
      placeId: 1,
      placeName: "Downtown Premium Parking",
      customerName: "John Smith",
      customerPhone: "+1 234-567-8900",
      vehicleNumber: "ABC-1234",
      vehicleType: "car",
      startTime: "2024-03-15 09:00",
      endTime: "2024-03-15 17:00",
      duration: 8,
      amount: 120,
      status: "completed",
      paymentMethod: "card",
      createdAt: "2024-03-14 20:30",
    },
    {
      id: 2,
      placeId: 2,
      placeName: "Mall Side Parking",
      customerName: "Sarah Johnson",
      customerPhone: "+1 234-567-8901",
      vehicleNumber: "XYZ-5678",
      vehicleType: "suv",
      startTime: "2024-03-15 14:00",
      endTime: "2024-03-15 18:00",
      duration: 4,
      amount: 40,
      status: "active",
      paymentMethod: "wallet",
      createdAt: "2024-03-15 13:45",
    },
    {
      id: 3,
      placeId: 3,
      placeName: "Airport Express Lot",
      customerName: "Mike Davis",
      customerPhone: "+1 234-567-8902",
      vehicleNumber: "DEF-9012",
      vehicleType: "car",
      startTime: "2024-03-16 06:00",
      endTime: "2024-03-18 10:00",
      duration: 52,
      amount: 1300,
      status: "confirmed",
      paymentMethod: "card",
      createdAt: "2024-03-14 18:20",
    },
    {
      id: 4,
      placeId: 1,
      placeName: "Downtown Premium Parking",
      customerName: "Emily Wilson",
      customerPhone: "+1 234-567-8903",
      vehicleNumber: "GHI-3456",
      vehicleType: "motorcycle",
      startTime: "2024-03-15 12:00",
      endTime: "2024-03-15 15:00",
      duration: 3,
      amount: 45,
      status: "cancelled",
      paymentMethod: "card",
      createdAt: "2024-03-15 11:30",
    },
    {
      id: 5,
      placeId: 4,
      placeName: "Business District Hub",
      customerName: "Robert Brown",
      customerPhone: "+1 234-567-8904",
      vehicleNumber: "JKL-7890",
      vehicleType: "car",
      startTime: "2024-03-15 08:00",
      endTime: "2024-03-15 18:00",
      duration: 10,
      amount: 200,
      status: "active",
      paymentMethod: "wallet",
      createdAt: "2024-03-15 07:45",
    },
  ]);

  // State for notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking",
      title: "New Booking Request",
      message:
        "John Smith requested a parking spot at Downtown Premium Parking for March 16, 2024",
      time: "2 minutes ago",
      read: false,
      priority: "high",
      placeId: 1,
      customerId: "customer_001",
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Received",
      message:
        "Payment of $120 received from Sarah Johnson for Mall Side Parking",
      time: "15 minutes ago",
      read: false,
      priority: "medium",
      placeId: 2,
      amount: 120,
    },
    {
      id: 3,
      type: "maintenance",
      title: "Maintenance Required",
      message: "Security camera #3 at Airport Express Lot needs attention",
      time: "1 hour ago",
      read: true,
      priority: "high",
      placeId: 3,
    },
    {
      id: 4,
      type: "review",
      title: "New Review",
      message: "Mike Davis left a 5-star review for Business District Hub",
      time: "2 hours ago",
      read: true,
      priority: "low",
      placeId: 4,
      rating: 5,
    },
    {
      id: 5,
      type: "booking",
      title: "Booking Cancelled",
      message: "Emily Wilson cancelled booking at Downtown Premium Parking",
      time: "3 hours ago",
      read: false,
      priority: "medium",
      placeId: 1,
    },
    {
      id: 6,
      type: "system",
      title: "System Update",
      message: "Dashboard analytics have been updated with latest data",
      time: "4 hours ago",
      read: true,
      priority: "low",
    },
  ]);

  // Chart data
  const [chartData] = useState({
    bookingsDaily: [
      { day: "Mon", bookings: 45, earnings: 675 },
      { day: "Tue", bookings: 52, earnings: 780 },
      { day: "Wed", bookings: 38, earnings: 570 },
      { day: "Thu", bookings: 61, earnings: 915 },
      { day: "Fri", bookings: 74, earnings: 1110 },
      { day: "Sat", bookings: 89, earnings: 1335 },
      { day: "Sun", bookings: 67, earnings: 1005 },
    ],
    bookingsMonthly: [
      { month: "Jan", bookings: 1200, earnings: 18000 },
      { month: "Feb", bookings: 1450, earnings: 21750 },
      { month: "Mar", bookings: 1680, earnings: 25200 },
      { month: "Apr", bookings: 1590, earnings: 23850 },
      { month: "May", bookings: 1820, earnings: 27300 },
      { month: "Jun", bookings: 1950, earnings: 29250 },
    ],
    placePerformance: [
      { name: "Downtown Premium", bookings: 245, earnings: 12500 },
      { name: "Mall Side Parking", bookings: 180, earnings: 8750 },
      { name: "Airport Express", bookings: 420, earnings: 22100 },
      { name: "Business District", bookings: 380, earnings: 18900 },
    ],
    vehicleTypes: [
      { name: "Car", value: 65, color: "#8884d8" },
      { name: "SUV", value: 20, color: "#82ca9d" },
      { name: "Motorcycle", value: 10, color: "#ffc658" },
      { name: "Van", value: 5, color: "#ff7300" },
    ],
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [form] = Form.useForm();
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("1");

  // Dashboard Stats
  const totalEarnings = places.reduce(
    (sum, place) => sum + place.totalEarnings,
    0
  );
  const totalSpots = places.reduce((sum, place) => sum + place.capacity, 0);
  const occupiedSpots = places.reduce(
    (sum, place) => sum + (place.capacity - place.availableSpots),
    0
  );
  const totalBookings = places.reduce(
    (sum, place) => sum + place.totalBookings,
    0
  );
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const activeBookings = bookings.filter(
    (b) => b.status === "active" || b.status === "confirmed"
  ).length;
  const todayEarnings = 1250; // Mock data for today's earnings
  const avgRating = (
    places.reduce((sum, place) => sum + place.rating, 0) / places.length
  ).toFixed(1);

  const vehicleTypeOptions = [
    { label: "Car", value: "car" },
    { label: "Motorcycle", value: "motorcycle" },
    { label: "SUV", value: "suv" },
    { label: "Van", value: "van" },
    { label: "Truck", value: "truck" },
  ];

  const amenityOptions = [
    { label: "Security Camera", value: "security" },
    { label: "Covered Parking", value: "covered" },
    { label: "EV Charging", value: "ev-charging" },
    { label: "Shuttle Service", value: "shuttle" },
    { label: "Valet Service", value: "valet" },
    { label: "Car Wash", value: "car-wash" },
  ];

  const showModal = (place = null) => {
    setEditingPlace(place);
    setIsModalVisible(true);
    if (place) {
      form.setFieldsValue({
        ...place,
        operatingHours:
          place.operatingHours === "24/7"
            ? null
            : place.operatingHours.split(" - "),
        is24Hours: place.operatingHours === "24/7",
      });
    } else {
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const operatingHours = values.is24Hours
        ? "24/7"
        : values.operatingHours
        ? `${values.operatingHours[0]} - ${values.operatingHours[1]}`
        : "06:00 - 22:00";

      const placeData = {
        ...values,
        operatingHours,
        id: editingPlace ? editingPlace.id : Date.now(),
        availableSpots: editingPlace
          ? editingPlace.availableSpots
          : values.capacity,
        rating: editingPlace ? editingPlace.rating : 0,
        totalEarnings: editingPlace ? editingPlace.totalEarnings : 0,
        totalBookings: editingPlace ? editingPlace.totalBookings : 0,
        status: values.status || "active",
        image:
          editingPlace?.image ||
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      };

      if (editingPlace) {
        setPlaces((prev) =>
          prev.map((p) => (p.id === editingPlace.id ? placeData : p))
        );
        message.success("Parking place updated successfully!");
      } else {
        setPlaces((prev) => [...prev, placeData]);
        message.success("Parking place added successfully!");
      }

      setIsModalVisible(false);
      form.resetFields();
      setEditingPlace(null);
    });
  };

  const deletePlaceConfirm = (placeId) => {
    setPlaces((prev) => prev.filter((p) => p.id !== placeId));
    message.success("Parking place deleted successfully!");
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    message.success("All notifications marked as read!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "green";
      case "maintenance":
        return "orange";
      case "inactive":
        return "red";
      default:
        return "default";
    }
  };

  const getBookingStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "active":
        return "processing";
      case "confirmed":
        return "default";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking":
        return <CarOutlined className="text-blue-500" />;
      case "payment":
        return <DollarOutlined className="text-green-500" />;
      case "maintenance":
        return <ExclamationCircleOutlined className="text-orange-500" />;
      case "review":
        return <StarOutlined className="text-yellow-500" />;
      case "system":
        return <CheckCircleOutlined className="text-gray-500" />;
      default:
        return <BellOutlined />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500 bg-red-50";
      case "medium":
        return "border-l-4 border-yellow-500 bg-yellow-50";
      case "low":
        return "border-l-4 border-green-500 bg-green-50";
      default:
        return "border-l-4 border-gray-300 bg-gray-50";
    }
  };

  // Table columns for places
  const placeColumns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: (image, record) => (
        <Avatar
          shape="square"
          size={50}
          src={image}
          icon={<EnvironmentOutlined />}
        />
      ),
    },
    {
      title: "Place Details",
      key: "details",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="font-semibold text-gray-900">{record.name}</div>
          <div className="text-sm text-gray-600 flex items-center">
            <EnvironmentOutlined className="mr-1" />
            {record.address}
          </div>
          <div className="flex items-center space-x-2">
            <Rate disabled defaultValue={record.rating} size="small" />
            <span className="text-sm">({record.rating})</span>
          </div>
        </div>
      ),
    },
    {
      title: "Capacity",
      key: "capacity",
      render: (_, record) => (
        <div className="text-center">
          <div className="font-semibold text-lg">
            {record.availableSpots}/{record.capacity}
          </div>
          <Progress
            percent={
              ((record.capacity - record.availableSpots) / record.capacity) *
              100
            }
            size="small"
            status={record.availableSpots === 0 ? "exception" : "normal"}
            showInfo={false}
          />
          <div className="text-xs text-gray-500 mt-1">
            {record.capacity - record.availableSpots} occupied
          </div>
        </div>
      ),
    },
    {
      title: "Performance",
      key: "performance",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Bookings:</span>
            <span className="font-semibold">{record.totalBookings}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Earnings:</span>
            <span className="font-semibold text-green-600">
              ${record.totalEarnings}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Price/hr:</span>
            <span className="font-semibold">${record.pricePerHour}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Status & Info",
      key: "status",
      render: (_, record) => (
        <div className="space-y-2">
          <Tag color={getStatusColor(record.status)} className="mb-1">
            {record.status.toUpperCase()}
          </Tag>
          <div className="text-xs text-gray-600">
            <ClockCircleOutlined className="mr-1" />
            {record.operatingHours}
          </div>
          <div className="flex flex-wrap gap-1">
            {record.vehicleTypes.slice(0, 2).map((type) => (
              <Tag key={type} size="small">
                {type}
              </Tag>
            ))}
            {record.vehicleTypes.length > 2 && (
              <Tag size="small">+{record.vehicleTypes.length - 2}</Tag>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this parking place?"
            description="This action cannot be undone."
            onConfirm={() => deletePlaceConfirm(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger size="small" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Table columns for bookings
  const bookingColumns = [
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (id) => (
        <span className="font-mono">#{id.toString().padStart(4, "0")}</span>
      ),
    },
    {
      title: "Customer",
      key: "customer",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="font-semibold flex items-center">
            <Avatar size="small" icon={<UserOutlined />} className="mr-2" />
            {record.customerName}
          </div>
          <div className="text-sm text-gray-600">{record.customerPhone}</div>
          <div className="text-sm">
            <CarOutlined className="mr-1" />
            {record.vehicleNumber} ({record.vehicleType})
          </div>
        </div>
      ),
    },
    {
      title: "Parking Place",
      dataIndex: "placeName",
      key: "placeName",
      render: (placeName) => (
        <div className="font-medium text-blue-600">{placeName}</div>
      ),
    },
    {
      title: "Schedule",
      key: "schedule",
      render: (_, record) => (
        <div className="space-y-1">
          <div className="text-sm">
            <span className="text-gray-600">Start:</span> {record.startTime}
          </div>
          <div className="text-sm">
            <span className="text-gray-600">End:</span> {record.endTime}
          </div>
          <div className="text-sm font-medium">
            Duration: {record.duration}h
          </div>
        </div>
      ),
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record) => (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            ${record.amount}
          </div>
          <div className="text-xs text-gray-500">{record.paymentMethod}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getBookingStatusColor(status)} className="font-medium">
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (time) => <div className="text-sm text-gray-600">{time}</div>,
    },
  ];

  const renderDashboardOverview = () => (
    <div className="space-y-6">
      {/* Enhanced Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-blue-100 text-sm mb-1">Total Earnings</div>
                <div className="text-2xl font-bold">
                  ${totalEarnings.toLocaleString()}
                </div>
                <div className="text-blue-200 text-xs mt-1">
                  +12% from last month
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <DollarOutlined className="text-2xl" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-green-100 text-sm mb-1">
                  Total Bookings
                </div>
                <div className="text-2xl font-bold">{totalBookings}</div>
                <div className="text-green-200 text-xs mt-1">
                  {activeBookings} active now
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <CalendarOutlined className="text-2xl" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-purple-100 text-sm mb-1">
                  Occupancy Rate
                </div>
                <div className="text-2xl font-bold">
                  {((occupiedSpots / totalSpots) * 100).toFixed(1)}%
                </div>
                <div className="text-purple-200 text-xs mt-1">
                  {occupiedSpots}/{totalSpots} spots
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <CarOutlined className="text-2xl" />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-orange-100 text-sm mb-1">Avg Rating</div>
                <div className="text-2xl font-bold flex items-center">
                  {avgRating}
                  <StarOutlined className="ml-1 text-yellow-300" />
                </div>
                <div className="text-orange-200 text-xs mt-1">
                  Across {places.length} places
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <TrophyOutlined className="text-2xl" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="text-center border border-blue-200 bg-blue-50">
            <Statistic
              title="Today's Earnings"
              value={todayEarnings}
              prefix="$"
              valueStyle={{ color: "#1890ff", fontSize: "20px" }}
              suffix={<ThunderboltOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center border border-red-200 bg-red-50">
            <Statistic
              title="Unread Notifications"
              value={unreadNotifications}
              valueStyle={{ color: "#f5222d", fontSize: "20px" }}
              suffix={<BellOutlined className="text-red-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center border border-green-200 bg-green-50">
            <Statistic
              title="Active Bookings"
              value={activeBookings}
              valueStyle={{ color: "#52c41a", fontSize: "20px" }}
              suffix={<FireOutlined className="text-green-500" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center">
                <BarChartOutlined className="mr-2 text-blue-500" />
                Daily Bookings & Earnings
              </div>
            }
            className="shadow-lg"
            extra={<Tag color="blue">This Week</Tag>}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.bookingsDaily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="bookings"
                  fill="#8884d8"
                  name="Bookings"
                />
                <Bar
                  yAxisId="right"
                  dataKey="earnings"
                  fill="#82ca9d"
                  name="Earnings ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={
              <div className="flex items-center">
                <PieChartOutlined className="mr-2 text-green-500" />
                Vehicle Type Distribution
              </div>
            }
            className="shadow-lg"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.vehicleTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.vehicleTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <div className="flex items-center">
                <LineChartOutlined className="mr-2 text-purple-500" />
                Monthly Performance Trend
              </div>
            }
            className="shadow-lg"
          >
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={chartData.bookingsMonthly}>
                <defs>
                  <linearGradient
                    id="colorBookings"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorEarnings"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="bookings"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorBookings)"
                  name="Bookings"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="earnings"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorEarnings)"
                  name="Earnings ($)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Top Performing Places"
            className="shadow-lg"
            extra={<Tag color="gold">Best ROI</Tag>}
          >
            <div className="space-y-4">
              {chartData.placePerformance
                .sort((a, b) => b.earnings - a.earnings)
                .map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                            ? "bg-gray-400"
                            : index === 2
                            ? "bg-orange-400"
                            : "bg-blue-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-sm">{place.name}</div>
                        <div className="text-xs text-gray-600">
                          {place.bookings} bookings
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        ${place.earnings}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Card
        title="Recent Activity"
        className="shadow-lg"
        extra={
          <Button type="primary" onClick={() => setActiveTab("4")}>
            View All Notifications
          </Button>
        }
      >
        <div className="space-y-3">
          {notifications.slice(0, 5).map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg cursor-pointer hover:shadow-md transition-all ${
                notification.read
                  ? "bg-gray-50"
                  : getPriorityColor(notification.priority)
              }`}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <Badge status="processing" text="New" className="mt-2" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Notifications
            <Badge count={unreadNotifications} className="ml-2" />
          </h2>
          <p className="text-gray-600">Stay updated with all activities</p>
        </div>
        <Button onClick={markAllAsRead} disabled={unreadNotifications === 0}>
          Mark All as Read
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`shadow-md hover:shadow-lg transition-all cursor-pointer ${
              !notification.read ? "border-l-4 border-blue-500 bg-blue-50" : ""
            }`}
            onClick={() => markNotificationAsRead(notification.id)}
          >
            <div className="flex items-start space-x-4">
              <div className="mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Tag
                      color={
                        notification.priority === "high"
                          ? "red"
                          : notification.priority === "medium"
                          ? "orange"
                          : "green"
                      }
                    >
                      {notification.priority}
                    </Tag>
                    <span className="text-sm text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{notification.message}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {notification.type && (
                    <Tag size="small" color="blue">
                      {notification.type}
                    </Tag>
                  )}
                  {notification.amount && (
                    <span className="text-green-600 font-medium">
                      ${notification.amount}
                    </span>
                  )}
                  {notification.rating && (
                    <div className="flex items-center">
                      <Rate
                        disabled
                        defaultValue={notification.rating}
                        size="small"
                      />
                    </div>
                  )}
                  {!notification.read && (
                    <Badge status="processing" text="Unread" />
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="custom-tabs"
          items={[
            {
              key: "1",
              label: (
                <span className="flex items-center space-x-2">
                  <BarChartOutlined />
                  <span>Dashboard</span>
                </span>
              ),
              children: renderDashboardOverview(),
            },

            {
              key: "4",
              label: (
                <span className="flex items-center space-x-2">
                  <BellOutlined />
                  <span>Notifications</span>
                  <Badge count={unreadNotifications} className="ml-1" />
                </span>
              ),
              children: renderNotifications(),
            },
          ]}
        />
      </div>
    </div>
  );
}
