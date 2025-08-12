import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Cotainer/Store";
import Login from "./Cotainer/Pages/UserAuth/SiginIn";
import Register from "./Cotainer/Pages/UserAuth/Register";
import "leaflet-geosearch/dist/geosearch.css";
// import UserDashboard from "./Cotainer/Pages/User/User";
import OwnerDashboard from "./Cotainer/Pages/Owner/Owner";
import { ParkingSearch } from "./Cotainer/Pages/User/ParkingManagement/ParkingSearch";
import App from "./App";
import HomeContent from "./Cotainer/Pages/Home/Home";
import "./index.css";
import UserBookings from "./Cotainer/Pages/User/Bookings/Bookings";
import UserDashboard from "./Cotainer/Pages/User/Dashboard/UserDashboard";
import VehicleDashboard from "./Cotainer/Pages/User/Vehicles/Vehicles";
const mainRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
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
