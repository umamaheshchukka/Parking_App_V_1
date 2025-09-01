import React, { useState } from "react";

export default function OwnerPlaces() {
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: "Downtown Premium Parking",
      address: "123 Main St, Downtown",
      capacity: 50,
      availableSpots: 32,
      pricePerHour: 15,
      rating: 4.5,
      status: "active",
      approvalStatus: "approved",
      vehicleTypes: ["car", "motorcycle"],
      amenities: ["security", "covered", "ev-charging"],
      operatingHours: "06:00 - 22:00",
      totalEarnings: 12500,
      totalBookings: 245,
    },
    {
      id: 2,
      name: "Mall Side Parking",
      address: "456 Shopping Ave",
      capacity: 80,
      availableSpots: 65,
      pricePerHour: 10,
      rating: 4.2,
      status: "active",
      approvalStatus: "approved",
      vehicleTypes: ["car", "suv"],
      amenities: ["security", "covered"],
      operatingHours: "24/7",
      totalEarnings: 8750,
      totalBookings: 180,
    },
    {
      id: 3,
      name: "Airport Express Lot",
      address: "789 Airport Rd",
      capacity: 120,
      availableSpots: 0,
      pricePerHour: 25,
      rating: 4.8,
      status: "maintenance",
      approvalStatus: "pending",
      vehicleTypes: ["car", "suv", "van"],
      amenities: ["security", "shuttle", "ev-charging"],
      operatingHours: "24/7",
      totalEarnings: 22100,
      totalBookings: 420,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [is24Hours, setIs24Hours] = useState(false);
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("22:00");
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Dashboard Stats
  const totalEarnings = places.reduce(
    (sum, place) => sum + place.totalEarnings,
    0
  );
  const totalSpots = places.reduce((sum, place) => sum + place.capacity, 0);
  const occupiedSpots = places.reduce(
    (sum, place) => sum + (place.capacity - place.availableSpots),
    0
  );
  const totalBookings = places.reduce(
    (sum, place) => sum + place.totalBookings,
    0
  );

  const vehicleTypeOptions = [
    { label: "Car", value: "car" },
    { label: "Motorcycle", value: "motorcycle" },
    { label: "SUV", value: "suv" },
    { label: "Van", value: "van" },
    { label: "Truck", value: "truck" },
  ];

  const amenityOptions = [
    { label: "Security Camera", value: "security" },
    { label: "Covered Parking", value: "covered" },
    { label: "EV Charging", value: "ev-charging" },
    { label: "Shuttle Service", value: "shuttle" },
    { label: "Valet Service", value: "valet" },
    { label: "Car Wash", value: "car-wash" },
  ];

  const showModal = (place = null) => {
    setEditingPlace(place);
    setIsModalVisible(true);
    if (place) {
      setFormData({
        name: place.name,
        address: place.address,
        capacity: place.capacity,
        pricePerHour: place.pricePerHour,
        status: place.status,
        approvalStatus: place.approvalStatus,
      });
      setSelectedVehicleTypes(place.vehicleTypes);
      setSelectedAmenities(place.amenities);
      const oh = place.operatingHours;
      setIs24Hours(oh === "24/7");
      if (oh !== "24/7") {
        const [start, end] = oh.split(" - ");
        setStartTime(start);
        setEndTime(end);
      }
    } else {
      setFormData({
        name: "",
        address: "",
        capacity: 1,
        pricePerHour: 1,
        status: "active",
        approvalStatus: "pending",
      });
      setSelectedVehicleTypes([]);
      setSelectedAmenities([]);
      setIs24Hours(false);
      setStartTime("06:00");
      setEndTime("22:00");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (setter, value, checked) => {
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleOk = () => {
    if (
      !formData.name ||
      !formData.address ||
      selectedVehicleTypes.length === 0
    ) {
      alert("Please fill required fields: Name, Address, Vehicle Types");
      return;
    }
    const operatingHours = is24Hours ? "24/7" : `${startTime} - ${endTime}`;

    const placeData = {
      ...formData,
      operatingHours,
      id: editingPlace ? editingPlace.id : Date.now(),
      availableSpots: editingPlace
        ? editingPlace.availableSpots
        : formData.capacity,
      rating: editingPlace ? editingPlace.rating : 0,
      totalEarnings: editingPlace ? editingPlace.totalEarnings : 0,
      totalBookings: editingPlace ? editingPlace.totalBookings : 0,
      vehicleTypes: selectedVehicleTypes,
      amenities: selectedAmenities,
    };

    if (editingPlace) {
      setPlaces((prev) =>
        prev.map((p) => (p.id === editingPlace.id ? placeData : p))
      );
      alert("Parking place updated successfully!");
    } else {
      setPlaces((prev) => [...prev, placeData]);
      alert("Parking place added successfully!");
    }

    setIsModalVisible(false);
    setEditingPlace(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this parking place?")) {
      setPlaces((prev) => prev.filter((p) => p.id !== id));
      alert("Parking place deleted successfully!");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getApprovalColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPlaces = places
    .filter((p) => filter === "all" || p.approvalStatus === filter)
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-sm font-medium text-gray-500">
              Total Earnings
            </h4>
            <p className="text-2xl font-bold text-green-600">
              ${totalEarnings.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-sm font-medium text-gray-500">Total Spots</h4>
            <p className="text-2xl font-bold">{totalSpots}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-sm font-medium text-gray-500">
              Occupied Spots
            </h4>
            <p className="text-2xl font-bold">{occupiedSpots}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-sm font-medium text-gray-500">
              Total Bookings
            </h4>
            <p className="text-2xl font-bold">{totalBookings}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Manage Parking Places</h2>
          <button
            onClick={() => showModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Place
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 w-1/3"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded ${
              viewMode === "table" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Table View
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`px-4 py-2 rounded ${
              viewMode === "cards" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Card View
          </button>
        </div>

        {/* List View */}
        {viewMode === "table" ? (
          <table className="w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Place Name</th>
                <th className="p-4 text-left">Capacity & Availability</th>
                <th className="p-4 text-left">Price/Hour</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Approval</th>
                <th className="p-4 text-left">Earnings</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlaces.map((place) => (
                <tr key={place.id} className="border-t">
                  <td className="p-4">
                    <div className="font-semibold">{place.name}</div>
                    <div className="text-sm text-gray-500">{place.address}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <span className="font-medium">
                        {place.availableSpots}
                      </span>{" "}
                      / {place.capacity} spots
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (place.availableSpots / place.capacity) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-green-600">
                    ${place.pricePerHour}
                  </td>
                  <td className="p-4">{place.rating} ⭐</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${getStatusColor(
                        place.status
                      )}`}
                    >
                      {place.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${getApprovalColor(
                        place.approvalStatus
                      )}`}
                    >
                      {place.approvalStatus}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-green-600">
                    ${place.totalEarnings.toLocaleString()}
                  </td>
                  <td className="p-4 flex space-x-2">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                    <button
                      onClick={() => showModal(place)}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(place.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <div key={place.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">{place.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{place.address}</p>
                <div className="mb-2">
                  <span className="font-medium">{place.availableSpots}</span> /{" "}
                  {place.capacity} spots
                </div>
                <div className="bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        (place.availableSpots / place.capacity) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="mb-2">
                  Price:{" "}
                  <span className="font-semibold text-green-600">
                    ${place.pricePerHour}/hr
                  </span>
                </p>
                <p className="mb-2">Rating: {place.rating} ⭐</p>
                <p className="mb-2">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded text-sm ${getStatusColor(
                      place.status
                    )}`}
                  >
                    {place.status}
                  </span>
                </p>
                <p className="mb-4">
                  Approval:{" "}
                  <span
                    className={`px-2 py-1 rounded text-sm ${getApprovalColor(
                      place.approvalStatus
                    )}`}
                  >
                    {place.approvalStatus}
                  </span>
                </p>
                <p className="mb-4 font-semibold text-green-600">
                  Earnings: ${place.totalEarnings.toLocaleString()}
                </p>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button
                    onClick={() => showModal(place)}
                    className="text-green-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(place.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">
              {editingPlace ? "Edit Parking Place" : "Add New Parking Place"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="border rounded w-full p-2"
                  placeholder="Enter parking place name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="border rounded w-full p-2"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                rows={2}
                className="border rounded w-full p-2"
                placeholder="Enter complete address"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleFormChange}
                  min={1}
                  max={1000}
                  className="border rounded w-full p-2"
                  placeholder="Number of parking spots"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Hour ($) *
                </label>
                <input
                  type="number"
                  name="pricePerHour"
                  value={formData.pricePerHour}
                  onChange={handleFormChange}
                  min={1}
                  max={1000}
                  className="border rounded w-full p-2"
                  placeholder="Price per hour"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approval Status
              </label>
              <select
                name="approvalStatus"
                value={formData.approvalStatus}
                onChange={handleFormChange}
                className="border rounded w-full p-2"
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Types Allowed *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {vehicleTypeOptions.map((opt) => (
                  <label key={opt.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedVehicleTypes.includes(opt.value)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          setSelectedVehicleTypes,
                          opt.value,
                          e.target.checked
                        )
                      }
                      className="mr-2"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {amenityOptions.map((opt) => (
                  <label key={opt.value} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(opt.value)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          setSelectedAmenities,
                          opt.value,
                          e.target.checked
                        )
                      }
                      className="mr-2"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={is24Hours}
                  onChange={(e) => setIs24Hours(e.target.checked)}
                  className="mr-2"
                />
                24/7 Operation
              </label>
            </div>
            {!is24Hours && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Operating Hours
                </label>
                <div className="flex space-x-4">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border rounded p-2"
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="border rounded p-2"
                  />
                </div>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <input
                type="file"
                multiple
                className="border rounded w-full p-2"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalVisible(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleOk}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editingPlace ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
