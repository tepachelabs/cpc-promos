import { Router } from "express";
import homeController from "./home.controller";
import testController from "./test.controller";
import registerController from "./register.controller";
import verifyController from "./verify.controller";

export const router = Router();

router.use("/", homeController);
router.use("/test", testController);
router.use("/register", registerController);
router.use("/verify", verifyController);
