const mongoose = require("mongoose");

const DB =
  "mongodb+srv://manaspasayat3:ov9VDRUAJaQmlWWs@cluster0.ublqajy.mongodb.net/subsidyX_api?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

mongoose
  // .connect("mongodb://localhost:27017/subsidyX_api_nodejs", {})
  .connect(DB, {})
  .then(() => console.log("Database connection successful"))
  .catch(() => console.log("Database connection faild"));
