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
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const VehiclesAdd = ({ handleCancel }) => {
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

  const vehicleTypeOptions = [
    {
      value: "2",
      label: "2 Wheeler (Bike/Scooter)",
      icon: <CarOutlined />, // Replaced MotorcycleOutlined with CarOutlined
    },
    { value: "4", label: "4 Wheeler (Car/SUV)", icon: <CarOutlined /> },
    { value: "6", label: "6+ Wheeler (Truck/Bus)", icon: <CarOutlined /> },
  ];

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
  return (
    <div>
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
    </div>
  );
};
export default VehiclesAdd;
