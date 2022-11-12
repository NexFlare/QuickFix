import { Request, Response } from "express";
import { createJwtToken, hashPassword } from "../../modules/auth";
import { catchError } from "../../modules/catchError";
import { IRequestUser, IRequestUserSignIn } from "../../types/user";
import * as userService from "../services/user";

const authenticateUser = async (
  req: Request<{}, {}, IRequestUserSignIn>,
  res: Response
) => {
  const body = req.body;
  try {
    const user = await userService.authenticateUser(body);
    const jwtToken = createJwtToken(user);
    res.json({
      token: jwtToken,
    });
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
    res.json({
      token,
    });
    res.status(200);
    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  createNewUser: catchError(createNewUser),
  authenticateUser: catchError(authenticateUser),
};
