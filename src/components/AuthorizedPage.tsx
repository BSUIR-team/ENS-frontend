import { ReactNode, useState } from "react";
import Header from "./Header";
import Contacts from "./Contacts";
import AddContact from "./AddContact";
import PersonalInfo from "./PersonalInfo";
import LanguageSelect from "./LanguageSelect";
import { useTranslation } from "react-i18next";
import { AlertType, useAlert } from "../hooks/useAlert";
import { useAction } from "../hooks/useAction";
import ChooseTemplate from "./ChooseTemplate";

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
  const [isNotifying, setNotifying] = useState(false);
  return (
    <>
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
        <button
          onClick={() => {
            showAlert({
              message: t("confirmLogout"),
              type: AlertType.CONFIRM,
              continueAction: logout,
            });
          }}
        >
          {t("logoutButton")}
        </button>
        <LanguageSelect
          onLanguageChange={(language) => {
            i18n.changeLanguage(language);
          }}
        ></LanguageSelect>
      </Header>
      <main className="container primary-block">
        <button
          className="notify-all"
          onClick={() => {
            setNotifying(true);
          }}
        >
          {t("notifyAll")}
        </button>
        {FunctionalElements.get(currPage)}
      </main>
      {isNotifying && (
        <ChooseTemplate
          onClose={() => {
            setNotifying(false);
          }}
        />
      )}
    </>
  );
};

export default AuthorizedPage;
