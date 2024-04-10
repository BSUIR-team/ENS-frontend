import { useTranslation } from "react-i18next";
import Input from "./Input";
import { FormEvent, useState } from "react";

const AddContactsFromFile = () => {
  const [t] = useTranslation();

  const [file, setFile] = useState<File | null>(null);

  function addContacts(e: FormEvent) {
    e.preventDefault();
    if (file != null) {
      console.log(file);
    }
  }

  return (
    <form
      method="post"
      className="add-contact-form"
      encType="multipart/form-data"
      onSubmit={addContacts}
    >
      <Input
        type="file"
        name="contacts"
        label={t("contactsFromFile")}
        accept=".xlsx,.ls"
        onChange={(e) => {
          let a = e.currentTarget.files;
          if (a != null) setFile(a[0]);
        }}
      />
      <button type="submit">{t("addContactsButton")}</button>
    </form>
  );
};

export default AddContactsFromFile;
