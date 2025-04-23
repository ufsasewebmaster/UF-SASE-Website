// components/SearchableSelect.tsx
import React from "react";
import type { SingleValue } from "react-select";
import Select from "react-select";

export interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Array<Option>;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  disabled: boolean;
  className: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ className, disabled, onChange, options, placeholder, value }) => {
  // find the selected option object (or null)
  const selected = options.find((o) => o.value === value) ?? null;

  return (
    <div className={className}>
      <Select<Option, false>
        options={options}
        value={selected}
        onChange={(opt: SingleValue<Option>) => onChange(opt?.value ?? "")}
        placeholder={placeholder}
        isSearchable
        isDisabled={disabled}
        styles={{ container: (base) => ({ ...base, width: "100%" }) }}
      />
    </div>
  );
};

export default SearchableSelect;
