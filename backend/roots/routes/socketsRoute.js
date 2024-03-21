const concatSocket = require("../../sockets/concatSocket");
const deleteSocket = require("../../sockets/disconnectSocket");
const userLoggedSocket = require("../../sockets/loginSocket");
const newOrder = require("../../sockets/orderSocket");
const jwt = require("jsonwebtoken");
const secret = "secretkey";
async function handleSocketEvents(socket, io, sockets) {
  const userSocket = await returnsRelevantSocket(socket, sockets);
  // console.log("🚀 ~ handleSocketEvents ~ userSocket:", userSocket)
  sockets[userSocket.id] = userSocket;
  // console.log("🚀 ~ handleSocketEvents ~ userSocket.id:", userSocket.id);
  const cryptedSocket = jwt.sign(userSocket.id, secret);
  socket.emit("SocketId", {
    cryptedSocket: cryptedSocket,
    encryptedSocket: userSocket.id,
  });

  // userSocket.on("disconnect", async (data) => {
  //   // await deleteSocket(data);
  //   console.log("A user disconnected");
  // });

  socket.on("userLogged", async (data) => {
    console.log("🚀 ~ userSocket.on ~ data:", "thats super cool");
    await userLoggedSocket(data);
  });
  // userSocket.on("userLoggedOut", async (data) => {
  //   await deleteSocket(data);
  // });
  socket.on("orderCreated", async ({ courierId, restaurantId }) => {
    console.log("🚀 ~ socket.on ~ courierId, restaurantId :", courierId, restaurantId )
    const courierSocketId = await newOrder(courierId);
    const restaurantSocketId = await newOrder(restaurantId);
    const wantedCourierSocket = sockets[courierSocketId];
    const wantedRestaurantSocket = sockets[restaurantSocketId];
    if (wantedCourierSocket) {
      wantedCourierSocket.emit("newOrder");
    }
    if (wantedRestaurantSocket) {
      wantedRestaurantSocket.emit("newOrder");
    }
  });
}

const returnsRelevantSocket = async (socket, sockets) => {
  let userSocket;
  const ExistingSocket = socket.handshake.query.socketId;
  if (ExistingSocket != "null") {
    const socketId = jwt.verify(ExistingSocket, secret);
    if (sockets[socketId]) {
      console.log("🚀 ~ handleSocketEvents ~ socketId:", socketId);
      userSocket = sockets[socketId];
      console.log("🚀 ~ handleSocketEvents ~ sockets:", Object.keys(sockets));
      return userSocket;
    }
  }
  return socket;
};

module.exports = handleSocketEvents;
