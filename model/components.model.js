const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const ComponentSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: {
      type: String,
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    password: { type: String },
    pincode: { type: Number },
    addr: { type: String },
  },
  {
    timestamps: true,
  }
);
ComponentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare the hashed password with the login password
ComponentSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
module.exports.UserModel = model("Lens", ComponentSchema);
