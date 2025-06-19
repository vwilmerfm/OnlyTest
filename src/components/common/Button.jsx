import React from 'react';

const Button = ({
                    children,
                    variant = 'primary',
                    size = 'medium',
                    onClick,
                    disabled = false,
                    className = '',
                    ...props
                }) => {
    const baseClasses = 'font-bold rounded-full transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

    const variants = {
        primary: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-xl',
        secondary: 'border-2 border-white text-white hover:bg-white hover:text-red-600',
        outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
        ghost: 'text-gray-700 hover:text-red-600 hover:bg-gray-100'
    };

    const sizes = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-8 py-4 text-lg',
        large: 'px-12 py-6 text-xl'
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button
            className={classes}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;