import { useState } from "react";
import Registration from "./Registration";
import Authorization from "./Authorization";
import LanguageSelect from "./LanguageSelect";
import { useTranslation } from "react-i18next";
import "../i18n";

const UnauthorizedPage = () => {
  const [isRegistration, setRegistration] = useState(false);
  const [t, i18n] = useTranslation();

  return (
    <div className="start-block">
      {isRegistration ? (
        <Registration setRegistered={setRegistration} />
      ) : (
        <Authorization />
      )}
      <p style={{ textAlign: "center", margin: "10px 0" }}>
        {isRegistration ? t("accountAlreadyExists") : t("noAccountYet")}
        <a
          href="#"
          onClick={() => {
            setRegistration(!isRegistration);
          }}
        >
          {isRegistration ? t("startAuthorization") : t("startRegistration")}
        </a>
      </p>
      <LanguageSelect
        onLanguageChange={(language) => {
          i18n.changeLanguage(language);
        }}
      ></LanguageSelect>
    </div>
  );
};

export default UnauthorizedPage;
