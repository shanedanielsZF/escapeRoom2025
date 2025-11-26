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
