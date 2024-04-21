import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useAction } from "../hooks/useAction";
import { AlertType, useAlert } from "../hooks/useAlert";

const Contacts = () => {
  const [t] = useTranslation();
  const showAlert = useAlert();
  const user = useTypedSelector((state) => state.user.user);
  const { update } = useAction();

  function removeContact(contactId: number) {
    update({
      ...user,
      contacts: user.contacts.filter((e) => e.id != contactId),
    });
    showAlert({ type: AlertType.SUCCESS, message: "OK" });
  }

  return (
    <ul className="contacts-list">
      <h2>{t("contactsButton")}</h2>
      {user.contacts.map((contact) => (
        <li key={contact.id}>
          <h3>{contact.name}</h3>
          <p>
            {t("phoneNumber")}: {contact.phone}
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
