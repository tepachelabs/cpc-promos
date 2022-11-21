import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const FROM_EMAIL = "Promos de Culto <promos@cultoperrocafe.com>";
const STORE_FROM_EMAIL = "Tienda Culto Perro Café <tienda@cultoperrocafe.com>";
const VERIFICATION_EMAIL_ID = "d-8074d1b4c6b7412982559b3689bda9f1";
const REWARD_EMAIL_ID = "d-be2967930db44559beb538a14f0f30b3";
const STORE_SALE_EMAIL_ID = "d-94c06887d27a42ef8da96bfd9543a556";

export const sendVerificationEmail = (email: string, link: string) => {
  sgMail
    .send({
      templateId: VERIFICATION_EMAIL_ID,
      from: FROM_EMAIL,
      to: email,
      dynamicTemplateData: { link },
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const sendRewardEmail = (email: string, token: string) => {
  sgMail
    .send({
      templateId: REWARD_EMAIL_ID,
      from: FROM_EMAIL,
      to: email,
      dynamicTemplateData: { token },
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const sendSaleEmail = (email: string, token: string) => {
  sgMail
    .send({
      templateId: STORE_SALE_EMAIL_ID,
      from: STORE_FROM_EMAIL,
      to: email,
      dynamicTemplateData: { token },
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
