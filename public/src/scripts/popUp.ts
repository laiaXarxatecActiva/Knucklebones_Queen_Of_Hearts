function openPopup(contentHtml: string): () => void {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    const box = document.createElement('div');
    box.className = 'popup-box';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Cerrar');

    const body = document.createElement('div');
    body.className = 'popup-body';
    body.innerHTML = contentHtml;

    box.appendChild(closeBtn);
    box.appendChild(body);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const close = () => {
        overlay.classList.remove('popup-open');
        overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
    };

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', escHandler);
        }
    });

    requestAnimationFrame(() => overlay.classList.add('popup-open'));
    
    return close;
}

export function showExplanation(): void {
    openPopup(`
        <h2>Cómo jugar</h2>
        <p>En cada turno recibes un <strong>símbolo aleatorio</strong> que debes colocar en una de las tres columnas de tu tablero. Una columna llena ya no puede recibir más símbolos.</p>
        <p>El objetivo es conseguir <strong>más puntos que tu rival</strong> cuando termine la partida, lo cual ocurre en cuanto uno de los dos tableros se completa.</p>

        <hr>
        
        <h3>Suma más puntos apilando símbolos iguales</h3>
        <p>Si colocas varios símbolos del mismo valor en una misma columna, cada uno de ellos multiplica su valor por la cantidad de símbolos iguales que haya en esa columna. Por ejemplo:</p>
        <pre>♦ ♦
1 1</pre>
        <p>(1 + 1) × 2 = <strong>4 puntos</strong></p>

        <pre>♣ ♣ ♣
3 3 3</pre>
        <p>(3 + 3 + 3) × 3 = <strong>27 puntos</strong></p>

        <table>
        <thead>
            <tr>
            <th>Símbolo</th>
            <th>1 símbolo</th>
            <th>2 símbolos</th>
            <th>3 símbolos</th>
            </tr>
        </thead>
        <tbody>
            <tr><td><img src="../public/src/imgs/diamond.png"> <br> Diamante (1)</td><td>1</td><td>4</td><td>9</td></tr>
            <tr><td><img src="../public/src/imgs/heart.png"> <br> Corazón (2)</td><td>2</td><td>8</td><td>18</td></tr>
            <tr><td><img src="../public/src/imgs/club.png"> <br> Trébol (3)</td><td>3</td><td>12</td><td>27</td></tr>
            <tr><td><img src="../public/src/imgs/pike.png"> <br> Pica (4)</td><td>4</td><td>16</td><td>36</td></tr>
            <tr><td><img src="../public/src/imgs/joker.png"> <br> Bufón (5)</td><td>5</td><td>20</td><td>45</td></tr>
            <tr><td><img src="../public/src/imgs/queen_crown.png"> <br> Reina (6)</td><td>6</td><td>24</td><td>54</td></tr>
        </tbody>
        </table>

        <hr>

        <h3>Elimina las combinaciones de tu rival</h3>
        <p>Al colocar un símbolo, eliminas todos los símbolos del mismo valor que haya en la <strong>columna correspondiente del tablero rival</strong>. Úsalo para destruir sus combinaciones de alta puntuación antes de que la partida acabe.</p>
    `);
}

export function showRoundInfo(opponentScore: string, playerScore: string): void {
    openPopup(`
        <h2>Información de la partida</h2>
        <table class = "score-table">
            <tr>
                <td>Tú</td>
                <td>Reina de la Baraja</td>
            </tr>
            <tr>
                <td>${playerScore}</td>
                <td>${opponentScore}</td>
            </tr>
        </table>
    `);
}

export function endGame(won: Number): void {
    let message = `
        <div class = "end-game won">
            <h2>La partida ha terminado!</h2>
            <h2>HAS GANADO<h2>
    `;
    let buttonBit = `
            <button type="button" class="restart-btn" id="restart-btn">
                    Nueva partida
            </button>
        </div>
    `;
    if (won === 1) {
        message = `
            <div class = "end-game lose">
                <h2>La partida ha terminado!</h2>
                <h2>Has perdido...<h2>
                <h2>La Reina ha Ganado</h2>
        `
    } 
    if (won === 2) {
        message = `
            <div class = "end-game same">
                <h2>La partida ha terminado!</h2>
                <h2>Has sido Empate<h2>
                <h2>Nadie Gana</h2>
        `
    }
    message = message+buttonBit;
    const closePopup = openPopup(message);

    document.getElementById('restart-btn')?.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('restart-game'));
        closePopup();
    });
}