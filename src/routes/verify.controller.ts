import { Router } from "express";
import { Prisma } from "@prisma/client";

import { PATHS } from "../constants";
import { prisma } from "../functions/prisma";
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

    const sticker = await prisma.sticker.findFirst({
      where: { claimed: false },
    });

    if (!sticker) {
      return res.status(405).json({ error: "No more stickers!" });
    }

    await prisma.sticker.update({
      where: { id: sticker.id },
      data: { claimId: claim.id, claimed: true },
    });

    sendStickerEmail(claim.email, sticker.token);
    res.redirect(PATHS.VERIFY_SUCCESS);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res
          .status(405)
          .json({ error: "Email already received sticker" });
      }
    }

    res.status(405).json({ error: "Token doesn't exist!" });
  }
});

export default routes;
