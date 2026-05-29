# Editor de plantillas

Cubre RF-010..016. Permite **importar** una plantilla PNG existente o **crear/editar** una desde cero,
a tamaño de papel, definiendo los huecos de foto y elementos gráficos. Al terminar, "Visualizar" lleva
directo a la pantalla de captura con esa plantilla.

## Lienzo

- Tamaños: **10x15 cm** y **5x15 cm** (tira). A **300 DPI** → 10x15 ≈ 1181×1772 px; 5x15 ≈ 591×1772 px (orientación vertical; horizontal a la inversa).
- Orientación **H/V** seleccionable.
- Reglas/guías y zonas de margen seguro (sangrado) para que el corte no recorte contenido.

## Elementos (capas)

| Capa | Descripción |
|------|-------------|
| **Fondo de plantilla** | PNG importado (las 8 familias actuales: BEIGE/ROSA/VERDE/PRIMAVERA/VIAJE/TIRAS BLANCAS) o color/imagen propio. |
| **Huecos de foto** | 1–4 rectángulos donde se incrustan las fotos. Cada hueco: posición, tamaño, orientación, modo de ajuste (cover/contain), esquinas redondeadas opcionales. |
| **Texto** | Nombres + fecha del evento, frases. Fuente, tamaño, color, alineación. Soporta variables (`{nombres}`, `{fecha}`). |
| **Imágenes/logos** | PNG con transparencia (logo DecaBox, decoración). |

## Importar plantilla existente

- El operador selecciona un PNG de plantilla (p. ej. de `DECABOX FOTOMATÓN\PLANTILLAS\BEIGE 10X15\1.png`).
- Se coloca como fondo y el operador **dibuja encima los huecos** donde irán las fotos.
- Se guarda la *spec* (huecos + capas) junto a la referencia al PNG.

## Crear desde cero

- Lienzo vacío → añadir fondo (color/imagen) → añadir huecos → añadir texto/logos.
- Plantillas de ejemplo en `assets/` para arrancar rápido.

## Modelo de plantilla (spec)

Se guarda como JSON (campo `spec_json` en SQLite, ver [modelo de datos](../01-arquitectura/modelo-datos-local.md)):

```json
{
  "size": "10x15",
  "orientation": "V",
  "dpi": 300,
  "background": { "type": "image", "path": "plantillas/beige_1.png" },
  "slots": [
    { "index": 0, "x": 90,  "y": 120,  "w": 1000, "h": 700, "fit": "cover", "rotation": 0 },
    { "index": 1, "x": 90,  "y": 860,  "w": 1000, "h": 700, "fit": "cover", "rotation": 0 }
  ],
  "layers": [
    { "type": "text", "text": "{nombres}", "x": 120, "y": 1600, "font": "Great Vibes", "size": 64, "color": "#5b4636", "align": "center" },
    { "type": "text", "text": "{fecha}",   "x": 120, "y": 1690, "font": "Montserrat", "size": 36, "color": "#5b4636", "align": "center" },
    { "type": "image", "path": "assets/logo-decabox.png", "x": 980, "y": 1680, "w": 120, "h": 60 }
  ]
}
```

## Tecnología

- **Konva (react-konva)** o **Fabric.js** para el canvas con capas, arrastrar/redimensionar, texto e imágenes.
- El **render final** (composición sobre las fotos reales, a 300 DPI) se hace en el proceso main con **sharp** para máxima calidad y rendimiento, a partir de la misma *spec*.
- Separación clara: el editor produce la *spec*; el motor de montaje (en `media/`) la consume tanto para preview como para el layout impreso.

## Acciones

- Guardar / Guardar como (plantilla reutilizable entre eventos).
- Previsualizar con fotos de muestra.
- **Visualizar** → fija la plantilla como activa del evento y abre la pantalla de captura (RF-016).

Relacionado: [flujo de captura](flujo-captura.md) · [estructura de carpetas](estructura-carpetas-evento.md).
