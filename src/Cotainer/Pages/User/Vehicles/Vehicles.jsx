// VehicleDashboard.jsx
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
  message,
  Switch,
} from "antd";
import VehiclesAdd from "./VehiclesAdd";
import {
  CarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const VehicleDashboard = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
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
      image:
        "https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY",
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
      image:
        "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
    },
  ]);
  const [filterType, setFilterType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    localStorage.setItem("vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  const defaultImages = {
    2: "https://via.placeholder.com/300x150?text=2+Wheeler",
    4: "https://via.placeholder.com/300x150?text=4+Wheeler",
    6: "https://via.placeholder.com/300x150?text=6+Wheeler",
  };

  const getVehicleImage = (vehicle) => {
    return vehicle.image && vehicle.image.trim() !== ""
      ? vehicle.image
      : defaultImages[vehicle.type] ||
          "https://via.placeholder.com/300x150?text=Vehicle";
  };

  const showModal = (vehicle = null) => {
    setEditingVehicle(vehicle);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingVehicle(null);
    form.resetFields();
  };

  const handleAddVehicle = (vehicle) => {
    if (editingVehicle) {
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicle.id ? vehicle : v))
      );
    } else {
      setVehicles((prev) => [...prev, vehicle]);
    }
  };

  const deleteVehicle = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    message.success("Vehicle deleted successfully");
  };

  const setDefaultVehicle = (id) => {
    setVehicles((prev) => prev.map((v) => ({ ...v, isDefault: v.id === id })));
    message.success("Default vehicle set successfully");
  };

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      (filterType === "all" || vehicle.type === filterType) &&
      (vehicle.brand.toLowerCase().includes(searchText.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchText.toLowerCase()) ||
        vehicle.plateNumber.toLowerCase().includes(searchText.toLowerCase()))
  );

  const vehicleColumns = [
    {
      title: "Vehicle",
      key: "vehicle",
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar src={getVehicleImage(record)} size={50} className="rounded" />
          <div>
            <div className="font-semibold text-gray-800">{`${record.brand} ${record.model}`}</div>
            <div className="text-sm text-gray-500">{record.plateNumber}</div>
          </div>
          {record.isDefault && (
            <Badge
              count="Default"
              className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded"
            />
          )}
        </div>
      ),
      sorter: (a, b) =>
        `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {type} Wheeler
        </span>
      ),
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (color) => (
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-full border shadow"
            style={{ backgroundColor: color.toLowerCase() }}
          />
          <span className="capitalize text-gray-700">{color}</span>
        </div>
      ),
      sorter: (a, b) => a.color.localeCompare(b.color),
    },
    {
      title: "Added Date",
      dataIndex: "addedDate",
      render: (date) => (
        <span className="text-gray-600">
          {new Date(date).toLocaleDateString()}
        </span>
      ),
      sorter: (a, b) => new Date(a.addedDate) - new Date(b.addedDate),
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

  const renderCardView = () => (
    <Row gutter={[16, 16]}>
      {filteredVehicles.map((vehicle) => (
        <Col xs={24} sm={12} md={8} lg={6} key={vehicle.id}>
          <Card
            className="rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200"
            cover={
              <img
                alt={vehicle.model}
                src={getVehicleImage(vehicle)}
                className="h-44 w-full object-cover rounded-t-xl"
              />
            }
            actions={[
              <EditOutlined key="edit" onClick={() => showModal(vehicle)} />,
              <DeleteOutlined
                key="delete"
                onClick={() => deleteVehicle(vehicle.id)}
              />,
              !vehicle.isDefault && (
                <span
                  key="default"
                  onClick={() => setDefaultVehicle(vehicle.id)}
                  className="text-green-600 hover:text-green-800 cursor-pointer font-medium"
                >
                  Set Default
                </span>
              ),
            ]}
          >
            <Card.Meta
              avatar={<CarOutlined className="text-xl text-blue-600" />}
              title={
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">
                    {`${vehicle.brand} ${vehicle.model}`}
                  </span>
                  {vehicle.isDefault && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      Default
                    </span>
                  )}
                </div>
              }
              description={
                <div className="text-gray-600 text-sm space-y-1">
                  <p>{vehicle.plateNumber}</p>
                  <p>Type: {vehicle.type} Wheeler</p>
                  <p>Color: {vehicle.color}</p>
                  <p>
                    Added: {new Date(vehicle.addedDate).toLocaleDateString()}
                  </p>
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Title level={2} className="!text-blue-700">
              Parking Dashboard
            </Title>
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => showModal()}
                className="bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2"
              >
                Add Vehicle
              </Button>
              <Switch
                checkedChildren="Cards"
                unCheckedChildren="Table"
                checked={viewMode === "card"}
                onChange={(checked) => setViewMode(checked ? "card" : "table")}
              />
            </Space>
          </div>

          <Card className="shadow-sm rounded-xl border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
              <Input
                placeholder="Search by brand, model, or plate"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<FilterOutlined />}
                className="sm:max-w-xs rounded-lg"
              />
              <Select
                value={filterType}
                onChange={setFilterType}
                className="w-40"
              >
                <Option value="all">All Types</Option>
                <Option value="2">2-Wheeler</Option>
                <Option value="4">4-Wheeler</Option>
                <Option value="6">6-Wheeler</Option>
              </Select>
            </div>
            <Tabs
              activeKey={viewMode}
              onChange={setViewMode}
              items={[
                {
                  key: "table",
                  label: "Table View",
                  children: (
                    <Table
                      columns={vehicleColumns}
                      dataSource={filteredVehicles}
                      rowKey="id"
                      pagination={{ pageSize: 5 }}
                      className="overflow-x-auto"
                    />
                  ),
                },
                { key: "card", label: "Card View", children: renderCardView() },
              ]}
            />
          </Card>

          <Row gutter={16}>
            <Col span={12}>
              <Statistic
                title="Total Vehicles"
                value={vehicles.length}
                prefix={<CarOutlined />}
                className="bg-white p-6 rounded-xl shadow border border-gray-200"
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Default Vehicle"
                value={vehicles.find((v) => v.isDefault)?.brand || "None"}
                className="bg-white p-6 rounded-xl shadow border border-gray-200"
              />
            </Col>
          </Row>
        </div>
      </div>

      <Modal
        title={editingVehicle ? "Edit Vehicle" : "Add New Vehicle"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <VehiclesAdd
          handleCancel={handleCancel}
          onAddVehicle={handleAddVehicle}
          editingVehicle={editingVehicle}
        />
      </Modal>
    </div>
  );
};

export default VehicleDashboard;
