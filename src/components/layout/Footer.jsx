import React from 'react';
import { Code, MapPin, Phone, Mail } from 'lucide-react';
import { socialLinks } from '../../data/socialLinks';
import { COMPANY_INFO, NAVIGATION_ITEMS } from '../../utils/constants';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* INFO DE LA EMPRESA */}
                    <div className="md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">{COMPANY_INFO.name}</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Desarrollo de software de calidad desde nuestras oficinas para toda Bolivia.
                            Innovación, calidad y pasión en cada proyecto.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.href}
                                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* CONTACTO DE LA EMPRESA */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contacto</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-red-500" />
                                <span className="text-gray-400">{COMPANY_INFO.contact.address}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-red-500" />
                                <span className="text-gray-400">{COMPANY_INFO.contact.phone}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-red-500" />
                                <span className="text-gray-400">{COMPANY_INFO.contact.email}</span>
                            </div>
                        </div>
                    </div>

                    {/* ENLACES DE NAVEGACION */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Enlaces</h3>
                        <div className="space-y-2">
                            {NAVIGATION_ITEMS.slice(1).map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">
                                Política de Privacidad
                            </a>
                            <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">
                                Términos de Servicio
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} <b>{COMPANY_INFO.name}.</b> Algunos derechos reservados. Hecho con ❤️ en aqui 😅, para ti 🐿️.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;