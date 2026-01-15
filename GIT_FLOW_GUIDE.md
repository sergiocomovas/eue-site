# Git Flow Guide

## Convención de nombres

Todas las ramas feature tienen el formato: `feature/yyyy-mm-dd-hh-ss-descripcion`

Ejemplos:
- `feature/2026-01-15-14-30-agregar-botones-likes`
- `feature/2026-01-16-09-15-arreglar-footer`
- `feature/2026-01-20-16-45-nuevo-componente`

## Flujo de trabajo diario

### 1. Crear nueva feature
```bash
# Asegurarse de estar en develop
git checkout develop

# Actualizar develop
git pull origin develop

# Crear nueva feature (formato: yyyy-mm-dd-hh-ss-descripcion)
git checkout -b feature/2026-01-15-14-30-mi-tarea
```

### 2. Trabajar y hacer commits
```bash
# Hacer cambios en los archivos
# ...

# Ver estado
git status

# Agregar archivos
git add .

# Commit con mensaje descriptivo
git commit -m "Agregar componente LikeButton con animaciones"
```

### 3. Cerrar feature (merge + push en un comando)
```bash
# Volver a develop
git checkout develop

# Actualizar develop
git pull origin develop

# Merge de la feature y borrarla
git merge --no-ff feature/2026-01-15-14-30-mi-tarea -m "Merge feature 2026-01-15-14-30-mi-tarea"

# Borrar rama local
git branch -d feature/2026-01-15-14-30-mi-tarea

# Subir cambios y borrar rama remota
git push origin develop && git push origin --delete feature/2026-01-15-14-30-mi-tarea
```

## Comando unificado para cerrar feature

Si quieres hacer todo en un solo comando (merge + push + borrar):

```bash
# Guardar esto como alias en tu shell o usar directamente
git checkout develop && \
git pull origin develop && \
git merge --no-ff feature/2026-01-15-14-30-mi-tarea -m "Merge feature 2026-01-15-14-30-mi-tarea" && \
git branch -d feature/2026-01-15-14-30-mi-tarea && \
git push origin develop && \
git push origin --delete feature/2026-01-15-14-30-mi-tarea
```

## Ramas principales

### `main`
- Producción
- Solo código estable
- Tags: `v1.0.0`, `v1.1.0`, etc.

### `develop`
- Desarrollo diario
- Todas las features se mergen aquí
- Base para nuevas features y releases

## Tipos de ramas

### `feature/*`
- Nueva funcionalidad
- Nacen de `develop`
- Se fusionan en `develop`

### `release/*` (opcional)
- Preparar release
- Nacen de `develop`
- Se fusionan en `main` (con tag) y `develop`

### `hotfix/*` (opcional)
- Corrección urgente en producción
- Nacen de `main`
- Se fusionan en `main` (con tag) y `develop`

### `bugfix/*` (opcional)
- Bug no urgente
- Nacen de `develop`
- Se fusionan en `develop`

## Escenarios comunes

### Escenario 1: Nueva funcionalidad
```bash
# 1. Crear feature desde develop
git checkout develop
git pull
git checkout -b feature/2026-01-15-14-30-nueva-funcion

# 2. Trabajar
# ... hacer cambios ...
git add .
git commit -m "Implementar nueva funcionalidad"

# 3. Cerrar feature
git checkout develop
git merge --no-ff feature/2026-01-15-14-30-nueva-funcion
git branch -d feature/2026-01-15-14-30-nueva-funcion
git push origin develop
git push origin --delete feature/2026-01-15-14-30-nueva-funcion
```

### Escenario 2: Corregir bug en desarrollo
```bash
# 1. Crear bugfix desde develop
git checkout develop
git pull
git checkout -b bugfix/2026-01-15-15-00-corregir-error

# 2. Corregir
git add .
git commit -m "Corregir error en footer"

# 3. Cerrar bugfix
git checkout develop
git merge --no-ff bugfix/2026-01-15-15-00-corregir-error
git branch -d bugfix/2026-01-15-15-00-corregir-error
git push origin develop
git push origin --delete bugfix/2026-01-15-15-00-corregir-error
```

### Escenario 3: Hotfix urgente en producción
```bash
# 1. Crear hotfix desde main
git checkout main
git pull
git checkout -b hotfix/2026-01-15-16-00-critico-bug

# 2. Corregir y commit
git add .
git commit -m "Corregir bug crítico"

# 3. Merge en main y crear tag
git checkout main
git merge --no-ff hotfix/2026-01-15-16-00-critico-bug
git tag v1.0.1
git branch -d hotfix/2026-01-15-16-00-critico-bug

# 4. Merge en develop
git checkout develop
git merge --no-ff hotfix/2026-01-15-16-00-critico-bug
git branch -d hotfix/2026-01-15-16-00-critico-bug

# 5. Subir todo
git push origin main --tags
git push origin develop
git push origin --delete hotfix/2026-01-15-16-00-critico-bug
```

## Comandos útiles

### Ver ramas
```bash
# Ver ramas locales
git branch

# Ver ramas remotas
git branch -r

# Ver todas las ramas
git branch -a
```

### Ver historial
```bash
# Ver commits en rama actual
git log

# Ver commits en todas las ramas
git log --all --graph --oneline --decorate
```

### Ver estado
```bash
# Ver archivos modificados
git status

# Ver cambios en archivo específico
git diff archivo.txt
```

## Reglas del equipo

1. **Siempre crear features desde develop**
2. **Usar formato de nombre: yyyy-mm-dd-hh-ss-descripcion**
3. **Hacer commits con mensajes claros**
4. **Nunca hacer commits directos en develop**
5. **Siempre hacer pull antes de crear feature**
6. **Cerrar features con merge a develop**
7. **Borrar ramas feature después del merge**
8. **Hotfixes desde main, bugfixes desde develop**

## GitHub Actions

El build se ejecuta automáticamente en cada push a:
- `main`
- `develop`
- `feature/*`
- `release/*`
- `hotfix/*`

Si el build falla, corregir antes de continuar.
