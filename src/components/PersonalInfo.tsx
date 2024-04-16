import { FormEvent, useState } from "react";
import Input from "./Input";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AlertType, useAlert } from "../hooks/useAlert";
import { useAction } from "../hooks/useAction";
import { User } from "../types/User";

const PersonalInfo = () => {
  const [t] = useTranslation();
  const showAlert = useAlert();
  const user = useTypedSelector((state) => state.user.user);
  const { update } = useAction();

  const [isDisabled, setDisabled] = useState(true);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [repassword, setRepassword] = useState(user.password);
  const [message, setMessage] = useState(user.message);

  function editPersonalInfo(e: FormEvent) {
    e.preventDefault();
    if (name && email && password && repassword && message) {
      if (password == repassword) {
        update(new User(email, password, message, name, user.contacts));
        setDisabled(true);
      } else {
        showAlert({ message: t("passwordsMustMatch"), type: AlertType.FAIL });
      }
    } else {
      showAlert({ message: t("incorrectFields"), type: AlertType.FAIL });
    }
  }

  function discardChanges() {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setRepassword(user.password);
    setMessage(user.message);
  }

  return (
    <>
      <form
        className="personal-info-form"
        method="POST"
        onSubmit={editPersonalInfo}
      >
        <h2>{t("personalInfoButton")}</h2>
        <Input
          type="text"
          label={t("nameField")}
          name="name"
          placeholder="John"
          value={name}
          disabled={isDisabled}
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <Input
          type="email"
          label={t("email")}
          name="email"
          placeholder="johndoe@gmail.com"
          value={email}
          disabled={isDisabled}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <Input
          type="password"
          label={t("password")}
          name="password"
          placeholder={t("password")}
          value={password}
          disabled={isDisabled}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        {isDisabled || (
          <Input
            type="password"
            label={t("repeatPassword")}
            name="repeatPassword"
            placeholder={t("password")}
            value={repassword}
            disabled={isDisabled}
            onChange={(e) => {
              setRepassword(e.currentTarget.value);
            }}
          />
        )}
        <label>
          {t("messageSample")}
          <textarea
            className="form-control"
            name="messageSample"
            disabled={isDisabled}
            value={message}
            onChange={(e) => {
              setMessage(e.currentTarget.value);
            }}
          ></textarea>
        </label>
        <button type="submit" disabled={isDisabled}>
          {t("saveButton")}
        </button>
      </form>
      <button
        className="edit-personal-info"
        onClick={() => {
          setDisabled(!isDisabled);
          if (!isDisabled) {
            discardChanges();
          }
        }}
      >
        {isDisabled ? t("editButton") : t("cancelActionButton")}
      </button>
    </>
  );
};

export default PersonalInfo;
