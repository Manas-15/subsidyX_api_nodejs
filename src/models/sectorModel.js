const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  industry_id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const IndustrySector = new mongoose.model("Sector", sectorSchema);

module.exports = IndustrySector;
