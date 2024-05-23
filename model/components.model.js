const { Schema, model } = require("mongoose");
const ComponentSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    pincode: { type: Number },
    addr: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports.UserModel = model("Lens", ComponentSchema);
