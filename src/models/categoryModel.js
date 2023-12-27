const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false }
);

const IndustryCategory = new mongoose.model("Category", categorySchema);

module.exports = IndustryCategory;
