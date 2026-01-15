# Sistema de Temas daisyUI

## Visión General

Este proyecto implementa un sistema de temas basado en daisyUI, que proporciona múltiples temas preconfigurados que cambian automáticamente los colores semánticos de la aplicación. El sistema permite a los usuarios cambiar entre temas con persistencia automática y transiciones suaves.

## Arquitectura del Sistema

### Componentes Principales

1. **Layout.astro** - Lógica central del tema
   - Ubicación: `src/layouts/Layout.astro`
   - Funciones clave: `getTheme()`, `applyTheme()`, `eueToggleTheme()`
   - Responsabilidad: Coordinar la inicialización, persistencia y cambio de temas

2. **Header.astro** - Selector de tema en UI
   - Ubicación: `src/components/Header.astro`
   - Funcionalidad: Botón de cambio de tema con iconos dinámicos
   - Iconos: `IconSun` (tema claro), `IconMoon` (tema oscuro)

3. **Componentes Visuales** - Estilos adaptativos
   - Todos los componentes utilizan colores semánticos de daisyUI
   - Ejemplo: `bg-base-100 text-base-content`

## Mecanismo de Funcionamiento

### Inicialización del Tema

```javascript
function getTheme() {
  const theme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return theme || (prefersDark ? 'dark' : 'light');
}
```

El tema se determina en este orden:
1. Valor almacenado en localStorage (prioridad más alta)
2. Preferencia del sistema operativo
3. Por defecto: tema claro

### Aplicación del Tema

```javascript
function applyTheme(theme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  document.cookie = `theme=${theme}; path=/; max-age=31536000`;
}
```

El sistema:
- Actualiza el atributo `data-theme` en el elemento `<html>`
- Almacena la preferencia en localStorage
- Establece una cookie para persistencia del lado del servidor

### Prevención de Flashing

Para evitar parpadeos al cargar:

```html
<style is:global>
  html { view-transition-name: none; }
  body { transition: background-color 0.2s, color 0.2s; }
</style>
```

```html
<script is:inline>
  const theme = (() => {
    const stored = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return stored || (systemDark ? 'dark' : 'light');
  })();
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

## Implementación en Componentes

### Patrones de Colores Semánticos daisyUI

#### Fondos
```astro
<!-- Fondo base (cambia según tema) -->
<div class="bg-base-100">

<!-- Fondo secundario -->
<div class="bg-base-200">

<!-- Fondo acentuado -->
<div class="bg-base-300">
```

#### Texto
```astro
<!-- Texto principal -->
<p class="text-base-content">

<!-- Texto secundario -->
<span class="text-base-content/70">
```

#### Bordes
```astro
<!-- Bordes sutiles -->
<div class="border-base-300">

<!-- Bordes de énfasis -->
<div class="border-primary">
```

#### Colores Semánticos
```astro
<!-- Colores funcionales -->
<button class="btn btn-primary">Acción principal</button>
<button class="btn btn-secondary">Acción secundaria</button>
<button class="btn btn-accent">Acento</button>

<!-- Colores de estado -->
<div class="text-success">Éxito</div>
<div class="text-warning">Advertencia</div>
<div class="text-error">Error</div>
<div class="text-info">Información</div>
```

#### Iconos
```astro
<!-- Importación explícita (SIEMPRE) -->
import { IconSun, IconMoon } from '@tabler/icons-react';

<!-- Uso condicional -->
{theme === 'dark' ? <IconSun /> : <IconMoon />}
```

### Ejemplo Completo de Componente

```astro
---
import { IconStar } from '@tabler/icons-react';

interface CardProps {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<div class="bg-base-100 rounded-lg border border-base-300 p-6 transition-colors duration-200">
  <h3 class="text-xl font-bold text-base-content mb-2">{title}</h3>
  <p class="text-base-content/70">{description}</p>
  <div class="mt-4 flex items-center gap-2 text-primary">
    <IconStar />
    <span>Destacado</span>
  </div>
</div>
```

## Especificaciones de Diseño

### Colores Semánticos daisyUI

#### Colores Base (siempre disponibles)
- `bg-base-100` / `text-base-content` - Fondo/texto principal
- `bg-base-200` / `text-base-content/70` - Fondo/texto secundario
- `bg-base-300` / `text-base-content/50` - Fondo/texto terciario

#### Colores Funcionales
- `primary` - Color primario (acciones principales)
- `secondary` - Color secundario (acciones secundarias)
- `accent` - Color de acento (detalles destacados)
- `neutral` - Color neutro (información genérica)

#### Colores de Estado
- `success` - Éxito/confirmación
- `warning` - Advertencia/precaución
- `error` - Error/crítico
- `info` - Información/nota

### Temas Disponibles

daisyUI incluye múltiples temas preconfigurados:
- `light` - Tema claro por defecto
- `dark` - Tema oscuro por defecto
- `cupcake`, `bumblebee`, `emerald`, `corporate`, `synthwave`, etc.

Puedes configurar los temas disponibles en `tailwind.config.js`.

### Contraste WCAG

Todos los colores semánticos de daisyUI cumplen con:
- **WCAG AA**: Contraste mínimo 4.5:1 para texto normal
- **WCAG AAA**: Contraste mínimo 7:1 para texto grande

Los temas daisyUI están diseñados para cumplir automáticamente con los estándares de accesibilidad.

## Modificación y Extensión

### Añadir Soporte de Temas a un Nuevo Componente

1. Identificar todos los elementos visuales (fondo, texto, bordes, iconos)
2. Reemplazar colores específicos de Tailwind con colores semánticos daisyUI
3. Asegurar transiciones suaves: `transition-colors duration-200`
4. Verificar contraste en múltiples temas

**Ejemplo:**
```astro
<!-- ANTES -->
<div class="bg-blue-500 text-white p-4">

<!-- DESPUÉS -->
<div class="bg-primary text-primary-content p-4 transition-colors duration-200">
```

### Configurar Nuevos Temas

Edita `tailwind.config.js` para añadir o personalizar temas:

```javascript
// tailwind.config.js
module.exports = {
  // ...
  daisyui: {
    themes: [
      "light",
      "dark",
      {
        mytheme: {
          "primary": "#009080",
          "secondary": "#9900f0",
          "accent": "#f00000",
          "neutral": "#003f49",
          "base-100": "#f3f4f6",
          // ... más colores
        },
      },
    ],
  },
}
```

### Modificar el Selector de Tema

El selector de tema se encuentra en `src/components/Header.astro`. Para personalizar:

1. Cambiar iconos en las importaciones
2. Modificar estilos del botón con clases daisyUI
3. Ajustar la lógica en `updateThemeIcons()` si cambia la estructura

## Páginas Especiales

### index.astro

Esta página mantiene su diseño original sin selector de temas:
- Diseño personalizado con GSAP animations
- Tema oscuro fijo (`#020617` background)
- Sin modificación del sistema de temas

**NO** añadir selector de temas a index.astro.

### Resto de Páginas

Todas las demás páginas (`educacion.astro`, `vivienda.astro`, etc.) incluyen:
- Header con selector de tema
- Componentes con soporte completo de temas daisyUI
- Transiciones suaves entre temas

## Troubleshooting

### Tema no persiste al recargar
- Verificar que `localStorage.setItem('theme', theme)` se está llamando
- Comprobar que el script inline de inicialización está presente en Layout.astro
- Verificar que `data-theme` se establece en `<html>` element

### Parpadeo al cargar
- Asegurar que el script inline tiene `is:inline`
- Verificar que las transiciones CSS tienen duración correcta
- Comprobar que no hay estilos CSS personalizados que interfieran

### Iconos no cambian
- Verificar que `updateThemeIcons()` se está llamando en `applyTheme()`
- Asegurar que las importaciones de iconos son explícitas (no barrels)

### Colores sin contraste suficiente
- Usar colores semánticos daisyUI que cumplen WCAG
- Evitar colores personalizados sin verificar contraste
- Verificar combinaciones en múltiples temas usando herramientas online

### Temas no cambian
- Verificar que daisyUI está instalado: `pnpm add -D daisyui`
- Comprobar que `tailwind.config.js` tiene daisyUI configurado
- Asegurar que el atributo `data-theme` se actualiza correctamente

## Convenciones de Código

### Reglas de Oro

1. **SIEMPRE** usar colores semánticos daisyUI (`bg-base-100`, `text-base-content`, etc.)
2. **NUNCA** usar clases `dark:` de Tailwind con colores daisyUI
3. **SIEMPRE** importar iconos explícitamente: `import { IconName } from '@tabler/icons-react'`
4. **NUNCA** usar `any` o `unknown` en TypeScript
5. **SIEMPRE** añadir `transition-colors duration-200` para transiciones suaves
6. **SIEMPRE** verificar contraste WCAG en múltiples temas

### Ejemplo Correcto

```astro
---
import { IconCheck } from '@tabler/icons-react';

const { completed } = Astro.props;
---

<div class="flex items-center gap-3 p-4 bg-base-100 rounded-lg border border-base-300 transition-colors duration-200">
  <div class={`w-6 h-6 rounded-full flex items-center justify-center ${completed ? 'bg-success text-success-content' : 'bg-base-200'}`}>
    {completed && <IconCheck />}
  </div>
  <span class="text-base-content">
    <slot />
  </span>
</div>
```

### Ejemplo Incorrecto

```astro
<!-- ❌ NO: Usar clases dark: de Tailwind -->
<div class="bg-white dark:bg-gray-900">

<!-- ❌ NO: Usar colores específicos de Tailwind -->
<div class="bg-blue-500 text-white">

<!-- ✅ SI: Usar colores semánticos daisyUI -->
<div class="bg-primary text-primary-content">
```

## Referencias

- [daisyUI Themes](https://daisyui.com/docs/themes/)
- [daisyUI Colors](https://daisyui.com/docs/colors/)
- [daisyUI LLM Guide](https://daisyui.com/llms.txt)
- [Tabler Icons](https://tabler-icons.io/)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
