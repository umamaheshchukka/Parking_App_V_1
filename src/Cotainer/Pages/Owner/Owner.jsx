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
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = TimePicker;

export default function OwnerDashboard() {
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
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [form] = Form.useForm();
  const [currentView, setCurrentView] = useState("dashboard");

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

  const handleDelete = (id) => {
    setPlaces((prev) => prev.filter((p) => p.id !== id));
    message.success("Parking place deleted successfully!");
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

  const columns = [
    {
      title: "Place Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-semibold text-gray-900">{text}</div>
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <EnvironmentOutlined className="mr-1" />
            {record.address}
          </div>
        </div>
      ),
    },
    {
      title: "Capacity & Availability",
      key: "capacity",
      render: (_, record) => (
        <div>
          <div className="text-sm">
            <span className="font-medium">{record.availableSpots}</span> /{" "}
            {record.capacity} spots
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${(record.availableSpots / record.capacity) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ),
    },
    {
      title: "Price/Hour",
      dataIndex: "pricePerHour",
      key: "pricePerHour",
      render: (price) => (
        <span className="font-semibold text-green-600">${price}</span>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <div className="flex items-center">
          <StarOutlined className="text-yellow-400 mr-1" />
          <span>{rating}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)} className="capitalize">
          {status}
        </Tag>
      ),
    },
    {
      title: "Earnings",
      dataIndex: "totalEarnings",
      key: "totalEarnings",
      render: (earnings) => (
        <span className="font-semibold text-green-600">
          ${earnings.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              size="small"
              type="primary"
              onClick={() => showModal(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this parking place?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} size="small" danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <Statistic
              title={<span className="text-blue-100">Total Earnings</span>}
              value={totalEarnings}
              prefix="$"
              valueStyle={{ color: "white", fontSize: "24px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <Statistic
              title={<span className="text-green-100">Total Bookings</span>}
              value={totalBookings}
              valueStyle={{ color: "white", fontSize: "24px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <Statistic
              title={<span className="text-purple-100">Total Spots</span>}
              value={totalSpots}
              valueStyle={{ color: "white", fontSize: "24px" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <Statistic
              title={<span className="text-orange-100">Occupancy Rate</span>}
              value={((occupiedSpots / totalSpots) * 100).toFixed(1)}
              suffix="%"
              valueStyle={{ color: "white", fontSize: "24px" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Places */}
      <Card
        title="Recent Parking Places"
        className="shadow-lg"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add New Place
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {places.slice(0, 3).map((place) => (
            <Card key={place.id} className="hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <Tag color={getStatusColor(place.status)}>{place.status}</Tag>
                </div>
                <p className="text-sm text-gray-600">{place.address}</p>
                <div className="flex justify-between text-sm">
                  <span>Capacity: {place.capacity}</span>
                  <span className="text-green-600 font-medium">
                    ${place.pricePerHour}/hr
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <StarOutlined className="text-yellow-400 mr-1" />
                    <span>{place.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {place.totalBookings} bookings
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderPlacesList = () => (
    <Card
      title="Manage Parking Places"
      className="shadow-lg"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add New Place
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={places}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} places`,
        }}
        className="overflow-x-auto"
      />
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Parking Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your parking spaces and track earnings
              </p>
            </div>
            <div className="flex space-x-4">
              <Button
                type={currentView === "dashboard" ? "primary" : "default"}
                onClick={() => setCurrentView("dashboard")}
                className={currentView === "dashboard" ? "bg-blue-600" : ""}
              >
                Dashboard
              </Button>
              <Button
                type={currentView === "places" ? "primary" : "default"}
                onClick={() => setCurrentView("places")}
                className={currentView === "places" ? "bg-blue-600" : ""}
              >
                Manage Places
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "dashboard" ? renderDashboard() : renderPlacesList()}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={editingPlace ? "Edit Parking Place" : "Add New Parking Place"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingPlace(null);
          form.resetFields();
        }}
        width={800}
        className="top-4"
      >
        <div className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place Name *
                </label>
                <Input placeholder="Enter parking place name" />
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <Select defaultValue="active" className="w-full">
                  <Option value="active">Active</Option>
                  <Option value="maintenance">Maintenance</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </div>
            </Col>
          </Row>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <TextArea rows={2} placeholder="Enter complete address" />
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Capacity *
                </label>
                <InputNumber
                  min={1}
                  max={1000}
                  placeholder="Number of parking spots"
                  className="w-full"
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Hour ($) *
                </label>
                <InputNumber
                  min={1}
                  max={1000}
                  placeholder="Price per hour"
                  className="w-full"
                />
              </div>
            </Col>
          </Row>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Types Allowed *
            </label>
            <Checkbox.Group options={vehicleTypeOptions} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <Checkbox.Group options={amenityOptions} />
          </div>

          <div className="mb-4">
            <Checkbox>24/7 Operation</Checkbox>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operating Hours
            </label>
            <RangePicker format="HH:mm" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <Upload listType="picture-card" multiple beforeUpload={() => false}>
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </div>
        </div>
      </Modal>
    </div>
  );
}
