import React, { useEffect, useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { getUserLocation } from "../components/utils";

const libraries = ["places"];

function GoogleMapComponent({ userAddress, setUserAddress}) {
  const center = { lat: userAddress.latitude, lng: userAddress.longitude };
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [origin, setOrigin] = useState(""); 
  const [destination, setDestination] = useState(""); 


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: libraries,
  });

  const onLoad = (map) => {
    setMap(map);
  };

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  async function calculateRoute() {
    if (!origin || !destination) {
      console.error("Origin or destination is not set");
      return;
    }
    console.log("Origin:", origin);
    console.log("Destination:", destination);
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.BICYCLING,
    });
    setDirectionsResponse(results);
    console.log(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setOrigin("");
    setDestination("");
  }

  const handleGetUserLocation = async (e) => {
    e.preventDefault();
    // e.target.value
    const newOrigin = await getUserLocation({setUserAddress});
    console.log(newOrigin);
    const currOrigin = `${newOrigin.street+" "+newOrigin.streetNumber+" "+newOrigin.city+" "+newOrigin.country}`
    console.log("🚀 ~ handleGetUserLocation ~ currOrigin:", currOrigin)
    setOrigin(currOrigin); // Directly set the new origin
    console.log(origin);
  };

  return (
    <div>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: "60vw", height: "40vh" }}
        onLoad={onLoad}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      <div className="dash">
        <div style={{ display: "flex" }}>
          <button onClick={() => map && map.panTo(center)}>Center Me!</button>
          <Autocomplete>
            <input
              type="text"
              value={origin ?? ""}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Autocomplete>
          <Autocomplete>
            <input
              type="text"
              value={destination ?? ""}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Autocomplete>
          <button onClick={(e) => handleGetUserLocation(e)}>
            set origin current location
          </button>
        </div>
        <button onClick={calculateRoute}>Calculate Route !</button>
        <button onClick={clearRoute}>Clear Route</button>
        <div>
          <p>Distance : {distance}</p>
          <p>Duration : {duration}</p>
        </div>
      </div>
    </div>
  );
}

export default GoogleMapComponent;
