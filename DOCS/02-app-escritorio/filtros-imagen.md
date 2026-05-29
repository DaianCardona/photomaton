# Filtros de imagen

Cubre RF-040. El filtro se elige en [ajustes](pantalla-ajustes.md) (por evento) y se aplica a cada
foto antes del montaje. Se puede permitir que el invitado lo elija si así se configura.

## Catálogo propuesto

| Filtro | Descripción | Implementación (sharp) |
|--------|-------------|------------------------|
| **Normal** | Sin alteración de color | (identidad) |
| **Blanco y negro** | Escala de grises | `grayscale()` |
| **Sepia** | Tono cálido antiguo | matriz de color / `tint()` cálido |
| **Beige / cálido** | Tono suave crema (encaja con plantillas BEIGE) | `tint()` + ligera bajada de saturación |
| **Frío** | Tono azulado | `tint()` frío |
| **Vívido** | +saturación, +contraste | `modulate({ saturation })` + curva |
| **Suave / retro** | Bajo contraste, ligero desvanecido | curva + leve `blur` en sombras |
| **Alto contraste B/N** | B/N dramático | `grayscale()` + curva de contraste |

> Lista ampliable. Cada filtro es una función `(buffer) → buffer` en `main/media/filters/`.

## Pipeline de aplicación

```
original (JPG/RAW del disparo)
   │  (se guarda intacto en originales/)
   ▼
[normalizar/orientar EXIF]
   ▼
[fondo virtual] (si croma/IA activo)  ── opcional ──►  ver fondos-virtuales.md
   ▼
[FILTRO de color]
   ▼
[atrezzo virtual] (overlays)          ── opcional ──►  ver atrezzo-virtual.md
   ▼
single (se guarda) ──► se incrusta en el hueco de la plantilla (layout)
```

El orden importa: el filtro se aplica **después** del reemplazo de fondo (para que fondo y persona
queden con el mismo tono) y **antes** del atrezzo (para que los overlays mantengan su color original).

## Rendimiento

- sharp (libvips) procesa en milisegundos a resolución de impresión; cumple RNF-001/003.
- Para el **preview** se usa una versión reducida; el filtro definitivo se aplica a resolución completa al montar el layout.

## Configuración

| Parámetro | Valor |
|-----------|-------|
| Filtro por defecto del evento | configurable (Normal) |
| ¿Invitado puede cambiar filtro? | sí/no (configurable) |
| Intensidad del filtro | opcional (0–100%) por filtro |

Relacionado: [ajustes](pantalla-ajustes.md) · [fondos virtuales](fondos-virtuales.md) · [atrezzo](atrezzo-virtual.md).
