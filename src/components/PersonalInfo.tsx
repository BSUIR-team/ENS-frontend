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
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [repassword, setRepassword] = useState(user.password);
  const [message, setMessage] = useState(user.message);

  function editPersonalInfo(e: FormEvent) {
    e.preventDefault();
    if (phone && email && password && repassword && message) {
      if (password == repassword) {
        update(new User(email, password, message, phone, user.contacts));
        setDisabled(true);
      } else {
        showAlert("Passwords must match", AlertType.FAIL);
      }
    } else {
      showAlert("Some fields are empty", AlertType.FAIL);
    }
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
          type="tel"
          label={t("phoneNumber")}
          name="phone"
          placeholder="+375291488228"
          value={phone}
          disabled={isDisabled}
          onChange={(e) => {
            setPhone(e.currentTarget.value);
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
            value={password}
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
          setDisabled(false);
        }}
      >
        {t("editButton")}
      </button>
    </>
  );
};

export default PersonalInfo;
