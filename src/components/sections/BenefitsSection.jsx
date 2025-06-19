import React from 'react';
import { CheckCircle } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import { benefits } from '../../data/benefits';

const BenefitsSection = () => {
    return (
        <section id="beneficios" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="¿Por qué elegirnos?"
                    subtitle="Combinamos talento boliviano con las mejores prácticas internacionales"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.id}
                            className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;