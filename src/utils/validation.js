export const required = (message = 'Este campo es requerido') => (value) => {
    return !value || !value.trim() ? message : '';
};

export const email = (message = 'Email no válido') => (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value && !emailRegex.test(value) ? message : '';
};

export const minLength = (min, message) => (value) => {
    return value && value.length < min ? message || `Mínimo ${min} caracteres` : '';
};

export const maxLength = (max, message) => (value) => {
    return value && value.length > max ? message || `Máximo ${max} caracteres` : '';
};
