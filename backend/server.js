const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Configure dotenv
dotenv.config({ path: "./.env" });

// Connection to the database
mongoose.connect(process.env.MONGOURL).then(() => {
  console.log("DB connection successful");
});

const app = require("./app");
app.listen(8000, () => console.log(`Dev Server is Running 8000`));
