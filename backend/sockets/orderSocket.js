const jwt = require("jsonwebtoken");
const secret = "secretkey";

const newOrder=async(socketId)=>{
    try {
        const decodedSocketId=jwt.verify(socketId,secret)
        return decodedSocketId
    } catch (error) {
        return null
    }
}

module.exports= newOrder ;
