const Signup = require("../../Schema/Delivery/Deliverycredential");
const bcrypt = require("bcryptjs");
exports.registration = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(req.body);
    const newuser = new Signup({
      name,
      email,
      password: hashedpassword,
    });
    await newuser.save();
    res.status(200).json("The new user has been saved successfully");
  } catch (error) {
    res.status(500).json("Error in entering the user data oops!");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await Signup.findOne({ email });
    if (!findUser) {
      return res.status(400).json("Sorry, invalid Email ID");
    }
    const isValidUser = await bcrypt.compare(password, findUser.password);
    if (!isValidUser) {
      return res.status(400).json("Sorry, the password entered is wrong"); // Added status code and fixed typo
    }
    res.status(200).json("Login successful!");
  } catch (error) {
    console.log(error);
    res.status(500).json("Error in logging in oops!");
  }
};
