import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import router from "./routes/index";
import { connect } from "../modules/db";
//middlewear to parse body of request
const app = express();
app.use(express.json());
//middlewear to encode URL
app.use(express.urlencoded());
//middlewear for cross origin resource sharing
app.use(cors());
router(app);
connect().then(() => console.log("Connect to db"));

export default app;
