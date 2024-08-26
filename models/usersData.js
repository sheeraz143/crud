const mongoose = require("mongoose");

const usersDataSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
  },
  { collection: "usersData" }
); // specify the collection name explicitly

const UsersData = mongoose.model("UsersData", usersDataSchema);

module.exports = UsersData;
