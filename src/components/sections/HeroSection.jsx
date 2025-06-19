import React from 'react';
import Button from '../common/Button';
import ScrollIndicator from '../common/ScrollIndicator';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';
import { COMPANY_INFO } from '../../utils/constants';

const HeroSection = () => {
    const { scrollToSection } = useScrollNavigation();

    return (
        <section id="inicio" className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* FONDO DE PANTALLA */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-white-500 to-pink-500 opacity-90"></div>
            <div className="absolute inset-0 bg-black/20"></div>

            {/* ANIMACION DEL FONDO */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                    Soluciones
                    <span className="block bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
            Tecnológicas
          </span>
                    <span className="block text-3xl md:text-5xl mt-2">Realizados en Bolivia</span>
                </h1>

                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                    {COMPANY_INFO.description} Aplicaciones web, móviles y sistemas empresariales que impulsan tu negocio al futuro.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        variant="secondary"
                        size="large"
                        onClick={() => scrollToSection('contacto')}

                    >
                        Empieza tu Proyecto
                    </Button>

                    <Button
                        variant="secondary"
                        size="large"
                        onClick={() => scrollToSection('servicios')}
                    >
                        Conoce nuestros Servicios
                    </Button>
                </div>

                <ScrollIndicator />
            </div>
        </section>
    );
};

export default HeroSection;