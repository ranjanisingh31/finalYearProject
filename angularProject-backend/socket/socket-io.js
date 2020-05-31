const trackDetails = require("../model/trackDetails");
const trackPlanDetails = require("../model/trackPlanDetails.js");
const coordinates = require("../model/coordinates");

count = 0;
module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("user Connected");
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on("updateSelectedPlan", (email) => {
            trackDetails.findOne({
                email: email
            }, (error, data) => {
                if (error) {
                    console.log("not registered plan", error);
                    io.emit("response", error + "Request Not Implemented. Please select the plan !!!");

                } else { // { "_id": new mongo(data.selectedPlan._id) }
                    if (data === null) {
                        console.log("No plan exist...");
                    } else {
                        trackPlanDetails.findById(data.selectedPlan._id).exec((error1, data1) => {
                            if (error1) {
                                console.log("plan does not exist with this id", error1);
                                io.emit("response", error1 + "Request Not Implemented. Selected plan no longer exist.");
                            } else {
                                var value = { data, selectedPlan: data1, addVehicle: data.addVehicle }
                                io.emit("response", value);
                            }
                        });
                    }

                }
            });
        });

        socket.on("updateStatusOfVehicles", (data) => {
            console.log("updatae", data);
            trackDetails.updateOne({
                _id: data.searchId,
                addVehicle: {
                    $elemMatch: {
                        userId: data.userId
                    }
                }
            }, {
                $set: {
                    "addVehicle.$.state": data.state
                }
            }, (error, data1) => {
                if (error) {
                    console.log(error);
                    io.emit("result", "Request Not Implemented");
                } else {
                    console.log("submitted");
                    io.emit("result", "Updated status Successfully...Start Tracking");
                }
            });
        });
        var id;
        socket.on("coordinates", (res) => {
            id = res.searchId;
            count++;
            console.log(count, res);
            coordinates.findOne({
                searchId: res.searchId, userId: res.userId
            }, (error, data) => {
                if (error) {
                    console.log("not registered plan", error);
                    io.emit("result", "Request Not Implemented. Track again !!!");
                } else {
                    if (data === null) {
                        console.log("No plan exist...");
                        let user = new coordinates(res);
                        user.save((error1, data1) => {
                            if (error1) {
                                console.log(error1);
                                io.emit("Request Not Implemented");
                            } else {
                                console.log("coordinates submitted", data1);
                                io.emit("result", "Added + Tracking...");
                            }
                        });
                    }
                    else {
                        coordinates.updateOne({ searchId: res.searchId, userId: res.userId }, {
                            $push: {
                                location: res.location
                            }
                        }, (error2, data2) => {
                            if (error2) {
                                console.log(error2);
                                io.emit("result", "Request Not Implemented");
                            } else {
                                console.log("location updated");
                                io.emit("result", "Updated + Tracking...");
                            }
                        });

                    }
                }
            });
        });
        var vehiclesLocation;
        socket.on("location", (res) => {
            coordinates.find({ searchId: res }, (err, data) => {
                if (err) {
                    console.log("coordiinates", err);
                } else {
                    console.log("coord", data);
                    var data1 = [{
                        "searchId": "5eba583c201aff2828f4743c",
                        "vName": "ranjani",
                        "userId": "1234",
                        "iconColor": "black",
                        "location": [
                            { lng: -122.48369693756104, lat: 37.83381888486939 },
                            { lng: -122.48348236083984, lat: 37.83317489144141 },
                            {
                                lng: -122.48339653015138, lat: 37.83270036637107
                            },
                            {
                                lng: -122.48356819152832, lat: 37.832056363179625
                            },
                            {
                                lng: -122.48404026031496, lat: 37.83114119107971
                            },
                            {
                                lng: -122.48404026031496, lat: 37.83049717427869
                            },
                            {
                                lng: -122.48348236083984, lat: 37.829920943955045
                            },
                            {
                                lng: -122.48356819152832, lat: 37.82954808664175
                            },
                            {
                                lng: -122.48507022857666, lat: 37.82944639795659
                            },
                            {
                                lng: -122.48610019683838, lat: 37.82880236636284
                            },
                            {
                                lng: -122.48695850372314, lat: 37.82931081282506
                            },
                            {
                                lng: -122.48700141906738, lat: 37.83080223556934
                            },
                            {
                                lng: -122.48751640319824, lat: 37.83168351665737
                            },
                            {
                                lng: -122.48803138732912, lat: 37.832158048267786
                            },
                            {
                                lng: -122.48888969421387, lat: 37.83297152392784
                            },
                            {
                                lng: -122.48987674713133, lat: 37.83263257682617
                            },
                            {
                                lng: -122.49043464660643, lat: 37.832937629287755
                            },
                            {
                                lng: -122.49125003814696, lat: 37.832429207817725
                            },
                            {
                                lng: -122.49163627624512, lat: 37.832564787218985
                            },
                            {
                                lng: -122.49223709106445, lat: 37.83337825839438
                            },
                            {
                                lng: -122.49378204345702, lat: 37.83368330777276
                            }
                        ]
                    }];
                    vehiclesLocation = data;
                    console.log("v", vehiclesLocation);
                    io.emit("vehiclesLocation", data);
                    //res.status(200).json({ length: data.length, data: data });

                }
            });
        });

        if (vehiclesLocation !== undefined) {
            io.emit('vehiclesLocation', vehiclesLocation);
            console.log("v", vehiclesLocation);
        }

        socket.on("vehiclesLocationRemove", (res) => {
            coordinates.remove({ searchId: res.searchId, userId: res.userId }, (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("deleted");
                }
            });
        });

    });

}
