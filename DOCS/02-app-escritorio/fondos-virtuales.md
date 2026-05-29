# Fondos virtuales (croma + IA)

Cubre RF-042..044. Permite sustituir el fondo real por una imagen de una colección guardada. Se
soportan **dos técnicas**, elegibles por evento: **croma verde** (fiable) e **IA sin croma** (cómoda).

## Técnica A — Croma verde (chroma key) · recomendada en directo

- Requiere una **tela/fondo verde** físico detrás de los invitados (coincide con la carpeta `GreenScreen` del flujo actual).
- La app detecta el verde y lo reemplaza por el fondo elegido.
- **Ventajas:** rápido, fiable, bordes limpios, bajo coste de CPU.
- **Requisitos:** iluminación uniforme del croma, que los invitados no vistan verde.

### Implementación
- OpenCV (vía addon) o shader/canvas: conversión a HSV, máscara por rango de verde, *spill suppression*, *feathering* de bordes, composición sobre el fondo.
- Ajustes: tono/umbral de verde, suavizado de borde, corrección de derrame de color.

## Técnica B — IA sin croma (segmentación)

- Segmenta a las personas del fondo **sin** tela verde, mediante un modelo de *person/portrait segmentation*.
- **Ventajas:** no hay que transportar ni montar croma.
- **Inconvenientes:** bordes menos precisos (pelo, transparencias), mayor coste de CPU/GPU, más sensible a la escena.

### Implementación
- **MediaPipe Selfie Segmentation** o **`@imgly/background-removal`** (modelo ONNX en local, sin enviar imágenes a la nube → cumple privacidad).
- Se ejecuta en el proceso main / worker para no bloquear la UI.
- Posible refinado de bordes (matting) como mejora.

## Selección de fondo

- Colección de imágenes de fondo en `assets/fondos/` + posibilidad de añadir fondos por evento.
- El operador define los fondos disponibles; el invitado elige uno (si está habilitado) antes o después de la captura.
- El fondo se aplica **antes del filtro** (ver pipeline en [filtros](filtros-imagen.md)) para que persona y fondo queden coherentes.

## Configuración por evento

| Parámetro | Valor |
|-----------|-------|
| Técnica | croma / IA / desactivado |
| Fondos disponibles | selección de la colección |
| ¿Invitado elige fondo? | sí/no |
| Parámetros de croma | umbral verde, suavizado, anti-derrame |

## Rendimiento y recomendación

- En directo, **croma** es la opción robusta (RNF-001/002). La **IA** se ofrece como alternativa y se mide su rendimiento en la Surface antes de usarla por defecto (ver [riesgos](../07-roadmap/riesgos.md)).
- Para live view con fondo en tiempo real, croma es viable; la IA en tiempo real puede requerir bajar resolución/fps.

Relacionado: [filtros](filtros-imagen.md) · [requisitos de hardware](../03-hardware/requisitos-hardware.md) · [estructura de carpetas](estructura-carpetas-evento.md) (carpeta `greenscreen/`).
