import { Router } from "express";
import uniqid from "uniqid";
import { PrismaClient } from "@prisma/client";
import { sendVerificationEmail } from "../functions/mailer";

export const routes = Router();
const prisma = new PrismaClient();

routes.post("/", async (req, res) => {
  const { email } = req.body;
  const host = req.get("host");

  try {
    const claim = await prisma.claim.create({
      data: {
        verificationToken: uniqid("verify-"),
        email,
      },
    });

    const link = `//${host}/verify?token=${claim.verificationToken}`;
    sendVerificationEmail(claim.email, link);

    res.redirect("/register/success");
  } catch (error) {
    res.status(405).json({ error: "Email already exists" });
  }
});

routes.get("/success", (req, res) => {
  res.render("register-success", { title: "Listo ✅" });
});

routes.get("/done", (req, res) => {
  const { email, token } = req.query;
  sendVerificationEmail(email as string, token as string);
  res.render("register-done", { token });
});

export default routes;
