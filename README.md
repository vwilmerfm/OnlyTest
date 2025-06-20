# 🐿️ TechArdillita - Landing Page

> **Desarrollo de Software de Calidad Hecho en Bolivia**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-Latest-orange.svg)](https://lucide.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Descripción

Landing page responsiva desarrollada para **TechArdillita**, una empresa ficticia de desarrollo de software boliviana. El proyecto implementa una arquitectura modular con componentes reutilizables, diseño mobile-first y integración de la identidad visual boliviana con tendencias de diseño contemporáneas. ste proyecto fue creado como parte del Trabajo Final del diplomado "DESARROLLO DE SOFTWARE AVANZADO V1 - CBBA". 

### ✨ Características Principales


- 📱 **100% Responsivo**: Mobile-first design con breakpoints adaptativos
- ️🐿️ **Identidad Orginal**: Paleta de colores inspirada en el logo de la empresa la 🐿️
- ⚛️ **Arquitectura Modular**: Componentes reutilizables siguiendo buenas prácticas de React
- 📝 **Formulario Inteligente**: Validación en tiempo real con feedback visual
- 🚀 **Performance Optimizada**: Carga rápida y animaciones fluidas

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework**: React 18.2.0
- **Estilización**: Tailwind CSS 3.3.0
- **Iconografía**: Lucide React
- **Bundler**: Create React App
- **Lenguaje**: JavaScript (ES6+)

## 📂 Estructura del Proyecto

```
src/
├── 📁 components/
│   ├── 📁 common/          # Componentes reutilizables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── FormInput.jsx
│   │   ├── SectionTitle.jsx
│   │   └── ScrollIndicator.jsx
│   ├── 📁 layout/          # Componentes de layout
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── 📁 sections/        # Secciones de la landing
│   │   ├── HeroSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── BenefitsSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   └── ContactSection.jsx
│   └── LandingPage.jsx     # Componente principal
├── 📁 data/                # Datos estáticos
│   ├── services.js
│   ├── benefits.js
│   ├── testimonials.js
│   └── socialLinks.js
├── 📁 hooks/               # Custom hooks
│   ├── useFormValidation.js
│   └── useScrollNavigation.js
├── 📁 utils/               # Utilidades y constantes
│   ├── validation.js
│   └── constants.js
├── App.js
├── index.js
└── index.css
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14.0.0 o superior)
- npm (versión 6.0.0 o superior)

### Pasos de Instalación

> **⚠️ IMPORTANTE**: El código completo se encuentra en la rama `feature/trabajo-final` de este repositorio.

```bash
# 1. Clonar el repositorio
git clone https://github.com/vwilmerfm/OnlyTest.git
cd onlytest

# 2. Cambiar a la rama trabajo-final
git checkout feature/trabajo-final

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm start
```

## 📱 Secciones Implementadas

### 🏠 Header
- Navegación responsiva con menú hamburguesa
- Logo original
- Scroll suave entre secciones

### 🎯 Seccion Principal
- Fondo con gradiente animado
- Llamadas a la acción prominentes
- Micro-animaciones y efectos visuales

### 💼 Servicios
- Grid responsivo de tarjetas
- Iconografía consistente
- Efectos hover dinámicos

### ✅ Beneficios
- Layout de cuatro columnas
- Iconos con gradiente corporativo
- Textos descriptivos claros

### 💬 Testimonios
- Sistema de calificación con estrellas
- Tarjetas con información de clientes
- Diseño uniforme y atractivo

### 📞 Contacto
- Formulario con validación completa
- Estados de error y éxito
- Campos requeridos marcados

### 🔗 Footer
- Información de contacto completa
- Enlaces a redes sociales
- Links de navegación rápida

## 🎨 Características de Diseño

### Paleta de Colores
- **Primario**: Gradiente azul-cyan-verde 
- **Secundario**: Grises y blancos para contraste
- **Acentos**: Rojos para llamadas a la acción

### Componentes Reutilizables
- **Button**: 4 variantes, 3 tamaños
- **Card**: Configurable con hover y sombras
- **FormInput**: Estados de error y validación
- **SectionTitle**: Títulos consistentes

## 📚 Scripts Disponibles

```bash
# Desarrollo - Ejecuta la app en modo desarrollo
npm start          

# Construcción - Construye la app para producción
npm run build      

```

## 🔧 Funcionalidades Extra

### Custom Hooks
- **useFormValidation**: Manejo completo de formularios
- **useScrollNavigation**: Navegación suave entre secciones

### Validaciones
- Campos requeridos
- Formato de email
- Longitud mínima/máxima
- Feedback en tiempo real

### Optimizaciones
- Componentes modulares
- Carga eficiente de recursos
- Transiciones hardware-accelerated

## 📸 Capturas de Pantalla en el documento PDF enviado

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Wilmer Froilan Villca Mamani**
- GitHub: [vwilmerfm](https://github.com/vwilmerfm)
- Email: vwilmer.fm@outlook.com

## 🙏 Agradecimientos

- [React](https://reactjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de estilos
- [Lucide](https://lucide.dev/) por los iconos
- Inspiración en la Ardillita 

## 📝 Notas del Desarrollo

Este proyecto fue desarrollado como trabajo final para el curso de Desarrollo Web Frontend (Módulo 4 del Diplomado), implementando todos los requerimientos especificados:

- ✅ Header con navegación responsiva
- ✅ Hero section con CTAs
- ✅ Sección de servicios/información
- ✅ Sección de beneficios
- ✅ Testimonios de clientes
- ✅ Formulario de contacto funcional
- ✅ Footer completo
- ✅ Diseño responsivo
- ✅ Código modular y reutilizable

---
