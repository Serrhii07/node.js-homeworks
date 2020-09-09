const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log("Can't get contacts list: ", err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) =>
      console.log(JSON.parse(data).find((contact) => contact.id === contactId))
    )
    .catch((err) => console.log("Can't get a contact: ", err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const filteredContacts = JSON.parse(data).filter(
        (contact) => contact.id !== contactId
      );
      console.table(filteredContacts);
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    })
    .catch((err) => console.log("Can't delete a contact: ", err));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => {
      const newContact = { id: shortid.generate(), name, email, phone };
      const updatedContacts = [...JSON.parse(data), newContact];
      console.table(updatedContacts);
      fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    })
    .catch((err) => console.log("Can't add a contact: ", err));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
