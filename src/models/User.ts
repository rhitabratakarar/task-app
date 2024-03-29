import { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";

interface IUser {
  name: string;
  age?: number;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "name of the user required."],
    trim: true,
  },
  age: {
    type: Number,
    required: false,
    default: 0,
    validate: {
      validator: function (value: number) {
        if (value < 0) throw new Error("age can not be negative.");
      },
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (x: string) {
        if (!isEmail(x)) throw new Error("wrong email format!!!!");
      },
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "length of password must be greater than 6 characters."],
    trim: true,
    validate: {
      validator: function (value: string) {
        value = value.toLowerCase();
        return value !== "password";
      },
    },
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  console.log("hashing the password...");
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = model<IUser>("User", userSchema);
export default User;
