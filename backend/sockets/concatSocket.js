const UserSocketStorage = require("../roots/models/userSocketStorageModel");
const jwt = require("jsonwebtoken");
secret = "secretkey";

const concatSocket = async (socketId) => {
  const socket = await UserSocketStorage.create({ userSocketId: socketId });
  const userSocketId = socket._id.toString();
  const crypt = jwt.sign(userSocketId, secret);
  return crypt
};

module.exports= concatSocket ;
