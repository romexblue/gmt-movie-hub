import React from "react";

type SelectProps<T> = {
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: T }[];
}

const Select = <T extends string>({ value, onChange, options }: SelectProps<T>) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="text-sm rounded-lg block w-fit p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
