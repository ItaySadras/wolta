import React, { useState, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import LoaderComponent from "../Loader/LoaderComponent";
import "./GoogleMapsComponent.css"
import { getLatLngFromAddress } from "../components/utils";
const libraries = ["places"]; 

function GoogleMapComponent({ originA, destinationB, mode }) {
  const [userAddress, setUserAddress] = useState(originA);
  const [destinationAddress, setDestinationAddress] = useState(destinationB);
  const [center, setCenter] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [showRoute, setShowRoute] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: libraries, // Passing libraries array directly
  });
  
  useEffect(() => {
    const fetchCenterAndCalculateRoute = async () => {
      try {
        // Assuming getLatLngFromAddress returns an object with lat and lng
        console.log("🚀 ~ fetchCenterAndCalculateRoute ~ userAddress:", userAddress)
        const originLatLng = await getLatLngFromAddress(userAddress);
        setCenter({ lat: originLatLng.lat, lng: originLatLng.lng });
        
        calculateRoute();
      } catch (error) {
        console.error("Error fetching center:", error);
      }
    };

    fetchCenterAndCalculateRoute();
 }, [userAddress, destinationAddress]);

  const onLoad = (map) => {
    setMap(map);
  };

  const calculateRoute = async () => {
    try {
      if (!userAddress || !destinationAddress) {
        console.error("Origin or destination is not set");
        return;
      }

      const directionService = new google.maps.DirectionsService();
      const request = {
        origin: userAddress,
        destination: destinationAddress,
        travelMode: mode
      };

      directionService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
          setDistance(result.routes[0].legs[0].distance.text);
          setDuration(result.routes[0].legs[0].duration.text);
          setShowRoute(true);
        } else {
          console.error("Failed to calculate route:", status);
        }
      });
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setShowRoute(false);
  };

  // Render LoaderComponent when Google Maps API is not loaded
  if (!isLoaded) return <LoaderComponent />;

  return (
    <div>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "600px", height: "40vh" }}
        onLoad={onLoad}
      >
        <Marker position={center} />
        {directionsResponse && showRoute && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      <div className="dash">
        <div className={"button-div"}>
          <button className={"button4"} onClick={calculateRoute}>Show Route</button>
          <button className={"button4"} onClick={clearRoute}>Clear Route</button>
        </div>
        <div>
          <p className={"stronga"}>Distance : {distance}</p>
          <p className={"stronga"}>Duration : {duration}</p>
        </div>
      </div>
    </div>
  );
}

export default GoogleMapComponent;
