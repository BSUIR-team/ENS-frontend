interface Props {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  name,
  label,
  placeholder,
  value,
  disabled,
  onChange,
}: Props) => {
  return (
    <label
      style={{ width: "90%", display: "block", margin: "5px auto" }}
      className="form-label"
    >
      {label}
      <input
        style={{ width: "100%" }}
        className="form-control"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
