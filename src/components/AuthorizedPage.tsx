import { ReactNode, useState } from "react";
import Header from "./Header";
import Contacts from "./Contacts";
import AddContact from "./AddContact";
import PersonalInfo from "./PersonalInfo";
import LanguageSelect from "./LanguageSelect";
import { useTranslation } from "react-i18next";

interface Props {
  setAuthorized: (e: boolean) => void;
}

const FunctionalElements = new Map<string, ReactNode>([
  ["contacts", <Contacts />],
  ["addContact", <AddContact />],
  ["personalInfo", <PersonalInfo />],
]);

const AuthorizedPage = ({ setAuthorized }: Props) => {
  const [t, i18n] = useTranslation();
  function logout() {
    console.log("logout");
    setAuthorized(false);
  }
  const [currPage, setPage] = useState("contacts");
  return (
    <div>
      <Header>
        <button
          className="btn btn-danger"
          onClick={() => {
            setPage("contacts");
          }}
        >
          {t("contactsButton")}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            setPage("addContact");
          }}
        >
          {t("addContactButton")}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            setPage("personalInfo");
          }}
        >
          {t("personalInfoButton")}
        </button>
        <button className="btn btn-danger" onClick={logout}>
          {t("logoutButton")}
        </button>
        <LanguageSelect
          onLanguageChange={(language) => {
            i18n.changeLanguage(language);
          }}
        ></LanguageSelect>
      </Header>
      {FunctionalElements.get(currPage)}
    </div>
  );
};

export default AuthorizedPage;
