import { useTranslation } from "react-i18next";

function getContacts(): {
  id: string;
  phone: string;
  email: string;
  name: string;
}[] {
  return [
    {
      id: "1",
      phone: "+375291488228",
      email: "johndoe@gmail.com",
      name: "John",
    },
    {
      id: "2",
      phone: "+375291488337",
      email: "aboba@gmail.com",
      name: "Aboba",
    },
    {
      id: "3",
      phone: "+375291488337",
      email: "aboba@gmail.com",
      name: "Aboba",
    },
    {
      id: "4",
      phone: "+375291488337",
      email: "aboba@gmail.com",
      name: "Aboba",
    },
  ].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

function removeContact(contactId: string) {
  console.log(`contact with ID ${contactId} removed!`);
}

const Contacts = () => {
  const [t] = useTranslation();
  return (
    <ul className="contacts-list">
      <h2>{t("contactsButton")}</h2>
      {getContacts().map((contact) => (
        <li>
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
