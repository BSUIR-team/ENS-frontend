import { useTranslation } from "react-i18next";

interface Props {
  children: string;
  action: () => void;
  hide: () => void;
}

const Confirmation = ({ children, action, hide }: Props) => {
  const [t] = useTranslation();
  return (
    <div className="loading-container">
      <div className="confirmation-block">
        <h2>{t("confirmActionHeader")}</h2>
        <p>{children}</p>
        <div className="buttons">
          <button
            onClick={() => {
              action();
              hide();
            }}
          >
            {t("confirmActionButton")}
          </button>
          <button
            onClick={() => {
              hide();
            }}
          >
            {t("cancelActionButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
