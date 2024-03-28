import { FormEvent } from "react";
import Input from "./Input";
import "../i18n";
import { useTranslation } from "react-i18next";

interface Props {
  children?: string;
  onSubmit: (e: FormEvent, params: Map<string, string>) => void;
}

const Registration = ({ children, onSubmit }: Props) => {
  const [t] = useTranslation();
  var params = new Map<string, string>();
  return (
    <form
      className="start-form"
      method="POST"
      onSubmit={(e) => {
        onSubmit(e, params);
      }}
    >
      <h2>{t("registrationHeader")}</h2>
      <Input
        type="tel"
        label={t("phoneNumber")}
        name="phone"
        placeholder="+375291488228"
        onChange={(e) => {
          params.set(e.currentTarget.name, e.currentTarget.value);
        }}
      />
      <Input
        type="email"
        label={t("email")}
        name="email"
        placeholder="johndoe@gmail.com"
        onChange={(e) => {
          params.set(e.currentTarget.name, e.currentTarget.value);
        }}
      />
      <Input
        type="password"
        label={t("password")}
        name="password"
        placeholder={t("password")}
        onChange={(e) => {
          params.set(e.currentTarget.name, e.currentTarget.value);
        }}
      />
      <Input
        type="password"
        label={t("repeatPassword")}
        name="repeatPassword"
        placeholder={t("password")}
        onChange={(e) => {
          params.set(e.currentTarget.name, e.currentTarget.value);
        }}
      />
      <button type="submit">{t("registerButton")}</button>
      {children}
    </form>
  );
};

export default Registration;
