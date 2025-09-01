import React, { useState, useEffect } from "react";
import {
  Calendar as LucideCalendar,
  Clock,
  Car,
  DollarSign,
  TrendingUp,
  Filter,
  Search as LucideSearch,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  MapPin,
  BarChart3,
  PieChart,
  RefreshCw,
} from "lucide-react";
import {
  Table,
  Input,
  Select,
  DatePicker,
  Button,
  Checkbox,
  Card,
  Statistic,
  Row,
  Col,
  Space,
  Tag,
  Spin,
  Empty,
  Typography,
  Divider,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;
const { Text, Title } = Typography;

const OwnerBookings = () => {
  const [viewType, setViewType] = useState("table");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedPlace, setSelectedPlace] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const [places, setPlaces] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data with more comprehensive booking information
  useEffect(() => {
    setPlaces([
      {
        id: 1,
        name: "Parking Lot A",
        capacity: 50,
        occupied: 32,
        hourlyRate: 5,
        location: "Downtown",
      },
      {
        id: 2,
        name: "Parking Garage B",
        capacity: 100,
        occupied: 78,
        hourlyRate: 8,
        location: "Business District",
      },
      {
        id: 3,
        name: "Street Parking C",
        capacity: 25,
        occupied: 15,
        hourlyRate: 3,
        location: "Residential",
      },
      {
        id: 4,
        name: "Mall Parking D",
        capacity: 200,
        occupied: 145,
        hourlyRate: 4,
        location: "Shopping Center",
      },
    ]);

    setBookings([
      {
        id: 1,
        placeId: 1,
        user: "John Doe",
        email: "john@example.com",
        phone: "+1-555-0123",
        vehicleNumber: "ABC-123",
        date: "2025-09-01",
        startTime: "10:00",
        endTime: "12:00",
        duration: 2,
        amount: 10,
        status: "confirmed",
        paymentStatus: "paid",
        bookingTime: "2025-08-31 15:30",
        spotNumber: "A-15",
      },
      {
        id: 2,
        placeId: 1,
        user: "Jane Smith",
        email: "jane@example.com",
        phone: "+1-555-0124",
        vehicleNumber: "XYZ-789",
        date: "2025-09-01",
        startTime: "13:00",
        endTime: "15:00",
        duration: 2,
        amount: 10,
        status: "pending",
        paymentStatus: "pending",
        bookingTime: "2025-09-01 08:45",
        spotNumber: "A-22",
      },
      {
        id: 3,
        placeId: 2,
        user: "Alice Johnson",
        email: "alice@example.com",
        phone: "+1-555-0125",
        vehicleNumber: "DEF-456",
        date: "2025-09-02",
        startTime: "09:00",
        endTime: "11:00",
        duration: 2,
        amount: 16,
        status: "confirmed",
        paymentStatus: "paid",
        bookingTime: "2025-09-01 20:15",
        spotNumber: "B-08",
      },
      {
        id: 4,
        placeId: 3,
        user: "Bob Brown",
        email: "bob@example.com",
        phone: "+1-555-0126",
        vehicleNumber: "GHI-321",
        date: "2025-09-01",
        startTime: "16:00",
        endTime: "18:00",
        duration: 2,
        amount: 6,
        status: "cancelled",
        paymentStatus: "refunded",
        bookingTime: "2025-08-30 14:20",
        spotNumber: "C-05",
      },
      {
        id: 5,
        placeId: 2,
        user: "Charlie Davis",
        email: "charlie@example.com",
        phone: "+1-555-0127",
        vehicleNumber: "JKL-654",
        date: "2025-09-01",
        startTime: "11:00",
        endTime: "13:00",
        duration: 2,
        amount: 16,
        status: "confirmed",
        paymentStatus: "paid",
        bookingTime: "2025-09-01 09:30",
        spotNumber: "B-15",
      },
    ]);
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const dateMatch =
      dateRange === "all" ||
      (dateRange === "today" && booking.date === selectedDate) ||
      (dateRange === "week" &&
        new Date(booking.date) >=
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateRange === "month" &&
        new Date(booking.date) >=
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

    const placeMatch =
      selectedPlace === "all" || booking.placeId === parseInt(selectedPlace);
    const statusMatch =
      selectedStatus === "all" || booking.status === selectedStatus;
    const searchMatch =
      searchTerm === "" ||
      booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());

    return dateMatch && placeMatch && statusMatch && searchMatch;
  });
  const analytics = {
    totalBookings: filteredBookings.length,
    totalRevenue: filteredBookings.reduce(
      (sum, booking) =>
        booking.paymentStatus === "paid" ? sum + booking.amount : sum,
      0
    ),
    occupancyRate:
      (places.reduce((sum, place) => sum + place.occupied / place.capacity, 0) /
        places.length) *
      100,
    confirmedBookings: filteredBookings.filter((b) => b.status === "confirmed")
      .length,
    pendingBookings: filteredBookings.filter((b) => b.status === "pending")
      .length,
    cancelledBookings: filteredBookings.filter((b) => b.status === "cancelled")
      .length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "green";
      case "pending":
        return "gold";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPaymentTagColor = (paymentStatus) => {
    switch (paymentStatus) {
      case "paid":
        return "green";
      case "pending":
        return "gold";
      case "refunded":
        return "gray";
      default:
        return "default";
    }
  };

  const handleBookingAction = (bookingId, action) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? {
              ...booking,
              status:
                action === "confirm"
                  ? "confirmed"
                  : action === "cancel"
                  ? "cancelled"
                  : booking.status,
            }
          : booking
      )
    );
  };

  const handleBulkAction = (action) => {
    if (selectedBookings.length === 0) return;

    setBookings((prev) =>
      prev.map((booking) =>
        selectedBookings.includes(booking.id)
          ? {
              ...booking,
              status:
                action === "confirm"
                  ? "confirmed"
                  : action === "cancel"
                  ? "cancelled"
                  : booking.status,
            }
          : booking
      )
    );
    setSelectedBookings([]);
  };
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => `#${id}`,
    },
    {
      title: "User Details",
      key: "userDetails",
      render: (_, record) => (
        <div>
          <Text strong>{record.user}</Text>
          <br />
          <Text type="secondary">{record.email}</Text>
          <br />
          <Text type="secondary">{record.phone}</Text>
        </div>
      ),
    },
    {
      title: "Vehicle",
      dataIndex: "vehicleNumber",
      key: "vehicleNumber",
      render: (vehicleNumber) => (
        <Space>
          <Car className="w-4 h-4 text-gray-400" />
          <Text strong>{vehicleNumber}</Text>
        </Space>
      ),
    },
    {
      title: "Parking Details",
      key: "parkingDetails",
      render: (_, record) => {
        const place = places.find((p) => p.id === record.placeId);
        return (
          <div>
            <Text strong>{place?.name}</Text>
            <br />
            <Text type="secondary">Spot: {record.spotNumber}</Text>
            <br />
            <Text type="secondary">{place?.location}</Text>
          </div>
        );
      },
    },
    {
      title: "Time",
      key: "time",
      render: (_, record) => (
        <div>
          <Text strong>{record.date}</Text>
          <br />
          <Text type="secondary">
            {record.startTime} - {record.endTime}
          </Text>
          <br />
          <Text type="secondary">{record.duration}h duration</Text>
        </div>
      ),
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, record) => (
        <div>
          <Text strong>${record.amount}</Text>
          <br />
          <Tag color={getPaymentTagColor(record.paymentStatus)}>
            {record.paymentStatus}
          </Tag>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<Eye className="w-4 h-4" />}
            className="text-blue-600 hover:text-blue-900"
          />
          <Button
            type="text"
            icon={<Edit className="w-4 h-4" />}
            className="text-green-600 hover:text-green-900"
          />
          {record.status === "pending" && (
            <Button
              type="text"
              icon={<CheckCircle className="w-4 h-4" />}
              onClick={() => handleBookingAction(record.id, "confirm")}
              className="text-green-600 hover:text-green-900"
            />
          )}
          <Button
            type="text"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => handleBookingAction(record.id, "cancel")}
            className="text-red-600 hover:text-red-900"
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto">
        <Spin spinning={isLoading}>
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} md={8}>
              <Card bordered={true} className="border-green-200">
                <Statistic
                  title="Confirmed Bookings"
                  value={analytics.confirmedBookings}
                  prefix={<CheckCircle className="w-5 h-5 text-green-600" />}
                  valueStyle={{ color: "#166534" }}
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card bordered={true} className="border-yellow-200">
                <Statistic
                  title="Pending Bookings"
                  value={analytics.pendingBookings}
                  prefix={<AlertCircle className="w-5 h-5 text-yellow-600" />}
                  valueStyle={{ color: "#854d0e" }}
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card bordered={true} className="border-red-200">
                <Statistic
                  title="Cancelled Bookings"
                  value={analytics.cancelledBookings}
                  prefix={<XCircle className="w-5 h-5 text-red-600" />}
                  valueStyle={{ color: "#991b1b" }}
                />
              </Card>
            </Col>
          </Row>
          <Card bordered={true} className="mb-8">
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col>
                <Space>
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    icon={<Filter className="w-4 h-4" />}
                  >
                    Filters
                  </Button>
                  <Input
                    prefix={<LucideSearch className="w-4 h-4 text-gray-400" />}
                    placeholder="Search by user, vehicle, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 300 }}
                  />
                </Space>
              </Col>
              <Col>
                <Space>
                  <Button
                    icon={<RefreshCw className="w-4 h-4" />}
                    onClick={refreshData}
                  >
                    Refresh
                  </Button>
                  <Select
                    value={viewType}
                    onChange={setViewType}
                    style={{ width: 120 }}
                  >
                    <Option value="table">Table View</Option>
                    <Option value="cards">Card View</Option>
                    {/* <Option value="calendar">Calendar View</Option> */}
                  </Select>
                </Space>
              </Col>
            </Row>

            {showFilters && (
              <>
                <Divider />
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={6}>
                    <Text className="block mb-2">Date Range</Text>
                    <Select
                      value={dateRange}
                      onChange={setDateRange}
                      style={{ width: "100%" }}
                    >
                      <Option value="today">Today</Option>
                      <Option value="week">This Week</Option>
                      <Option value="month">This Month</Option>
                      <Option value="all">All Time</Option>
                    </Select>
                  </Col>
                  <Col xs={24} md={6}>
                    <Text className="block mb-2">Specific Date</Text>
                    <DatePicker
                      value={dayjs(selectedDate)}
                      onChange={(date, dateString) =>
                        setSelectedDate(dateString)
                      }
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col xs={24} md={6}>
                    <Text className="block mb-2">Parking Place</Text>
                    <Select
                      value={selectedPlace}
                      onChange={setSelectedPlace}
                      style={{ width: "100%" }}
                    >
                      <Option value="all">All Places</Option>
                      {places.map((place) => (
                        <Option key={place.id} value={place.id}>
                          {place.name} ({place.location})
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col xs={24} md={6}>
                    <Text className="block mb-2">Status</Text>
                    <Select
                      value={selectedStatus}
                      onChange={setSelectedStatus}
                      style={{ width: "100%" }}
                    >
                      <Option value="all">All Statuses</Option>
                      <Option value="confirmed">Confirmed</Option>
                      <Option value="pending">Pending</Option>
                      <Option value="cancelled">Cancelled</Option>
                    </Select>
                  </Col>
                </Row>
              </>
            )}

            {/* Bulk Actions */}
            {selectedBookings.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Space>
                  <Text type="secondary">
                    {selectedBookings.length} booking(s) selected
                  </Text>
                  <Button
                    type="primary"
                    onClick={() => handleBulkAction("confirm")}
                    style={{ backgroundColor: "#16a34a" }}
                  >
                    Confirm All
                  </Button>
                  <Button danger onClick={() => handleBulkAction("cancel")}>
                    Cancel All
                  </Button>
                  <Button onClick={() => setSelectedBookings([])}>
                    Clear Selection
                  </Button>
                </Space>
              </div>
            )}
          </Card>
          {viewType === "table" && (
            <Table
              dataSource={filteredBookings}
              columns={columns}
              rowKey="id"
              pagination={false}
              bordered
              rowSelection={{
                type: "checkbox",
                selectedRowKeys: selectedBookings,
                onChange: (selectedRowKeys) =>
                  setSelectedBookings(selectedRowKeys),
              }}
            />
          )}

          {viewType === "cards" && (
            <Row gutter={[16, 16]}>
              {filteredBookings.map((booking) => {
                const place = places.find((p) => p.id === booking.placeId);
                return (
                  <Col xs={24} md={12} lg={8} key={booking.id}>
                    <Card
                      title={`Booking #${booking.id}`}
                      extra={
                        <Tag
                          color={getStatusColor(booking.status)}
                          icon={getStatusIcon(booking.status)}
                        >
                          {booking.status}
                        </Tag>
                      }
                      hoverable
                    >
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        <Space>
                          <Users className="w-4 h-4 text-gray-400" />
                          <div>
                            <Text strong>{booking.user}</Text>
                            <br />
                            <Text type="secondary">{booking.email}</Text>
                          </div>
                        </Space>
                        <Space>
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <Text strong>{place?.name}</Text>
                            <br />
                            <Text type="secondary">
                              Spot: {booking.spotNumber} • {place?.location}
                            </Text>
                          </div>
                        </Space>
                        <Space>
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <Text strong>{booking.date}</Text>
                            <br />
                            <Text type="secondary">
                              {booking.startTime} - {booking.endTime} (
                              {booking.duration}h)
                            </Text>
                          </div>
                        </Space>
                        <Space>
                          <Car className="w-4 h-4 text-gray-400" />
                          <Text strong>{booking.vehicleNumber}</Text>
                        </Space>
                        <Divider />
                        <Space align="center">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <Text strong style={{ fontSize: 16 }}>
                            ${booking.amount}
                          </Text>
                          <Tag
                            color={getPaymentTagColor(booking.paymentStatus)}
                          >
                            {booking.paymentStatus}
                          </Tag>
                        </Space>
                        <Divider />
                        <Space>
                          <Button
                            type="text"
                            icon={<Eye className="w-4 h-4" />}
                            className="text-blue-600"
                          />
                          <Button
                            type="text"
                            icon={<Edit className="w-4 h-4" />}
                            className="text-green-600"
                          />
                          {booking.status === "pending" && (
                            <Button
                              type="primary"
                              size="small"
                              onClick={() =>
                                handleBookingAction(booking.id, "confirm")
                              }
                              style={{ backgroundColor: "#16a34a" }}
                            >
                              Confirm
                            </Button>
                          )}
                          <Button
                            danger
                            size="small"
                            onClick={() =>
                              handleBookingAction(booking.id, "cancel")
                            }
                          >
                            Cancel
                          </Button>
                        </Space>
                      </Space>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
          {filteredBookings.length === 0 && (
            <Empty
              image={
                <LucideCalendar className="w-12 h-12 text-gray-400 mx-auto" />
              }
              description={
                <div>
                  <Title level={4}>No bookings found</Title>
                  <Text type="secondary">
                    No bookings match your current filters. Try adjusting your
                    search criteria.
                  </Text>
                  <br />
                  <Button
                    type="primary"
                    className="mt-4"
                    onClick={() => {
                      setSelectedDate(dayjs().format("YYYY-MM-DD"));
                      setSelectedPlace("all");
                      setSelectedStatus("all");
                      setSearchTerm("");
                      setDateRange("today");
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              }
            />
          )}
        </Spin>
      </div>
    </div>
  );
};

export default OwnerBookings;
