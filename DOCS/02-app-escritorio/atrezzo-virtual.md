# Atrezzo virtual

Cubre RF-041. Adornos digitales superpuestos a la persona (gafas, sombreros, marcos, frases, emojis),
al estilo de los filtros de redes sociales. Complementa al atrezzo físico que el operador lleva al evento.

## Tipos de atrezzo

| Tipo | Descripción | Posicionamiento |
|------|-------------|-----------------|
| **Overlay fijo** | Marco, cenefa, frase, fecha decorativa que cubre toda la foto | Posición fija sobre el lienzo |
| **Stickers libres** | Gafas, sombreros, bigotes, emojis que el invitado coloca/arrastra | Manual (táctil) o automático por cara |
| **Anclado a cara** | Sombrero/gafas que siguen la posición de la cara | Detección facial (opcional) |

## Modos de colocación

1. **Manual (MVP):** el invitado elige un sticker de un panel y lo arrastra/escala/rota sobre su foto en una pantalla de edición rápida tras la captura.
2. **Automático por cara (mejora):** detección de cara (MediaPipe Face Mesh) para anclar gafas/sombrero a la posición y rotación de la cabeza, incluso en tiempo real sobre el live view.

> El MVP implementa el modo manual (simple y fiable). El anclado a cara queda como mejora (fase posterior).

## Catálogo

- Conjunto de PNGs con transparencia en `assets/atrezzo/`, organizados por categorías (bodas, divertido, temático…).
- El operador activa qué categorías/ítems están disponibles por evento.
- Posibilidad de subir atrezzo propio por evento.

## Aplicación técnica

- En el panel táctil, el invitado coloca stickers sobre un canvas (Konva) a baja resolución (preview).
- Al confirmar, se guardan las **transformaciones** (x, y, escala, rotación, z) por sticker.
- El render final compone los overlays a resolución de impresión con **sharp** (`composite`), tras el filtro.

```json
{
  "stickers": [
    { "id": "gafas_01", "x": 540, "y": 380, "scale": 0.8, "rotation": -5, "z": 2 },
    { "id": "frase_amor", "x": 120, "y": 1500, "scale": 1.0, "rotation": 0, "z": 1 }
  ]
}
```

## Configuración

| Parámetro | Valor |
|-----------|-------|
| ¿Atrezzo virtual activo? | sí/no por evento |
| Categorías disponibles | selección por evento |
| Modo | manual / automático por cara (si disponible) |
| Tiempo máx. de edición | configurable (para no ralentizar la cola) |

Relacionado: [filtros](filtros-imagen.md) · [fondos virtuales](fondos-virtuales.md) · [flujo de captura](flujo-captura.md).
