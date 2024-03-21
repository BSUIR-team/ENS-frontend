import { useTranslation } from "react-i18next";

function getContacts(): { phone: string; email: string; name: string }[] {
  return [
    {
      phone: "+375291488228",
      email: "johndoe@gmail.com",
      name: "John",
    },
    {
      phone: "+375291488337",
      email: "aboba@gmail.com",
      name: "Aboba",
    },
  ].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

const Contacts = () => {
  const [t] = useTranslation();
  return (
    <ul>
      {getContacts().map((contact) => (
        <li>
          <h2>{contact.name}</h2>
          <p>
            {t("phoneNumber")}: {contact.phone}
          </p>
          <p>
            {t("email")}: {contact.email}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
