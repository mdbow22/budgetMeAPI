import React from 'react';

interface TextInputProps {
    name: string;
    labelText: string;
    type?: string;
    required?: boolean;
    value: string | number | string[];
    placeholder?: string;
    onChange: (value:any) => void;
}

const TextInput: React.FC<TextInputProps> = ({name, labelText, type, required, value, placeholder, onChange}) => {

    const formType = type ?? 'text';

    return (
        <div className='flex flex-col mb-3'>
            <label className='mb-2 font-semibold' htmlFor={name}>{labelText}</label>
            <input 
                className='border py-1 px-2 shadow'
                type={formType} 
                name={name} 
                id={name} 
                required={required} 
                value={value} 
                placeholder={placeholder}
                onChange={onChange} />
        </div>
    )
}

export default TextInput;