// utils.js
import { getDay, getMinutes, getHours, isPast, isFuture, addDays, addHours } from "date-fns";

import axios from "axios";
const googleMapsApiKey= import.meta.env.VITE_MAPS_API_KEY

export const getLatLngFromAddress = async (address) => {
  console.log("🚀 ~ getLatLngFromAddress ~ address:", address)
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`);
    const data = await response.json();
    
    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    } else {
      throw new Error("Unable to retrieve latitude and longitude for the address.");
    }
  } catch (error) {
    console.error("Error fetching latitude and longitude:", error);
    return null;
  }
}

export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}&language=en`
            );
            if (response.status === 200) {
              const data = response.data;
              if (data.status === "OK") {
                const addressComponents = data.results[0].address_components;
                const address = {
                  street: addressComponents[1].long_name,
                  streetNumber: addressComponents[0].long_name,
                  city: addressComponents[2].long_name,
                  country:
                    addressComponents[addressComponents.length - 1].long_name,
                  latitude: latitude,
                  longitude: longitude,
                };
                resolve(address); // Resolve the promise with the address
              } else {
                throw new Error(data.status);
              }
            } else {
              throw new Error("Failed to fetch address");
            }
          } catch (error) {
            console.error("Error getting user address:", error);
            reject(error); // Reject the promise if an error occurs
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
          reject(error); // Reject the promise if an error occurs
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};
export const isThisRestaurantOpenFront = (restaurant) => {
  if (!restaurant.open) {
    return false;
  }
  
    const currentDate = new Date().toLocaleString("en-US", {
      timeZone: "Israel",
    });
   const twoHoursAgo= new Date(currentDate);
   const now= addHours(twoHoursAgo,2);
  const today = getDay(now);
  const { openingHour, closingHour } = restaurant.defaultOpeningTime[today];

  const [hourOpen, minutesOpen] = openingHour.split(":").map(Number);
  const [hourClose, minutesClose] = closingHour.split(":").map(Number);

  const openingHourDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hourOpen,
    minutesOpen
  );
  const closingHourDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hourClose,
    minutesClose
  );


  if (now >= openingHourDate && now <= closingHourDate) {
    return true;
  }

  return false;
};