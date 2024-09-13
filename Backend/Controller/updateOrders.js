const DeliveryMan = require("../Schema/Delivery/DeliveryAddress");
const Sellerupdates = require("../Schema/AddressSchema");
const ConfrimedorderUpdate = require("../Schema/ConfrimedProducts");
const vegetabelsdetail = require("../Schema/SellVegetablesSchema");
exports.updatetoConfrim = async (req, res) => {
  const { DeliverymanId, ProductDetail, costumerID } = req.body;

  try {
    if (!DeliverymanId || !ProductDetail || !costumerID) {
      return res.status(400).json({
        message: "DeliverymanId, ProductDetail, and costumerID are required",
      });
    }

    const customerExists = await Sellerupdates.findById(costumerID);
    if (!customerExists) {
      return res
        .status(400)
        .json({ message: "Unauthorized delivery record ignore it" });
    }
    const vegetablecheck = await vegetabelsdetail.findById(ProductDetail);
    if (!vegetablecheck) {
      return res.status(400).json({ message: "such product dosent exist" });
    }
    const updateResult = await DeliveryMan.updateOne(
      { _id: DeliverymanId, "IncommingHistory.ProductDetail": ProductDetail },
      { $set: { "IncommingHistory.$.status": "confirmed" } }
    );
    const confirm = new ConfrimedorderUpdate({
      ProductId: ProductDetail,
      TotalQuantity: vegetablecheck.quantity,
      location: customerExists.location,
    });
    await confirm.save();
    const updatetheconsumer = await Sellerupdates.updateOne(
      { _id: costumerID, "SoldHistory.productId": ProductDetail },
      { $set: { "SoldHistory.$.status": "confirmed" } }
    );
    if (
      updateResult.modifiedCount === 0 &&
      updatetheconsumer.modifiedCount === 0
    ) {
      return res
        .status(404)
        .json({ message: "No matching record found to update" });
    }
    res.status(200).json({ message: "Status updated to confirmed" });
  } catch (error) {
    console.error("Error updating status:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.OrderDeclination = async (req, res) => {
  const { DeliverymanId, ProductDetail, costumerID } = req.body;

  try {
    if (!DeliverymanId || !ProductDetail || !costumerID) {
      return res
        .status(400)
        .json({ message: "DeliverymanId and ProductDetail are required" });
    }
    const customerExists = await Sellerupdates.findById(costumerID);
    if (!customerExists) {
      return res
        .status(400)
        .json({ message: "Unauthorized delivery record ignore it" });
    }

    const updateResult = await DeliveryMan.updateOne(
      { _id: DeliverymanId, "IncommingHistory.ProductDetail": ProductDetail },
      { $pull: { IncommingHistory: { ProductDetail: ProductDetail } } }
    );
    const updatetheconsumer = await Sellerupdates.updateOne(
      { _id: costumerID, "TempSoldDetails.productId": ProductDetail },
      { $pull: { SoldHistory: { productId: ProductDetail } } }
    );

    if (
      updateResult.modifiedCount === 0 &&
      updatetheconsumer.matchedCount === 0
    ) {
      return res
        .status(404)
        .json({ message: "No matching record found to update" });
    }

    res.status(200).json({ message: "Order declined successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
