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
} from "antd";
import {
  CarOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const UserBookings = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                      <Text className="text-gray-600 block">
                        {booking.address}
                      </Text>
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
      </div>
    </div>
  );
};

export default UserBookings;
