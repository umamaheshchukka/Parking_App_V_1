import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Slider,
  Checkbox,
  Collapse,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { Panel } = Collapse;

export function SearchFilters({ onSearch, searchLocation, setSearchLocation }) {
  const [form] = Form.useForm();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const initialValues = {
    date: null,
    startTime: null,
    endTime: null,
    maxPrice: 20,
    type: "all",
    showAvailableOnly: true,
    sortBy: "distance",
  };

  const handleSearch = (values) => {
    onSearch({
      ...values,
      date: values.date ? values.date.format("YYYY-MM-DD") : "",
      startTime: values.startTime ? values.startTime.format("HH:mm") : "",
      endTime: values.endTime ? values.endTime.format("HH:mm") : "",
    });
  };

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={handleSearch}
          layout="vertical"
        >
          {/* Main Search */}
          <div className="flex gap-3 mb-4">
            <Form.Item className="flex-1 mb-0">
              <Input
                prefix={<EnvironmentOutlined className="text-gray-500" />}
                placeholder="Where do you need to park?"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="rounded-md text-sm"
              />
            </Form.Item>
            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
                className="flex items-center gap-2"
              >
                Search
              </Button>
            </Form.Item>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Form.Item name="date" className="mb-0">
              <DatePicker
                className="text-sm"
                placeholder="Select date"
                suffixIcon={
                  <i className="anticon">
                    <svg viewBox="0 0 1024 1024" width="16" height="16">
                      <path d="M896 128H768v64h128v640H128V192h128v-64H128c-35.3 0-64 28.7-64 64v640c0 35.3 28.7 64 64 64h768c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64zM512 896c-141.4 0-256-114.6-256-256s114.6-256 256-256 256 114.6 256 256-114.6 256-256 256zm0-448c-106 0-192 86-192 192s86 192 192 192 192-86 192-192-86-192-192-192z" />
                    </svg>
                  </i>
                }
              />
            </Form.Item>

            <div className="flex items-center gap-2">
              <Form.Item name="startTime" className="mb-0">
                <TimePicker
                  className="text-sm"
                  placeholder="Start time"
                  format="HH:mm"
                />
              </Form.Item>
              <span className="text-gray-500 text-sm">to</span>
              <Form.Item name="endTime" className="mb-0">
                <TimePicker
                  className="text-sm"
                  placeholder="End time"
                  format="HH:mm"
                />
              </Form.Item>
            </div>

            <Form.Item name="type" className="mb-0">
              <Select className="w-32 text-sm">
                <Option value="all">All Types</Option>
                <Option value="garage">Garage</Option>
                <Option value="street">Street</Option>
                <Option value="lot">Parking Lot</Option>
              </Select>
            </Form.Item>

            <Button
              icon={<FilterOutlined />}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center gap-2 text-sm"
            >
              More Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          <Collapse
            activeKey={isFiltersOpen ? ["1"] : []}
            onChange={() => setIsFiltersOpen(!isFiltersOpen)}
            bordered={false}
          >
            <Panel header={null} key="1" showArrow={false}>
              <div className="bg-gray-50 border rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Form.Item
                    name="maxPrice"
                    label={`Max Price per Hour: $${
                      form.getFieldValue("maxPrice") || initialValues.maxPrice
                    }`}
                  >
                    <Slider
                      min={1}
                      max={30}
                      step={1}
                      onChange={(value) =>
                        form.setFieldsValue({ maxPrice: value })
                      }
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$1</span>
                      <span>$30</span>
                    </div>
                  </Form.Item>

                  <Form.Item name="sortBy" label="Sort by">
                    <Select className="text-sm">
                      <Option value="distance">Distance</Option>
                      <Option value="price">Price</Option>
                      <Option value="rating">Rating</Option>
                      <Option value="availability">Availability</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="showAvailableOnly" valuePropName="checked">
                    <Checkbox>Available Only</Checkbox>
                    <p className="text-xs text-gray-500 mt-1">
                      Show only spots with current availability
                    </p>
                  </Form.Item>
                </div>
              </div>
            </Panel>
          </Collapse>
        </Form>
      </div>
    </div>
  );
}
