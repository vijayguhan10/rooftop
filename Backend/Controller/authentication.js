const Signup = require("../Schema/SignupSchema");
const bcrypt = require("bcryptjs");

exports.registration = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.body);

    const newUser = new Signup({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json("The new user has been saved successfully");
  } catch (error) {
    console.error("Error in registration:", error);
    if (error.name === "ValidationError") {
      res
        .status(400)
        .json({ message: "Validation Error", details: error.errors });
    } else {
      res.status(500).json("Error in entering the user data oops!");
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const findUser = await Signup.findOne({ email });
    if (!findUser) {
      return res.status(400).json("Sorry, invalid Email ID");
    }

    // Compare the password
    const isValidUser = await bcrypt.compare(password, findUser.password);
    if (!isValidUser) {
      return res.status(400).json("Sorry, the password entered is wrong");
    }

    res.status(200).json("Login successful!");
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json("Error in logging in oops!");
  }
};
