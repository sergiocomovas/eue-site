# AGENTS.md - Guía para Agentes de Desarrollo

Este archivo contiene las convenciones y comandos para trabajar en este proyecto. Es obligatorio leerlo antes de hacer cambios de envergadura.

## 🚀 Comandos de Construcción y Pruebas

### Desarrollo
```bash
pnpm dev              # Inicia servidor de desarrollo en http://localhost:4321
pnpm build            # Compila para producción en ./dist/
pnpm preview          # Previsualiza la build de producción localmente
```

### Linting y Type Checking
```bash
# Nota: Este proyecto aún no tiene configuración de linting. Al implementar, usar:
pnpm lint             # Ejecuta el linter configurado
pnpm type-check       # Verifica tipos de TypeScript
```

### Pruebas
```bash
# Nota: Este proyecto no tiene framework de tests configurado. 
# Al implementar, se sugiere Vitest para pruebas unitarias:
pnpm test              # Ejecuta todas las pruebas
pnpm vitest run -t "<nombre>"  # Ejecuta una prueba específica
```

### Antes de Commit
```bash
# Siempre ejecutar antes de commit (cuando estén disponibles):
pnpm build            # Verifica que la compilación funciona
pnpm lint             # Verifica estilo y tipos
pnpm test             # Verifica que las pruebas pasan
```

## 📚 Convenciones de Código

### Imports y Exportaciones
- **Astro Components**: Usar `import Layout from '../layouts/Layout.astro'`
- **React Icons**: Importación EXPLÍCITA desde `@tabler/icons-react`, NUNCA barrels:
  ```astro
  import { IconStar, IconHeart } from '@tabler/icons-react';
  ```
- **Estructura**: Agrupar imports: Astro → Componentes → Iconos → Utilidades
- **Relativas**: Usar siempre `../` para archivos en mismo nivel, `../../` para dos niveles arriba

### Tipos de TypeScript
- **Modo estricto**: `tsconfig.json` hereda de `astro/tsconfigs/strict`
- **Evitar**: `any` y `unknown` a menos que sea absolutamente necesario
- **Inferencia**: Dejar que TypeScript infiera tipos siempre que sea posible
- **Interfaces**: Definir interfaces con nombres descriptivos:
  ```astro
  interface SectionProps {
    title: string;
    icon?: typeof import('@tabler/icons-react').Icon;
    children: any;
    id?: string;
    imagePlaceholder?: boolean;
    note?: string;
    imagePlaceholder2?: boolean;
    imagePlaceholder3?: boolean;
  }
  ```

### Nomenclatura
- **Componentes Astro**: PascalCase (ej. `Section.astro`, `Header.astro`)
- **Archivos TypeScript**: camelCase o kebab-case (ej. `utils.ts`, `types.ts`)
- **Variables**: camelCase para todo
- **Constantes**: UPPER_SNAKE_CASE
- **Props**: Destructurar en frontmatter de Astro:
  ```astro
  const { title, icon: Icon, id, imagePlaceholder } = Astro.props;
  ```

### Formato y Estilos
- **daisyUI**: Framework UI por defecto basado en Tailwind CSS. Usar siempre componentes de daisyUI antes de crear clases custom
  - Documentación: https://daisyui.com/
  - Guía LLM: https://daisyui.com/llms.txt
  - Instalación: `pnpm add -D daisyui`
  - Colores semánticos: `primary`, `secondary`, `accent`, `neutral`, `success`, `warning`, `error`, `info`, `base-*` (no usar `dark:` con colores daisyUI)
- **Tailwind CSS**: ÚNICA solución de estilos base, sin CSS custom excepto en `<style>` cuando sea necesario
- **Clases duplicadas**: Extraer en componentes si se repite una combinación común
- **Dark mode**: Usar colores semánticos daisyUI que cambian automáticamente por tema:
  ```astro
  class="bg-base-100 text-base-content"
  ```
- **Responsive**: Mobile-first: `p-4 sm:px-6 lg:px-8` para márgenes

### Estructura de Componentes Astro
```astro
---
// Frontmatter: imports e interfaces
import Layout from '../layouts/Layout.astro';
import Section from '../components/Section.astro';
import { IconStar } from '@tabler/icons-react';

// Props (si aplica)
const { title } = Astro.props;

// Layout wrapper
<Layout title="Título de la Página">
  <Header />
  <main>
    <Section title={title} icon={IconStar}>
      <slot />
    </Section>
  </main>
  <Footer />
</Layout>
```

## 🎨 Pautas de UI y Accesibilidad

### HTML Semántico
- Usar etiquetas semánticas apropiadas: `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<h1>-<h6>`
- Jerarquía correcta: `<h1>` una sola vez por página, `<h2>` para secciones principales

### Accesibilidad
- **ARIA labels**: Siempre en botones y formularios:
  ```astro
  <button aria-label="Abrir menú">
  ```

- **Focus visible**: El foco debe ser visible en el elemento activo (Tailwind: `focus:ring-2`)
- **Contraste de color**: Usar siempre colores con contraste suficiente (WCAG AA o AAA)
- **Texto de links**: Descriptivo, no "haz clic aquí"

### Prioridades
1. **Legibilidad** sobre belleza - fuentes legibles, contraste suficiente
2. **Claro** sobre compacto - usar espacio en blanco generoso en desktop
3. **Funcional** sobre estética - que funcione primero, que se vea bien después
4. **Móvil primero** - diseñar para móvil, luego escalar para desktop

## 🚨 Manejo de Errores y Casos Específicos

### TypeScript
```astro
// ❌ NO: evita tipos vagos
const data: any = props.data;

// ✅ SI: usa tipos específicos
const data: { title: string; content: string[] } = props.data;
```

### Iconos de Tabler
```astro
// ❌ NO: barrel import
import * as Icons from '@tabler/icons-react';

// ✅ SI: importación explícita
import { IconStar, IconHeart, IconMenu } from '@tabler/icons-react';
```

### Estilos Inline
```astro
// ❌ NO: estilos inline complejos
<div style="background-color: #1e2937; color: white; padding: 1rem;">

// ✅ SI: clases de Tailwind
<div class="bg-gray-900 text-white p-4">
```

### Temas daisyUI
```astro
// ❌ NO: usar clases dark: de Tailwind
<p class="text-gray-900 dark:text-gray-100">

// ✅ SI: usar colores semánticos daisyUI
<p class="text-base-content">
```

## 🏗 Arquitectura del Proyecto

```
src/
├── components/        # Componentes reutilizables (Sección, Header, Footer, etc.)
├── layouts/           # Layouts de página (Layout.astro principal)
├── pages/             # Rutas Astro (cada .astro es una página)
├── styles/            # Estilos globales (global.css)
└── utils/             # Funciones utilitarias (si aplica)
```

### Componentes
- **Pequeños y de una sola responsabilidad**: Un componente hace una cosa bien
- **Composición sobre configuración**: Crear componentes pequeños y combinarlos
- **Props mínimos**: Solo lo que el componente realmente necesita
- **Slots**: Usar `<slot />` para contenido dinámico en Astro

### Páginas
- Cada `.astro` en `src/pages/` es una ruta automática
- Usa layouts para contenido compartido (Header, Footer)
- Las páginas principales se dividen en secciones con el componente `Section`

## 🧪 Reglas de Cursor/Copilot (si aplica)

Este proyecto usa Astro + React + TypeScript. Aplicar las siguientes reglas:

### Componentes Astro
- Usar frontmatter para imports y datos
- Destructurar `Astro.props` en frontmatter
- Usar `<slot />` para contenido hijo
- No mezclar Astro y React en el mismo archivo sin necesidad

### TypeScript
- Modo estricto habilitado en `tsconfig.json`
- Definir interfaces para props complejos
- Usar tipos de Astro: `typeof import('@tabler/icons-react').Icon`

### Estilos
- Tailwind CSS para TODO
- No CSS custom excepto cuando sea absolutamente necesario
- Temas usando colores semánticos de daisyUI (`bg-base-100`, `text-base-content`, etc.)

### Imports
- Iconos: Importación explícita desde `@tabler/icons-react`
- Relativos: Usar `../` y `../../`
- Astro: `import ... from 'astro'`

## ⚠️ Prohibiciones (NUNCA hacer)

- ❌ Usar `npm` o `yarn` - solo `pnpm`
- ❌ Usar `any` o `unknown` en TypeScript
- ❌ Importar iconos desde barrels: `import * as Icons from '@tabler/randir-icons-react'`
- ❌ CSS custom sin necesidad absoluta
- ❌ Duplicar clases de Tailwind que podrían extraerse a componentes
- ❌ No usar componentes daisyUI cuando existan (crear UI custom sin razón)
- ❌ Code golf: Claro > Corto > Eficiente
- ❌ Commit con errores de tipos o de compilación

## 📊 Checklist Antes de Commit

Antes de crear un commit, verificar:

- [ ] `pnpm build` compila sin errores
- [ ] `pnpm lint` pasa (si está configurado)
- [ ] `pnpm test` pasa (si está configurado)
- [ ] Los componentes UI usan daisyUI cuando aplica
- [ ] Los iconos se importan explícitamente (no barrels)
- [ ] No hay `any` o `unknown` innecesarios
- [ ] Los temas daisyUI funcionan correctamente
- [ ] Mobile-first responsive está implementado
- [ ] HTML semántico usado correctamente
- [ ] No hay console.logs de producción
- [ ] Todas las páginas son navegables desde el menú principal

## 📝 Guía de Commits y Pull Requests

### Formato de Título de Commit
```
<tipo>(<scope>): <breve descripción>

Ejemplos:
feat(economia): añadir sección de economía y migración
fix(navegación): corregir enlaces rotos en menú móvil
refactor(vivienda): simplificar componente de vivienda
style(footer): actualizar colores de texto para modo oscuro
docs(readme): documentar comandos de construcción
```

### Título de Pull Request
```
<project_name>: <descripción clara y concisa>

Ejemplo:
[eue-site]: fusionar páginas de economía y migración
```

### Cuerpo del PR
- Explicar QUÉ cambió y POR QUÉ
- CÓMO se probó (navegación, temas, responsive, etc.)
- CÓMO se verifica (`pnpm build`, pruebas manuales, etc.)
- Capturas de pantalla para cambios visuales (si aplica)

## 🔄 Proceso de Desarrollo

### Para tareas nuevas
1. Crear rama de feature: `git checkout -b feature/nombre-de-la-tarea`
2. Implementar cambios siguiendo estas convenciones
3. Probar: `pnpm dev` y verificar en múltiples navegadores
4. Construir: `pnpm build`
5. Commit con formato descriptivo
6. Crear PR si se trabaja en equipo

### Para bugs o refactor
1. Crear rama: `git checkout -b fix/nombre-del-bug`
2. Corregir siguiendo las convenciones
3. Probar exhaustivamente
4. Verificar no se rompe nada existente
5. Commit y crear PR

## 🔧 Depuración y Problemas Comunes

### Error: "The requested module ... does not provide an export named"
- Verificar que el icono existe en `@tabler/icons-react`
- Usar importación explícita: `import { IconName } from '@tabler/icons-react';`
- Consultar: https://tabler-icons.io/

### Error: "Style prop expects a mapping..."
- No usar strings en `style` prop en componentes React
- Usar clases de Tailwind en su lugar
- Si es absolutamente necesario, usar objeto:
  ```astro
  <div style={{ color: 'red', padding: '1rem' }}>
  ```

### Error de compilación en Astro
- Verificar que todos los componentes tienen frontmatter válido
- Asegurar que las importaciones sean correctas
- Revisar sintaxis de plantillas Astro (se cierran correctamente)

### Temas no funcionan correctamente
- Verificar que el `data-theme` attribute está presente en el `<html>` element
- Probar en múltiples temas daisyUI (light, dark, etc.)
- Revisar que todos los componentes usan colores semánticos daisyUI

## 📚 Recursos de Referencia

- Documentación oficial de Astro: https://docs.astro.build
- daisyUI (Componentes UI por defecto): https://daisyui.com/
- Guía LLM daisyUI: https://daisyui.com/llms.txt
- Tailwind CSS: https://tailwindcss.com/docs
- Tabler Icons: https://tabler-icons.io
- TypeScript handbook: https://www.typescriptlang.org/docs/
- Accesibilidad Web: https://www.w3.org/WAI/WCAG21/quickref/
