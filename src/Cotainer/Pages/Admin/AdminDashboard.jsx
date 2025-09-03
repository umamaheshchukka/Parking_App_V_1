import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Table,
  Card,
  Badge,
  Button,
  Input,
  Select,
  Form,
  Modal,
  Tabs,
  Dropdown,
  Avatar,
  Drawer,
  Tag,
  Space,
  Row,
  Col,
  Statistic,
  DatePicker,
  notification,
} from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CarOutlined,
  CheckCircleOutlined,
  BellOutlined,
  SettingOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  EyeOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

// Mock data
const mockOwners = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    parkingPlaces: 2,
    status: "pending",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    parkingPlaces: 1,
    status: "approved",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike@example.com",
    parkingPlaces: 3,
    status: "pending",
    createdAt: "2024-01-25",
  },
  {
    id: 4,
    name: "Lisa Wilson",
    email: "lisa@example.com",
    parkingPlaces: 1,
    status: "rejected",
    createdAt: "2024-01-30",
  },
];

const mockUsers = [
  {
    id: 1,
    name: "Alex Brown",
    email: "alex@example.com",
    vehicles: 1,
    status: "active",
    suspicious: false,
  },
  {
    id: 2,
    name: "Emma Taylor",
    email: "emma@example.com",
    vehicles: 2,
    status: "new",
    suspicious: false,
  },
  {
    id: 3,
    name: "David Lee",
    email: "david@example.com",
    vehicles: 1,
    status: "active",
    suspicious: true,
  },
  {
    id: 4,
    name: "Grace Kim",
    email: "grace@example.com",
    vehicles: 3,
    status: "new",
    suspicious: false,
  },
];

const mockVehicles = [
  {
    id: 1,
    vehicleNo: "ABC-123",
    owner: "John Smith",
    user: "Alex Brown",
    status: "pending",
  },
  {
    id: 2,
    vehicleNo: "XYZ-456",
    owner: "Sarah Johnson",
    user: "Emma Taylor",
    status: "pending",
  },
  {
    id: 3,
    vehicleNo: "DEF-789",
    owner: "Mike Davis",
    user: "David Lee",
    status: "pending",
  },
];

const mockNotifications = [
  {
    id: 1,
    message: "Owner John Smith requested parking approval",
    time: "2 hours ago",
    type: "owner",
  },
  {
    id: 2,
    message: "User Emma Taylor added a new vehicle",
    time: "4 hours ago",
    type: "vehicle",
  },
  {
    id: 3,
    message: "New user Grace Kim registered",
    time: "6 hours ago",
    type: "user",
  },
];

const analyticsData = [
  { month: "Jan", approvals: 12, rejections: 3 },
  { month: "Feb", approvals: 19, rejections: 2 },
  { month: "Mar", approvals: 15, rejections: 5 },
  { month: "Apr", approvals: 22, rejections: 1 },
  { month: "May", approvals: 18, rejections: 4 },
  { month: "Jun", approvals: 25, rejections: 2 },
];

const utilizationData = [
  { name: "Occupied", value: 68, color: "#52c41a" },
  { name: "Available", value: 32, color: "#1890ff" },
];

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [owners, setOwners] = useState(mockOwners);
  const [users, setUsers] = useState(mockUsers);
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchTerm, setSearchTerm] = useState("");

  const pendingOwners = owners.filter((o) => o.status === "pending").length;
  const pendingVehicles = vehicles.filter((v) => v.status === "pending").length;
  const newUsers = users.filter((u) => u.status === "new").length;

  const menuItems = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
    {
      key: "owners",
      icon: <TeamOutlined />,
      label: (
        <span>
          Owners
          {pendingOwners > 0 && (
            <Badge count={pendingOwners} size="small" className="ml-2" />
          )}
        </span>
      ),
    },
    {
      key: "users",
      icon: <UserOutlined />,
      label: (
        <span>
          Users
          {newUsers > 0 && (
            <Badge count={newUsers} size="small" className="ml-2" />
          )}
        </span>
      ),
    },
    {
      key: "vehicles",
      icon: <CarOutlined />,
      label: (
        <span>
          Vehicles
          {pendingVehicles > 0 && (
            <Badge count={pendingVehicles} size="small" className="ml-2" />
          )}
        </span>
      ),
    },
    { key: "approvals", icon: <CheckCircleOutlined />, label: "Approvals" },
    { key: "notifications", icon: <BellOutlined />, label: "Notifications" },
    { key: "settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  const handleApproval = (id, type, action) => {
    if (type === "owner") {
      setOwners((prev) =>
        prev.map((owner) =>
          owner.id === id ? { ...owner, status: action } : owner
        )
      );
    } else if (type === "vehicle") {
      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id === id ? { ...vehicle, status: action } : vehicle
        )
      );
    }

    notification.success({
      message: `${type === "owner" ? "Owner" : "Vehicle"} ${action}`,
      description: `Successfully ${action} the ${
        type === "owner" ? "parking place request" : "vehicle registration"
      }.`,
    });
  };

  const markSuspicious = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, suspicious: !user.suspicious } : user
      )
    );
  };

  const adminMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <Statistic
              title={<span className="text-blue-100">Total Owners</span>}
              value={owners.length}
              valueStyle={{ color: "white" }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <Statistic
              title={<span className="text-green-100">Total Users</span>}
              value={users.length}
              valueStyle={{ color: "white" }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <Statistic
              title={
                <span className="text-purple-100">Total Parking Places</span>
              }
              value={156}
              valueStyle={{ color: "white" }}
              prefix={<CarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <Statistic
              title={<span className="text-orange-100">Pending Approvals</span>}
              value={pendingOwners + pendingVehicles}
              valueStyle={{ color: "white" }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Approvals Over Time" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="approvals"
                  stroke="#52c41a"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="rejections"
                  stroke="#ff4d4f"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Parking Utilization" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  data={utilizationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {utilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderOwners = () => {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 60,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        filteredValue: searchTerm ? [searchTerm] : null,
        onFilter: (value, record) =>
          record.name.toLowerCase().includes(value.toLowerCase()) ||
          record.email.toLowerCase().includes(value.toLowerCase()),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Parking Places",
        dataIndex: "parkingPlaces",
        key: "parkingPlaces",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag
            color={
              status === "approved"
                ? "green"
                : status === "pending"
                ? "orange"
                : "red"
            }
          >
            {status.toUpperCase()}
          </Tag>
        ),
        filters: [
          { text: "Pending", value: "pending" },
          { text: "Approved", value: "approved" },
          { text: "Rejected", value: "rejected" },
        ],
        onFilter: (value, record) => record.status === value,
      },
      {
        title: "Created Date",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
            {record.status === "pending" && (
              <>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleApproval(record.id, "owner", "approved")}
                >
                  Approve
                </Button>
                <Button
                  danger
                  size="small"
                  onClick={() => handleApproval(record.id, "owner", "rejected")}
                >
                  Reject
                </Button>
              </>
            )}
            <Button size="small" icon={<EyeOutlined />}>
              View
            </Button>
          </Space>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Owners Management</h2>
          <Space>
            <Search
              placeholder="Search owners..."
              allowClear
              onSearch={setSearchTerm}
              style={{ width: 250 }}
            />
            <Button icon={<FilterOutlined />}>Filters</Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={owners}
          rowKey="id"
          scroll={{ x: 800 }}
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  };

  const renderUsers = () => {
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 60,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Vehicles",
        dataIndex: "vehicles",
        key: "vehicles",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag color={status === "active" ? "green" : "blue"}>
            {status.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: "Suspicious",
        dataIndex: "suspicious",
        key: "suspicious",
        render: (suspicious) => (
          <Tag color={suspicious ? "red" : "green"}>
            {suspicious ? "Yes" : "No"}
          </Tag>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
            <Button
              type={record.suspicious ? "default" : "primary"}
              size="small"
              danger={record.suspicious}
              onClick={() => markSuspicious(record.id)}
            >
              {record.suspicious ? "Clear Suspicion" : "Mark Suspicious"}
            </Button>
            <Button size="small" icon={<EyeOutlined />}>
              View Details
            </Button>
          </Space>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Users Management</h2>
          <Search
            placeholder="Search users..."
            allowClear
            style={{ width: 250 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          scroll={{ x: 800 }}
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  };

  const renderVehicles = () => {
    const columns = [
      {
        title: "Vehicle No",
        dataIndex: "vehicleNo",
        key: "vehicleNo",
      },
      {
        title: "Owner",
        dataIndex: "owner",
        key: "owner",
      },
      {
        title: "User",
        dataIndex: "user",
        key: "user",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag
            color={
              status === "approved"
                ? "green"
                : status === "pending"
                ? "orange"
                : "red"
            }
          >
            {status.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          <Space>
            {record.status === "pending" && (
              <>
                <Button
                  type="primary"
                  size="small"
                  onClick={() =>
                    handleApproval(record.id, "vehicle", "approved")
                  }
                >
                  Approve
                </Button>
                <Button
                  danger
                  size="small"
                  onClick={() =>
                    handleApproval(record.id, "vehicle", "rejected")
                  }
                >
                  Reject
                </Button>
              </>
            )}
          </Space>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Vehicle Approvals</h2>
        <Table
          columns={columns}
          dataSource={vehicles}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  };

  const renderNotifications = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Notifications</h2>
      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card
            key={notif.id}
            size="small"
            className="hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{notif.message}</p>
                <p className="text-gray-500 text-sm">{notif.time}</p>
              </div>
              <Tag
                color={
                  notif.type === "owner"
                    ? "blue"
                    : notif.type === "vehicle"
                    ? "green"
                    : "orange"
                }
              >
                {notif.type}
              </Tag>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return renderDashboard();
      case "owners":
        return renderOwners();
      case "users":
        return renderUsers();
      case "vehicles":
        return renderVehicles();
      case "notifications":
        return renderNotifications();
      default:
        return renderDashboard();
    }
  };

  const sidebarContent = (
    <div className="h-full">
      <div className="p-4 border-b">
        <h1 className="text-lg font-bold text-white">Parking Admin</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedMenu]}
        onClick={({ key }) => setSelectedMenu(key)}
        className="border-r-0"
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );

  return (
    <Layout className="min-h-screen">
      {/* Desktop Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="hidden lg:block"
        width={250}
      >
        {sidebarContent}
      </Sider>

      {/* Mobile Drawer */}
      <Drawer
        title="Parking Admin"
        placement="left"
        onClose={() => setMobileDrawer(false)}
        open={mobileDrawer}
        className="lg:hidden"
        bodyStyle={{ padding: 0 }}
      >
        {sidebarContent}
      </Drawer>

      <Layout>
        <Header className="bg-white shadow-sm px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex"
            />
            <Button
              type="text"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setMobileDrawer(true)}
              className="lg:hidden"
            />

            <Search
              placeholder="Quick search..."
              allowClear
              style={{ width: 300 }}
              className="ml-4 hidden md:block"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Badge count={notifications.length} size="small">
              <Button
                type="text"
                icon={<BellOutlined />}
                onClick={() => setSelectedMenu("notifications")}
              />
            </Badge>

            <Dropdown overlay={adminMenu} placement="bottomRight">
              <div className="flex items-center cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                <span className="ml-2 hidden sm:block">Admin User</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="p-6 bg-gray-50 overflow-auto">
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
