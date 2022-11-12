import { Router } from "express";
import { validateRequest } from "../../modules/auth";
import userController from "../controller/userController";
const userRouter = Router();

userRouter.route("/signup").post(userController.createNewUser);
userRouter.route("/signin").post(userController.authenticateUser);

export default userRouter;
