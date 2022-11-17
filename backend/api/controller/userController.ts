import { Request, Response } from "express";
import { createJwtToken, hashPassword } from "../../modules/auth";
import { catchError } from "../../modules/catchError";
import { transformUserObj } from "../../modules/transform/tranformUser";
import {
  IRequestAddCourse,
  IRequestUser,
  IRequestUserSignIn,
} from "../../types/user";
import * as userService from "../services/user";

const authenticateUser = async (
  req: Request<{}, {}, IRequestUserSignIn>,
  res: Response
) => {
  const body = req.body;
  try {
    const user = await userService.authenticateUser(body);
    const jwtToken = createJwtToken(user);
    const transformedResponse = transformUserObj(user, jwtToken);
    res.json(transformedResponse);
    res.status(200);
  } catch (err) {
    throw err;
  }
};

const createNewUser = async (
  req: Request<{}, {}, IRequestUser>,
  res: Response
) => {
  try {
    const user: IRequestUser = req.body;
    user.password = await hashPassword(user.password);
    const savedUser = await userService.createNewUser(user);
    const token = await createJwtToken(savedUser);
    const response = transformUserObj(savedUser, token);
    res.json(response);
    res.status(200);
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addCourse = async (
  req: Request<{}, {}, IRequestAddCourse>,
  res: Response
) => {
  try {
    console.log("Request is", req);
    const request = req.body;
    const updatedUser = await userService.addCourse(request);
    res.json(updatedUser);
    res.status(200);
  } catch (err) {
    console.log("Error is", err);
    throw err;
  }
};

const getCourses = async (req: Request<{ userId: string }>, res: Response) => {
  try {
    const userId = req.params.userId;
    const courses = await userService.getCourses(userId);
    res.json({ courses });
    res.status(200);
  } catch (err) {
    throw err;
  }
};

export default {
  createNewUser: catchError(createNewUser),
  authenticateUser: catchError(authenticateUser),
  addCourse: catchError(addCourse),
  getCourses: catchError(getCourses),
};
