import React, { useContext, useEffect, useState } from "react";
import "./restaurant.css";

import { NavLink, useParams } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import RestaurantPageMenu from "../../components/RestaurantPage/RestaurantPageMenu";

const RestaurantPage = () => {

  const { getRestaurantById, restaurantInfo } = useContext(RestaurantContext);
  const [loading, setLoading] = useState(true);

  const { restaurantId } = useParams();

  const fetchRestaurant = async () => {
    await getRestaurantById(`${restaurantId}`);
    setLoading(false);
  };

  useEffect(() => {
    fetchRestaurant();
  }, [getRestaurantById]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatAddress = (address) => {
    if (!address) return '';
    const unwantedKeys = ['_id', '__v'];
    const filteredKeys = Object.keys(address).filter(key => !unwantedKeys.includes(key));
    const order = ['streetName', 'streetNumber', 'city', 'country'];
    return order.map(key => filteredKeys.includes(key) ? address[key] : '').filter(Boolean).join(', ');
  };
  const formattedAddress = restaurantInfo && restaurantInfo.address ? formatAddress(restaurantInfo.address) : '';


  return (
    <div className="restaurant-container">
      <NavLink to={"/customer/:customerId/basket"}>
        <button style={{ background: "white", color: "black" }} className="navbutton">🛒 order </button>
      </NavLink>
      <div className="restaurant-section">
        <div className="restaurant-section">
          <img
            className="restaurant-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtNr7tT6hccTojZ7HGyEKgnwayQojl-pqtvg&usqp=CAU"
            alt=""
          />
        </div>
        <ul className="restaurant-information">
          <h1 className="restaurant-header">{restaurantInfo.restaurantName}</h1>
          <li>{(restaurantInfo.open) ? <p>open</p> : <p>close</p>} </li>
          <li>
            <h3>Address: {formattedAddress}</h3>
          </li>
        </ul>
      </div>

      <div>
        <button>
          go to cart
        </button>
      </div>

      <div className="menu-container">
        <RestaurantPageMenu
          restaurantInfo={restaurantInfo}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;


{/* <ul className="menu-category">
          <li>
            <h2>category header</h2>
            <ul className="category-dishes">
              <li>
                <div className="dish-container">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1FYhwYWg1RldR2Tz9jn2Q1hBtxaWdc-y-Pw&usqp=CAU"
                    alt="this dish has no img."
                  />{" "}
                  <div>
                    <h3>dish name</h3>
                    <p>
                      dish description. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Iste,{" "}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul> */}

