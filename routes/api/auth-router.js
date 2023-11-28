import express from "express";

import {
  singUpSchema,
  signInSchema,
  updateSubscriptionSchema,
} from "../../models/User.js";

import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(singUpSchema),
  authController.signUp
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(signInSchema),
  authController.signIn
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logOut);

authRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  authController.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
