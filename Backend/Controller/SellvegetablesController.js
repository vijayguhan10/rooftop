const SellVegetables = require("../Schema/SellVegetablesSchema");
console.log("sellvegetables", this.sellVegetables);
const Sellerupdates = require("../Schema/AddressSchema");
const UpdateDeliveryMan = require("../Schema/Delivery/DeliveryAddress");
exports.sellVegetables = async (req, res) => {
  const { userId, vegetablename, quantity } = req.body;
  console.log("obtained results from endpoint : ", req.body);

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let verify = await Sellerupdates.findById(userId);
    if (!verify) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user verification for the sell products", verify);
    const coordinates = verify.location.coordinates;

    const newSale = new SellVegetables({
      userId,
      vegetablename,
      quantity,
    });

    await newSale.save();

    const deliveryPersons = await UpdateDeliveryMan.find({}).exec();
    if (deliveryPersons.length === 0) {
      return res.status(404).json({ message: "No delivery persons found" });
    }

    const nearbyPersons = await UpdateDeliveryMan.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates,
          },
          $maxDistance: 1000,
        },
      },
    }).exec();
    if (nearbyPersons.length === 0) {
      return res.status(401).json({
        message: "sorry the Delivery is not available for the current location",
      });
    }
    nearbyPersons[0].IncommingHistory.push({
      ProductDetail: newSale._id,
      CostumerOrderDetail: userId,
      status: "pending",
    });
    verify.SoldHistory.push({
      productId: newSale._id,
      status: "pending",
    });
    await nearbyPersons[0].save();
    await verify.save(); // Save the entire document

    // console.log(nearbyPersons[0].CollectionHistory.push(newSale));
    res.status(201).json({
      message: "Vegetable sale registered successfully",
      nearbyDeliveryPersons: nearbyPersons[0],
    });
  } catch (error) {
    console.error("Error in selling vegetables:", error);

    if (error.name === "ValidationError") {
      const errorMessages = Object.values(error.errors).map(
        (err) => err.message
      );
      res.status(400).json({
        message: "Validation Error",
        errors: errorMessages,
      });
    } else {
      res.status(500).json({
        message: "Error in registering vegetable sale",
        error: error.message,
      });
    }
  }
};
