import { ChangeEvent } from "react";
import "./inputField.css";

const InputField = ({
  name,
  value,
  handleChange,
}: {
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="input-group">
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        className="input"
      />
      <label htmlFor={name} className="user-label">
        {name}
      </label>
    </div>
  );
};

export default InputField;
