function searchCourier(restaurant_address){
    const availableCouriers = findAvailableCouriers();// Call the function to find available couriers

}

async function findAvailableCouriers() {
    try {
        const availableCouriers = await Courier.find({ available: true });
        return availableCouriers;
    } catch (error) {
        console.error("Error finding available couriers:", error);
    }
}


