import { FormEvent } from "react";
import Input from "./Input";
import "../i18n";
import { useTranslation } from "react-i18next";

interface Props {
  children?: string;
  onSubmit: (e: FormEvent, params: Map<string, string>) => void;
}

const Authorization = ({ children, onSubmit }: Props) => {
  const [t] = useTranslation();
  var params = new Map<string, string>();
  return (
    <form
      method="POST"
      onSubmit={(e) => {
        onSubmit(e, params);
      }}
    >
      <h1 style={{ textAlign: "center", margin: "10px 0" }}>
        {t("authorizationHeader")}
      </h1>
      <Input
        type="tel"
        label={t("phoneNumber")}
        name="phoneInput"
        placeholder="+375291488228"
        onChange={(e) => {
          params.set(e.currentTarget.name, e.currentTarget.value);
        }}
      />
      <Input
        type="password"
        label={t("password")}
        name="passwordInput"
        placeholder={t("password")}
        onChange={(e) => {
          params.set(e.currentTarget.name, e.currentTarget.value);
        }}
      />
      <button
        style={{ display: "block", margin: "5px auto", width: "90%" }}
        className="btn btn-warning"
        type="submit"
      >
        {t("authorizeButton")}
      </button>
      {children}
    </form>
  );
};

export default Authorization;
