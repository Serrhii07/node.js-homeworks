const { Router } = require("express");

const { getCurrentUserController } = require("./users.controller");

const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);

module.exports = usersRouter;
