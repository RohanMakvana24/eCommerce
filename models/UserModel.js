import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    maxLength: 100,
    required: [true, "firstname is required"],
  },
  lastname: {
    type: String,
    trim: true,
    maxLength: 100,
    required: [true, "lastname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  mobileNo: {
    type: String,
    trim: true,
  },
  profilePic: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  Token: [
    {
      AuthToken: {
        type: String,
      },
    },
  ],
  OTP: {
    type: Number,
  },
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generates the Auth Token
UserSchema.methods.generateToken = async function () {
  const options = {
    expiresIn: "1d", // Set expiration to 2 minutes
  };
  const token = jwt.sign({ id: this.id }, process.env.JWTSECRET, options);
  this.Token = this.Token.concat({ AuthToken: token });
  return token;
};
// Model creation
const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
