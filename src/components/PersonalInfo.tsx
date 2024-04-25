import { FormEvent, useEffect, useState } from "react";
import Input from "./Input";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AlertType, useAlert } from "../hooks/useAlert";
import { useAction } from "../hooks/useAction";
import { User } from "../types/User";
import { validateName, validatePassword } from "../utils/validation";
import AddTemplate from "./AddTemplate";
import TemplatesList from "./TemplatesList";
import { Template } from "../types/Template";

const PersonalInfo = () => {
  const [t] = useTranslation();
  const showAlert = useAlert();
  const user = useTypedSelector((state) => state.user.user);
  const { update, addTemplate } = useAction();

  const [isDisabled, setDisabled] = useState(true);
  const [addingTemplate, setAddignTemplate] = useState(false);
  const [name, setName] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [repassword, setRepassword] = useState(user.password);

  const failMessage = useTypedSelector((state) => state.user.error);
  useEffect(() => {
    if (failMessage != undefined && failMessage) {
      showAlert({ type: AlertType.FAIL, message: t(failMessage) });
    }
  }, [failMessage]);
  function editPersonalInfo(e: FormEvent) {
    e.preventDefault();
    if (validateName(name) && email && validatePassword(password)) {
      if (password == repassword) {
        update(new User(email, password, name, user.contacts));
        setDisabled(true);
      } else {
        showAlert({ message: t("passwordsMustMatch"), type: AlertType.FAIL });
      }
    } else {
      showAlert({ message: t("incorrectFields"), type: AlertType.FAIL });
    }
  }

  function discardChanges() {
    setName(user.username);
    setEmail(user.email);
    setPassword(user.password);
    setRepassword(user.password);
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
        disabled={true}
      >
        {isDisabled ? t("editButton") : t("cancelActionButton")}
      </button>
      <button
        className="edit-personal-info"
        onClick={() => setAddignTemplate(true)}
      >
        {t("addTemplate")}
      </button>
      <TemplatesList templates={user.templates} />
      {addingTemplate && (
        <AddTemplate
          onClose={() => {
            setAddignTemplate(false);
          }}
          onSubmit={(template: Template) => {
            addTemplate(user, template);
          }}
        />
      )}
    </>
  );
};

export default PersonalInfo;
