const UserSocketStorage = require("../roots/models/userSocketStorageModel");
const jwt = require("jsonwebtoken");
secret = "secretkey";

const userLoggedSocket=async({ userType, userId, socketStorageId })=>{

    const decodedUserSocketId = jwt.verify(socketStorageId , secret);
    
    const userSocket = await UserSocketStorage.findByIdAndUpdate(decodedUserSocketId, { userType: userType, userId: userId });
    // You can also emit an event back to the client
}

module.exports= userLoggedSocket ;

