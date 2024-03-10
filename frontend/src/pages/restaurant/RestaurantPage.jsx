import React from "react";
import "./restaurant.css";

const RestaurantPage = () => {
  return (
    <div className="restaurant-container">

      <div className="restaurant-section">
        <div className="restaurant-section">
          <img
            className="restaurant-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtNr7tT6hccTojZ7HGyEKgnwayQojl-pqtvg&usqp=CAU"
            alt=""
          />
        </div>
        <ul className="restaurant-information">
          <h1 className="restaurant-header">restaurantName</h1>
          <li>Open until: </li>
          <li>review:</li>
          <li>location:</li>
        </ul>
      </div>

      <div className="menu-container">
        <ul className="menu-category">
          <li>
            <h2>category header</h2>
            <ul className="category-dishes">
              <li>
                <div className="dish-container">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1FYhwYWg1RldR2Tz9jn2Q1hBtxaWdc-y-Pw&usqp=CAU"
                    alt="this dish has no img."
                  /> <div>
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
        </ul>
      </div>
    </div>
  );
};

export default RestaurantPage;
