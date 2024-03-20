import { useState } from "react";
import "../i18n";
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
  //const [index, setIndex] = useState(0);
  return (
    <select
      className="form-select"
      id="languageSelect"
      //value={index}
      onChange={(e) => {
        onLanguageChange(Languages[e.target.value as keyof typeof Languages]);
      }}
    >
      {Object.keys(Languages).map((e, index) => {
        //if (i18n.language == e) setIndex(index);
        return <option key={e}>{e}</option>;
      })}
    </select>
  );
};

export default LanguageSelect;
