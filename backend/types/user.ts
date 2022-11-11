import mongoose from "mongoose";

export interface IUser {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  currentCourses?: Array<string>;
  userType: TUserType;
}

export type TUserType = "PROF" | "STUDENT" | "STUDENT_TA" | "ALUMINI";
