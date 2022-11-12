import { comparePassword } from "../../modules/auth";
import QuickFixError from "../../modules/error";
import {
  IRequestUser,
  IRequestUserSignIn,
  IUserSchema,
} from "../../types/user";
import User from "../model/User";

export const createNewUser = async (
  user: IRequestUser
): Promise<IUserSchema> => {
  try {
    // const id = get
    const userObj = new User(user);
    const savedUser = await userObj.save();
    return savedUser;
  } catch (err) {
    throw err;
  }
};

export const authenticateUser = async (
  user: IRequestUserSignIn
): Promise<IUserSchema> => {
  try {
    const userObj = await User.findOne({ username: user.username });
    const isValid = await comparePassword(user.password, userObj.password);
    if (isValid) {
      return userObj;
    } else {
      throw new QuickFixError({ clientMsg: "Please enter valid details" });
    }
  } catch (err) {
    console.log("Error is", err);
    throw err;
  }
};
