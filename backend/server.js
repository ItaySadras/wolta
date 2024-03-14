const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
     origin: "http://localhost:5173", // Adjust this to match your client's origin
     methods: ["GET", "POST"],
     allowedHeaders: ["my-custom-header"],
     credentials: true
  }
 });
 
// Configure dotenv
dotenv.config({ path: "./.env" });

// Connection to the database
mongoose
 .connect(process.env.MONGOURL, {
    connectTimeoutMS: 10000000,
    socketTimeoutMS: 10000000,
 })
 .then(() => {
    console.log("DB connection successful");
 });

const searchAlgorithm = require("./backEndUtils/searchBackend");
const { createDB, addsDesertsAndAppetizers, generateRestaurantsImages, generateRestaurantsAddress, cryptAllPasswords } = require("./backEndUtils/dataBaseBuilder");
const { dictionaryDishBuilder } = require("./backEndUtils/dictionaryBuilder");

// Example of using socket.io
io.on("connection", (socket) => {
 console.log(`A user connected ${socket.id}`);

 socket.on("disconnect", () => {
    console.log("A user disconnected");
 });

 // You can add more socket events here
});

server.listen(8000, () => console.log(`Dev Server is Running on port 8000`));
