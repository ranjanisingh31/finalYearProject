const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const RegisterLogin = require("../model/registerLogin.js");
const vehicleDetails = require("../model/vehicleDetails.js");
const dbString = "mongodb://127.0.0.1:27017/finalYearProjectDB";

mongoose.connect(dbString, (err) => {
  if (err) {
    console.error("Error!!!", err);
  } else {
    console.log("Connected to mongoDB");
  }
});
mongoose.set("useFindAndModify", false);
router.get("/", (req, res) => {
  res.send("from API route");
});

router.post("/register", (req, res) => {
  let userData = req.body;
  let user = new RegisterLogin(userData);
  //console.log(user, userData);
  RegisterLogin.findOne({ email: userData.email }, (error, data) => {
    console.log("data", data);
    if (error) {
      console.log("err", error);
      res.status(500).json({ message: "Request Not Implemented" });
    } else if (data) {
      console.log("email", data);
      res
        .status(401)
        .json({ message: "Already registered with this email id." });
    } else {
      user.save((error, data) => {
        if (error) {
          res.status(500).json({ message: "Request Not Implemented" });
        } else {
          console.log("submitted");
          //mail
          mail(data.fullName, userData, "Thank you for connecting with us !!!");

          //authentication
          let payload = { subject: data._id };
          let token = jwt.sign(payload, "registerKey");
          res
            .status(200)
            .send({ token: token, message: "Registererd Successfully!!!" });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  let userData = req.body;
  RegisterLogin.findOne({ email: userData.email }, (error, data) => {
    if (error) {
      res.status(500).json({ message: "Internal Server Error." });
    } else {
      if (!data) {
        res.status(401).json({ message: "Invalid email." });
      } else {
        if (data.password !== userData.password) {
          res.status(401).json({ message: "Invalid Password." });
        } else {
          let payload = { subject: data._id };
          let token = jwt.sign(payload, "registerKey");
          res.status(200).send({ token: token, message: "LoggedIn!!!" });
        }
      }
    }
  });
});

router.post("/reset", (req, res) => {
  let userData = req.body;
  RegisterLogin.findOne({ email: userData.email }, (error, data) => {
    if (error) {
      res.status(500).json({ message: "Internal server error." });
    } else {
      if (!data) {
        console.log("invalid email");
        res.status(401).json({
          message: "Invalid email. Enter registered email.",
        });
      } else {
        RegisterLogin.findOneAndUpdate(
          { email: userData.email },
          {
            $set: {
              password: userData.password,
            },
          },
          {
            upsert: false,
          },
          (error, data) => {
            if (error) {
              res.status(401).json({ message: "Password not updated." });
            } else {
              console.log("updated password");
              mail(
                data.fullName,
                userData,
                "Your password has been successfully updated. Thank you for connecting with us !!!"
              );
              res
                .status(200)
                .json({ message: "Updated password successfully!!!" });
            }
          }
        );
      }
    }
  });
});

function verifyToken(req, res, next) {
  if (!req.header.authorization) {
    return this.status(401).send("unauthorized request");
  }
  let token = req.header.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("unauthhorized request");
  }
  let payload = jwt.verify(token, "registerKey");
  if (!payload) {
    return res.status(401).send("unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

function mail(name, userData, mssg) {
  async function sendMail() {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ranjani1331@gmail.com",
        pass: "ranjaniSingh@13",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: '"Ranjani Singh" <ranjani1331@gmail.com>',
      to: `${userData.email}`,
      subject: "Welcome to Happy Way",
      //text: "Happy Way welcomes you",
      html: `<h1>Hi ${name}</h1><br><h4>${mssg}</h4>`,
    });
  }
  sendMail().catch(console.error);
}

router.get("/vehicleDetails", (req, res) => {
  vehicleDetails.find({}, (error, data) => {
    if (error) {
      console.log("error in getting vehicleDetails", error);
    } else {
      console.log("got vehicle data", data);
      res.status(200).json(data);
    }
  });
});
module.exports = router;
