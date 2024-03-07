import "./App.css";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/authServices/Login";
import Register from "./pages/authServices/Register";
import AboutUs from "./components/footer/AboutUs";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerDash from "./pages/customer/CustomerDash";

import Footer from "./components/footer/Footer";
import SearchResults from "./pages/customer/SearchResults";

import CustomerBasket from "./pages/customer/CustomerBasket";
import CustomerProfile from "./pages/customer/CustomerProfile";

import RestaurantLayout from "./layouts/RestaurantLayout";
import RestaurantMenu from "./pages/restaurant/RestaurantMenu";
import DishPage from "./pages/restaurant/Dishpage";
import RestuarantPage from "./pages/restaurant/RestaurantPage";
import RestaurantProfile from "./pages/restaurant/RestaurantProfile";
import RestaurantReviews from "./pages/restaurant/RestaurantReviews";

import CourierLayout from "./layouts/CourierLayout";
import CourierDash from "./pages/courier/CourierDash";
import CourierProfile from "./pages/courier/CourierProfile";


import AdminLayout from "./layouts/AdminLayout";

import AdminDash from "./pages/admin/AdminDash";

import ManageCustomers from "./pages/admin/ManageCustomers";
import ManageRestaurants from "./pages/admin/ManageRestaurants";
import ManageCouriers from "./pages/admin/ManageCouriers";

import GeoComponent from "./geoLocation/GeoComponent";


function App() {
  return (
    <>
        {/* <GeoComponent></GeoComponent> */}
       <Routes>
        {/* auth routes */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        {/* customer routes */}

        <Route path="/customer/:customerId" element={<CustomerLayout />}>
          <Route path="dashboard" element={<CustomerDash />}></Route>
          <Route path="searchResults" element={<SearchResults />}></Route>
          <Route path="basket" element={<CustomerBasket />}></Route>

          <Route path="profile" element={<CustomerProfile />}></Route>
        </Route>

        {/* restaurant routes */}

        <Route path="/restaurant/:restaurantId" element={<RestaurantLayout />}>
          <Route path="restaurantPage" element={<RestuarantPage />}></Route>

          <Route path="menu" element={<RestaurantMenu />}>
            <Route path=":dishId" element={<DishPage />}></Route>
          </Route>
          <Route path="profile" element={<RestaurantProfile />}></Route>
          <Route path="reviews" element={<RestaurantReviews />}></Route>
        </Route>

        {/* courier routes */}
        <Route path="/courier" element={<CourierLayout />}>
          <Route path="dashboard" element={<CourierDash />}></Route>
          <Route path="profile" element={<CourierProfile />}></Route>
        </Route>

        {/* admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDash />}></Route>
          <Route path="manageCustomers" element={<ManageCustomers />}></Route>
          <Route
            path="manageRestaurants"
            element={<ManageRestaurants />}
          ></Route>
          <Route path="manageCouriers" element={<ManageCouriers />}></Route>
        </Route>
        <Route path="/about" element={<AboutUs />}></Route>
      </Routes>

    </>
  );
}

export default App;
