import { useState } from 'react';

export const useScrollNavigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return {
        isMenuOpen,
        setIsMenuOpen,
        scrollToSection
    };
};