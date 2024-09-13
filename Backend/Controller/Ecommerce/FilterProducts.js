const BuyerDetails = require("../../Schema/AddressSchema");
const ConfirmedProducts = require("../../Schema/ConfrimedProducts");

exports.FilterByLocation = async (req, res) => {
  const { userid } = req.body;
  console.log("userid", userid);
  const userfound = await BuyerDetails.findById(userid);
  if (!userfound) {
    return res.status(400).json({ message: "Invalid Login oops!" });
  }
  console.log("userfounded from eccomerce", userfound);
  const coordinates = userfound.location.coordinates;
  console.log(
    "coordinates of products to sorrund from eccommerce",
    coordinates
  );
  const findbyLocation = await ConfirmedProducts.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        $maxDistance: 5000,
      },
    },
  });
  console.log("these are the products found ", findbyLocation);
  const newproducts = findbyLocation.filter(
    (element) => element.TotalQuantity > 0
  );

  if (newproducts > 0) {
    res.status(200).json({ result: findbyLocation });
  }  if (newproducts === 0) {
    res
      .status(206)
      .json({ message: "the fresh products has been sold out" });
  } else {
    res
      .status(204)
      .json({ message: "sorry the service is not available in the area" });
  }
};
