const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    console.log("Can't get contacts list: ", err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (err) {
    console.log("Can't get a contact: ", err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    return filteredContacts;
  } catch (err) {
    console.log("Can't delete a contact: ", err);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const newContact = { id: shortid.generate(), name, email, phone };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return newContact;
  } catch (err) {
    console.log("Can't add a contact: ", err);
  }
}

async function updateContact(contactId, contactData) {
  try {
    const contacts = await listContacts();
    const updatedData = contacts.map((contact) =>
      contact.id === contactId ? { ...contact, ...contactData } : contact
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedData));
    return updatedData.find((contact) => contact.id === contactId);
  } catch (err) {
    console.log("Can't update a contact: ", err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
