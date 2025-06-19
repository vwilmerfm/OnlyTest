import React from 'react';
import Card from '../common/Card';
import SectionTitle from '../common/SectionTitle';
import { services } from '../../data/services';

const ServicesSection = () => {
    return (
        <section id="servicios" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Nuestros Servicios"
                    subtitle="Ofrecemos soluciones tecnológicas completas para mejorar tu negocio."
                />

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <Card
                            key={service.id}
                            className="border border-gray-100"
                        >
                            <div className="text-red-600 mb-6">
                                <service.icon className="w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;