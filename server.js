
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const User=require("./models/User")
const Vote=require("./models/Vote")
const Plan=require("./models/Plan")
const{connectDB}  = require("./config/db");


// INIT

// configPath
const configPath="./config/config.env"



// Load env vars
dotenv.config({
  path: configPath,
  // debug: true,
});

// Connect to database...
// connectDB();


// Route files
const routes = require("./routes");



// Body parser
app.use(express.json({ limit: "25mb" }));



if (process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

// File uploading

app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Prevent http param pollution
app.use(hpp());
var corsOptions = {
  origin: '*', // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
// Set static folder


app.use("/api", routes);
// Mount routers6
app.use(errorHandler);

const PORT = process.env.PORT || 8002;

const expressServer = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
connectDB()

//!assosition section

Plan.belongsTo(User)
Vote.belongsTo(User)
Vote.belongsTo(Plan)
Plan.hasMany(Vote)
// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close expressServer & exit process
  // expressServer.close(() => process.exit(1));
});

module.exports = {
  app,
};
