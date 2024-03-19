const UserSocketStorage = require("../roots/models/userSocketStorageModel");

const deleteSocket = async ({ socketId }) => {
  try {
    console.log("🚀 ~ deleteSocket ~ socketId:", socketId);
    const socket = await UserSocketStorage.findOneAndDelete({
      userSocketId: socketId,
    });
    console.log("🚀 ~ deleteSocket ~ socket:", socket);
  } catch (error) {
    console.error(`Error deleting socket with ID ${socketId}:`, error);
  }
};

module.exports = deleteSocket;
