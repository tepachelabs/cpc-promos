import { Router } from "express";

export const routes = Router();

routes.get("/home", (req, res) => {
  res.render("home-view");
});

routes.get("/success", (req, res) => {
  res.render("register-success");
});

routes.get("/verified", (req, res) => {
  res.render("verify-success");
});

export default routes;
