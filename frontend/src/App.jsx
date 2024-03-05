import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/authServices/Login';
import Register from './pages/authServices/Register';

function App() {

  return (
    <>
      <Routes>
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
