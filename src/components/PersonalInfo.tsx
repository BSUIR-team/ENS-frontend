import { FormEvent, useState } from "react";
import Input from "./Input";
import { useTranslation } from "react-i18next";

function editPersonalInfo(e: FormEvent, params: Map<string, string>) {
  console.log(JSON.stringify(Object.fromEntries(params)));
  e.preventDefault();
}

const PersonalInfo = () => {
  var params = new Map<string, string>();
  const [t] = useTranslation();
  const [isDisabled, setDisabled] = useState(true);
  return (
    <div>
      <form
        method="POST"
        onSubmit={(e) => {
          setDisabled(true);
          editPersonalInfo(e, params);
        }}
      >
        <h2>{t("personalInfoButton")}</h2>
        <Input
          type="tel"
          label={t("phoneNumber")}
          name="phone"
          placeholder="+375291488228"
          disabled={isDisabled}
          onChange={(e) => {
            params.set(e.currentTarget.name, e.currentTarget.value);
          }}
        />
        <Input
          type="email"
          label={t("email")}
          name="email"
          placeholder="johndoe@gmail.com"
          disabled={isDisabled}
          onChange={(e) => {
            params.set(e.currentTarget.name, e.currentTarget.value);
          }}
        />
        <Input
          type="password"
          label={t("password")}
          name="password"
          placeholder={t("password")}
          disabled={isDisabled}
          onChange={(e) => {
            params.set(e.currentTarget.name, e.currentTarget.value);
          }}
        />
        {isDisabled || (
          <Input
            type="password"
            label={t("repeatPassword")}
            name="repeatPassword"
            placeholder={t("password")}
            disabled={isDisabled}
            onChange={(e) => {
              params.set(e.currentTarget.name, e.currentTarget.value);
            }}
          />
        )}
        <label>
          {t("messageSample")}
          <textarea
            className="form-control"
            name="messageSample"
            disabled={isDisabled}
            onChange={(e) => {
              params.set(e.currentTarget.name, e.currentTarget.value);
            }}
          ></textarea>
        </label>
        <button type="submit" className="btn btn-danger" disabled={isDisabled}>
          {t("saveButton")}
        </button>
      </form>
      <button
        className="btn btn-danger"
        onClick={() => {
          setDisabled(false);
        }}
      >
        {t("editButton")}
      </button>
    </div>
  );
};

export default PersonalInfo;
