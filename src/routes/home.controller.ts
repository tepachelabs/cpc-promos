import { Router } from "express";
import uniqid from "uniqid";

export const routes = Router();

routes.get("/", (req, res) => {
  const email = uniqid.time("test-", "@tonymtz.com")
  res.render('home-view', { title: "Hola 👋", email });
});

export default routes;
