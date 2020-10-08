const { Router } = require("express");

const {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} = require("./contacts.controller");

const {
  checkAuthTokenMiddleware,
} = require("../../middlewares/auth.middleware");

const contactsRouter = Router();

contactsRouter.get("/", checkAuthTokenMiddleware, getContactsController);

contactsRouter.get(
  "/:contactId",
  checkAuthTokenMiddleware,
  getContactByIdController
);

contactsRouter.post("/", checkAuthTokenMiddleware, createContactController);

contactsRouter.patch("/", checkAuthTokenMiddleware, updateContactController);

contactsRouter.delete(
  "/:contactId",
  checkAuthTokenMiddleware,
  deleteContactController
);

module.exports = contactsRouter;
