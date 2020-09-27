const { Router } = require("express");
const Joi = require("joi");

const Contacts = require("../../contacts");

const contactsRouter = Router();

contactsRouter.get("/", async (req, res) => {
  const contacts = await Contacts.listContacts();
  res.json(contacts);
});

contactsRouter.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contactToFind = await Contacts.getContactById(Number(contactId));
  if (!contactToFind) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(contactToFind);
});

contactsRouter.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing required fields" });
    return;
  }
  const contact = await Contacts.addContact(req.body);
  res.status(201).json(contact);
});

contactsRouter.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contactToDelete = await Contacts.getContactById(Number(contactId));
  if (!contactToDelete) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  await Contacts.removeContact(Number(contactId));
  res.status(200).json({ message: "contact deleted" });
});

contactsRouter.patch("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing required fields" });
    return;
  }

  const contact = await Contacts.updateContact(Number(contactId), req.body);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(contact);
});

module.exports = contactsRouter;
