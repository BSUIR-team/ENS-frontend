import { FormEvent, useState } from "react";
import Input from "./Input";
import { useTranslation } from "react-i18next";
import { AlertType, useAlert } from "../hooks/useAlert";
import AddContactsFromFile from "./AddContactsFromFile";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Contact } from "../types/Contact";

const AddContact = () => {
  const showAlert = useAlert();
  const [t] = useTranslation();
  const { update } = useAction();
  const user = useTypedSelector((state) => state.user.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function addContact(e: FormEvent) {
    e.preventDefault();
    if (name && (phone || email)) {
      update({
        ...user,
        contacts: [...user.contacts, new Contact(0, name, email, phone)],
      });
      showAlert("OK");
    } else {
      showAlert("Not OK", AlertType.FAIL);
    }
  }

  return (
    <>
      <form className="add-contact-form" method="POST" onSubmit={addContact}>
        <h2>{t("newContact")}</h2>
        <Input
          type="text"
          label={t("contactName")}
          name="phone"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <Input
          type="email"
          label={t("email")}
          name="email"
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <Input
          type="tel"
          label={t("phoneNumber")}
          name="phone"
          placeholder="+375291488228"
          value={phone}
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
        />
        <button type="submit">{t("addContactButton")}</button>
      </form>
      <AddContactsFromFile />
    </>
  );
};

export default AddContact;
