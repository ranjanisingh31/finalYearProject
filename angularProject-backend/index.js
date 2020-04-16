const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const api = require("./routes/api.js");
const nodemailer = require("nodemailer");
const app = express();
app.use(cors());
app.use(body.json());
app.use("/api", api);

app.get("/", (err, res) => {
  res.send("hello from server");
});

app.listen(3000, function () {
  console.log("server running on localhost");
});
