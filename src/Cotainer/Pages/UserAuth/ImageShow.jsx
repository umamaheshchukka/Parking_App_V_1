import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Find Parking Anywhere",
    description:
      "Discover available parking spots in your city with real-time updates and easy booking.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    title: "Smart Reservations",
    description:
      "Reserve your spot in advance and never worry about finding parking again.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    title: "Seamless Experience",
    description:
      "Pay securely, navigate easily, and enjoy a hassle-free parking experience.",
  },
];

export function ImageCarousel({ currentStep }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
      {/* Background images with fade animation */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-40 scale-100"
              : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-white p-12 max-w-lg transition-all duration-700 ease-in-out">
        <h2 className="mb-4 text-2xl font-bold">
          {slides[currentSlide].title}
        </h2>
        <p className="mb-8 text-white/90 leading-relaxed">
          {slides[currentSlide].description}
        </p>

        {/* Step Indicator */}
        <div className="flex space-x-2 mt-4">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1 w-8 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
