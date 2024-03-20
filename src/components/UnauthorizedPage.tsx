import { FormEvent, useState } from "react";
import Registration from "./Registration";
import Authorization from "./Authorization";
import LanguageSelect from "./LanguageSelect";
import { useTranslation } from "react-i18next";
import "../i18n";

interface Props {
  setAuthorized: (e: boolean) => void;
}

const UnauthorizedPage = ({ setAuthorized }: Props) => {
  const [isRegistration, setRegistration] = useState(false);
  const [t, i18n] = useTranslation();

  function registerUser(e: FormEvent, params: Map<string, string>) {
    console.log("register");
    params.forEach((key, value) => {
      console.log(`${key} : ${value}`);
    });
    e.preventDefault();
    if (true) setRegistration(false);
  }

  function authorizeUser(e: FormEvent, params: Map<string, string>) {
    console.log("authorize");
    params.forEach((key, value) => {
      console.log(`${key} : ${value}`);
    });
    e.preventDefault();
    if (true) setAuthorized(true);
  }

  return (
    <div
      style={{
        width: "600px",
        margin: "100px auto",
        backgroundColor: "#d1d1d1",
        borderRadius: "5px",
        border: "2px solid #333",
      }}
    >
      {isRegistration ? (
        <Registration onSubmit={registerUser} />
      ) : (
        <Authorization onSubmit={authorizeUser} />
      )}
      <p style={{ textAlign: "center", margin: "10px 0" }}>
        {isRegistration ? t("accountAlreadyExists") : t("noAccountYet")}
        <a
          style={{ marginLeft: "5px" }}
          className="link-warning link-opacity-100-hover"
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
