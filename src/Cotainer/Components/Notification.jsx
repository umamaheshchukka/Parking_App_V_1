// src/components/Notification.jsx
import React, { useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

const ShowNotification = ({ open, onClose, msg, severity = "success" }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 2000); // auto close after 2s
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  const styles = {
    success: "bg-green-600 text-white",
    error: "bg-red-600 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600 text-white",
  };

  return (
    <div className="fixed top-25 left-1/2 -translate-x-1/2 z-50">
      <div
        className={clsx(
          "flex items-center justify-between px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-md font-medium",
          styles[severity]
        )}
      >
        <span>{msg}</span>
        <button
          onClick={onClose}
          className="ml-3 p-1 rounded-full hover:bg-white/20 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ShowNotification;
