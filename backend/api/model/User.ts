import mongoose from "mongoose";
import { IUser } from "../../types/user";

interface IUserSchema extends IUser {
  password: string;
}

const UserSchema = new mongoose.Schema<IUserSchema>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please add a userName."],
  },
  password: {
    type: String,
    required: [true, "Please add a password."],
  },
  userType: {
    type: String,
    ref: "userRoles",
    required: [true, "Please Select a Type"],
  },
  currentCourses: [{ type: mongoose.Types.ObjectId, ref: "Courses" }],
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// UserSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

const model = mongoose.model("User", UserSchema);

export default model;
