import { Router } from "express";
import courseController from "../controller/courseController";
const courseRouter = Router();

courseRouter.route("/").post(courseController.post).get(courseController.get);

export default courseRouter;
