const ContactDB = require("./contacts.model");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await ContactDB.getContacts(req.query);
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactDB.getContactById(contactId);
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

const createContactController = async (req, res, next) => {
  try {
    const newContact = await ContactDB.createContact(req.body);
    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const updatedContact = await ContactDB.updateContact(id, data);
    res.status(200).json(updatedContact);
  } catch (e) {
    next(e);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    await ContactDB.deleteContact(contactId);
    res.status(200).json({ message: "contact deleted" }).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
};
