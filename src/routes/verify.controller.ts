import { Router } from "express";

import { PATHS } from "../constants";
import { prisma, PrismaClientKnownRequestError } from "../functions/prisma";
import { sendStickerEmail } from "../functions/mailer";

export const routes = Router();

/*
 * POST /verify?token=...
 */
routes.get("/", async (req, res) => {
  const { token } = req.query;

  try {
    const claim = await prisma.claim.update({
      where: { verificationToken: token as string },
      data: { verified: true },
    });

    if (!claim) {
      return res.status(405).json({ error: "Token doesn't exist!" });
    }

    const reward = await prisma.reward.findFirst({
      where: { claimed: false },
    });

    if (!reward) {
      return res.redirect(PATHS.HOME_NO_REWARDS);
    }

    await prisma.reward.update({
      where: { id: reward.id },
      data: { claimId: claim.id, claimed: true },
    });

    sendStickerEmail(claim.email, reward.token as string);
    res.redirect(PATHS.VERIFY_SUCCESS);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(405).json({ error: "Email already received reward" });
      }
    }

    res.status(405).json({ error: "Token doesn't exist!" });
  }
});

export default routes;
