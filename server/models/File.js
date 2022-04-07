const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: { type: String, required: true, trim: true },
    desc: { type: String, trim: true },
    files: [{ type: String, required: true }],
    publicKey: { type: String, required: true },
    privateKey: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("file", fileSchema);
