import React from "react";
import "./styles.css";
interface CustomInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  label?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  name,
  label,
  className = "",
  error = false,
  errorMessage = "",
}) => {
  return (
    <div className={`custom-input-wrapper ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={`input-field ${error ? "input-error" : ""}`}
      />
      {error && errorMessage && (
        <span className="input-error-message">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomInput;
