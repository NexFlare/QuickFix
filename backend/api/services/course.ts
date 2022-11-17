import { ICourseSchema } from "../../types/Course";
import Course from "../model/Course";
import User from "../model/User";
export const createNewCourse = async (req: ICourseSchema) => {
  const course = new Course(req);
  const savedCourse = await course.save();
  return savedCourse;
};

export const getAllCourses = async () => {
  const courses = await Course.find().populate("professor");
  return courses;
};
