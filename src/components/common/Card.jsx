import React from 'react';

const Card = ({
                  children,
                  className = '',
                  hover = true,
                  padding = 'large',
                  shadow = true
              }) => {
    const baseClasses = 'bg-white rounded-2xl transition-all duration-300';
    const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-2' : '';
    const shadowClasses = shadow ? 'shadow-xl' : '';

    const paddings = {
        small: 'p-4',
        medium: 'p-6',
        large: 'p-8'
    };

    const classes = `${baseClasses} ${hoverClasses} ${shadowClasses} ${paddings[padding]} ${className}`;

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

export default Card;