# El Dato Falso

Juego de fiesta de trivia para grupos, hecho con HTML, CSS y JavaScript puros (sin frameworks, sin build, sin backend). Se juega pasando un solo móvil entre todos los jugadores, y funciona sin internet tras la primera visita.

**Juega aquí:** https://adrianezd.github.io/el-dato-falso/

## Modos de juego

| Modo | Qué pasa |
| --- | --- |
| 🙈 **Clásico** | Cada jugador recibe un dato distinto sobre el tema; los mentirosos reciben uno falso **sin saberlo**. |
| 😏 **Mentiroso consciente** | Igual, pero el mentiroso sabe que su dato es falso y tiene que defenderlo. |
| ⚡ **Verdadero o falso** | Quiz rápido para todo el grupo: un dato en pantalla, cada uno opina, se revela y suma quien acierta (5 a 30 datos). |

## Funcionalidades

- 45 temas y 585 datos (9 verdaderos y 4 falsos por tema) en 10 categorías: animales, famosos, países, comida, espacio, cuerpo humano, historia, ciencia, deportes e inventos.
- Selección múltiple de categorías y nombres de jugadores (compartidos con los otros juegos).
- Carta que se gira manteniendo pulsado, cronómetro de debate con anillo, sonido y vibración.
- Votación a mano alzada o secreta y marcador entre rondas.
- Pantalla siempre encendida durante la partida y modo sin conexión (service worker).

## Puntuación

- El grupo vota a todos los mentirosos → **+1** a cada jugador con dato verdadero.
- Algún mentiroso se libra → **+2** a cada mentiroso.
- Verdadero o falso → **+1** por cada acierto.

## Transparencia sobre los datos

Los temas y los datos (verdaderos y falsos) son contenido de trivia general redactado para este proyecto. Los datos verdaderos están basados en hechos de conocimiento público; los datos falsos son invención propia, diseñados para sonar creíbles dentro del juego. Proyecto original, no afiliado a ninguna marca comercial.
