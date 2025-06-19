import React from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = ({ className = '' }) => {
    return (
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce ${className}`}>
            <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
    );
};

export default ScrollIndicator;