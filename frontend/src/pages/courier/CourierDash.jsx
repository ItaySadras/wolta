import React, { useContext, useState } from "react";
import axios from "axios";
import { LocationContext } from "../../context/LocationContext";
import LoaderComponent from "../../Loader/LoaderComponent";
import ErrorAlert from "../ErrorAlert";

const CourierDash = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getLocation } = useContext(LocationContext);
  const courierId = "65e70a20797a6900e55ffe97";
  
  const handleAvailableButton = async () => {
    try {
      setLoading(true);
      const location = await getLocation();
      if (location) {
        const { latitude, longitude } = location;
        const response = await axios.patch(`http://localhost:8000/api/courier/available/${courierId}`, {
          latitude,
          longitude
        });
        console.log(response.data.message);
      } else {
        console.error('Location not available');
      }
    } catch (error) {
      console.error('Error setting courier as available:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleNotAvailableButton = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(`http://localhost:8000/api/courier/notAvailable/${courierId}`)
      console.log(response.data.message);
    } catch (error) {
      setError(error.message);   
    } finally{
      setLoading(false);
    }
  }
  const handleCloseError = () => {
    setError(null);
  };


  return (
    <div>
      <div>
        <button onClick={handleAvailableButton} disabled={loading}>
          {loading ? <LoaderComponent /> : "Available"}
        </button>
        <ErrorAlert message={error} open={!!error} onClose={handleCloseError} />
        <button onClick={handleNotAvailableButton} disabled={loading}>
          {loading ? <LoaderComponent/>: "Not Available"}
        </button>
        <ErrorAlert message={error} open={!!error} onClose={handleCloseError} />
        
      </div>
    </div>
  );
};

export default CourierDash;
