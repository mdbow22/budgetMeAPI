import React from 'react';

interface SelectOption {
  value: any;
  label: string;
}

const FormSelect: React.FC<{
  name: string;
  labelText: string;
  options: SelectOption[];
  onChange: (value: any) => void;
  value: any;
  required?: boolean;
  className?: string;
}> = ({ name, labelText, options, onChange, value, required, className }) => {
  return (
    <div className='flex flex-col mb-3 w-full'>
      <label className='mb-2 font-semibold text-sm' htmlFor={name}>
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        className={`border py-1 px-2 shadow ${className}`}
        onChange={onChange}
        required={required}
      >
        {options?.map((option) => {
          return <option key={option.label} selected={option.label === value ? true : false} value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
};

export default FormSelect;
