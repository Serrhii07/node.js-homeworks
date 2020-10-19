const { Router } = require("express");

const {
  registerController,
  verifyController,
  loginController,
  logoutController,
} = require("./auth.controller");

const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");

const { validatorMiddleware } = require("./auth.validator");

const authRouter = Router();

authRouter.post("/register", validatorMiddleware, registerController);

authRouter.post("/login", validatorMiddleware, loginController);

authRouter.post("/logout", checkAuthTokenMiddleware, logoutController);

authRouter.get("/verify/:token", verifyController);

module.exports = authRouter;
