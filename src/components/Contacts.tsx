import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useAction } from "../hooks/useAction";
import { AlertType, useAlert } from "../hooks/useAlert";

const Contacts = () => {
  const [t] = useTranslation();
  const showAlert = useAlert();
  const user = useTypedSelector((state) => state.user.user);
  const { deleteContact } = useAction();
  function removeContact(contactId: number) {
    deleteContact(user, contactId);
    showAlert({ type: AlertType.SUCCESS, message: t("contactRemoved") });
  }

  return (
    <ul className="contacts-list">
      <h2>{t("contactsButton")}</h2>
      {user.contacts.length == 0 && <h3>{t("noContacts")}</h3>}
      {user.contacts.map((contact) => (
        <li key={contact.id}>
          <h3>{contact.name}</h3>
          <p>
            {t("phoneNumber")}: {contact.phoneNumber}
          </p>
          <p>
            {t("email")}: {contact.email}
          </p>
          <button
            onClick={() => {
              removeContact(contact.id);
            }}
          >
            {t("removeContactButton")}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
