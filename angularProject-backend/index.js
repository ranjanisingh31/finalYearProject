const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const connectDB = require('./config/database');
const dotenv = require("dotenv");
const app = express();
const api = require("./routes/api.js");
app.use(cors());
app.use(body.json());
app.use("/api", api);

dotenv.config({ path: './config/config.env' });
connectDB();
const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, function () {
    console.log(`server running in ${
        process.env.NODE_ENV
        } mode on port ${PORT}`);

});

const io = require('socket.io')(server);
const socketModule = require('./socket/socket-io')(io);

