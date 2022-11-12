export interface IBaseUser {
  id: string;
  username: string;
}

export interface IUser extends IBaseUser {
  email: string;
  firstName: string;
  lastName: string;
  currentCourses?: Array<string>;
  userType: TUserType;
}

export interface IUserSchema extends IUser {
  password: string;
}

export interface IRequestUser {
  email: string;
  firstName: string;
  lastName: string;
  userType: TUserType;
  currentCourses?: Array<string>;
  password: string;
}

export interface IRequestUserSignIn {
  password: string;
  username: string;
}

export type TUserType = "PROF" | "STUDENT" | "STUDENT_TA" | "ALUMINI";
