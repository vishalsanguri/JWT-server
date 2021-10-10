const mongoose = require("mongoose");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type:Number
  }
  
});

const User3 = mongoose.model("random", userSchema);
module.exports = User3;
