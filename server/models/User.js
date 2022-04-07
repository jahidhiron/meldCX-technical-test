const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  status: { type: String, enum: ["user", "admin"], default: "user" },
  avatar: { type: String, default: "" },
});

module.exports = mongoose.model("user", userSchema);
