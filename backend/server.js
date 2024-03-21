const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const handleSocketEvents = require("./roots/routes/socketsRoute");


dotenv.config({ path: "./.env" });

const app = require("./app");

app.listen(8000, () => console.log(`Dev Server is Running on port 8000`));
mongoose
  .connect(process.env.MONGOURL, {
    connectTimeoutMS: 10000000,
    socketTimeoutMS: 10000000,
  })
  .then(() => {
    console.log("DB connection successful");
  });

const socketPort = 3000;

const io = new Server(socketPort, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allowed methods
    credentials: true,
  },
});

// Log when the Socket.IO server is running
console.log(`Socket.IO Server is Running on port ${socketPort}`);

const sockets = {};

io.on("connection", (socket) => {
  

  handleSocketEvents(socket, io, sockets);
});

// Export the io instance for use in other parts of the application
module.exports = { io };
