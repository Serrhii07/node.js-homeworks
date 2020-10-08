const { Router } = require("express");

const {
  registerController,
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

module.exports = authRouter;
