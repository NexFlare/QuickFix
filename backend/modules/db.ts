import mongoose from "mongoose";
import config from "../config/index";

export const connect = (
  url: string = `${config.mongoURI}/${config.db}`,
  opts = {}
) => {
  return mongoose.connect(url);
};
