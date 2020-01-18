const express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const port = process.env.PORT || 3009;
connectDB();

var routing = require("./routing");

//app.set("view engine", "pug");

app.use(bodyParser.json());
app.get("/", (req, res, next) => {
  res.send("Hello");
});
app.use("/api", routing);
app.listen(port);
