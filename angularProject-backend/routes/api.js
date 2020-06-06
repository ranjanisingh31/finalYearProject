const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const RegisterLogin = require("../model/registerLogin.js");
const vehicleDetails = require("../model/vehicleDetails.js");
const selfDriveDetails = require("../model/selfDriveDetails.js");
const chauffeurDriveDetails = require("..//model/chauffeurDriveDetails.js");
const trackDetails = require("../model/trackDetails.js");
const trackPlanDetails = require("../model/trackPlanDetails.js");
const coordinates = require("../model/coordinates.js");
const shortid = require('short-id');


router.get("/", (req, res) => {
    res.send("from API route");
});

router.post("/register", (req, res) => {
    let userData = req.body;
    let user = new RegisterLogin(userData);
    RegisterLogin.findOne({
        email: userData.email
    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented" });
        } else if (data) {
            res.status(401).json({ message: "Already registered with this email id." });
        } else {
            user.save((error, data) => {
                if (error) {
                    res.status(500).json({ message: "Request Not Implemented" });
                } else {

                    // mail
                    mail(data.fullName, userData, "Thank you for connecting with us !!!");

                    // authentication
                    let payload = {
                        subject: data._id
                    };
                    let token = jwt.sign(payload, "registerKey");
                    res.status(200).send({ token: token, message: "Registererd Successfully!!!", email: data.email });
                }
            });
        }
    });
});

router.post("/login", (req, res) => {
    let userData = req.body;
    RegisterLogin.findOne({
        email: userData.email
    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Internal Server Error." });
        } else {
            if (!data) {
                res.status(401).json({ message: "Invalid email." });
            } else {
                if (data.password !== userData.password) {
                    res.status(401).json({ message: "Invalid Password." });
                } else {
                    let payload = {
                        subject: data._id
                    };
                    let token = jwt.sign(payload, "registerKey");
                    res.status(200).send({ token: token, message: "LoggedIn!!!", email: data.email });
                }
            }
        }
    });
});

router.post("/reset", (req, res) => {
    let userData = req.body;
    RegisterLogin.findOne({
        email: userData.email
    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Internal server error." });
        } else {
            if (!data) {
                res.status(401).json({ message: "Invalid email. Enter registered email." });
            } else {
                RegisterLogin.findOneAndUpdate({
                    email: userData.email
                }, {
                    $set: {
                        password: userData.password
                    }
                }, {
                    upsert: false
                }, (error, data) => {
                    if (error) {
                        res.status(401).json({ message: "Password not updated." });
                    } else {
                        mail(data.fullName, userData, "Your password has been successfully updated. Thank you for connecting with us !!!");
                        res.status(200).json({ message: "Updated password successfully!!!" });
                    }
                });
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
                pass: "ranjaniSingh@13"
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: '"Ranjani Singh" <ranjani1331@gmail.com>', to: `${
                userData.email
                }`,
            subject: "Welcome to Happy Way",
            html: `<h1>Hi ${name}</h1><br><h4>${mssg}</h4>`
        });
    }
    sendMail().catch(console.error);
}

router.post("/vehicleDetails", (req, res) => {
    let userData = req.body;
    vehicleDetails.find({ useCase: userData.useCase }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented." });
        } else {
            res.status(200).json(data);
        }
    });
});

router.post("/self-drive", (req, res) => {
    let userData = req.body;
    let user = new selfDriveDetails(userData);
    user.save((error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented" });
        } else {
            mail(data.clientDetails.fullName, data.clientDetails, "Your Booking is Confirmed. Thank you for connecting with us !!!");
            res.status(200).json({ message: "Confirmed Booking" });
        }
    });
});

router.get("/selfDriveDetails", (req, res) => {
    selfDriveDetails.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Requset not Implemented." });
        }
        else {
            if (data === null) {
                res.status(204).json({ message: "No data available." });
            }
            else {
                res.status(200).json({ data: data });

            }
        }
    });
});

router.post("/selectedVehicleData", (req, res) => {
    let userData = req.body;
    vehicleDetails.findById(userData.id).exec((err, data) => {
        if (err) {
            res.status(500).json({ message: "Request Not Implemented." });
        }
        else {
            res.status(200).json({ data: data });
        }
    });
});

router.post("/chauffeur-drive", (req, res) => {
    let userData = req.body;
    let user = new chauffeurDriveDetails(userData);
    user.save((error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented" });
        } else {
            mail(data.clientDetails.fullName, data.clientDetails, "Your Booking is Confirmed.Driver Details:VISHNU SHARMA.3456782890. Thank you for connecting with us !!!");
            res.status(200).json({ message: "Confirmed Booking" });
        }
    });
});

router.get("/chauffeurDriveDetails", (req, res) => {
    chauffeurDriveDetails.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Requset not Implemented." });
        }
        else {
            if (data === null) {
                res.status(204).json({ message: "No data available." });
            }
            else {
                res.status(200).json({ data: data });
            }
        }
    });
});

router.post("/track", (req, res) => {
    let userData = req.body;
    let user = new trackDetails(userData);
    trackDetails.findOne({
        email: userData.email
    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented" });
        } else if (data) {
            res.status(401).json({ message: "Already registered with this email id." });
        } else {
            var ID = [];
            if (userData.selectedPlan.vehicle === "1 Vehicle") {
                ID.push(shortid.generate());
            } else {
                var n = userData.selectedPlan.vehicle.split(' ');
                for (var i = 0; i < n[n.length - 2]; i++) {
                    ID.push(shortid.generate());
                }
            } user.userIDs = ID;

            user.save((err, data1) => {
                if (err) {
                    res.status(500).json({
                        message: err + "Request Not Implemented. Please enter the details again !!!"
                    });
                } else {
                    mail(data1.fullName, userData, `Your ${
                        userData.selectedPlan.vehicle
                        } plan has been activated sucessfully. Visit the website to continue tracking your vehicles. Have a nice day!!!`);
                    res.status(200).json({ message: "Confirmed Booking" });
                }

            });
        }

    });
});

router.get("/trackPlan", (req, res) => {
    trackPlanDetails.find({}, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented." })
        } else {
            res.status(200).json(data);
        }
    });
});

router.post("/selectedTrackPlan", (req, res) => {
    let userData = req.body;
    trackDetails.findOne({
        email: userData.email
    }, (error, data) => {
        if (error) {
            res.status(500).json({
                message: error + "Request Not Implemented. Please select the plan !!!"
            });
        } else {
            if (data === null) {
                res.status(204).json();
            } else {
                var date = new Date(Date.now());
                if (data.expirationDate === date) {
                    trackDetails.findOneAndRemove({
                        email: userData.email
                    }, (error2, data2) => {
                        if (error2) {
                            res.status(500).json({
                                message: error2 + "Request Not Implemented."
                            });
                        } else {
                            res.status(200).json({ message: `Plan ${data.selectedPlan.vehicle} has been expired. Select the plan again in order to use the services.` });
                        }
                    });
                } else {
                    trackPlanDetails.findById(data.selectedPlan._id).exec((error1, data1) => {
                        if (error1) {
                            res.status(500).json({
                                message: error1 + "Request Not Implemented. Selected plan no longer exist."
                            });
                        } else {
                            res.status(200).json({ data: data, selectedPlan: data1, addVehicle: data.addVehicle });
                        }
                    });
                }
            }

        }
    });
});

router.post("/addVehicle", (req, res) => {
    let userData = req.body;
    trackDetails.findOne({
        _id: userData.searchId,
        addVehicle: {
            $elemMatch: {
                userId: userData.userId
            }
        }
        //"addVehicle.userId": userData.userId

    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented" });
        } else {
            if (data === null) {
                trackDetails.findOneAndUpdate({
                    _id: userData.searchId
                }, {
                    $push: {
                        "addVehicle": userData
                    }
                }, function (err, result) {
                    if (err) {
                        res.status(500).json({ message: "Request Not Implemented" });
                    } else {

                        res.status(200).json({ message: "Added Successfully..." });
                    }
                });
            }
            else {
                trackDetails.updateOne({
                    _id: userData.searchId,
                    addVehicle: {
                        $elemMatch: {
                            userId: userData.userId
                        }
                    }
                }, {
                    $set: {
                        "addVehicle.$": userData
                    }

                }, (error1, data) => {
                    if (error1) {
                        res.status(500).json({ message: "Request Not Implemented" });
                    } else {
                        res.status(200).json({ message: "Updated Successfully..." });
                    }
                });
            }
        }
    });
});


router.put("/removeVehicle", (req, res) => {
    let userData = req.body;
    console.log(userData);
    trackDetails.findOneAndUpdate({
        _id: userData.searchId
    }, {
        $pull: {
            addVehicle: {
                userId: userData.userId
            }
        }
    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented" });
        } else {
            res.status(200).json({ message: "Removed Successfully..." });
        }
    });
});


router.post("/coord", (req, res) => {
    coordinates.find({ searchId: req.body.searchId }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "Request Not Implemented" });
        } else {
            res.status(200).json({ length: data.length, data: data });
        }
    });
});

router.get("/userTrackDetails", (req, res) => {
    trackDetails.find({}, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented" });
        } else {
            res.status(200).json({ data: data });
        }
    });
});
module.exports = router;
