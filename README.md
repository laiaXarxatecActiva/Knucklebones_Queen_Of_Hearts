# El Juego de la Reina

*Título provisional*

## Historia

Tras una bizarra secuencia de acontecimientos, el jugador acaba atrapado en el reino de la Reina de Naipes. Y en este reino, la ley dicta que todo aquel que entra en los dominios de la Reina debe enfrentarse a ella en su pasatiempo favorito: **el Juego de la Reina**. Un juego que irónicamente no tiene tanto que ver con las cartas. 

Las reglas son simples. Si el jugador consigue derrotarla, recuperará su libertad y podrá abandonar el reino. Sin embargo, la derrota tiene un alto precio, pues quienes pierden son enviados a las mazmorras del castillo, donde esperan un destino incierto bajo el capricho de la reina.

Solo hay una forma de escapar: vencer en su propio juego.

---

## Explicación y funcionamiento

**El Juego de la Reina** es una adaptación de **Knucklebones**, el minijuego de dados presente en *Cult of the Lamb*. En esta versión, los dados se sustituyen por cartas o símbolos, cada uno con un valor determinado.

| Símbolo    | Valor |
| ---------- | ----- |
| ♦ Diamante | 1     |
| ♥ Corazón  | 2     |
| ♣ Trébol   | 3     |
| ♠ Pica     | 4     |
| 👑 Rey     | 5     |
| 👸 Reina   | 6     |

A continuación se detallan las reglas del juego.

## Cómo jugar

- La partida se desarrolla en **dos tableros de 3×3**, uno para cada jugador.

- Los jugadores juegan por turnos. En cada turno, el jugador recibe **un símbolo aleatorio** y debe colocarlo en una de las tres columnas de su tablero. Una columna que ya esté completa no podrá recibir más símbolos.

- Cada jugador dispone de una **puntuación total**, que corresponde a la suma de los puntos obtenidos por todos los símbolos de su tablero. Además, cada columna muestra la puntuación que aporta de forma individual.

### Multiplicadores por combinación

Si una columna contiene **varios símbolos del mismo valor**, cada uno de ellos multiplica su valor por el número de símbolos iguales presentes en esa columna.

Por ejemplo:

```
♠ ♦ ♠
4 1 4
```

La puntuación de la columna será:

```
(4 × 2) + (1 × 1) + (4 × 2) = 17 puntos
```

La siguiente tabla muestra la puntuación resultante según el número de símbolos repetidos en una misma columna.

| Símbolo        | 1 símbolo | 2 símbolos | 3 símbolos |
| -------------- | --------- | ---------- | ---------- |
| ♦ Diamante (1) | 1         | 4          | 9          |
| ♥ Corazón (2)  | 2         | 8          | 18         |
| ♣ Trébol (3)   | 3         | 12         | 27         |
| ♠ Pica (4)     | 4         | 16         | 36         |
| 👑 Rey (5)     | 5         | 20         | 45         |
| 👸 Reina (6)   | 6         | 24         | 54         |

> En otras palabras, la puntuación de una combinación es el valor del símbolo multiplicado por el número de repeticiones, aplicado a cada símbolo de esa combinación.

### Eliminación de símbolos

Cada vez que un jugador coloca un símbolo en una columna de su tablero, **todos los símbolos del mismo valor que se encuentren en la columna correspondiente del tablero rival son eliminados**.

Esta mecánica añade un componente estratégico importante, ya que permite destruir combinaciones de alta puntuación del oponente antes de que la partida termine.

### Fin de la partida

La partida concluye cuando **uno de los dos jugadores completa las nueve casillas de su tablero**.

En ese momento se comparan las puntuaciones de ambos jugadores y **gana quien haya obtenido la mayor cantidad de puntos**.
