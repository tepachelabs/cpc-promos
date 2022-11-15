import { Router } from "express";
import { prisma } from "../functions/prisma";

export const routes = Router();

/*
 * GET PATHS.HOME
 */
routes.get("/", async (req, res) => {
  const { code } = req.query;
  let promo;

  if (code) {
    promo = await prisma.reward.findUnique({
      where: {
        token: code as string,
      },
    });
  }

  res.render("dashboard", { promo });
});

export default routes;
