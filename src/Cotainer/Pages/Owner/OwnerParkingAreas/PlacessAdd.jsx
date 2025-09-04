import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Modal,
  TimePicker,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

export default function PlacessAdd({ setIsModalVisible }) {
  const [form] = Form.useForm();
  const [is24Hours, setIs24Hours] = useState(true);
  const [fileList, setFileList] = useState([]);

  const vehicleTypeOptions = [
    { value: "car", label: "Car" },
    { value: "motorcycle", label: "Motorcycle" },
    { value: "truck", label: "Truck" },
  ];

  const amenityOptions = [
    { value: "security", label: "Security Cameras" },
    { value: "covered", label: "Covered Parking" },
    { value: "accessible", label: "Accessible Parking" },
    { value: "ev_charging", label: "EV Charging" },
  ];

  const handleSubmit = async (values) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", values.title);
      formDataToSend.append(
        "address",
        JSON.stringify({
          street: values.address.street,
          area: values.address.area,
          city: values.address.city,
          state: values.address.state,
        })
      );
      formDataToSend.append(
        "amenities",
        JSON.stringify(values.amenities || [])
      );
      formDataToSend.append("spaceTypes", JSON.stringify(values.spaceTypes));
      formDataToSend.append("activeStatus", values.activeStatus);
      formDataToSend.append("approveStatus", values.approveStatus);
      formDataToSend.append("description", values.description || "");
      if (!is24Hours && values.operatingHours) {
        formDataToSend.append(
          "operatingHours",
          JSON.stringify([
            values.operatingHours[0].format("HH:mm"),
            values.operatingHours[1].format("HH:mm"),
          ])
        );
      }
      if (fileList[0]?.originFileObj) {
        formDataToSend.append("image", fileList[0].originFileObj);
      }

      const response = await axios.post(
        "http://127.0.0.1:3045/api/parkingSpace/Register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // required if you're sending FormData
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add parking space");
      }

      const result = await response.json();
      message.success("Parking space added successfully");
      setIsModalVisible(false);
      form.resetFields();
      setFileList([]);
      setIs24Hours(true);
    } catch (err) {
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setFileList([]);
    setIs24Hours(true);
  };

  const uploadProps = {
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList.slice(-1)); // Keep only the latest file
    },
    fileList,
    beforeUpload: () => false, // Prevent auto-upload
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Place Name"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter the parking place name",
            },
          ]}
        >
          <Input placeholder="Enter parking place name" />
        </Form.Item>
        <Form.Item
          label="Status"
          name="activeStatus"
          rules={[{ required: true, message: "Please select a status" }]}
          initialValue={true}
        >
          <Select>
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="Street"
          name={["address", "street"]}
          rules={[
            { required: true, message: "Please enter the street address" },
          ]}
        >
          <Input placeholder="Enter street address" />
        </Form.Item>
        <Form.Item
          label="Area"
          name={["address", "area"]}
          rules={[{ required: true, message: "Please enter the area" }]}
        >
          <Input placeholder="Enter area" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          label="City"
          name={["address", "city"]}
          rules={[{ required: true, message: "Please enter the city" }]}
        >
          <Input placeholder="Enter city" />
        </Form.Item>
        <Form.Item
          label="State"
          name={["address", "state"]}
          rules={[{ required: true, message: "Please enter the state" }]}
        >
          <Input placeholder="Enter state" />
        </Form.Item>
      </div>
      <Form.Item label="Description" name="description">
        <TextArea rows={3} placeholder="Enter description" />
      </Form.Item>

      <Form.Item label="Amenities" name="amenities">
        <Checkbox.Group options={amenityOptions} />
      </Form.Item>

      <Form.List
        name="spaceTypes"
        rules={[
          {
            validator: async (_, spaceTypes) => {
              if (!spaceTypes || spaceTypes.length < 1) {
                return Promise.reject(
                  new Error("At least one space type is required")
                );
              }
            },
          },
        ]}
        initialValue={[{ types: "car", capacity: 1, amount: 10 }]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2"
              >
                <Form.Item
                  {...restField}
                  label="Vehicle Type"
                  name={[name, "types"]}
                  rules={[{ required: true, message: "Select vehicle type" }]}
                >
                  <Select>
                    {vehicleTypeOptions.map((opt) => (
                      <Option key={opt.value} value={opt.value}>
                        {opt.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Capacity"
                  name={[name, "capacity"]}
                  rules={[
                    { required: true, message: "Enter capacity" },
                    {
                      type: "number",
                      min: 1,
                      max: 1000,
                      message: "Capacity must be between 1 and 1000",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Number of spots" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Price per Hour ($)"
                  name={[name, "amount"]}
                  rules={[
                    { required: true, message: "Enter price" },
                    {
                      type: "number",
                      min: 1,
                      max: 1000,
                      message: "Price must be between 1 and 1000",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Price per hour" />
                </Form.Item>
                {fields.length > 1 && (
                  <Button onClick={() => remove(name)} className="mt-2">
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="dashed"
              onClick={() => add({ types: "car", capacity: 1, amount: 10 })}
              block
            >
              Add Space Type
            </Button>
          </>
        )}
      </Form.List>

      <Form.Item
        label="Approval Status"
        name="approveStatus"
        rules={[{ required: true, message: "Select approval status" }]}
        initialValue={false}
      >
        <Select>
          <Option value={true}>Approved</Option>
          <Option value={false}>Pending</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Checkbox
          checked={is24Hours}
          onChange={(e) => setIs24Hours(e.target.checked)}
        >
          24/7 Operation
        </Checkbox>
      </Form.Item>

      {!is24Hours && (
        <Form.Item
          label="Operating Hours"
          name="operatingHours"
          rules={[{ required: true, message: "Please select operating hours" }]}
        >
          <TimePicker.RangePicker format="HH:mm" />
        </Form.Item>
      )}

      <Form.Item label="Image">
        <Upload {...uploadProps} accept="image/*">
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <div className="flex justify-end space-x-4">
        <Button onClick={handleCancel} className="bg-gray-200">
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" className="bg-blue-600">
          Add
        </Button>
      </div>
    </Form>
  );
}
