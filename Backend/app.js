const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRoutes = require("./Routers/authRoutes");
const addressRoutes = require("./Routers/addressRoutes");
const deliveryRoutes = require("./Routers/deliveryRoutes");
const sellerRoutes = require("./Routers/sellerRoutes");
const Ecommerce = require("./Routers/EcommerceRoutes");
dotenv.config();
app.use(express.json());

const dbURI = process.env.MONGODB_URL_ID;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(400).json("No MongoDB connection");
    }
    const dbName = "vegetables";
    const db = mongoose.connection.useDb(dbName);
    const collectionName = "data";
    const collection = db.collection(collectionName);
    const datas = await collection.find().toArray();
    res.json(datas);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.use("/authentication", authRoutes);
app.use("/Address", addressRoutes);
app.use("/delivery", deliveryRoutes);
app.use("/vegetables", sellerRoutes);
app.use("/ecommerce", Ecommerce);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
