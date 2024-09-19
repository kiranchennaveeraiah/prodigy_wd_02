// script.js

let startTime;
let updatedTime;
let difference;
let interval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startPause() {
    if (!isRunning) {
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
        startTime = Date.now() - (difference || 0);
        interval = setInterval(updateTime, 1000);
    } else {
        isRunning = false;
        startPauseBtn.textContent = 'Start';
        clearInterval(interval);
        difference = Date.now() - startTime;
    }
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    difference = 0;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    laps = [];
    updateLaps();
}

function lap() {
    if (isRunning) {
        laps.push(display.textContent);
        updateLaps();
    }
}

function updateTime() {
    updatedTime = Date.now() - startTime;
    const hours = Math.floor(updatedTime / (1000 * 60 * 60));
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return ('0' + unit).slice(-2);
}

function updateLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
