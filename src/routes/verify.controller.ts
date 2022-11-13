import { Router } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { sendStickerEmail } from "../functions/mailer";

export const routes = Router();
const prisma = new PrismaClient();

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

    res.redirect("/verify/success");
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

routes.get("/success", async (req, res) => {
  res.render("verify-success", { title: "Verificado ☕️" });
});

export default routes;
