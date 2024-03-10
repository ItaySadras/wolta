import React from "react";
import { useEffect, useState } from "react";
import GetLocation from "./GetLocation";
import { getUserLocation } from "../components/utils";
import GoogleMapComponent from "./GoogleMapComponent";

function GeoComponent() {
  const [userAddress, setUserAddress] = useState();

  return (
    <div>
      <GetLocation setUserAddress={setUserAddress} userAddress={userAddress} />
      {userAddress && (
        <GoogleMapComponent
          userAddress={userAddress}
          setUserAddress={setUserAddress}
        />
      )}
    </div>
  );
}

export default GeoComponent;
