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
        console.table(allContacts);
        break;
      } catch (error) {
        throw new error(error.message);
      }

    case "get":
      try {
        const contact = await contactsServises.getContactById(id);
        console.log(contact);
        break;
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
        console.log(newContact);
        break;
      } catch (error) {
        throw new error(error.message);
      }
    case "remove":
      try {
        const delContact = await contactsServises.removeContact(id);
        console.log(delContact);
        break;
      } catch (error) {
        throw new error(error.message);
      }
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
