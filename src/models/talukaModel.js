const mongoose = require("mongoose");

const talukaSchema = new mongoose.Schema({
  state_id: {
    type: String,
    required: true,
  },
  district_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Taluka = new mongoose.model("Taluka", talukaSchema);

module.exports = Taluka;
