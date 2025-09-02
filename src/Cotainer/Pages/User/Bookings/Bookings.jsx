import React, { useState, useMemo } from "react";
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
  DatePicker,
  Row,
  Col,
  Switch,
  Alert,
  Image,
  Divider,
  Tag,
} from "antd";
import {
  CarOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CreditCardOutlined,
  TableOutlined,
  AppstoreOutlined,
  FilterOutlined,
  CloseOutlined,
  BellOutlined,
} from "@ant-design/icons";
import moment from "moment"; // Added moment for time calculations
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const UserBookings = () => {
  // Sample data with all required fields
  const [bookings, setBookings] = useState([
    {
      id: 1,
      location: "City Mall Parking",
      address: "123 Main St, Downtown",
      date: "2024-09-05",
      time: "10:00 AM - 2:00 PM",
      vehicle: "Toyota Camry (ABC-1234)",
      status: "approved",
      price: "$15",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
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
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      location: "Shopping Center",
      address: "789 Commerce St",
      date: "2024-09-10",
      time: "2:00 PM - 8:00 PM",
      vehicle: "BMW X3 (DEF-9012)",
      status: "upcoming",
      price: "$20",
      imageUrl:
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      location: "Airport Parking",
      address: "Airport Terminal 1",
      date: "2024-09-03",
      time: "6:00 AM - 10:00 PM",
      vehicle: "Tesla Model 3 (GHI-3456)",
      status: "ongoing",
      price: "$45",
      imageUrl:
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      location: "Stadium Parking",
      address: "Sports Complex Area",
      date: "2024-09-08",
      time: "7:00 PM - 11:00 PM",
      vehicle: "Ford Mustang (JKL-7890)",
      status: "pending",
      price: "$30",
      imageUrl:
        "https://images.unsplash.com/photo-1590079845192-b46ccdea2c67?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      location: "Hotel Parking",
      address: "Luxury Hotel District",
      date: "2024-07-15",
      time: "3:00 PM - 11:00 AM",
      vehicle: "Mercedes C-Class (MNO-2468)",
      status: "cancelled",
      price: "$60",
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
  ]);

  // State management
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState(null);
  const [groupByLocation, setGroupByLocation] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const navigate = useNavigate();

  // Get approved bookings for notifications
  const approvedBookings = useMemo(() => {
    return bookings.filter((booking) => booking.status === "approved");
  }, [bookings]);

  // Sort bookings: upcoming first, then by date
  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => {
      const statusPriority = {
        upcoming: 1,
        ongoing: 2,
        approved: 3,
        pending: 4,
        completed: 5,
        cancelled: 6,
      };

      const priorityA = statusPriority[a.status] || 999;
      const priorityB = statusPriority[b.status] || 999;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return new Date(b.date) - new Date(a.date);
    });
  }, [bookings]);

  // Filter bookings based on status and date range
  const filteredBookings = useMemo(() => {
    let filtered = sortedBookings;

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    // Filter by date range
    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate >= startDate && bookingDate <= endDate;
      });
    }

    return filtered;
  }, [sortedBookings, statusFilter, dateRange]);

  // Group bookings by location if enabled
  const groupedBookings = useMemo(() => {
    if (!groupByLocation) return { "All Bookings": filteredBookings };

    return filteredBookings.reduce((groups, booking) => {
      const location = booking.location;
      if (!groups[location]) {
        groups[location] = [];
      }
      groups[location].push(booking);
      return groups;
    }, {});
  }, [filteredBookings, groupByLocation]);

  // Handle payment navigation (simulate)
  const handlePaymentRedirect = (bookingId) => {
    console.log(`Navigating to /payment/${bookingId}`);
    Modal.success({
      title: "Payment Redirect",
      content: `Redirecting to payment page for booking #${bookingId}`,
    });
  };

  // Get status badge properties
  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { status: "processing", color: "blue" },
      ongoing: { status: "processing", color: "blue" },
      completed: { status: "success", color: "green" },
      upcoming: { status: "default", color: "purple" },
      approved: { status: "success", color: "orange" },
      pending: { status: "warning", color: "yellow" },
      cancelled: { status: "error", color: "red" },
    };
    return statusConfig[status] || { status: "default", color: "gray" };
  };

  // Calculate time display for bookings
  const getTimeDisplay = (booking) => {
    if (booking.status === "ongoing") {
      const [startTime, endTime] = booking.time.split(" - ");
      const endMoment = moment(
        `${booking.date} ${endTime}`,
        "YYYY-MM-DD h:mm A"
      );
      const now = moment();
      if (now.isAfter(endMoment)) {
        return "Booking has ended";
      }
      const duration = moment.duration(endMoment.diff(now));
      const hours = Math.floor(duration.asHours());
      const minutes = Math.floor(duration.asMinutes()) % 60;
      return `Time remaining: ${hours}h ${minutes}m`;
    } else if (booking.status === "upcoming") {
      return `Slot: ${booking.time}`;
    }
    return booking.time;
  };

  // Notification Component
  const NotificationContainer = () => {
    if (!showNotifications || approvedBookings.length === 0) return null;

    return (
      <Alert
        message={
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BellOutlined className="text-orange-500" />
              <Text strong>Payment Required</Text>
            </div>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => setShowNotifications(false)}
            />
          </div>
        }
        description={
          <div className="mt-2">
            <Text>
              You have {approvedBookings.length} approved booking(s) awaiting
              payment:
            </Text>
            <div className="mt-2 space-y-1">
              {approvedBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-2 bg-white rounded border"
                >
                  <div>
                    <Text strong>{booking.location}</Text>
                    <Text className="text-gray-500 ml-2">{booking.date}</Text>
                  </div>
                  <Button
                    type="primary"
                    size="small"
                    icon={<CreditCardOutlined />}
                    onClick={() => handlePaymentRedirect(booking.id)}
                  >
                    Pay Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        }
        type="warning"
        showIcon
        className="mb-6"
      />
    );
  };

  // Card View Component
  const BookingCard = ({ booking }) => {
    const badgeConfig = getStatusBadge(booking.status);

    return (
      <Card
        className="shadow-sm hover:shadow-md transition-all duration-300"
        cover={
          booking.imageUrl && (
            <div className="h-48 overflow-hidden">
              <Image
                src={booking.imageUrl}
                alt={booking.location}
                className="w-full h-full object-cover"
                preview={false}
              />
            </div>
          )
        }
        actions={
          booking.status === "approved"
            ? [
                <Button
                  type="primary"
                  icon={<CreditCardOutlined />}
                  onClick={() => handlePaymentRedirect(booking.id)}
                  className="w-full"
                >
                  Proceed to Payment
                </Button>,
              ]
            : []
        }
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Title level={5} className="mb-1">
                {booking.location}
              </Title>
              <Text className="text-gray-600">
                <EnvironmentOutlined className="mr-1" />
                {booking.address}
              </Text>
            </div>
            <Tag color={badgeConfig.color}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Tag>
          </div>

          <Divider className="my-3" />

          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <CalendarOutlined className="mr-2 text-blue-500" />
              <Text>{booking.date}</Text>
            </div>
            <div className="flex items-center text-gray-600">
              <ClockCircleOutlined className="mr-2 text-green-500" />
              <Text>{getTimeDisplay(booking)}</Text>
            </div>
            <div className="flex items-center text-gray-600">
              <CarOutlined className="mr-2 text-purple-500" />
              <Text>{booking.vehicle}</Text>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <Text className="text-2xl font-bold text-green-600">
              {booking.price}
            </Text>
            <Text className="text-gray-500">Booking #{booking.id}</Text>
          </div>
        </div>
      </Card>
    );
  };

  // Table columns definition
  const tableColumns = [
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text className="text-gray-500 text-xs">
            <EnvironmentOutlined className="mr-1" />
            {record.address}
          </Text>
        </div>
      ),
    },
    {
      title: "Date & Time",
      key: "datetime",
      render: (_, record) => (
        <div className="space-y-1">
          <div>
            <CalendarOutlined className="mr-1 text-blue-500" />
            {record.date}
          </div>
          <div>
            <ClockCircleOutlined className="mr-1 text-green-500" />
            {getTimeDisplay(record)}
          </div>
        </div>
      ),
    },
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "vehicle",
      render: (text) => (
        <div>
          <CarOutlined className="mr-1 text-purple-500" />
          {text}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const badgeConfig = getStatusBadge(status);
        return (
          <Tag color={badgeConfig.color}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <Text className="text-lg font-semibold text-green-600">{price}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        if (record.status === "approved") {
          return (
            <Button
              type="primary"
              icon={<CreditCardOutlined />}
              onClick={() => handlePaymentRedirect(record.id)}
              size="small"
            >
              Pay Now
            </Button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <Title level={2} className="mb-0">
              My Bookings
            </Title>
            <div className="flex items-center space-x-4">
              <Text>View:</Text>
              <div className="flex items-center space-x-2 bg-white rounded-lg p-1 border">
                <Button
                  type={viewMode === "card" ? "primary" : "text"}
                  icon={<AppstoreOutlined />}
                  onClick={() => setViewMode("card")}
                  size="small"
                >
                  Cards
                </Button>
                <Button
                  type={viewMode === "table" ? "primary" : "text"}
                  icon={<TableOutlined />}
                  onClick={() => setViewMode("table")}
                  size="small"
                >
                  Table
                </Button>
              </div>
            </div>
          </div>

          {/* Notification Container */}
          <NotificationContainer />

          {/* Filters */}
          <Card className="shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                <div className="flex items-center space-x-2">
                  <FilterOutlined className="text-gray-500" />
                  <Text strong>Filters:</Text>
                </div>

                <Select
                  placeholder="Filter by Status"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  className="w-full sm:w-40"
                  allowClear
                >
                  <Option value="all">All Status</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="ongoing">Ongoing</Option>
                  <Option value="upcoming">Upcoming</Option>
                  <Option value="approved">Approved</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="cancelled">Cancelled</Option>
                </Select>

                <RangePicker
                  placeholder={["Start Date", "End Date"]}
                  value={dateRange}
                  onChange={setDateRange}
                  className="w-full sm:w-64"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Text>Group by Location:</Text>
                  <Switch
                    checked={groupByLocation}
                    onChange={setGroupByLocation}
                    size="small"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Bookings Display */}
          <div className="space-y-6">
            {Object.entries(groupedBookings).map(
              ([locationGroup, locationBookings]) => (
                <div key={locationGroup} className="space-y-4">
                  {groupByLocation && (
                    <div className="flex items-center space-x-2">
                      <EnvironmentOutlined className="text-blue-500" />
                      <Title level={4} className="mb-0">
                        {locationGroup}
                      </Title>
                      <Badge
                        count={locationBookings.length}
                        showZero
                        color="blue"
                      />
                    </div>
                  )}

                  {viewMode === "card" ? (
                    <Row gutter={[16, 16]}>
                      {locationBookings.map((booking) => (
                        <Col key={booking.id} xs={24} sm={12} lg={8} xl={6}>
                          <BookingCard booking={booking} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Table
                      dataSource={locationBookings}
                      columns={tableColumns}
                      rowKey="id"
                      pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) =>
                          `${range[0]}-${range[1]} of ${total} bookings`,
                      }}
                      className="shadow-sm"
                    />
                  )}
                </div>
              )
            )}

            {filteredBookings.length === 0 && (
              <Card className="text-center py-12">
                <div className="space-y-4">
                  <CarOutlined className="text-6xl text-gray-300" />
                  <div>
                    <Title level={4} className="text-gray-500">
                      No Bookings Found
                    </Title>
                    <Text className="text-gray-400">
                      Try adjusting your filters or date range
                    </Text>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Summary Statistics */}
          {filteredBookings.length > 0 && (
            <Card className="shadow-sm">
              <Row gutter={16}>
                <Col span={6}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {filteredBookings.length}
                    </div>
                    <Text className="text-gray-500">Total Bookings</Text>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {
                        filteredBookings.filter((b) => b.status === "completed")
                          .length
                      }
                    </div>
                    <Text className="text-gray-500">Completed</Text>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {
                        filteredBookings.filter((b) => b.status === "approved")
                          .length
                      }
                    </div>
                    <Text className="text-gray-500">Awaiting Payment</Text>
                  </div>
                </Col>
                <Col span={6}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {
                        filteredBookings.filter((b) => b.status === "upcoming")
                          .length
                      }
                    </div>
                    <Text className="text-gray-500">Upcoming</Text>
                  </div>
                </Col>
              </Row>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
