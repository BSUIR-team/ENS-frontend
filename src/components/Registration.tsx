import { FormEvent, SetStateAction, useState } from "react";
import Input from "./Input";
import "../i18n";
import { useTranslation } from "react-i18next";
import { AlertType, useAlert } from "../hooks/useAlert";
import { User } from "../types/User";
import axios, { AxiosResponse } from "axios";
import { REGISTER_URI } from "../resources/URIs";
import { validateName, validatePassword } from "../utils/validation";

interface Props {
  children?: string;
  setRegistered: (e: SetStateAction<boolean>) => void;
}

const Registration = ({ children, setRegistered }: Props) => {
  const [t] = useTranslation();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const showAlert = useAlert();

  function registerUser(e: FormEvent) {
    e.preventDefault();
    if (validateName(username) && email && validatePassword(password)) {
      if (password == repassword) {
        let user = new User(email, password, username);
        axios
          .post(REGISTER_URI, user)
          .then((response: AxiosResponse<boolean, any>) => {
            if (!response.data) throw new Error();
          })
          .catch(() => {
            showAlert({ type: AlertType.FAIL, message: t("failedRegister") });
          });
        setRegistered(false);
      } else {
        showAlert({ message: t("passwordsMustMatch"), type: AlertType.FAIL });
      }
    } else {
      showAlert({ message: t("incorrectFields"), type: AlertType.FAIL });
    }
  }

  return (
    <form className="start-form" method="POST" onSubmit={registerUser}>
      <h2>{t("registrationHeader")}</h2>
      <Input
        type="text"
        label={t("nameField")}
        name="username"
        placeholder="John"
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      />
      <Input
        type="email"
        label={t("email")}
        name="email"
        placeholder="johndoe@gmail.com"
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
      <Input
        type="password"
        label={t("repeatPassword")}
        name="repeatPassword"
        placeholder={t("password")}
        onChange={(e) => {
          setRepassword(e.currentTarget.value);
        }}
      />
      <button type="submit">{t("registerButton")}</button>
      {children}
    </form>
  );
};

export default Registration;
