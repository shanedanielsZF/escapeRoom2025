function startGame() {
    const name = document.getElementById('teamName').value;
    if (!name) {
        alert('Please enter a team name');
        return;
    }
    localStorage.setItem('teamName', name);
    localStorage.setItem('startTime', Date.now());
    localStorage.setItem('penalty', 0);
    window.location.href = '1-timeline.html';
}

function goToGearRatio() {
    window.location.href = '2-gear-ratio.html';
}

function goToCrossword() {
    window.location.href = '3-crossword.html';
}

function goToScriptDebug() {
    window.location.href = '4-script-debug.html';
}

function goToRubik() {
    window.location.href = '5-rubik.html';
}

function goToResults() {
    window.location.href = '6-results.html';
}

function addPenalty(minutes) {
    let penalty = parseInt(localStorage.getItem('penalty')) || 0;
    penalty += minutes;
    localStorage.setItem('penalty', penalty);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getElapsedTime() {
    const start = parseInt(localStorage.getItem('startTime'));
    const penalty = parseInt(localStorage.getItem('penalty')) || 0;
    const now = Date.now();
    return Math.floor((now - start) / 1000) + penalty * 60;
}

function updateTimers() {
    const totalElapsedSec = Math.floor((Date.now() - parseInt(localStorage.getItem('startTime'))) / 1000) + (parseInt(localStorage.getItem('penalty')) || 0) * 60;
    const puzzleElapsedSec = Math.floor((Date.now() - puzzleStart) / 1000);

    const totalTimeElement = document.getElementById('totalTime');
    totalTimeElement.textContent = formatTime(totalElapsedSec);

    // Progress bar logic
    const progressPercent = Math.min((totalElapsedSec / 3600) * 100, 100);
    const progressBar = document.getElementById('timeProgress');
    progressBar.style.width = `${progressPercent}%`;

    if (totalElapsedSec >= 3600) {
        totalTimeElement.style.color = 'red';
        totalTimeElement.style.fontWeight = 'bold';
        progressBar.style.background = 'red';
        if (!alertPlayed) {
            alertSound.play();
            alertPlayed = true;
        }
    } else {
        totalTimeElement.style.color = 'white';
        totalTimeElement.style.fontWeight = 'normal';
        progressBar.style.background = '#00b300';
    }

    document.getElementById('puzzleTime').textContent = formatTime(puzzleElapsedSec);
}

setInterval(updateTimers, 1000);

// Reset timer button
document.getElementById('resetTimerBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the timers? This will restart the global time!')) {
        localStorage.setItem('startTime', Date.now());
        localStorage.setItem('penalty', 0);
        puzzleStart = Date.now();
        alertPlayed = false;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('front')) {
        const colors = { up: 'white', down: 'yellow', front: 'red', back: 'orange', left: 'green', right: 'blue' };
        let cube;

        function createFace(color) {
            return Array.from({ length: 3 }, () => Array(3).fill(color));
        }
        function resetCube() {
            cube = { up: createFace(colors.up), down: createFace(colors.down), front: createFace(colors.front), back: createFace(colors.back), left: createFace(colors.left), right: createFace(colors.right) };
            renderCube();
        }
        function renderCube() {
            for (let face in cube) {
                const div = document.getElementById(face);
                div.innerHTML = '';
                cube[face].forEach((row) =>
                    row.forEach((color) => {
                        const cell = document.createElement('div');
                        cell.className = 'cell';
                        cell.style.backgroundColor = color;
                        div.appendChild(cell);
                    }),
                );
            }
        }
        function rotateMatrixClockwise(m) {
            return m[0].map((_, i) => m.map((r) => r[i]).reverse());
        }
        function rotateMatrixCounterClockwise(m) {
            return m[0].map((_, i) => m.map((r) => r[m.length - 1 - i]));
        }

        function move(type) {
            switch (type) {
                case 'F':
                    rotateFace('front', true);
                    rotateFront(true);
                    break;
                case 'Fprime':
                    rotateFace('front', false);
                    rotateFront(false);
                    break;
                case 'R':
                    rotateFace('right', true);
                    rotateRight(true);
                    break;
                case 'Rprime':
                    rotateFace('right', false);
                    rotateRight(false);
                    break;
                case 'U':
                    rotateFace('up', true);
                    rotateUp(true);
                    break;
                case 'Uprime':
                    rotateFace('up', false);
                    rotateUp(false);
                    break;
                case 'L':
                    rotateFace('left', true);
                    rotateLeft(true);
                    break;
                case 'Lprime':
                    rotateFace('left', false);
                    rotateLeft(false);
                    break;
                case 'D':
                    rotateFace('down', true);
                    rotateDown(true);
                    break;
                case 'Dprime':
                    rotateFace('down', false);
                    rotateDown(false);
                    break;
                case 'B':
                    rotateFace('back', true);
                    rotateBack(true);
                    break;
                case 'Bprime':
                    rotateFace('back', false);
                    rotateBack(false);
                    break;
            }
            renderCube();
        }
        function rotateFace(face, clockwise) {
            cube[face] = clockwise ? rotateMatrixClockwise(cube[face]) : rotateMatrixCounterClockwise(cube[face]);
        }

        // Rotation helpers (same as before)
        function rotateFront(clockwise) {
            /* ... */
        }
        function rotateRight(clockwise) {
            /* ... */
        }
        function rotateLeft(clockwise) {
            /* ... */
        }
        function rotateUp(clockwise) {
            /* ... */
        }
        function rotateDown(clockwise) {
            /* ... */
        }
        function rotateBack(clockwise) {
            /* ... */
        }

        function shuffle() {
            const moves = ['F', 'Fprime', 'R', 'Rprime', 'U', 'Uprime', 'L', 'Lprime', 'D', 'Dprime', 'B', 'Bprime'];
            for (let i = 0; i < 20; i++) {
                move(moves[Math.floor(Math.random() * moves.length)]);
            }
        }

        resetCube();
        window.move = move;
        window.shuffle = shuffle;
        window.resetCube = resetCube;
    }
});
