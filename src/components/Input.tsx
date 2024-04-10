interface Props {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  accept?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  name,
  label,
  placeholder,
  value,
  disabled,
  accept,
  onChange,
}: Props) => {
  return (
    <label className="form-label">
      {label}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        accept={accept}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
