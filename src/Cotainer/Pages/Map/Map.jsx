import React, { useState, useEffect } from "react";
import {
  Slider,
  Checkbox,
  Button,
  DatePicker,
  Input,
  Select,
  Alert,
  Typography,
  Card,
} from "antd";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { Icon } from "leaflet";

const { Option } = Select;
const { Title, Text } = Typography;

// Placeholder icons
const pin = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const redPin = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";

// Search Control Component
const SearchControl = ({ onSearch }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      marker: {
        icon: new Icon({
          iconUrl: redPin,
          iconSize: [25, 41],
        }),
      },
    });

    map.addControl(searchControl);

    // Listen for search results
    map.on("geosearch/showlocation", (e) => {
      const { location } = e;
      onSearch({
        lat: location.y,
        lng: location.x,
        label: location.label,
      });
    });

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation");
    };
  }, [map, onSearch]);

  return null;
};

// Utility to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const ParkingSpotFinder = () => {
  const [priceRange, setPriceRange] = useState([5, 50]);
  const [distance, setDistance] = useState(5);
  const [parkingType, setParkingType] = useState(["garage", "street"]);
  const [features, setFeatures] = useState(["evCharging"]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [sortBy, setSortBy] = useState("distance");
  const [error, setError] = useState(null);
  const [spots, setSpots] = useState([]);
  const [radius, setRadius] = useState(10);
  const [center, setCenter] = useState([12.9308, 77.5838]); // Default: Jayanagar, Bangalore

  const customMarker = new Icon({
    iconUrl: pin,
    iconSize: [25, 41],
  });

  // Dummy parking spots with coordinates
  const dummySpots = [
    {
      id: 1,
      name: "Jayanagar Garage",
      price: 10,
      lat: 12.9308,
      lng: 77.5838,
      type: "garage",
      features: ["evCharging", "covered"],
      rating: 4.5,
    },
    {
      id: 2,
      name: "Basavanagudi Street Parking",
      price: 8,
      lat: 12.9429325,
      lng: 77.560459,
      type: "street",
      features: ["securityCamera"],
      rating: 4.0,
    },
    {
      id: 3,
      name: "Chickpete Lot",
      price: 12,
      lat: 12.9697203,
      lng: 77.5571645,
      type: "lot",
      features: ["24/7Access", "covered"],
      rating: 4.2,
    },
    {
      id: 4,
      name: "Koramangala Driveway",
      price: 15,
      lat: 12.935,
      lng: 77.624,
      type: "driveway",
      features: ["evCharging", "securityCamera"],
      rating: 4.8,
    },
  ];

  // Handle search results
  const handleSearch = ({ lat, lng, label }) => {
    setCenter([lat, lng]);
    setLocation(label);
    fetchSpots([lat, lng]);
  };

  // Fetch and filter spots based on search location and filters
  const fetchSpots = (searchCenter = center) => {
    setError(null);
    setTimeout(() => {
      if (Math.random() > 0.7) {
        setError(
          "Failed to get parking spots: Control plane request failed; endpoint is disabled"
        );
        setSpots([]);
      } else {
        // Filter spots based on radius and other filters
        const filteredSpots = dummySpots
          .map((spot) => {
            const dist = calculateDistance(
              searchCenter[0],
              searchCenter[1],
              spot.lat,
              spot.lng
            );
            return { ...spot, distance: dist };
          })
          .filter((spot) => {
            return (
              spot.distance <= radius && // Within radius
              spot.price >= priceRange[0] &&
              spot.price <= priceRange[1] && // Price range
              parkingType.includes(spot.type) && // Parking type
              features.every((f) => spot.features.includes(f)) && // Features
              spot.distance <= distance // Max distance
            );
          })
          .sort((a, b) => {
            if (sortBy === "priceLowToHigh") return a.price - b.price;
            if (sortBy === "priceHighToLow") return b.price - a.price;
            if (sortBy === "rating") return b.rating - a.rating;
            return a.distance - b.distance; // Default: distance
          });

        setSpots(filteredSpots);
      }
      V2()
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 1000);
  };

  // Reset filters
  const resetFilters = () => {
    setPriceRange([5, 50]);
    setDistance(5);
    setParkingType(["garage", "street"]);
    setFeatures(["evCharging"]);
    setLocation("");
    setDate(null);
    setTime(null);
    setSortBy("distance");
    setCenter([12.9308, 77.5838]);
    setRadius(10);
    fetchSpots([12.9308, 77.5838]);
  };

  // Initial fetch
  useEffect(() => {
    fetchSpots();
  }, [priceRange, distance, parkingType, features, sortBy, radius]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-2">
        <div className="mb-4">
          <MapContainer
            center={center}
            zoom={13}
            className="h-[500px] w-full rounded-lg shadow"
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle center={center} radius={radius * 1000} />
            {spots.map((spot) => (
              <Marker
                key={spot.id}
                position={[spot.lat, spot.lng]}
                icon={customMarker}
              >
                <Popup>
                  {spot.name}
                  <br />
                  Price: ${spot.price}/hour
                  <br />
                  Distance: {spot.distance.toFixed(2)} km
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <div className="mt-2 flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm">{radius} km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSpotFinder;
