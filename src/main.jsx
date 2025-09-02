import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Cotainer/Store";
import Login from "./Cotainer/Pages/UserAuth/SiginIn";
import Register from "./Cotainer/Pages/UserAuth/Register";
import "leaflet-geosearch/dist/geosearch.css";
import OwnerDashboard from "./Cotainer/Pages/Owner/Dashboard/OwnerDashboard";
import { ParkingSearch } from "./Cotainer/Pages/User/ParkingManagement/ParkingSearch";
import App from "./App";
import HomeContent from "./Cotainer/Pages/Home/Home";
import "./index.css";
import UserBookings from "./Cotainer/Pages/User/Bookings/Bookings";
import UserDashboard from "./Cotainer/Pages/User/Dashboard/UserDashboard";
import VehicleDashboard from "./Cotainer/Pages/User/Vehicles/Vehicles";
import OwnerPlacess from "./Cotainer/Pages/Owner/OwnerParkingAreas/Placess";
import OwnerBookings from "./Cotainer/Pages/Owner/Bookings/OwnerBookings.jsx";
import AccountSettings from "./Cotainer/Pages/AccountSettings/AccountSettings";
import SlotBooking from "./Cotainer/Pages/User/Bookings/SlotBookings";
import AdminDashboard from "./Cotainer/Pages/Admin/AdminDashboard.jsx";
const mainRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "slotBooking",
        element: <SlotBooking />,
      },
      {
        path: "accountSettings",
        element: <AdminDashboard />,
      },
      {
        path: "OwnerPlacess",
        element: <OwnerPlacess />,
      },
      {
        path: "home",
        element: <HomeContent />,
      },
      {
        path: "siginin",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "OwnerDashboard",
        element: <OwnerDashboard />,
      },
      {
        path: "ownerBookings",
        element: <OwnerBookings />,
      },
      {
        path: "userDashboard",
        element: <UserDashboard />,
      },
      {
        path: "mapComponent",
        element: <ParkingSearch />,
      },
      {
        path: "UserBookings",
        element: <UserBookings />,
      },
      {
        path: "VehicleDashboard",
        element: <VehicleDashboard />,
      },
    ],
  },
];
const router = createBrowserRouter(mainRoutes);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>
);
