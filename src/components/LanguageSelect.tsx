interface Props {
  onLanguageChange: (language: Languages) => void;
}

enum Languages {
  Russian = "russian",
  English = "english",
}

const LanguageSelect = ({ onLanguageChange }: Props) => {
  return (
    <select
      className="form-select"
      id="languageSelect"
      onChange={(e) => {
        onLanguageChange(Languages[e.target.value as keyof typeof Languages]);
      }}
    >
      {Object.keys(Languages).map((e) => (
        <option key={e}>{e}</option>
      ))}
    </select>
  );
};

export default LanguageSelect;
