import React, { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  ChevronDown,
  Calendar,
  Clock,
} from "lucide-react";

export function SearchFilters({ onSearch, searchLocation, setSearchLocation }) {
  const [filters, setFilters] = useState({
    date: "",
    startTime: "",
    endTime: "",
    maxPrice: 20,
    type: "all",
    showAvailableOnly: true,
    sortBy: "distance",
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleLocationSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        {/* Main Search */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Where do you need to park?"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="pl-10 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm py-2"
            />
          </div>
          <button
            onClick={handleLocationSearch}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <input
              type="date"
              value={filters.date}
              onChange={(e) => updateFilter("date", e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Time */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <input
              type="time"
              value={filters.startTime}
              onChange={(e) => updateFilter("startTime", e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-500 text-sm">to</span>
            <input
              type="time"
              value={filters.endTime}
              onChange={(e) => updateFilter("endTime", e.target.value)}
              className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type */}
          <select
            value={filters.type}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="border border-gray-300 rounded-md text-sm px-3 py-1 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="garage">Garage</option>
            <option value="street">Street</option>
            <option value="lot">Parking Lot</option>
          </select>

          {/* More Filters Toggle */}
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100"
          >
            <Filter className="h-4 w-4" />
            More Filters
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isFiltersOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Advanced Filters */}
        {isFiltersOpen && (
          <div className="bg-gray-50 border rounded-md p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Max Price per Hour: ${filters.maxPrice}
                </label>
                <input
                  type="range"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    updateFilter("maxPrice", Number(e.target.value))
                  }
                  min="1"
                  max="30"
                  step="1"
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$1</span>
                  <span>$30</span>
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Sort by
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter("sortBy", e.target.value)}
                  className="border border-gray-300 rounded-md text-sm px-3 py-2 w-full focus:ring-2 focus:ring-blue-500"
                >
                  <option value="distance">Distance</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="availability">Availability</option>
                </select>
              </div>

              {/* Availability Toggle */}
              <div>
                <label className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Available Only</span>
                  <input
                    type="checkbox"
                    checked={filters.showAvailableOnly}
                    onChange={(e) =>
                      updateFilter("showAvailableOnly", e.target.checked)
                    }
                    className="w-5 h-5 accent-blue-600"
                  />
                </label>
                <p className="text-xs text-gray-500">
                  Show only spots with current availability
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
