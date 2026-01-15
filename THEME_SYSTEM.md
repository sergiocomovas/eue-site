# Sistema de Temas Claro/Oscuro

## Visión General

Este proyecto implementa un sistema de temas claro/oscuro completamente funcional basado en Tailwind CSS y JavaScript nativo. El sistema permite a los usuarios cambiar entre temas con persistencia automática y transiciones suaves.

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
   - Todos los componentes utilizan clases `dark:` de Tailwind
   - Ejemplo: `bg-white dark:bg-gray-900`

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
  html.classList.remove('light', 'dark');
  html.classList.add(theme);
  localStorage.setItem('theme', theme);
  
  document.cookie = `theme=${theme}; path=/; max-age=31536000`;
}
```

El sistema:
- Actualiza la clase `dark` en el elemento `<html>`
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
  document.documentElement.classList.add(theme);
</script>
```

## Implementación en Componentes

### Patrones de Clases Tailwind

#### Fondos
```astro
<!-- Fondo claro: blanco, Fondo oscuro: gris oscuro -->
<div class="bg-white dark:bg-gray-900">

<!-- Fondo con gradiente -->
<div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950">
```

#### Texto
```astro
<!-- Texto principal -->
<p class="text-gray-900 dark:text-gray-100">

<!-- Texto secundario -->
<span class="text-gray-600 dark:text-gray-400">
```

#### Bordes
```astro
<!-- Bordes sutiles -->
<div class="border border-gray-200 dark:border-gray-700">

<!-- Bordes de énfasis -->
<div class="border-blue-200 dark:border-blue-900">
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

<div class="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
  <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
  <p class="text-gray-600 dark:text-gray-400">{description}</p>
  <div class="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
    <IconStar />
    <span>Destacado</span>
  </div>
</div>
```

## Especificaciones de Diseño

### Paleta de Colores

#### Tema Claro
- Fondo principal: `bg-white`
- Fondo secundario: `bg-gray-50`, `bg-blue-50`
- Texto principal: `text-gray-900`
- Texto secundario: `text-gray-600`
- Bordes: `border-gray-200`, `border-gray-300`
- Acentos: `blue-600`, `indigo-600`

#### Tema Oscuro
- Fondo principal: `bg-gray-900`
- Fondo secundario: `bg-gray-800`, `bg-gray-950`
- Texto principal: `text-gray-100`
- Texto secundario: `text-gray-400`
- Bordes: `border-gray-700`, `border-gray-800`
- Acentos: `blue-400`, `indigo-400`

### Contraste WCAG

Todos los colores cumplen con:
- **WCAG AA**: Contraste mínimo 4.5:1 para texto normal
- **WCAG AAA**: Contraste mínimo 7:1 para texto grande

Ejemplos:
- `text-gray-900` sobre `bg-white`: 21:1 ✓
- `text-gray-100` sobre `bg-gray-900`: 15:1 ✓
- `text-gray-600` sobre `bg-white`: 7:1 ✓
- `text-gray-400` sobre `bg-gray-900`: 6:1 ✓

## Modificación y Extensión

### Añadir Dark Mode a un Nuevo Componente

1. Identificar todos los elementos visuales (fondo, texto, bordes, iconos)
2. Para cada clase de Tailwind, añadir la variante `dark:`
3. Asegurar transiciones suaves: `transition-colors duration-200`
4. Verificar contraste en ambos temas

**Ejemplo:**
```astro
<!-- ANTES -->
<div class="bg-blue-500 text-white p-4">

<!-- DESPUÉS -->
<div class="bg-blue-500 dark:bg-blue-700 text-white p-4 transition-colors duration-200">
```

### Crear un Nuevo Color de Acento

```astro
<!-- Definir ambos variantes -->
<button class="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white">
  Botón de acción
</button>
```

### Modificar el Selector de Tema

El selector de tema se encuentra en `src/components/Header.astro`. Para personalizar:

1. Cambiar iconos en las importaciones
2. Modificar estilos del botón en las clases Tailwind
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
- Componentes con soporte completo dark mode
- Transiciones suaves entre temas

## Troubleshooting

### Tema no persiste al recargar
- Verificar que `localStorage.setItem('theme', theme)` se está llamando
- Comprobar que el script inline de inicialización está presente en Layout.astro

### Parpadeo al cargar
- Asegurar que el script inline tiene `is:inline`
- Verificar que las transiciones CSS tienen duración correcta
- Comprobar que no hay estilos CSS personalizados que interfieran

### Iconos no cambian
- Verificar que `updateThemeIcons()` se está llamando en `applyTheme()`
- Asegurar que las importaciones de iconos son explícitas (no barrels)

### Colores sin contraste suficiente
- Usar herramientas de contraste WCAG online
- Verificar combinaciones de texto/fondo en ambos temas
- Ajustar clases Tailwind según sea necesario

## Convenciones de Código

### Reglas de Oro

1. **SIEMPRE** usar `dark:` prefix para variantes oscuras
2. **SIEMPRE** importar iconos explícitamente: `import { IconName } from '@tabler/icons-react'`
3. **NUNCA** usar `any` o `unknown` en TypeScript
4. **SIEMPRE** añadir `transition-colors duration-200` para transiciones suaves
5. **SIEMPRE** verificar contraste WCAG en ambos temas

### Ejemplo Correcto

```astro
---
import { IconCheck } from '@tabler/icons-react';

const { completed } = Astro.props;
---

<div class="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
  <div class={`w-6 h-6 rounded-full flex items-center justify-center ${completed ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}`}>
    {completed && <IconCheck class="text-white" />}
  </div>
  <span class="text-gray-900 dark:text-gray-100">
    <slot />
  </span>
</div>
```

## Referencias

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [Tabler Icons](https://tabler-icons.io/)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
