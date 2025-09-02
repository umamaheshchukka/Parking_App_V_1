import React, { useState, useEffect } from "react";
import {
  Star,
  MapPin,
  Clock,
  Shield,
  Zap,
  Car,
  Navigation,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ParkingResults() {
  const navigate = useNavigate();
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const searchLocation = "Jayanagar, Bangalore";

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const spots = [
    {
      id: "1",
      name: "Jayanagar Garage",
      address: "12th Main, Jayanagar",
      type: "garage",
      price: 10,
      rating: 4.5,
      distance: 0.5,
      available: true,
      availableSpots: 5,
      totalSpots: 10,
      image:
        "https://images.unsplash.com/photo-1563720222880-6b51b92e1d07?w=800",
      features: ["Covered", "EV Charging", "Security"],
    },
    {
      id: "2",
      name: "MG Road Parking Lot",
      address: "MG Road, Bangalore",
      type: "lot",
      price: 8,
      rating: 4.2,
      distance: 1.2,
      available: false,
      availableSpots: 0,
      totalSpots: 20,
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      features: ["24/7 Access", "Security", "Valet Available", "Covered"],
    },
    {
      id: "3",
      name: "Indiranagar Street Parking",
      address: "100ft Road, Indiranagar",
      type: "street",
      price: 5,
      rating: 3.9,
      distance: 2.0,
      available: true,
      availableSpots: 8,
      totalSpots: 15,
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800",
      features: ["Security", "Covered"],
    },
  ];

  const availableSpots = spots.filter((spot) => spot.available);
  const unavailableSpots = spots.filter((spot) => !spot.available);

  const getFeatureIcon = (feature) => {
    switch (feature.toLowerCase()) {
      case "covered":
        return <Shield className="h-3 w-3" />;
      case "ev charging":
        return <Zap className="h-3 w-3" />;
      case "security":
        return <Shield className="h-3 w-3" />;
      case "valet available":
        return <Car className="h-3 w-3" />;
      case "24/7 access":
        return <Clock className="h-3 w-3" />;
      default:
        return <Car className="h-3 w-3" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "garage":
        return "bg-blue-100 text-blue-800";
      case "street":
        return "bg-green-100 text-green-800";
      case "lot":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const ParkingSpotCard = ({ spot, index }) => {
    const isSelected = selectedSpot === spot.id;

    return (
      <div
        className={`rounded-lg border bg-white shadow-sm cursor-pointer transition-all duration-500 ease-out transform 
          ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} 
          ${isSelected ? "ring-2 ring-blue-500" : ""} 
          ${!spot.available ? "opacity-60" : ""}`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onClick={() => setSelectedSpot(isSelected ? null : spot.id)}
      >
        <div className="p-4 flex gap-4">
          {/* Image */}
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={spot.image}
              alt={spot.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="truncate font-medium">{spot.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(
                      spot.type
                    )}`}
                  >
                    {spot.type}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{spot.address}</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{spot.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    <span>{spot.distance}mi</span>
                  </div>
                </div>
              </div>

              <button className="h-8 w-8 flex items-center justify-center text-gray-500 hover:text-red-500">
                <Heart className="h-4 w-4" />
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1 mb-3">
              {spot.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="flex items-center px-2 py-0.5 border rounded-full text-xs text-gray-600"
                >
                  {getFeatureIcon(feature)}
                  <span className="ml-1">{feature}</span>
                </span>
              ))}
              {spot.features.length > 3 && (
                <span className="px-2 py-0.5 border rounded-full text-xs text-gray-600">
                  +{spot.features.length - 3} more
                </span>
              )}
            </div>

            {/* Availability and Pricing */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-lg font-medium">${spot.price}/hr</div>
                <div className="text-sm text-gray-500">
                  {spot.available ? (
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      {spot.availableSpots} of {spot.totalSpots} available
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      Full
                    </span>
                  )}
                </div>
              </div>

              <button
                className={`px-3 py-1 text-sm rounded-md font-medium ${
                  spot.available
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!spot.available}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Reserve spot:", spot.id);
                  navigate("/slotBooking");
                }}
              >
                {spot.available ? "Reserve" : "Full"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">
            Parking near {searchLocation}
          </h2>
          <span className="px-2 py-0.5 bg-gray-200 rounded-full text-sm font-medium">
            {spots.length} results
          </span>
        </div>
        <p className="text-sm text-gray-500">
          {availableSpots.length} available • Sorted by distance
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {availableSpots.map((spot, index) => (
          <ParkingSpotCard key={spot.id} spot={spot} index={index} />
        ))}
        {unavailableSpots.length > 0 && (
          <>
            <div className="flex items-center gap-2 pt-4">
              <div className="flex-1 border-t" />
              <span className="text-sm text-gray-500 px-2">Currently Full</span>
              <div className="flex-1 border-t" />
            </div>
            {unavailableSpots.map((spot, index) => (
              <ParkingSpotCard
                key={spot.id}
                spot={spot}
                index={availableSpots.length + index}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
