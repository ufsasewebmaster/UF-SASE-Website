// components/SearchableSelect.tsx
import React from "react";
import Select, { SingleValue } from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  disabled: boolean;
  className: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ options, value, placeholder, onChange, disabled, className }) => {
  // find the selected option object (or null)
  const selected = options.find((o) => o.value === value) ?? null;

  return (
    <Select<Option, false>
      options={options}
      value={selected}
      onChange={(opt: SingleValue<Option>) => onChange(opt?.value ?? "")}
      placeholder={placeholder}
      isSearchable
      isDisabled={disabled}
      styles={{
        container: (base) => ({ ...base, width: "100%" }),
      }}
      className={className}
    />
  );
};

export default SearchableSelect;
