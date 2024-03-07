// utils.js
import axios from "axios";

export const getUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const googleMapsApiKey= import.meta.env.VITE_MAPS_API_KEY
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
