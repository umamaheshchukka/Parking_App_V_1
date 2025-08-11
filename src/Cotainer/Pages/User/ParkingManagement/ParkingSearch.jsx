import React, { useState } from "react";
import { Button } from "antd";
import { Menu, Map, List, Navigation } from "lucide-react";
import ParkingSpotFinder from "../../Map/Map";
import { SearchFilters } from "./SearchFilters";
import SeachList from "./SeachList";

const mockParkingSpots = [
  {
    id: "1",
    name: "Central Plaza Garage",
    address: "123 Main St, Downtown",
    price: 8,
    rating: 4.5,
    distance: 0.2,
    available: true,
    type: "garage",
    features: ["Covered", "EV Charging", "Security"],
    coordinates: { lat: 40.758, lng: -73.9855 },
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    totalSpots: 150,
    availableSpots: 23,
  },
  {
    id: "2",
    name: "Broadway Street Parking",
    address: "456 Broadway Ave",
    price: 5,
    rating: 4.2,
    distance: 0.5,
    available: true,
    type: "street",
    features: ["2hr limit", "Meter"],
    coordinates: { lat: 40.7614, lng: -73.9776 },
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    totalSpots: 20,
    availableSpots: 8,
  },
  {
    id: "3",
    name: "Shopping Mall Lot",
    address: "789 Commerce Dr",
    price: 12,
    rating: 4.8,
    distance: 1.2,
    available: true,
    type: "lot",
    features: ["Covered", "Valet Available", "Reserved Spots"],
    coordinates: { lat: 40.7505, lng: -73.9934 },
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    totalSpots: 300,
    availableSpots: 45,
  },
  {
    id: "4",
    name: "Metro Station Parking",
    address: "321 Transit Blvd",
    price: 6,
    rating: 4.0,
    distance: 0.8,
    available: false,
    type: "garage",
    features: ["24/7 Access", "Monthly Pass"],
    coordinates: { lat: 40.7549, lng: -73.984 },
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    totalSpots: 200,
    availableSpots: 0,
  },
  {
    id: "5",
    name: "City Hall Parking",
    address: "555 Government Plaza",
    price: 4,
    rating: 3.8,
    distance: 1.5,
    available: true,
    type: "lot",
    features: ["Visitor Parking", "Handicap Access"],
    coordinates: { lat: 40.7676, lng: -73.9708 },
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    totalSpots: 100,
    availableSpots: 12,
  },
];

export function ParkingSearch() {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [viewMode, setViewMode] = useState("split");
  const [searchLocation, setSearchLocation] = useState("Downtown, New York");
  const [filteredSpots, setFilteredSpots] = useState(mockParkingSpots);

  const handleSearch = (filters) => {
    let filtered = mockParkingSpots.filter((spot) => {
      if (filters.showAvailableOnly && !spot.available) return false;
      if (filters.maxPrice && spot.price > filters.maxPrice) return false;
      if (filters.type && filters.type !== "all" && spot.type !== filters.type)
        return false;
      return true;
    });

    if (filters.sortBy === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "distance") {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (filters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredSpots(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-end">
            <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="h-8"
              >
                <Map className="h-4 w-4 mr-1" />
                Map
              </Button>
              <Button
                variant={viewMode === "split" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("split")}
                className="h-8"
              >
                Split
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8"
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SearchFilters
        onSearch={handleSearch}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6 h-[calc(100vh-240px)]">
          {(viewMode === "map" || viewMode === "split") && (
            <div
              className={`${viewMode === "split" ? "w-1/2" : "w-full"} h-full`}
            >
              <ParkingSpotFinder />
            </div>
          )}
          {(viewMode === "list" || viewMode === "split") && (
            <div
              className={`${viewMode === "split" ? "w-1/2" : "w-full"} h-full`}
            >
              <SeachList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
