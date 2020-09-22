const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  return await fs
    .readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log("Can't get contacts list: ", err));
}

async function getContactById(contactId) {
  return await fs
    .readFile(contactsPath)
    .then((data) =>
      JSON.parse(data).find((contact) => contact.id === contactId)
    )
    .catch((err) => console.log("Can't get a contact: ", err));
}

async function removeContact(contactId) {
  let filteredContacts = [];
  await fs
    .readFile(contactsPath)
    .then((data) => {
      filteredContacts = JSON.parse(data).filter(
        (contact) => contact.id !== contactId
      );
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    })
    .catch((err) => console.log("Can't delete a contact: ", err));

  return filteredContacts;
}

async function addContact({ name, email, phone }) {
  const newContact = { id: shortid.generate(), name, email, phone };
  await fs
    .readFile(contactsPath)
    .then((data) => {
      const updatedContacts = [...JSON.parse(data), newContact];
      fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    })
    .catch((err) => console.log("Can't add a contact: ", err));

  return newContact;
}

async function updateContact(contactId, contactData) {
  const contacts = await listContacts();
  const updatedData = contacts.map((contact) =>
    contact.id === contactId ? { ...contact, ...contactData } : contact
  );

  await fs.writeFile(contactsPath, JSON.stringify(updatedData));

  return updatedData.find((contact) => contact.id === contactId);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
