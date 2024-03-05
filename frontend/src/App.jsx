import './App.css'
import { Route, Routes } from 'react-router-dom'

import Login from './pages/authServices/Login';
import Register from './pages/authServices/Register';

import CustomerLayout from './layouts/CustomerLayout';
import CustomerDash from './pages/customer/CustomerDash';
import CustomerBasket from './pages/customer/CustomerBasket';
import CustomerProfile from './pages/customer/CustomerProfile';

import RestaurantLayout from './layouts/RestaurantLayout';
import RestaurantMenu from './pages/restaurant/RestaurantMenu';
import DishPage from './pages/restaurant/Dishpage';
import RestuarantPage from './pages/restaurant/RestaurantPage';
import RestaurantProfile from './pages/restaurant/RestaurantProfile';
import RestaurantReviews from './pages/restaurant/RestaurantReviews';

import CourierLayout from './layouts/CourierLayout';
import CourierDash from './pages/courier/CourierDash';
import CourierProfile from './pages/courier/CourierProfile';

import AdminLayout from './layouts/AdminLayout';
import AdminrDash from './pages/admin/AdminDash';
import ManageCustomers from './pages/admin/ManageCustomers';
import ManageRestaurants from './pages/admin/ManageRestaurants';
import ManageCouriers from './pages/admin/ManageCouriers';



function App() {

  return (
    <>
      <Routes>
        {/* auth routes */}
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

        {/* customer routes */}
        <Route path='/customer' element={<CustomerLayout />}>
          <Route path='dashboard' element={<CustomerDash />}>
            <Route path=':restaurantId' element={<RestuarantPage />}>
              <Route path=':dishId' element={<DishPage />}>
                <Route path='basket' element={<CustomerBasket />}></Route>
              </Route>
            </Route>
          </Route>
          <Route path='profile' element={<CustomerProfile />}></Route>
        </Route>

        {/* restaurant routes */}
        <Route path='/restaurant' element={<RestaurantLayout />}>
          <Route path='menu' element={<RestaurantMenu />}>
            <Route path=':dishId' element={<DishPage />}></Route>
          </Route>
          <Route path='profile' element={<RestaurantProfile />}></Route>
          <Route path='reviews' element={<RestaurantReviews />}></Route>
        </Route>

        {/* courier routes */}
        <Route path='/courier' element={<CourierLayout />}>
          <Route path='dashboard' element={<CourierDash />}></Route>
          <Route path='profile' element={<CourierProfile />}></Route>
        </Route>

        {/* admin routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<AdminrDash />}></Route>
          <Route path='manageCustomers' element={<ManageCustomers />}></Route>
          <Route path='manageRestaurants' element={<ManageRestaurants />}></Route>
          <Route path='manageCouriers' element={<ManageCouriers />}></Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;
