# Estados Unidos de Europa - EUE

Proyecto web que presenta la visión de una federación europea integrada para el horizonte 2040-2050-2060. Sitio web estático construido con tecnologías modernas, optimizado para SEO y listo para producción.

## 📋 Acerca del Proyecto

Este sitio es un proyecto de **aprendizaje habitual** que explora una propuesta de federación europea realista. El contenido presenta:

- Sistema político federal con democracia directa
- Defensa unificada (Ejército Europeo + UMEE)
- Infraestructura conectada (EuroBananas)
- Educación compartida con Lingua Franca europea
- Símbolos federales que complementan identidades locales
- Vivienda garantizada en 22 años
- Sistema de pensiones portables y estables

## 🤖 Herramientas de IA utilizadas para el contenido

El contenido del sitio ha sido generado y refinado utilizando:

- **ChatGPT** - Generación inicial del contenido textual
- **Grok** - Ajuste y refinamiento del tono para conseguir una voz más natural y consistente

Ambas herramientas se utilizaron de manera iterativa para crear un contenido informativo, coherente y con un tono adecuado para el proyecto.

## 🛠️ Stack Tecnológico

- **Framework**: Astro 5.16.8
- **UI**: React 19.2.3
- **Estilos**: Tailwind CSS 4.1.18 + daisyUI 5.5.14
- **Iconos**: Tabler Icons
- **Animaciones**: GSAP 3.14.2 (solo en landing page)
- **Tipografía**:
  - Cinzel (headings/h1-h6) - Fuente serif elegante
  - Inter (body/text) - Fuente sans-serif optimizada para lectura
- **Gestor de paquetes**: pnpm

## 📁 Estructura del Proyecto

```
/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables (Header, Footer, Section)
│   ├── layouts/        # Layouts de página
│   ├── pages/          # Rutas Astro
│   │   ├── index.astro         # Landing page con GSAP
│   │   ├── politica.astro       # Sistema político
│   │   ├── defensa.astro        # Defensa federal
│   │   ├── infraestructura.astro # EuroBananas
│   │   ├── educacion.astro      # Lingua Franca
│   │   ├── vivienda.astro       # Vivienda y pensiones
│   │   ├── simbolos.astro       # Símbolos federales
│   │   └── intro.astro         # Introducción a la federación
│   └── styles/         # Estilos globales
├── AGENTS.md           # Guía para agentes de desarrollo
└── package.json
```

## 🎨 Convenciones de Código

Ver [`AGENTS.md`](./AGENTS.md) para las convenciones completas del proyecto:

- **UI Framework**: daisyUI por defecto con Tailwind CSS
- **Imports**: Explicitos desde `@tabler/icons-react`
- **Componentes**: PascalCase para Astro components
- **Temas**: 5 temas daisyUI configurados (light, dark, corporate, business, luxury)

## 🚀 Comandos de Desarrollo

| Comando        | Acción                                            |
| -------------- | ------------------------------------------------- |
| `pnpm install` | Instala dependencias                              |
| `pnpm dev`     | Inicia servidor de desarrollo en `localhost:4321` |
| `pnpm build`   | Compila para producción en `./dist/`              |
| `pnpm preview` | Previsualiza la build de producción localmente    |

## 🔍 Optimización SEO

El proyecto ha sido optimizado para SEO con:

- Meta tags completos (title, description, image)
- Open Graph tags para redes sociales
- Enlaces canónicos configurados
- Sitemap XML generado automáticamente
- HTML semántico y accesible
- Imágenes con atributos alt
- Estructura de headings correcta (h1-h6)

**Estado**: ✅ Optimizado y listo para producción

## 🌐 Deployment

El proyecto está desplegado en:

- **https://europa.comovas.es/** - Despliegue principal
- **https://sergiocomovas.github.io/eue-site/** - Mirror en GitHub Pages

El proyecto está configurado para despliegue en cualquier plataforma que soporte sitios estáticos (Vercel, Netlify, GitHub Pages, etc.).

## 📄 Contenido

### Páginas principales

1. **Index** - Landing page animada con GSAP y scroll horizontal
2. **Política** - Sistema político federal, democracia directa, economía blindada
3. **Defensa** - Ejército Europeo, Policía Federal, UMEE
4. **Infraestructura** - EuroBananas, trenes de alta velocidad, red energética
5. **Educación** - Currículo federal común, Lingua Franca europea
6. **Símbolos** - Banderas, escudo, DNI federal, días festivos
7. **Vivienda** - Vivienda garantizada en 22 años, sistema de pensiones
8. **Intro** - Introducción general a la federación

### Características destacadas

- **5 Temas daisyUI**: Light, Dark, Corporate, Business, Luxury
- **Responsive**: Mobile-first, adaptable a todos los dispositivos
- **Accesibilidad**: HTML semántico, ARIA labels, contraste de color WCAG
- **Animaciones**: GSAP en landing page, transiciones suaves en navegación
- **Iconos**: Tabler Icons para elementos visuales

## 🎯 Propósito del Proyecto

Este es un **proyecto de aprendizaje habitual** creado para:

- Explorar tecnologías web modernas (Astro, React, Tailwind CSS v4, daisyUI v5)
- Practicar desarrollo de sitios estáticos optimizados
- Experimentar con animaciones GSAP y transiciones
- Implementar sistemas de temas múltiples
- Aprender sobre SEO y accesibilidad web

No representa una iniciativa política real ni está asociado con ninguna organización gubernamental o de la Unión Europea.

## 📝 Notas

- El contenido ha sido generado con IA (ChatGPT y Grok) y refinado para coherencia
- El sitio es completamente estático, ideal para despliegue rápido
- Performance optimizado con build optimizado de Astro
- Fuente Cinzel aplicada a headings, Inter para body text
- Temas implementados con `data-theme` de daisyUI

## 🔗 Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de daisyUI](https://daisyui.com)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de GSAP](https://gsap.com)

## 📄 Licencia

Este proyecto es de uso exclusivamente educativo y de aprendizaje.
