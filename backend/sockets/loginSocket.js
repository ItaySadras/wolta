const UserSocketStorage = require("../roots/models/userSocketStorageModel");
const jwt = require("jsonwebtoken");
secret = "secretkey";

const userLoggedSocket = async ({ userType, userId, socketStorageId }) => {
  const decodedUserSocketId = jwt.verify(socketStorageId, secret);
  const userSocket = await UserSocketStorage.findOneAndUpdate(
    { $or: [{ userSocketId: decodedUserSocketId }, { userId: userId }] },
    {
       userType: userType,
       userId: userId,
       userSocketId: decodedUserSocketId,
    },
    { new: true } // This option returns the updated document
   );
   
  console.log("🚀 ~ userLoggedSocket ~ userSocket:", userSocket);
  if (!userSocket) {
    const Socket = await UserSocketStorage.create({
      userType: userType,
      userId: userId,
      userSocketId: decodedUserSocketId,
    });
  }
};

module.exports = userLoggedSocket;
