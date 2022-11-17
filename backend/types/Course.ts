import mongoose from "mongoose";

export interface ICourseSchema {
  code: string;
  assignments?: Array<mongoose.Types.ObjectId>;
  description: string;
  currentAssignment?: mongoose.Types.ObjectId;
  professor: string;
}
