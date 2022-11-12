import userRouter from "./userRoute";

const routes = (app) => {
  app.get("/ping", (req, res) => res.send("poing"));
  app.use("/user", userRouter);
};

export default routes;
