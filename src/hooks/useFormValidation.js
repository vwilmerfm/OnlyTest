import { useState } from 'react';

export const useFormValidation = (initialValues, validationRules) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (name, value) => {
        const rules = validationRules[name];
        if (!rules) return '';

        for (const rule of rules) {
            const error = rule(value);
            if (error) return error;
        }
        return '';
    };

    const validateAll = () => {
        const newErrors = {};
        let isValid = true;

        Object.keys(validationRules).forEach(field => {
            const error = validateField(field, values[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));

        // BORRAR ERROR CUANDO LA USUARIO COMIENZA A ESCRIBIR
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (onSubmit) => {
        setIsSubmitting(true);

        if (validateAll()) {
            try {
                await onSubmit(values);
                // RESTABLECER FORMULARIO
                setValues(initialValues);
            } catch (error) {
                console.error('Error en el envío del formulario:', error);
            }
        }

        setIsSubmitting(false);
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setValues,
        setErrors
    };
};