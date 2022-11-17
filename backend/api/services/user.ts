import { comparePassword } from "../../modules/auth";
import QuickFixError from "../../modules/error";
import {
  IRequestAddCourse,
  IRequestUser,
  IRequestUserSignIn,
  IUserSchema,
} from "../../types/user";
import UserDAL from "../dal/UserDAL";
import User from "../model/User";
import Course from "../model/Course";
import { request } from "http";

export const createNewUser = async (
  user: IRequestUser
): Promise<IUserSchema> => {
  try {
    const userDal = new UserDAL();
    const model: IUserSchema = { ...user, id: "" };
    const savedUser = userDal.insert(model);
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
    if (!userObj) {
      throw new QuickFixError({ clientMsg: "Please enter valid details" });
    }
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

export const addCourse = async (request: IRequestAddCourse) => {
  try {
    console.log("Reqeust is", request);
    const course = await Course.findOne({ _id: request.courseId });
    console.log("Course is", course);
    if (!course) {
      throw new QuickFixError({ clientMsg: "Please provide a valid course" });
    }
    const filter = { _id: request.userId };
    const updateRequest = {
      $push: {
        currentCourses: request.courseId,
      },
    };
    const user = await User.findOneAndUpdate(filter, updateRequest, {
      new: true,
    });
    if (user === null) {
      throw new QuickFixError({ clientMsg: "Unable to find user" });
    }
    return user;
  } catch (err) {
    throw err;
  }
};

export const getCourses = async (id: string) => {
  try {
    console.log("ID is", id);
    const userObj = await User.findOne({ _id: id });
    if (!userObj) {
      throw new QuickFixError({ clientMsg: "Unable to find user" });
    }
    const courses = userObj.currentCourses;
    return courses;
  } catch (err) {
    throw err;
  }
};
