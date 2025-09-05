import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Input,
  Select,
  Card,
  Statistic,
  Row,
  Col,
  Tag,
  Modal,
  Avatar,
  Tooltip,
  Badge,
} from "antd";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  Car,
  DollarSign,
  Home,
  Filter,
  Grid,
  List,
} from "lucide-react";
import ParkingSpaceManagement from "./PlacessManagement";
import {
  startGetPlacesByOwnerId,
  startRemovePlace,
} from "../../../../Actions/Pages/Placess/Placess";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

export default function OwnerPlaces() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [viewMode, setViewMode] = useState("table");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const data = useSelector((state) => state.ParkingPlacess);
  const { parkingList } = data;

  useEffect(() => {
    setPlaces(parkingList);
  }, [parkingList]);

  useEffect(() => {
    dispatch(startGetPlacesByOwnerId());
  }, [dispatch]);

  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60";

  const getImageUrl = (place) => {
    return place.imageUrl || place.image || DEFAULT_IMAGE;
  };

  const totalSpots = places.reduce(
    (sum, place) =>
      sum + place.spaceTypes.reduce((acc, space) => acc + space.capacity, 0),
    0
  );

  const totalEarnings = places.reduce(
    (sum, place) =>
      sum +
      place.spaceTypes.reduce(
        (acc, space) => acc + space.amount * space.capacity,
        0
      ),
    0
  );

  const activeSpots = places.filter((place) => place.activeStatus).length;
  const approvedSpots = places.filter((place) => place.approveStatus).length;

  const getStatusColor = (status) => {
    return status
      ? { color: "bg-green-500", text: "Active" }
      : { color: "bg-red-500", text: "Inactive" };
  };

  const getApprovalColor = (status) => {
    return status
      ? { color: "bg-blue-500", text: "Approved" }
      : { color: "bg-orange-500", text: "Pending" };
  };

  const filteredPlaces = places
    .filter(
      (p) => filter === "all" || p.approveStatus === (filter === "approved")
    )
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const columns = [
    {
      title: "Image",
      key: "image",
      width: 80,
      render: (_, record) => (
        <div className="relative group">
          <Avatar
            size={64}
            src={getImageUrl(record)}
            shape="square"
            className="border-2 border-gradient-to-r from-indigo-500 to-purple-500 shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
            <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="flex items-center gap-2 text-gray-700 font-semibold">
          <Home className="w-5 h-5" /> Place Details
        </span>
      ),
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div className="space-y-1">
          <div className="font-bold text-gray-800 text-lg">{text}</div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Home className="w-4 h-4" />
            {record.address.street}, {record.address.city}
          </div>
          <div className="text-xs text-indigo-600 font-medium uppercase">
            {record.propertyType.replace("_", " ")}
          </div>
        </div>
      ),
    },
    {
      title: (
        <span className="flex items-center gap-2 text-gray-700 font-semibold">
          <Car className="w-5 h-5" /> Capacity & Vehicles
        </span>
      ),
      key: "capacity",
      render: (record) => {
        const totalCapacity = record.spaceTypes.reduce(
          (sum, space) => sum + space.capacity,
          0
        );
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge count={totalCapacity} showZero color="#4f46e5" />
              <span className="text-sm text-gray-600">
                {totalCapacity === 1 ? "spot" : "spots"}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {record.spaceTypes.map((space) => (
                <Tag
                  key={space._id}
                  className="text-xs rounded-full px-2 py-0.5 bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-800 border-0"
                >
                  {space.types}: {space.capacity} slot
                  {space.capacity > 1 ? "s" : ""}
                </Tag>
              ))}
            </div>
          </div>
        );
      },
    },
    {
      title: (
        <span className="flex items-center gap-2 text-gray-700 font-semibold">
          <DollarSign className="w-5 h-5" /> Pricing
        </span>
      ),
      key: "amount",
      render: (record) => {
        const prices = record.spaceTypes.map((space) => space.amount);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        return (
          <div className="space-y-1">
            <div className="text-xl font-bold text-green-600">
              ₹{minPrice}
              {minPrice !== maxPrice && (
                <span className="text-sm"> - ₹{maxPrice}</span>
              )}
            </div>
            <div className="text-xs text-gray-500">per unit</div>
          </div>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      render: (record) => (
        <div className="space-y-2">
          <Tag
            className={`rounded-full px-3 py-0.5 font-medium text-white ${
              getStatusColor(record.activeStatus).color
            }`}
          >
            {getStatusColor(record.activeStatus).text}
          </Tag>
          <Tag
            className={`rounded-full px-3 py-0.5 font-medium text-white ${
              getApprovalColor(record.approveStatus).color
            }`}
          >
            {getApprovalColor(record.approveStatus).text}
          </Tag>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_, record) => (
        <div className="flex space-x-2">
          <Tooltip title="View Details">
            <button className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all duration-200 hover:scale-110">
              <Eye className="w-5 h-5" />
            </button>
          </Tooltip>
          <Tooltip title="Edit Place">
            <button
              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-200 hover:scale-110"
              onClick={() =>
                navigate(`/ParkingSpaceEdit`, { state: { place: record } })
              } // Open modal to edit place
            >
              <Pencil className="w-5 h-5" />
            </button>
          </Tooltip>
          <Tooltip title="Delete Place">
            <button
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200 hover:scale-110"
              onClick={() => confirmDelete(record._id, record.title)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const showModal = (place = null) => {
    setEditingPlace(place ? { ...place } : null);
    setIsModalVisible(true);
  };

  const confirmDelete = (id, title) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = (id) => {
    dispatch(startRemovePlace(id)).then((res) => {
      if (res?.meta?.requestStatus === "fulfilled") {
        Modal.success({
          title: "Place deleted successfully",
          onOk: () => dispatch(startGetPlacesByOwnerId()),
        });
      } else {
        Modal.error({
          title: "Error deleting place",
          content: res?.payload?.error || "Unknown error occurred",
          onOk: () => {},
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6 relative">
              <Statistic
                title={
                  <span className="text-white font-semibold">
                    Total Earnings
                  </span>
                }
                value={totalEarnings}
                prefix="₹"
                valueStyle={{
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              />
              <DollarSign className="w-8 h-8 text-white opacity-80 absolute top-4 right-4" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6 relative">
              <Statistic
                title={
                  <span className="text-white font-semibold">Total Spots</span>
                }
                value={totalSpots}
                valueStyle={{
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              />
              <Car className="w-8 h-8 text-white opacity-80 absolute top-4 right-4" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-violet-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6 relative">
              <Statistic
                title={
                  <span className="text-white font-semibold">
                    Active Places
                  </span>
                }
                value={activeSpots}
                valueStyle={{
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              />
              <Home className="w-8 h-8 text-white opacity-80 absolute top-4 right-4" />
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6 relative">
              <Statistic
                title={
                  <span className="text-white font-semibold">Approved</span>
                }
                value={approvedSpots}
                valueStyle={{
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              />
              <Badge
                dot
                className="w-8 h-8 text-white opacity-80 absolute top-4 right-4"
              />
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Manage Places
              </h2>
              <p className="text-gray-600">
                Create, edit, and manage your parking locations
              </p>
            </div>
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => navigate("/ParkingSpaceAdd")} // Open modal to add new place
            >
              <Plus className="w-5 h-5" /> Add New Place
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
            <div className="flex-1">
              <Input
                placeholder="Search by place name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                size="large"
              />
            </div>
            <Select
              value={filter}
              onChange={(value) => setFilter(value)}
              className="w-full lg:w-48"
              size="large"
              suffixIcon={<Filter className="w-5 h-5 text-gray-400" />}
            >
              <Option value="all">All Places</Option>
              <Option value="approved">Approved Only</Option>
              <Option value="pending">Pending Only</Option>
            </Select>
            <div className="flex gap-2">
              <button
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === "table"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-white border border-gray-200 hover:border-indigo-400 hover:shadow-md"
                }`}
                onClick={() => setViewMode("table")}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                className={`p-3 rounded-lg transition-all duration-300 ${
                  viewMode === "cards"
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-white border border-gray-200 hover:border-indigo-400 hover:shadow-md"
                }`}
                onClick={() => setViewMode("cards")}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {viewMode === "table" ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <Table
              columns={columns}
              dataSource={filteredPlaces}
              rowKey="_id"
              pagination={{
                pageSize: 5,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} places`,
                className: "px-4 py-2",
              }}
              className="custom-table"
              rowClassName="hover:bg-indigo-50/50 transition-colors duration-200"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlaces.map((place) => (
              <div
                key={place._id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
              >
                <div className="relative h-48">
                  <img
                    alt={place.title}
                    src={getImageUrl(place)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 space-y-2">
                    <span
                      className={`inline-block rounded-full px-3 py-0.5 font-medium text-white ${
                        getStatusColor(place.activeStatus).color
                      }`}
                    >
                      {getStatusColor(place.activeStatus).text}
                    </span>
                    <span
                      className={`inline-block rounded-full px-3 py-0.5 font-medium text-white ${
                        getApprovalColor(place.approveStatus).color
                      }`}
                    >
                      {getApprovalColor(place.approveStatus).text}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-xl text-gray-800 truncate">
                      {place.title}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      {place.address.street}, {place.address.city}
                    </p>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Property:
                      </span>
                      <span className="text-sm text-indigo-600 font-semibold capitalize">
                        {place.propertyType.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Capacity:
                      </span>
                      <Badge
                        count={place.spaceTypes.reduce(
                          (sum, space) => sum + space.capacity,
                          0
                        )}
                        showZero
                        color="#4f46e5"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-gray-600">
                        Vehicles:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {place.spaceTypes.map((space) => (
                          <span
                            key={space._id}
                            className="text-xs rounded-full px-2 py-0.5 bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-800"
                          >
                            {space.types}: {space.capacity} slot
                            {space.capacity > 1 ? "s" : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-sm font-medium text-gray-600">
                        Price:
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        ₹{Math.min(...place.spaceTypes.map((s) => s.amount))}
                        <span className="text-xs text-gray-500">/unit</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 p-4 border-t border-gray-100">
                  <Tooltip title="View Details">
                    <button className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-all duration-200 hover:scale-110">
                      <Eye className="w-5 h-5" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Edit Place">
                    <button
                      className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all duration-200 hover:scale-110"
                      onClick={() =>
                        navigate(`/ParkingSpaceEdit`, { state: { place } })
                      } // Open modal to edit place
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  </Tooltip>
                  <Tooltip title="Delete Place">
                    <button
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200 hover:scale-110"
                      onClick={() => confirmDelete(place._id, place.title)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
