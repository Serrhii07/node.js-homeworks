const { Router } = require("express");

const {
  getCurrentUserController,
  uploadAvatarController,
} = require("./users.controller");

const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");

const {
  imageUploaderMiddleware,
} = require("../../middlewares/fileUploader.middleware");

const usersRouter = Router();

usersRouter.get("/current", checkAuthTokenMiddleware, getCurrentUserController);

usersRouter.patch(
  "/avatars",
  checkAuthTokenMiddleware,
  imageUploaderMiddleware,
  uploadAvatarController
);

module.exports = usersRouter;
