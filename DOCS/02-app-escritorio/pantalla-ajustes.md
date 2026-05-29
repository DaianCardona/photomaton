# Pantalla de ajustes

Cubre RF-070..072. Zona del **operador**, protegida por PIN, donde se configura todo lo que el invitado
no debe tocar. Los ajustes se guardan por evento (y algunos a nivel global de la app).

## Secciones

### 1. Evento
- Nombre y fecha del evento (definen la carpeta).
- Tipo de evento (boda/bautizo/comunión/empresa/fiesta).
- Plantilla activa (enlace al [editor](editor-plantillas.md)).

### 2. Impresión
- **Nº de copias** por defecto (RF-031).
- **Corte**: 10x15 entero o 2 tiras 5x15 (RF-033).
- Impresora seleccionada y estado (papel restante, errores).
- Reimpresión: acceso a la [galería](reimpresion-y-galeria.md).

### 3. Imagen
- **Filtro** del evento y si el invitado puede cambiarlo (RF-040).
- **Fondo virtual**: técnica (croma/IA/off), fondos disponibles, si el invitado elige (RF-042..044).
- **Atrezzo virtual**: activar, categorías disponibles (RF-041).

### 4. Captura
- Segundos de cuenta atrás, sonido, revisión por foto, permitir repetir sesión.

### 5. Confesiones
- Activar módulo, duración máxima, dispositivo de micrófono.

### 6. Compartir / conectividad
- Activar subida web, QR, email.
- Estado de conexión y de la cola de sync.
- Datos de la API (URL, token del dispositivo).

### 7. Hardware
- Selección de **cámara** e **impresora** y **micrófono** (RF-071).
- Pruebas: disparo de test, impresión de test, test de audio.

### 8. Sistema
- Idioma de la interfaz.
- Carpeta base de eventos.
- PIN del modo operador (RF-072).
- Espacio en disco y logs.

## Persistencia

- Ajustes globales → tabla `app_settings`.
- Ajustes del evento → `events.settings_json` (ver [modelo de datos](../01-arquitectura/modelo-datos-local.md)).

## Modo operador vs modo invitado

- El **modo invitado** oculta los ajustes y bloquea salidas accidentales.
- Para entrar a ajustes desde el modo invitado se pide **PIN** (RNF-014).
- "Iniciar evento" pasa a modo invitado; un gesto/atajo + PIN devuelve a modo operador.
