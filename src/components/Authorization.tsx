import { FormEvent, useState } from "react";
import Input from "./Input";
import "../i18n";
import { useTranslation } from "react-i18next";
import { useAction } from "../hooks/useAction";
import { User } from "../types/User";
import { AlertType, useAlert } from "../hooks/useAlert";
import { validatePassword } from "../utils/validation";

interface Props {
  children?: string;
}

const Authorization = ({ children }: Props) => {
  const [t] = useTranslation();
  const { logIn } = useAction();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showAlert = useAlert();

  function authorizeUser(e: FormEvent) {
    e.preventDefault();
    if (email && validatePassword(password)) {
      logIn(new User(email, password));
    } else {
      showAlert({ message: "Fields must be set", type: AlertType.FAIL });
    }
  }

  return (
    <form className="start-form" method="POST" onSubmit={authorizeUser}>
      <h2>{t("authorizationHeader")}</h2>
      <Input
        type="email"
        label={t("email")}
        name="email"
        placeholder="johndoe@example.com"
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
      />
      <Input
        type="password"
        label={t("password")}
        name="password"
        placeholder={t("password")}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
      <button type="submit">{t("authorizeButton")}</button>
      {children}
    </form>
  );
};

export default Authorization;
