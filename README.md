# 🐿️ TechArdillita - Landing Page

> **Desarrollo de Software de Calidad Hecho en Bolivia**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-Latest-orange.svg)](https://lucide.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Descripción

Landing page moderna y responsiva desarrollada para **TechArdillita**, una empresa ficticia de desarrollo de software boliviana. El proyecto implementa una arquitectura modular con componentes reutilizables, diseño mobile-first y integración de la identidad visual boliviana con tendencias de diseño contemporáneas. ste proyecto fue creado como parte del Trabajo Final del diplomado "DESARROLLO DE SOFTWARE AVANZADO V1 - CBBA". 

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
git clone https://github.com/tu-usuario/techbolivia-landing.git
cd techbolivia-landing

# 2. Cambiar a la rama trabajo-final
git checkout trabajo-final

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm start
```

### Configuración de Tailwind CSS

El proyecto utiliza Tailwind CSS vía CDN para simplicidad. En producción, se recomienda la instalación local:

```bash
# Instalación local de Tailwind (opcional)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 📱 Secciones Implementadas

### 🏠 Header
- Navegación responsiva con menú hamburguesa
- Logo con gradiente boliviano
- Scroll suave entre secciones

### 🎯 Hero Section
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
- **Primario**: Gradiente rojo-amarillo-verde (bandera boliviana)
- **Secundario**: Grises y blancos para contraste
- **Acentos**: Rojos para llamadas a la acción

### Componentes Reutilizables
- **Button**: 4 variantes, 3 tamaños
- **Card**: Configurable con hover y sombras
- **FormInput**: Estados de error y validación
- **SectionTitle**: Títulos consistentes

## 📚 Scripts Disponibles

```bash
# Desarrollo
npm start          # Ejecuta la app en modo desarrollo

# Construcción
npm run build      # Construye la app para producción

# Testing
npm test           # Ejecuta las pruebas

# Análisis
npm run eject      # Expone configuración de CRA (irreversible)
```

## 🔧 Funcionalidades Avanzadas

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

## 📸 Capturas de Pantalla

![Hero Section](./screenshots/hero-section.png)
*Sección principal con gradiente boliviano y CTAs*

![Services](./screenshots/services.png)
*Grid de servicios con iconografía moderna*

![Contact Form](./screenshots/contact-form.png)
*Formulario de contacto con validación*

## 🌐 Demo en Vivo

[Ver Demo](https://tu-usuario.github.io/techbolivia-landing) *(Actualizar con tu URL)*

## 🤝 Contribución

1. Fork el proyecto
2. Cambia a la rama `trabajo-final`: `git checkout trabajo-final`
3. Crea tu rama de feature: `git checkout -b feature/nueva-funcionalidad`
4. Commit tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
5. Push a la rama: `git push origin feature/nueva-funcionalidad`
6. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**[Tu Nombre]**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: tu.email@ejemplo.com

## 🙏 Agradecimientos

- [React](https://reactjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de estilos
- [Lucide](https://lucide.dev/) por los iconos
- Inspiración en empresas bolivianas como BOA, Entel Bolivia, Tigo Bolivia

## 📝 Notas del Desarrollo

Este proyecto fue desarrollado como trabajo final para el curso de Desarrollo Web Frontend, implementando todos los requerimientos especificados:

- ✅ Header con navegación responsiva
- ✅ Hero section con CTAs
- ✅ Sección de servicios/información
- ✅ Sección de beneficios
- ✅ Testimonios de clientes
- ✅ Formulario de contacto funcional
- ✅ Footer completo
- ✅ Diseño responsivo y moderno
- ✅ Código modular y reutilizable

---

**⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!**

*Desarrollado con ❤️ en Bolivia 🇧🇴*