import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  TimePicker,
  Upload,
  message,
  Steps,
} from "antd";
import { UploadOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  startRegPlace,
  startUpdatePlace,
} from "../../../../Actions/Pages/Placess/Placess";

const { Option } = Select;
const { TextArea } = Input;

const ParkingSpaceManagement = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [is24Hours, setIs24Hours] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState([]);

  const vehicleTypeOptions = [
    { value: "two-wheeler", label: "Two-Wheeler 🏍️" },
    { value: "four-wheeler", label: "Four-Wheeler 🚗" },
  ];
  const amenityOptions = [
    { value: "covered", label: "Covered Parking 🏠" },
    { value: "opendoor", label: "Open Door Parking 🌳" },
  ];
  const propertyTypeOptions = [
    { value: "independence_house", label: "Independent House 🏡" },
    { value: "gated_apartment", label: "Gated Apartment 🏢" },
  ];

  useEffect(() => {
    if (state?.place) {
      const place = state.place;
      form.setFieldsValue({
        title: place.title,
        propertyType: place.propertyType,
        amenities: place.amenities,
        activeStatus: place.activeStatus === "true" || place.activeStatus,
        approveStatus: place.approveStatus === "true" || place.approveStatus,
        description: place.description || "",
        address: place.address || {},
        spaceTypes: place.spaceTypes || [
          { types: "two-wheeler", capacity: 1, amount: 10 },
        ],
        operatingHours: place.operatingHours || undefined,
      });
      setIs24Hours(!place.operatingHours);
      if (place.image) {
        setFileList([
          { uid: "-1", name: "image", status: "done", url: place.image },
        ]);
      }
      setSelectedVehicleTypes(
        place.spaceTypes?.map((space) => space.types) || []
      );
    }
  }, [state, form]);

  const handleVehicleTypeChange = (value, index) => {
    const currentSpaceTypes = form.getFieldValue("spaceTypes");
    const updatedSpaceTypes = [...currentSpaceTypes];
    updatedSpaceTypes[index].types = value;
    setSelectedVehicleTypes(updatedSpaceTypes.map((space) => space.types));
    form.setFieldsValue({ spaceTypes: updatedSpaceTypes });
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("propertyType", values.propertyType);
      formData.append("amenities", values.amenities);
      formData.append("activeStatus", values.activeStatus ? "true" : "false");
      formData.append("approveStatus", values.approveStatus ? "true" : "false");
      formData.append("description", values.description || "");
      Object.entries(values.address || {}).forEach(([key, val]) =>
        formData.append(`address[${key}]`, val)
      );
      values.spaceTypes?.forEach((space, index) => {
        formData.append(`spaceTypes[${index}][types]`, space.types);
        formData.append(`spaceTypes[${index}][capacity]`, space.capacity);
        formData.append(`spaceTypes[${index}][amount]`, space.amount);
      });
      if (fileList[0]?.originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      } else if (!state?.place?.image) {
        return message.error("Image is required 📸");
      }
      if (state?.place?._id) {
        const res = await dispatch(
          startUpdatePlace({ id: state.place._id, formData })
        );
        if (res?.meta?.requestStatus === "fulfilled") {
          message.success(`Parking space updated successfully 🎉`);
          form.resetFields();
          setFileList([]);
          setIs24Hours(true);
          setSelectedVehicleTypes([]);
          navigate(-1);
        }
      } else {
        const res = await dispatch(startRegPlace(formData));
        if (res?.meta?.requestStatus === "fulfilled") {
          message.success(`Parking space added successfully 🎉`);
          form.resetFields();
          setFileList([]);
          setIs24Hours(true);
          setSelectedVehicleTypes([]);
          navigate(-1);
        }
      }
    } catch (err) {
      console.error("Request error:", err);
      message.error(`Error: ${err.response?.data?.error || err.message} 😓`);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setIs24Hours(true);
    setSelectedVehicleTypes([]);
    navigate(-1);
  };

  const uploadProps = {
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList.slice(-1));
    },
    fileList,
    beforeUpload: () => false,
  };

  const steps = [
    {
      title: "Basic Info 📋",
      content: (
        <div className="space-y-6">
          <Form.Item
            label="Place Name"
            name="title"
            rules={[{ required: true, message: "Title is required ❗" }]}
          >
            <Input placeholder="Enter parking place name" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Status"
            name="activeStatus"
            initialValue={true}
            rules={[{ required: true, message: "Please select status ❗" }]}
          >
            <Select className="w-full">
              <Option value={true}>Active ✅</Option>
              <Option value={false}>Inactive ❌</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Property Type"
            name="propertyType"
            rules={[
              { required: true, message: "Property type is required ❗" },
            ]}
          >
            <Select placeholder="Select property type" className="w-full">
              {propertyTypeOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Amenities"
            name="amenities"
            rules={[{ required: true, message: "Amenities are required ❗" }]}
          >
            <Select placeholder="Select amenity" className="w-full">
              {amenityOptions.map((opt) => (
                <Option key={opt.value} value={opt.value}>
                  {opt.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Address 📍",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label="Street"
            name={["address", "street"]}
            rules={[{ required: true, message: "Street is required ❗" }]}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="Area"
            name={["address", "area"]}
            rules={[{ required: true, message: "Area is required ❗" }]}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="City"
            name={["address", "city"]}
            rules={[{ required: true, message: "City is required ❗" }]}
          >
            <Input className="w-full" />
          </Form.Item>
          <Form.Item
            label="State"
            name={["address", "state"]}
            rules={[{ required: true, message: "State is required ❗" }]}
          >
            <Input className="w-full" />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Parking Settings 🚙",
      content: (
        <div className="space-y-6">
          <Form.List
            name="spaceTypes"
            initialValue={[{ types: "two-wheeler", capacity: 1, amount: 10 }]}
            rules={[
              {
                validator: async (_, spaceTypes) => {
                  if (!spaceTypes || spaceTypes.length < 1) {
                    return Promise.reject(
                      new Error("At least one space type is required ❗")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <Form.Item
                      {...restField}
                      label="Vehicle Type"
                      name={[name, "types"]}
                      rules={[
                        { required: true, message: "Select vehicle type ❗" },
                      ]}
                    >
                      <Select
                        onChange={(value) =>
                          handleVehicleTypeChange(value, name)
                        }
                        className="w-full"
                      >
                        {vehicleTypeOptions.map((opt) => (
                          <Option
                            key={opt.value}
                            value={opt.value}
                            disabled={
                              selectedVehicleTypes.includes(opt.value) &&
                              selectedVehicleTypes[name] !== opt.value
                            }
                          >
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
                        {
                          required: true,
                          type: "number",
                          min: 1,
                          message: "Capacity must be at least 1 ❗",
                        },
                      ]}
                    >
                      <Input type="number" className="w-full" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Price per Hour"
                      name={[name, "amount"]}
                      rules={[
                        {
                          required: true,
                          type: "number",
                          min: 1,
                          message: "Price must be at least 1 ❗",
                        },
                      ]}
                    >
                      <Input type="number" className="w-full" />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button
                        onClick={() => {
                          const currentSpaceTypes =
                            form.getFieldValue("spaceTypes");
                          const updatedTypes = selectedVehicleTypes.filter(
                            (_, i) => i !== name
                          );
                          setSelectedVehicleTypes(updatedTypes);
                          remove(name);
                        }}
                        className="mt-2 bg-red-500 hover:bg-red-600 text-white"
                      >
                        Remove 🗑️
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => {
                    const availableTypes = vehicleTypeOptions.find(
                      (opt) => !selectedVehicleTypes.includes(opt.value)
                    );
                    if (availableTypes) {
                      add({
                        types: availableTypes.value,
                        capacity: 1,
                        amount: 10,
                      });
                      setSelectedVehicleTypes([
                        ...selectedVehicleTypes,
                        availableTypes.value,
                      ]);
                    } else {
                      message.warning("All vehicle types are already added ⚠️");
                    }
                  }}
                  block
                >
                  Add Space Type ➕
                </Button>
              </div>
            )}
          </Form.List>
          <Form.Item
            label="Approval Status"
            name="approveStatus"
            initialValue={false}
            rules={[{ required: true, message: "Select approval status ❗" }]}
          >
            <Select className="w-full">
              <Option value={true}>Approved ✅</Option>
              <Option value={false}>Pending ⏳</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={is24Hours}
              onChange={(e) => setIs24Hours(e.target.checked)}
              className="text-gray-700"
            >
              24/7 Operation 🕒
            </Checkbox>
          </Form.Item>
          {!is24Hours && (
            <Form.Item
              label="Operating Hours"
              name="operatingHours"
              rules={[{ required: true, message: "Please select hours ❗" }]}
            >
              <TimePicker.RangePicker format="HH:mm" className="w-full" />
            </Form.Item>
          )}
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: !state?.place?.image,
                message: "Image is required 📸",
              },
            ]}
          >
            <Upload {...uploadProps} accept="image/*">
              <Button icon={<UploadOutlined />} className="flex items-center">
                Upload Image 📷
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea rows={3} className="w-full" />
          </Form.Item>
        </div>
      ),
    },
  ];

  const next = () => {
    form
      .validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch(() => {});
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <style jsx>{`
        .ant-form-item-label > label {
          @apply text-gray-700 font-semibold text-sm;
        }
        .ant-select-selector,
        .ant-input,
        .ant-picker,
        .ant-upload {
          @apply rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500;
        }
        .ant-btn {
          @apply rounded-lg;
        }
        .ant-btn-primary {
          @apply bg-blue-600 hover:bg-blue-700 text-white;
        }
        .ant-btn-dashed {
          @apply border-gray-300 text-gray-600 hover:bg-gray-100;
        }
      `}</style>
      <div className="mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          Back ⬅️
        </Button>
      </div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
        {state?.place ? "Edit Parking Space ✏️" : "Add Parking Space ➕"}
      </h2>
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
        <Steps current={currentStep} items={steps} className="mb-8" />
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {steps[currentStep].content}
          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <Button
                onClick={prev}
                className="border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Previous ⬅️
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next ➡️
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <div className="flex space-x-4">
                <Button
                  onClick={handleCancel}
                  className="border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  Cancel ❌
                </Button>
                <Button type="primary" htmlType="submit">
                  {state?.place ? "Update ✅" : "Add ➕"}
                </Button>
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ParkingSpaceManagement;
