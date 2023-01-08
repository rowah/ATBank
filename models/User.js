const mongoose = require("mongoose");
const passport = require("passport");
const Schema = mongoose.Schema;

//schema creation
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = User = mongoose.model("users", UserSchema);
