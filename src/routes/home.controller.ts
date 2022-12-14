import { Router } from "express";
import uniqid from "uniqid";

import { PATHS } from "../constants";

export const routes = Router();

/*
 * GET PATHS.HOME
 */
routes.get(PATHS.HOME, (req, res) => {
  res.render("home-view", { title: "Hola 👋" });
});

/*
 * GET PATHS.HOME_NO_REWARDS
 */
routes.get(PATHS.HOME_NO_REWARDS, (req, res) => {
  res.render("home-no-rewards");
});

/*
 * GET PATHS.REGISTER_SUCCESS
 */
routes.get(PATHS.REGISTER_SUCCESS, (req, res) => {
  res.render("register-success", { title: "Listo ✅" });
});

/*
 * GET PATHS.REGISTER_ERROR
 */
routes.get(PATHS.REGISTER_ERROR, (req, res) => {
  res.render("register-error", { title: "Listo ✅" });
});

/*
 * GET PATHS.VERIFY_SUCCESS
 */
routes.get(PATHS.VERIFY_SUCCESS, async (req, res) => {
  res.render("verify-success", { title: "Verificado ☕️" });
});

/*
 * GET PATHS.VERIFY_BAD_TOKEN
 */
routes.get(PATHS.VERIFY_BAD_TOKEN, async (req, res) => {
  res.render("verify-error", { title: "❌" });
});

export default routes;
