import React from 'react';
import { Star } from 'lucide-react';
import Card from '../common/Card';
import SectionTitle from '../common/SectionTitle';
import { testimonials } from '../../data/testimonials';

const TestimonialCard = ({ testimonial }) => {
    return (
        <Card className="h-full">
            <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
            </div>
            <p className="text-gray-600 mb-6 italic">
                "{testimonial.text}"
            </p>
            <div>
                <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                </h4>
                <p className="text-red-600">
                    {testimonial.company}
                </p>
            </div>
        </Card>
    );
};

const TestimonialsSection = () => {
    return (
        <section id="testimonios" className="py-20 bg-gradient-to-r from-red-50 to-green-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Lo que dicen nuestros clientes"
                    subtitle="Casos de satisfacción que hablan por sí solos 🙈"
                />

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;