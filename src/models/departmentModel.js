const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

const Department = new mongoose.model("Department", departmentSchema);

module.exports = Department;
