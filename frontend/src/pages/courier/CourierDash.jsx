import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { LocationContext } from "../../context/LocationContext";
import LoaderComponent from "../../Loader/LoaderComponent";
import ErrorAlert from "../ErrorAlert";
import "../../components/navbars/navbar.css";

const CourierDash = ({setRender}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getLocation } = useContext(LocationContext);
  const { courierId } = useParams();

  const handleChange = async (event) => {
    const selectedValue = event.target.value;
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/courier/setVehicleType/${courierId}`,
        {mode: selectedValue }
      );
    } catch (error) {
      console.error("Error making PATCH request:", error);
    }
  };

  const handleAvailableButton = async () => {
    try {
      setLoading(true);
      const location = await getLocation();
      if (location) {
        const { latitude, longitude } = location;
        const response = await axios.patch(
          `http://localhost:8000/api/courier/available/${courierId}`,
          {
            latitude,
            longitude,
          }
        );
        console.log(response.data.message);
        setRender(true)
      } else {
        console.error("Location not available");
      }
    } catch (error) {
      console.error("Error setting courier as available:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleNotAvailableButton = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:8000/api/courier/notAvailable/${courierId}`
      );
      console.log(response.data.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div>
      <div className="availabillities1">
        <div className="centered">
          <button
            className="navbutton1"
            onClick={handleAvailableButton}
            disabled={loading}
          >
            {loading ? <LoaderComponent /> : "Available"}
          </button>
          <ErrorAlert
            message={error}
            open={!!error}
            onClose={handleCloseError}
          />
          <button
            className="navbutton2"
            onClick={handleNotAvailableButton}
            disabled={loading}
          >
            {loading ? <LoaderComponent /> : "Not Available"}
          </button>
          <ErrorAlert
            message={error}
            open={!!error}
            onClose={handleCloseError}
          />
          <select name="options" id="options" onChange={handleChange}>
            <option value="DRIVING">Driving</option>
            <option value="BICYCLING">Bicycle</option>
            <option value="WALKING">Walking</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourierDash;
