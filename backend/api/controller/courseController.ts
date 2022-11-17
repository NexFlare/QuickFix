import { Request, Response } from "express";
import { catchError } from "../../modules/catchError";
import { ICourseSchema } from "../../types/Course";
import { createNewCourse, getAllCourses } from "../services/course";

const post = async (req: Request<{}, {}, ICourseSchema>, res: Response) => {
  try {
    const body = req.body;
    const response = await createNewCourse(body);
    res.json({ response });
    res.sendStatus(200);
    return;
  } catch (err) {
    throw err;
  }
};

const get = async (req: Request<{}, {}, {}>, res: Response) => {
  try {
    const response = await getAllCourses();
    return res.status(200).json(response);
  } catch (err) {
    console.log("Error is", err);
    throw err;
  }
};

export default {
  post: catchError(post),
  get: catchError(get),
};
