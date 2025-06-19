import React from 'react';
import { Code, Menu, X } from 'lucide-react';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';
import { NAVIGATION_ITEMS, COMPANY_INFO } from '../../utils/constants';
import Button from '../common/Button';

const Header = () => {
    const { isMenuOpen, setIsMenuOpen, scrollToSection } = useScrollNavigation();

    return (
        <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 ">
                            <img src="/ardilla_sd_min.png" alt="Mi_ardillita_🥰"/>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">
              {COMPANY_INFO.name}
            </span>
                    </div>

                    {/* NAVEGACION EN ESCRITORIO */}
                    <nav className="hidden md:flex space-x-8">
                        {NAVIGATION_ITEMS.map((item) => (
                            <Button
                                key={item.id}
                                variant="ghost"
                                size="small"
                                onClick={() => scrollToSection(item.id)}
                                className="capitalize"
                            >
                                {item.label}
                            </Button>
                        ))}
                    </nav>

                    {/* BOTONES PARA EL MENU EN MOVILES */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* NAVEGACION EN MOVILES */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <nav className="flex flex-col space-y-3">
                            {NAVIGATION_ITEMS.map((item) => (
                                <Button
                                    key={item.id}
                                    variant="ghost"
                                    size="small"
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-left justify-start capitalize py-2"
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;