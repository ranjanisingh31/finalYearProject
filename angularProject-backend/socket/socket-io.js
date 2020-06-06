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

                } else {
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
                    io.emit("result", "Request Not Implemented");
                } else {
                    io.emit("result", "Updated status Successfully...Start Tracking");
                }
            });
        });
        var id;
        socket.on("coordinates", (res) => {
            id = res.searchId;
            count++;
            coordinates.findOne({
                searchId: res.searchId, userId: res.userId
            }, (error, data) => {
                if (error) {
                    io.emit("result", "Request Not Implemented. Track again !!!");
                } else {
                    if (data === null) {
                        let user = new coordinates(res);
                        user.save((error1, data1) => {
                            if (error1) {
                                io.emit("Request Not Implemented");
                            } else {
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
                                io.emit("result", "Request Not Implemented");
                            } else {
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
                    console.log("coordinates", err);
                } else {
                    vehiclesLocation = data;
                    io.emit("vehiclesLocation", data);
                    //res.status(200).json({ length: data.length, data: data });

                }
            });
        });

        if (vehiclesLocation !== undefined) {
            io.emit('vehiclesLocation', vehiclesLocation);
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
