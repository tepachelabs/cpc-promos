import { Router } from "express";
import uniqid from "uniqid";

import { PATHS } from "../constants";
import { prisma } from "../functions/prisma";
import { sendVerificationEmail } from "../functions/mailer";

export const routes = Router();

/*
 * POST /register
 */
routes.post("/", async (req, res) => {
  const host = req.get("host");
  const { email } = req.body;

  try {
    const claim = await prisma.claim.create({
      data: {
        verificationToken: uniqid("verify-"),
        email,
      },
    });

    const link = `https://${host}/verify?token=${claim.verificationToken}`;
    sendVerificationEmail(claim.email, link);

    res.redirect(PATHS.REGISTER_SUCCESS);
  } catch (error) {
    res.redirect(PATHS.REGISTER_ERROR);
  }
});

export default routes;
