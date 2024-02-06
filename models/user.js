const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: true,
    type: String,
  },
  age: {
    type: Number,
    required: true
  },
  addres: {
    latitude: {
      type: String,
      default: "41.112663",
    },
    longitude: {
      type: String,
      default: "29.021330",
    }
  },
  profilPicture: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    //default:"user",
    //enum: ["kadın", "erkek"],
    required: ["true", "please provide'a role"],
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  blocked: {
    type: Boolean,
    default: false
  }


}, { timestamps: true, versionKey: false, emitIndexErrors: true });

const User = mongoose.model("User", userSchema);
module.exports = User;