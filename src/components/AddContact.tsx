import { FormEvent } from "react";
import Input from "./Input";
import { useTranslation } from "react-i18next";

function addContact(e: FormEvent, params: Map<string, string>) {
  console.log(JSON.stringify(Object.fromEntries(params)));
  e.preventDefault();
}

const AddContact = () => {
  var params = new Map<string, string>();
  const [t] = useTranslation();
  return (
    <form
      method="POST"
      onSubmit={(e) => {
        addContact(e, params);
      }}
    >
      <h2>{t("newContact")}</h2>
      <Input
        type="text"
        label={t("contactName")}
        name="phone"
        placeholder="+375291488228"
        onChange={(e) => {
          params.set(e.currentTarget.name, e.currentTarget.value);
        }}
      />
      <Input
        type="email"
        label={t("email")}
        name="email"
        placeholder="johndoe@gmail.com"
        onChange={(e) => {
          params.set(e.currentTarget.name, e.currentTarget.value);
        }}
      />
      <Input
        type="tel"
        label={t("phoneNumber")}
        name="phone"
        placeholder="+375291488228"
        onChange={(e) => {
          params.set(e.currentTarget.name, e.currentTarget.value);
        }}
      />
      <Input
        type="email"
        label={t("email")}
        name="emailInput"
        placeholder="johndoe@gmail.com"
        onChange={(e) => {
          params.set(e.currentTarget.name, e.currentTarget.value);
        }}
      />
      <button className="btn btn-danger" type="submit">
        {t("addContactButton")}
      </button>
    </form>
  );
};

export default AddContact;
