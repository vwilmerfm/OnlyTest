import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import SectionTitle from '../common/SectionTitle';
import { useFormValidation } from '../../hooks/useFormValidation';
import { required, email } from '../../utils/validation';
import { FORM_INITIAL_VALUES } from '../../utils/constants';

const ContactSection = () => {
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });

    const validationRules = {
        name: [required('El nombre es requerido')],
        email: [
            required('El email es requerido'),
            email('El email no es válido')
        ],
        message: [required('El mensaje es requerido')]
    };

    const {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit
    } = useFormValidation(FORM_INITIAL_VALUES, validationRules);

    const onSubmit = async (formData) => {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                setFormStatus({
                    type: 'success',
                    message: '¡Mensaje enviado correctamente! Te contactaremos pronto.'
                });
                resolve();
            }, 1500);
        });
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit);
    };

    return (
        <section id="contacto" className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="¿Listo para comenzar?"
                    subtitle="Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad"
                    className="text-white"
                />

                <div className="max-w-2xl mx-auto">
                    <div className="space-y-6">
                        <FormInput
                            label="Nombre completo"
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Tu nombre completo"
                            required
                            error={errors.name}
                        />

                        <FormInput
                            label="Email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            required
                            error={errors.email}
                        />

                        <FormInput
                            label="Mensaje"
                            type="textarea"
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            placeholder="Cuéntanos sobre tu proyecto..."
                            rows="5"
                            required
                            error={errors.message}
                        />

                        {/* Form Status Messages */}
                        {formStatus.message && (
                            <div className={`flex items-center space-x-2 p-4 rounded-lg ${
                                formStatus.type === 'success'
                                    ? 'bg-green-900/50 border border-green-500 text-green-300'
                                    : 'bg-red-900/50 border border-red-500 text-red-300'
                            }`}>
                                {formStatus.type === 'success' ?
                                    <CheckCircle className="w-5 h-5" /> :
                                    <AlertCircle className="w-5 h-5" />
                                }
                                <span>{formStatus.message}</span>
                            </div>
                        )}

                        <Button
                            onClick={handleFormSubmit}
                            disabled={isSubmitting}
                            className="w-full"
                            size="large"
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;