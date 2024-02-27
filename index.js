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
      try {
        const allContacts = await contactsServises.listContacts();
        return allContacts;
      } catch (error) {
        throw new error(error.message);
      }

    case "get":
      try {
        const contact = await contactsServises.getContactById(id);
        return contact;
      } catch (error) {
        throw new error(error.message);
      }
    case "add":
      try {
        const newContact = await contactsServises.addContact(
          name,
          email,
          phone
        );
        return newContact;
      } catch (error) {
        throw new error(error.message);
      }
    case "remove":
      try {
        const delContact = await contactsServises.removeContact(id);
        return delContact;
      } catch (error) {
        throw new error(error.message);
      }
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
