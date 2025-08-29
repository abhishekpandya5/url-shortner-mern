import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // trim whitespace
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: function () {
      if (this.email === undefined) {
        return `https://www.gravatar.com/avatar/default?d=identicon`;
      }
      const hash = crypto
        .createHash("md5")
        .update(this.email.toLowerCase())
        .digest("hex");
      return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
    }
  }
});

const User = mongoose.model("User", userSchema);

export default User;
