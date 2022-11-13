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

routes.get("/no-rewards", (req, res) => {
  res.render("home-no-rewards");
});

export default routes;
