import mongoose from "mongoose";
import { IUser, IUserSchema } from "../../types/user";

const UserSchema = new mongoose.Schema<IUserSchema>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please add a userName."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
  },
  userType: {
    type: String,
    required: [true, "Please Select a Type"],
  },
  currentCourses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("User", UserSchema);

export default model;
