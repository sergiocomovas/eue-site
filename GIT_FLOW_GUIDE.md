# Git Flow Guide

## Instalación

Primero instalar git flow si no está instalado:

```bash
# Windows (Git Bash)
# Ya viene instalado con Git para Windows
```

## Convención de nombres

Todas las features tienen el formato: `yyyy-mm-dd-hh-ss-descripcion`

Ejemplos:
- `2026-01-15-14-30-agregar-botones-likes`
- `2026-01-16-09-15-arreglar-footer`
- `2026-01-20-16-45-nuevo-componente`

## Flujo de trabajo diario

### 1. Inicializar git flow (solo la primera vez)
```bash
# En la carpeta del proyecto
git flow init -d
```

### 2. Crear nueva feature
```bash
# Asegurarse de estar en develop
git checkout develop
git pull origin develop

# Crear nueva feature
git flow feature start 2026-01-15-14-30-mi-tarea
```

Esto hace:
- Crea rama `feature/2026-01-15-14-30-mi-tarea` desde develop
- Cambia a esa rama automáticamente

### 3. Trabajar y hacer commits
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

Puedes hacer todos los commits que necesites en la feature.

### 4. Actualizar feature con cambios de develop (opcional)
```bash
# Si ha pasado tiempo y quieres traer cambios de develop
git flow feature pull origin 2026-01-15-14-30-mi-tarea
```

### 5. Cerrar feature (merge + push + borrar en UN comando)
```bash
# Terminar feature
git flow feature finish 2026-01-15-14-30-mi-tarea
```

Esto hace AUTOMÁTICAMENTE:
- Merge de la feature en develop
- Cambia a develop
- Borra la rama feature local
- No borra la rama remota (ver paso 6)

### 6. Subir cambios y borrar rama remota
```bash
# Subir develop
git push origin develop

# Borrar rama feature remota
git push origin --delete feature/2026-01-15-14-30-mi-tarea
```

## Ramas principales

### `main`
- Producción
- Solo código estable
- Tags: `v1.0.0`, `v1.1.0`, etc.

### `develop`
- Desarrollo diario
- Todas las features se fusionan aquí
- Base para nuevas features

## Comandos git flow

### Features
```bash
# Crear feature
git flow feature start yyyy-mm-dd-hh-ss-descripcion

# Listar features activas
git flow feature list

# Publicar feature (crear rama remota)
git flow feature publish yyyy-mm-dd-hh-ss-descripcion

# Traer cambios remotos a feature
git flow feature pull origin yyyy-mm-dd-hh-ss-descripcion

# Terminar feature
git flow feature finish yyyy-mm-dd-hh-ss-descripcion
```

### Releases (opcional)
```bash
# Crear release
git flow release start v1.0.0

# Terminar release (merge en main y develop, crear tag)
git flow release finish v1.0.0
```

### Hotfixes (opcional)
```bash
# Crear hotfix desde main
git flow hotfix start v1.0.1

# Terminar hotfix (merge en main y develop, crear tag)
git flow hotfix finish v1.0.1
```

## Escenarios comunes

### Escenario 1: Nueva funcionalidad
```bash
# 1. Crear feature desde develop
git checkout develop
git pull origin develop
git flow feature start 2026-01-15-14-30-nueva-funcion

# 2. Trabajar (hacer commits)
git add .
git commit -m "Implementar nueva funcionalidad"
# ... más commits ...

# 3. Actualizar con develop si es necesario
git flow feature pull origin 2026-01-15-14-30-nueva-funcion

# 4. Terminar feature (hace merge, cambia a develop, borra feature local)
git flow feature finish 2026-01-15-14-30-nueva-funcion

# 5. Subir cambios y borrar feature remota
git push origin develop
git push origin --delete feature/2026-01-15-14-30-nueva-funcion
```

### Escenario 2: Corregir bug en desarrollo (usando feature)
```bash
# 1. Crear feature para bug
git checkout develop
git pull origin develop
git flow feature start 2026-01-15-15-00-corregir-error

# 2. Corregir
git add .
git commit -m "Corregir error en footer"

# 3. Terminar
git flow feature finish 2026-01-15-15-00-corregir-error

# 4. Subir
git push origin develop
git push origin --delete feature/2026-01-15-15-00-corregir-error
```

### Escenario 3: Hotfix urgente en producción
```bash
# 1. Crear hotfix desde main
git flow hotfix start v1.0.1

# 2. Corregir
git add .
git commit -m "Corregir bug crítico"

# 3. Terminar (hace merge en main Y develop, crea tag v1.0.1)
git flow hotfix finish v1.0.1

# 4. Subir todo (main con tag + develop)
git push origin main --tags
git push origin develop
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

### Ver features activas
```bash
# Ver features en desarrollo
git flow feature list
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

1. **Usar `git flow feature start`** para crear features
2. **Usar formato yyyy-mm-dd-hh-ss-descripcion**
3. **Hacer commits con mensajes claros**
4. **Usar `git flow feature finish`** para cerrar features**
5. **Siempre hacer pull antes de crear feature**
6. **Siempre hacer push después de `feature finish`**
7. **Usar hotfixes para bugs críticos en producción**
8. **Usar features para bugs no críticos en desarrollo**

## GitHub Actions

El build se ejecuta automáticamente en cada push a:
- `main`
- `develop`
- `feature/*`
- `release/*`
- `hotfix/*`

Si el build falla, corregir antes de continuar.

## Ventajas de usar git flow

1. **Un comando crea rama y cambia a ella**
   ```bash
   git flow feature start 2026-01-15-14-30-mi-tarea
   ```

2. **Un comando cierra todo**
   - Merge en develop
   - Cambia a develop
   - Borra rama feature local
   ```bash
   git flow feature finish 2026-01-15-14-30-mi-tarea
   ```

3. **Menos comandos manuales**
   - No tienes que hacer `git checkout -b feature/...`
   - No tienes que hacer `git merge --no-ff`
   - No tienes que hacer `git branch -d feature/...`
