import React from 'react';

const FormInput = ({
                       label,
                       type = 'text',
                       name,
                       value,
                       onChange,
                       placeholder,
                       required = false,
                       error,
                       rows,
                       className = ''
                   }) => {
    const inputClasses = `w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors duration-200 ${className}`;

    const Input = type === 'textarea' ? 'textarea' : 'input';

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium mb-2 text-white">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <Input
                type={type !== 'textarea' ? type : undefined}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${inputClasses} ${type === 'textarea' ? 'resize-none' : ''}`}
                rows={type === 'textarea' ? rows : undefined}
            />
            {error && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
};

export default FormInput;