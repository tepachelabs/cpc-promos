import { Router } from "express";

import { PATHS } from "../constants";
import { prisma, PrismaClientKnownRequestError } from "../functions/prisma";
import { sendRewardEmail } from "../functions/mailer";
import { generateCode } from "../functions/generate-code";

export const routes = Router();

const DEFAULT_REWARD = "Café del día gratis";

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

    let reward = await prisma.reward.findFirst({
      where: { claimed: false },
    });

    if (reward) {
      reward = await prisma.reward.update({
        where: { id: reward.id },
        data: { claimId: claim.id, claimed: true },
      });
    } else {
      reward = await prisma.reward.create({
        data: {
          name: DEFAULT_REWARD,
          token: generateCode(),
          claimId: claim.id,
          claimed: true,
        },
      });
    }

    sendRewardEmail(claim.email, reward.token as string);
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
