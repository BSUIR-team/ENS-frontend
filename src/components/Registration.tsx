import { FormEvent, SetStateAction, useState } from "react";
import Input from "./Input";
import "../i18n";
import { useTranslation } from "react-i18next";
import { AlertType, useAlert } from "../hooks/useAlert";
import { User } from "../types/User";

interface Props {
  children?: string;
  setRegistered: (e: SetStateAction<boolean>) => void;
}

const Registration = ({ children, setRegistered }: Props) => {
  const [t] = useTranslation();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const showAlert = useAlert();

  function registerUser(e: FormEvent) {
    //console.log("register");
    e.preventDefault();
    if (phone && email && password && repassword) {
      if (password == repassword) {
        let user = new User(email, password, "", phone);
        console.log(user);
        showAlert(`${email} registered`);
        setRegistered(false);
      } else {
        showAlert("Passwords must be equal", AlertType.FAIL);
      }
    } else {
      showAlert("Wrong credentials", AlertType.FAIL);
    }
  }

  return (
    <form className="start-form" method="POST" onSubmit={registerUser}>
      <h2>{t("registrationHeader")}</h2>
      <Input
        type="tel"
        label={t("phoneNumber")}
        name="phone"
        placeholder="+375291488228"
        onChange={(e) => {
          setPhone(e.currentTarget.value);
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
