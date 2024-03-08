const Restaurant = require("../roots/models/restaurantModel");
const { getDay, getMinutes, getHours, isPast, isFuture } = require("date-fns");

const isThisRestaurantOpen = (restaurant) => {
    if (!restaurant.open) {
        return false;
    }

    const today = getDay(new Date());
    const { openingHour, closingHour } = defaultOpeningTime[today-1];

    const [hourOpen, minutesOpen] = openingHour.split(":").map(Number);
    const [hourClose, minutesClose] = closingHour.split(":").map(Number);

    const now = new Date();
    const openingHourDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hourOpen, minutesOpen);
    const closingHourDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hourClose, minutesClose);

    if (now >= openingHourDate && now <= closingHourDate) {
        return true;
    }

    return false;
};
const uploadToCloudinary = async (imageUrl, title) => {
    try {
      const response = await cloudinary.uploader.upload(imageUrl, {
        public_id: `${title}`,
      });
      return response.url;
    } catch (error) {
      console.error("Error uploading image:");
      return false
    }

  };
  const paginateHelper=(array,pageInput,limitInput)=>{
    if (array.length > 0) {
      const page = parseInt(pageInput) || 1;
      const limit = parseInt(limitInput) || 10;
      startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      return array.slice(startIndex, endIndex);
    }
  }
//   async function calculateRoute(origin,destination) {
// //    const origin=formatAddress(addressA)
// //    const destination=formatAddress(addressB)
   
//     if (!origin || !destination) {
//       console.error("Origin or destination is not set");
//       return;
//     }
//     console.log("Origin:", origin);
//     console.log("Destination:", destination);
//     const directionService = new google.maps.DirectionsService();
//     const results = await directionService.route({
//       origin,
//       destination,
//       travelMode: google.maps.TravelMode.BICYCLING,
//     });
//     console.log(results);
//     return results
 
//   }
  
//   const formatAddress=async(address)=>{
//    return  `${newOrigin.street+" "+newOrigin.streetNumber+" "+newOrigin.city+" "+newOrigin.country}`
//   }
//   const currOrigin = `${newOrigin.street+" "+newOrigin.streetNumber+" "+newOrigin.city+" "+newOrigin.country}`

 module.exports = { isThisRestaurantOpen,uploadToCloudinary,paginateHelper };
