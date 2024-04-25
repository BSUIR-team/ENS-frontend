import { useTranslation } from "react-i18next";
import { Template } from "../types/Template";
import { useState } from "react";
import AddTemplate from "./AddTemplate";
import { useAction } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { AlertType, useAlert } from "../hooks/useAlert";

interface Props {
  templates: Template[];
}

const TemplatesList = ({ templates }: Props) => {
  const [t] = useTranslation();
  const showAlert = useAlert();
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const user = useTypedSelector((state) => state.user.user);
  const { deleteTemplate, updateTemplate } = useAction();
  const remove = (templateId: number) => {
    deleteTemplate(user, templateId);
  };

  return (
    <div className="templates-list page-list">
      <h2>{t("templatesList")}</h2>
      {templates.length == 0 && <p>{t("noTemplatesYet")}</p>}
      <ul>
        {templates.map((template) => (
          <li key={template.id}>
            <h3>{template.title}</h3>
            <div className="buttons">
              <button
                onClick={() => {
                  setEditingTemplate(template);
                }}
              >
                {t("editTemplate")}
              </button>
              <button
                onClick={() => {
                  showAlert({
                    type: AlertType.CONFIRM,
                    message: t("removeTemplateConfirm"),
                    continueAction: () => {
                      remove(template.id);
                    },
                  });
                }}
              >
                {t("removeTemplate")}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingTemplate != null && (
        <AddTemplate
          template={editingTemplate}
          onClose={() => {
            setEditingTemplate(null);
          }}
          onSubmit={(template: Template) => {
            updateTemplate(user, template);
          }}
        />
      )}
    </div>
  );
};

export default TemplatesList;
