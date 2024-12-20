import { ChangeEvent } from "react";
import "./SelectField.css";
const SelectField = ({
  onChange,
  value,
  optionList,
  labelName,
}: {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  labelName: string;
  optionList: {
    label: string;
    value: string;
  }[];
}) => {
  return (
    <div className="select-group">
      <select value={value} onChange={onChange} className="minimal">
        <option value={""} disabled>
          Select {labelName}
        </option>
        {optionList.map((options) => (
          <option key={options.value} value={options.value}>
            {options.label}
          </option>
        ))}
      </select>
      <label className="user-select-label">{labelName}</label>
    </div>
  );
};

export default SelectField;
