const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  
});



const Signup = mongoose.model("delivery Logins", SignupSchema);

module.exports = Signup;
