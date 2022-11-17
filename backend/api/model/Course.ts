import mongoose from "mongoose";
import { ICourseSchema } from "../../types/Course";
import User from "./User";

const CourseSchema = new mongoose.Schema<ICourseSchema>({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  professor: { type: String, ref: User, required: true },
  description: {
    type: String,
    required: true,
  },
  // currentCourses: [{ type: mongoose.Types.ObjectId, ref: "Courses" }],
  //   assignments: [{ type: mongoose.Types.ObjectId, ref: "Assignment" }],
  //   currentAssignment: [
  //     {
  //       type: mongoose.Types.ObjectId,
  //       ref: "Assignment",
  //     },
  //   ],
});

// UserSchema.methods.comparePassword = function (password) {
//   return bcrypt.compareSync(password, this.password);
// };

const courseModel = mongoose.model("Course", CourseSchema);

export default courseModel;
