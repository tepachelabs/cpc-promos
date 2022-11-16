import { Router } from "express";
import { prisma } from "../functions/prisma";
import { sendRewardEmail } from "../functions/mailer";

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

  res.render("dashboard", { code, promo });
});

/*
 * GET /dashboard/kapow
 */
const KAPOW_KEY = new Date().getTime().toString();
console.log("KAPOW_KEY: ", KAPOW_KEY);

routes.get("/kapow", async (req, res) => {
  const { key } = req.query;

  if (key !== KAPOW_KEY) {
    return res.status(401).send("Unauthorized");
  }

  const unverifiedClaims = await prisma.claim.findMany({
    where: {
      verified: false,
    },
  });

  for (const claim of unverifiedClaims) {
    const reward = await prisma.reward.findFirst({
      where: { claimed: false },
    });

    if (!reward) return;

    await prisma.reward.update({
      where: { id: reward.id },
      data: { claimId: claim.id, claimed: true },
    });

    sendRewardEmail(claim.email, reward.token as string);
  }

  const emails = unverifiedClaims.map((claim) => claim.email);

  res.render("dashboard-kapow", { emails });
});

export default routes;
