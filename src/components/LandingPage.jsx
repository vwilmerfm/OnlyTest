import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import BenefitsSection from './sections/BenefitsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';

const LandingPage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <HeroSection />
            <ServicesSection />
            <BenefitsSection />
            <TestimonialsSection />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default LandingPage;