const mongoose = require("mongoose");
const userSocketStorageSchema = new mongoose.Schema({
  userSocketId: { type: String },
  userType: { type: String },
  userId: { type: String },
});

const UserSocketStorage = mongoose.model(
  "UserSocketStorage",
  userSocketStorageSchema
);

module.exports = UserSocketStorage;
