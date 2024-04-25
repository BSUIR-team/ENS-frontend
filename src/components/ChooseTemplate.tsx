import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Template } from "../types/Template";
import { useAction } from "../hooks/useAction";

interface Props {
  onClose: () => void;
}

const ChooseTemplate = ({ onClose }: Props) => {
  const [t] = useTranslation();
  const user = useTypedSelector((state) => state.user.user);
  const templates = user.templates;

  const { notify } = useAction();

  function notifyTemplate(template: Template) {
    notify(user, template);
  }

  return (
    <div className="loading-container">
      <div className="modal-list templates-list">
        <button className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2>{t("chooseTemplate")}</h2>
        {templates.length == 0 && <p>{t("noTemplatesYet")}</p>}
        <ul>
          {templates.map((template, index) => (
            <li key={index}>
              <h3>{template.title}</h3>
              <button
                onClick={() => {
                  notifyTemplate(template);
                }}
              >
                {t("send")}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChooseTemplate;
