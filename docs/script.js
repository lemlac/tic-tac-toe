(function() {
    let score;

    document.addEventListener('DOMContentLoaded', () => {
        let turn = 0;
        let positions = [];
        let playing = true;
        score = score || { O: 0, X: 0 };
        score.O = score.O || 0;
        score.X = score.X || 0;
        for (const button of Array.from(document.querySelectorAll('.tic-tac-toe-btn'))) {
            const position = positions.length;
            positions.push('_');
            button.addEventListener('click', function handler() {
                if (playing && positions[position] === '_') {
                    positions[position] = turn % 2 === 0 ? 'O' : 'X';
                    button.textContent = positions[position];
                    const winner = checkWin(positions);
                    if (winner) {
                        playing = false;
                        setTimeout(() => {
                            alert(winner + ' wins!');
                            score[winner] += 1;
                            const scoreboard = document.getElementById('score' + winner);
                            if (scoreboard) {
                                scoreboard.textContent = score[winner];
                            }
                            reset();
                            sessionStorage.setItem('score', JSON.stringify(score));
                        }, 100);
                    } else {
                        turn += 1;
                        if (turn >= 9) {
                            playing = false;
                            setTimeout(() => {
                                alert('tie!');
                                reset();
                            }, 100);
                        }
                    }
                }
            });
            if (position >= 9) break;
        }
    
        for (let [key, value] of Object.entries(score)) {
            const scoreboard = document.getElementById('score' + key);
            if (scoreboard) {
                scoreboard.textContent = value;
            }
        }
    
        function reset() {
            playing = true;
            turn = 0;
            const buttons = Array.from(document.querySelectorAll('.tic-tac-toe-btn'));
            for (let i = 0; i < positions.length; i++) {
                positions[i] = '_';
                if (buttons[i]) buttons[i].textContent = '_';
            }
        }
    });
    
    try {
        score = JSON.parse(sessionStorage.getItem('score')) ?? score;
    } catch (err) {
        console.error(err);
    }

    function checkWin(positions) {
        let sideLength = (positions.length ** 0.5) | 0;
        // Check horizontals
        for (let i = 0; i < positions.length; i += sideLength) {
            if (positions[i] == '_') continue;
            let match = true;
            for (let j = 1; j < sideLength; j++) {
                if (positions[i] !== positions[i + j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return positions[i];
            }
        }
        // Check verticals
        for (let i = 0; i < sideLength; i++) {
            if (positions[i] == '_') continue;
            let match = true;
            for (let j = sideLength; j < positions.length; j += sideLength) {
                if (positions[i] !== positions[i + j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return positions[i];
            }
        }
        // Check first diagonal
        if (positions[0] !== '_') {
            let match = true;
            for (let i = sideLength + 1; i < positions.length; i += sideLength + 1) {
                if (positions[0] !== positions[i]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return positions[0];
            }
        }
        // Check second diagonal
        if (positions[sideLength - 1] !== '_') {
            let match = true;
            for (let i = (sideLength - 1) * 2; i < positions.length - 1; i += sideLength - 1) {
                if (positions[sideLength - 1] !== positions[i]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return positions[sideLength - 1];
            }
        }
        return null;
    }
})();
