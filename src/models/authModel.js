const mongoose = require("mongoose");
const validator = require("validator");

//Define Schema (document structure)
const registerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id should be unique"],
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
});

//We will create a new collection using model
const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;
