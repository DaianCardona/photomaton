# F0-06 · Pantalla de ajustes base + modo operador/invitado (PIN)

**Fase:** 0 · Cimientos
**Depende de:** F0-03, F0-04
**Estimación:** M (1 día)
**Cubre:** RF-070 (base), RF-072

## Objetivo
Crear la pantalla de **ajustes** (estructura y guardado) y el mecanismo de **modo operador** protegido
por PIN frente al **modo invitado**, según [pantalla-ajustes](../02-app-escritorio/pantalla-ajustes.md).
En Fase 0 se cablea el esqueleto y la persistencia; secciones que dependen de fases posteriores quedan
visibles pero sin lógica final.

## Subtareas
- [ ] UI de ajustes con las secciones documentadas (Evento, Impresión, Imagen, Captura, Confesiones, Compartir, Hardware, Sistema), aunque algunas solo muestren placeholders en Fase 0.
- [ ] Persistir ajustes: globales en `app_settings`, de evento en `events.settings_json` (vía repos).
- [ ] Implementar **modo invitado** (UI bloqueada, sin acceso a ajustes/salida accidental) y **modo operador**.
- [ ] **PIN** de operador: definir, almacenar de forma segura (hash; usar `safeStorage` de Electron) y pedirlo para entrar a ajustes desde modo invitado.
- [ ] Transición "Iniciar evento" → modo invitado; atajo/gesto + PIN → volver a operador.
- [ ] Selector de **idioma** de la interfaz (es mínimo; estructura para fr/eu).
- [ ] Campo **carpeta base de eventos** (enlaza con F0-05).
- [ ] Test de guardado/lectura de ajustes y de validación de PIN.

## Criterios de aceptación
- Los ajustes se guardan y persisten entre reinicios.
- En **modo invitado** no se puede acceder a ajustes ni cerrar la app sin PIN.
- El **PIN** se almacena de forma segura (no en claro) y protege el acceso al modo operador.
- Cambiar la carpeta base afecta a dónde se crean los eventos (coherente con F0-05).

## Referencias
- [pantalla-ajustes](../02-app-escritorio/pantalla-ajustes.md)
- [seguridad-y-privacidad](../01-arquitectura/seguridad-y-privacidad.md) (RNF-014)
- [modelo-datos-local](../01-arquitectura/modelo-datos-local.md) (`app_settings`, `events.settings_json`)

## Notas
- Secciones como filtros/fondos/impresión tendrán su lógica completa en fases 1–3; aquí basta el contenedor y el guardado de los valores que ya apliquen.
- El modo invitado a prueba de manipulación es clave para el uso real (RNF-009).
