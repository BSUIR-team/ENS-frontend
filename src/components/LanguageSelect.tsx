import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onLanguageChange: (language: Languages) => void;
}

enum Languages {
  English = "en",
  Russian = "ru",
}

const LanguageSelect = ({ onLanguageChange }: Props) => {
  const [t, i18n] = useTranslation();
  const [index, setIndex] = useState(i18n.language);
  return (
    <select
      className="language-select"
      id="languageSelect"
      defaultValue={index}
      onChange={(e) => {
        onLanguageChange(e.target.value as Languages);
        setIndex(e.target.value);
      }}
    >
      {Object.keys(Languages).map((e) => {
        return (
          <option value={Languages[e as keyof typeof Languages]} key={e}>
            {t(e)}
          </option>
        );
      })}
    </select>
  );
};

export default LanguageSelect;
