const Address = require("../Schema/AddressSchema");
const { fetchGeocodingData } = require("../Geocoding");

exports.NewAddress = async (req, res) => {
  // console.log("Newuser", req.body);
  const { userId, name, email, phonenumber, location } = req.body;

  try {
    const processedAddress = await fetchGeocodingData(
      location.latitude,
      location.longitude
    );
    //console.log("Processed Address from Geocoding", processedAddress);

    const locationData = {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
    };

    const newData = new Address({
      userId,
      name,
      email,
      phonenumber,
      location: locationData,
      address: processedAddress,
    });

    await newData.save();
    res
      .status(201)
      .json({ message: "Address created successfully", data: newData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating address", error: error.message });
  }
};

exports.GetData = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    const result = await Address.findOne({ userId: userId });
    if (!result) {
      return res.status(404).json({ message: "Address not found" });
    }

    return res
      .status(200)
      .json({ message: "Address fetched successfully", data: result });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching the address",
      error: error.message,
    });
  }
};
exports.UpdateMyDetails = async (req, res) => {
  const { userId, name, email, phonenumber, address } = req.body;
  try {
    const result = await Address.updateOne(
      { userId: userId },
      {
        $set: {
          name: name,
          email: email,
          phonenumber: phonenumber,
          address: address,
        },
      }
    );

    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Address updated successfully" });
    } else {
      res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating address", error: error.message });
  }
};
