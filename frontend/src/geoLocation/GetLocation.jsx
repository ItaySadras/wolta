import React, { useState } from "react";
import { getUserLocation } from "../components/utils";

function GetLocation({ setUserAddress,userAddress}) {

  const handleGetUserLocation = async () => {
    const address = await getUserLocation();
    console.log("🚀 ~ handleGetUserLocation ~ address:", address)
    seter(address)
    console.log("🚀 ~ App ~ userAddress:", userAddress)

  };

  const seter=(address)=>{
    setUserAddress(address);

  }

  return (
    <div>
      <div>
        <h1>Geolocation App</h1>
        <button onClick={handleGetUserLocation}>Get User Location</button>
      </div>
    </div>
  );
}

export default GetLocation;
