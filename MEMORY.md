# MEMORY.md

## Estado actual
- V1 funcionando: formulario (fecha/tema/minutos), racha actual, lista de sesiones, localStorage.
- Añadida la "mejor racha" (🏆) junto a la racha actual.
- Añadido "⏱️ Esta semana: X min" en la tarjeta de la racha.

## Decisiones importantes
- Mejor racha se RECALCULA siempre desde las sesiones; no se persiste. Si se borran sesiones, puede bajar. (Usuario aceptó esta opción.)
- Las fechas futuras no cuentan ni para la racha, ni para la mejor racha, ni para los minutos de la semana.
- La semana empieza en lunes (convención española) y los minutos se muestran a secas, sin pasar a horas, para que sea simple.
- Formato de datos real: clave localStorage `diarioEstudio`, objetos `{ fecha, tema, minutos }`. AGENTS.md decía otra cosa por error; se corrigió a favor del código (no hubo migración de datos).

## Errores a evitar
- No usar `toISOString()` ni `new Date("AAAA-MM-DD")`: interpretan UTC y desplazan el día. Usar siempre fecha local.
- No introducir frameworks, npm ni módulos ES: debe funcionar con doble clic en `index.html`.

## Pendientes (posible futuro, no pedido)
- Borrar sesiones, estadísticas por tema. Solo si el usuario lo pide.
