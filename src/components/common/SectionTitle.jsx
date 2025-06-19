import React from 'react';

const SectionTitle = ({
                          title,
                          subtitle,
                          centered = true,
                          className = ''
                      }) => {
    const containerClasses = `mb-16 ${centered ? 'text-center' : ''} ${className}`;

    return (
        <div className={containerClasses}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionTitle;