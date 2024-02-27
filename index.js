import { program } from "commander";
import * as contactsServises from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsServises.listContacts();
      return allContacts;
    case "get":
      const contact = await contactsServises.getContactById(id);
      return contact;
    case "add":
      const newContact = await contactsServises.addContact(name, email, phone);
      return newContact;
    case "remove":
      const delContact = await contactsServises.removeContact(id);
      return delContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
