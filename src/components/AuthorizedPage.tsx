import { ReactNode, useState } from "react";
import Header from "./Header";
import Contacts from "./Contacts";
import AddContact from "./AddContact";
import PersonalInfo from "./PersonalInfo";
import LanguageSelect from "./LanguageSelect";
import { useTranslation } from "react-i18next";
import { useAlert } from "../hooks/useAlert";
import { useAction } from "../hooks/useAction";

function notifyAll(showAlert: (message: string) => void) {
  showAlert("Notifyyyyyy");
  //console.log("Notifyyyyyyy");
}

const FunctionalElements = new Map<string, ReactNode>([
  ["contacts", <Contacts />],
  ["addContact", <AddContact />],
  ["personalInfo", <PersonalInfo />],
]);

const AuthorizedPage = () => {
  const [t, i18n] = useTranslation();
  const showAlert = useAlert();
  const { logOut } = useAction();
  function logout() {
    console.log("logout");
    logOut();
  }
  const [currPage, setPage] = useState("contacts");
  return (
    <div>
      <Header>
        {Array.from(FunctionalElements.keys()).map((key) => (
          <button
            key={key}
            className={key === currPage ? "active-section-button" : ""}
            onClick={() => {
              setPage(key);
            }}
          >
            {t(key + "Button")}
          </button>
        ))}
        <button onClick={logout}>{t("logoutButton")}</button>
        <LanguageSelect
          onLanguageChange={(language) => {
            i18n.changeLanguage(language);
          }}
        ></LanguageSelect>
      </Header>
      <div className="container primary-block">
        <button
          className="notify-all"
          onClick={() => {
            notifyAll(showAlert);
          }}
        >
          {t("notifyAll")}
        </button>
        {FunctionalElements.get(currPage)}
      </div>
    </div>
  );
};

export default AuthorizedPage;
