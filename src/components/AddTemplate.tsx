import { useTranslation } from "react-i18next";
import Input from "./Input";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Template } from "../types/Template";
import { FormEvent, useState } from "react";
import {
  validateTemplateContent,
  validateTemplateName,
} from "../utils/validation";
import { AlertType, useAlert } from "../hooks/useAlert";

interface Props {
  template?: Template;
  onClose: () => void;
  onSubmit: (template: Template) => void;
}

const AddTemplate = ({ template, onClose, onSubmit }: Props) => {
  const [t] = useTranslation();
  const showAlert = useAlert();
  const user = useTypedSelector((state) => state.user.user);
  const allContacts = user.contacts;

  if (template == undefined) template = new Template();

  const [name, setName] = useState(template.title);
  const [message, setMessage] = useState(template.content);
  const [contacts, setContacts] = useState(template.recipientIds);
  function addUpdateTemplate(e: FormEvent) {
    e.preventDefault();
    if (validateTemplateName(name) && validateTemplateContent(message)) {
      onSubmit(new Template(template?.id, name, message, contacts));
      onClose();
    } else {
      showAlert({ type: AlertType.FAIL, message: t("incorrectFields") });
    }
  }

  return (
    <div className="loading-container">
      <form
        method="PUT"
        className="template-editor"
        onSubmit={(e) => addUpdateTemplate(e)}
      >
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2></h2>
        <Input
          type="text"
          label={t("templateName")}
          name="phone"
          placeholder="Template"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <label>
          {t("messageSample")}
          <textarea
            className="form-control"
            name="messageSample"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
          ></textarea>
        </label>
        <button type="submit" disabled={contacts.length === 0}>
          {t("createTemplate")}
        </button>
        <h3>{t("chooseContacts")}</h3>
        {allContacts.map((contact) => (
          <label key={contact.id}>
            <input
              id={String(contact.id)}
              type="checkbox"
              name={"contact" + String(contact.id)}
              checked={contacts.filter((e) => e.id == contact.id).length > 0}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  setContacts([...contacts, contact]);
                } else {
                  setContacts(contacts.filter((e) => e.id != contact.id));
                }
              }}
            />
            {contact.name} {contact.phoneNumber} {contact.email}
          </label>
        ))}
      </form>
    </div>
  );
};

export default AddTemplate;
