const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

// connect database
require("./config/dbConfig")();

// sub route
const userRoute = require("./routes/user");
const authRouter = require("./routes/auth");
const fileRouter = require("./routes/file");

// allowed origin
const ALLOWED_ORIGIN_LIST = [
  process.env.ALLOWED_ORIGIN_1,
  process.env.ALLOWED_ORIGIN_2,
];

// initialize app
const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGIN_LIST,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// configure 3rd-party middleware
app.use("/public", express.static("public"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// configure custome middleware
app.use("/users", userRoute);
app.use("/auth", authRouter);
app.use("/files", fileRouter);

module.exports = app;
