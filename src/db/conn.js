const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://localhost:27017/subsidyX_api_nodejs", {})
  .then(() => console.log("Database connection successful"))
  .catch(() => console.log("Database connection faild"));
