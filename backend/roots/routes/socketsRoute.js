const concatSocket = require("../../sockets/concatSocket");
const deleteSocket = require("../../sockets/disconnectSocket");
const userLoggedSocket = require("../../sockets/loginSocket");
const newOrder = require("../../sockets/orderSocket");

async function handleSocketEvents(socket, io,sockets) {

  const cryptedSocket = await concatSocket(socket.id);
  socket.emit("SocketId", cryptedSocket);

  socket.on("disconnect", async (data) => {
    // await deleteSocket(data);
    console.log("A user disconnected");
  });

  socket.on("userLogged", async (data) => {
    await userLoggedSocket(data);
  });
  socket.on("userLoggedOut", async (data) => {
    await deleteSocket(data);
  });
  socket.on("orderCreated", async ({courierId,restaurantId}) => {
   console.log("🚀 ~ socket.on ~ courierId,restaurantId:", courierId,restaurantId)
   
   const courierSocketId = await newOrder(courierId);
   const restaurantSocketId = await newOrder(restaurantId);
   const wantedCourierSocket=sockets[courierSocketId]
   const wantedRestaurantSocket=sockets[restaurantSocketId]
   if (wantedCourierSocket) {
    
     wantedCourierSocket.emit("newOrder");
   }
   if (wantedRestaurantSocket) {
    
     wantedRestaurantSocket.emit("newOrder");
   }


  });
}

module.exports = handleSocketEvents;
