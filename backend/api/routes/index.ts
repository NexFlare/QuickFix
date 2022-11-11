const routes = (app) => {
  app.get("/ping", (req, res) => res.send("poing"));
};

export default routes;
