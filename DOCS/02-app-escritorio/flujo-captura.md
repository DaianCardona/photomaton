# Flujo de captura

Pantalla central del modo invitado. Cubre RF-020..025. Objetivo: experiencia fluida, guiada y rápida.

## Secuencia

```
[Inicio]
   │ invitado pulsa "Empezar"
   ▼
[Preparación]  ← (opcional) elegir atrezzo virtual / fondo si están activos
   │
   ▼
┌───────────── por cada foto i = 1..N (N = huecos de la plantilla) ─────────────┐
│  [Live view] muestra cámara en directo                                        │
│       │                                                                       │
│  [Cuenta atrás] 3 → 2 → 1 (grande, centrada, con sonido opcional)             │
│       │                                                                       │
│  [Disparo] flash/indicador → captura                                          │
│       │                                                                       │
│  [Revisión rápida] muestra la foto recién hecha (1–2 s)                       │
└───────────────────────────────────────────────────────────────────────────────┘
   │ completadas las N fotos
   ▼
[Montaje] muestra todas las fotos colocadas en la plantilla (layout)
   │
   ▼
[Impresión automática] (copias configuradas) + [Compartir] (QR / email)
```

## Detalles de comportamiento

### Live view
- Stream de frames desde la cámara (proceso main) al renderer por IPC.
- Si la cámara no entrega live view, se usa la última previsualización o un placeholder, y se avisa al operador.

### Cuenta atrás
- Configurable (por defecto 3 s). Visual grande + opción de sonido/voz.
- Entre foto y foto puede haber una pausa breve ("¡Preparados para la siguiente!").

### Número y orientación
- N (1–4) y orientación (H/V) los define la **plantilla activa** (RF-012). La pantalla de captura se adapta a esa configuración; el invitado no la elige en directo.

### Guardado (orden estricto)
1. Capturar → **escribir original** en `originales/` (RNF-006).
2. Aplicar filtro del evento + fondo (si procede) → escribir `single` en `originales/` o carpeta de singles.
3. Tras la última foto: componer **layout** sobre la plantilla → `layout/`.
4. Si N ≥ 2: generar **GIF** → `gifs/` (RF-050).
5. Encolar medios para sync (RF-060/061).

### Revisión y repetición
- Tras el montaje, opción de **repetir** la sesión (descarta y vuelve a empezar) antes de imprimir, configurable por el operador.

### Errores
- Fallo de disparo: reintento automático; si persiste, mensaje y aviso al operador.
- Fallo de impresión: el layout se conserva y queda en cola de reimpresión (no se pierde).

## Pantallas implicadas

- `renderer/app/invitado/` — orquesta el flujo táctil.
- `renderer/app/captura/` — live view, countdown, previews, montaje.
- Servicios main: `camera/`, `media/`, `printer/`, `storage/`.

## Parámetros configurables (desde ajustes)

| Parámetro | Por defecto |
|-----------|-------------|
| Segundos de cuenta atrás | 3 |
| Sonido de cuenta atrás | activado |
| Mostrar revisión por foto | sí (1–2 s) |
| Permitir repetir sesión | sí |
| Copias a imprimir | configurable (ver [ajustes](pantalla-ajustes.md)) |

Relacionado: [editor de plantillas](editor-plantillas.md) · [filtros](filtros-imagen.md) · [GIF y vídeo](gif-y-video.md) · [impresora DNP](../03-hardware/impresora-dnp.md).
