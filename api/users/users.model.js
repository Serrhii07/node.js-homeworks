const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: String,
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    token: String,
  },
  { versionKey: false }
);

class User {
  constructor() {
    this.db = mongoose.model("Users", userSchema);
  }

  createUser = async (userData) => {
    return await this.db.create(userData);
  };

  findUser = async (query) => {
    return await this.db.findOne(query);
  };

  getUserById = async (userId) => {
    return await this.db.findById(userId);
  };

  updateUser = async (userId, userData) => {
    return await this.db.findByIdAndUpdate(userId, userData, {
      new: true,
    });
  };
}

module.exports = new User();
