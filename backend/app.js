const cors = require("cors");
const express = require("express"); // Express.js web application framework

const app = express();
app.use(express.json());
app.use(cors( ));




// If no routes are matched, send a 404 error
app.all("*", (req, res) => {
  new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
});

// Export the app to be used by the server
module.exports = app;
