const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  state_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const District = new mongoose.model("District", districtSchema);

module.exports = District;
