const timer = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
}

const modeButtons = document.querySelector('#js-mode-buttons')
modeButtons.addEventListener('click', handleMode)

function handleMode(event) {
    const { mode } = event.target.dataset
    // mode is either 'pomodoro', 'shortBreak', or 'longBreak'
    if (!mode) return
    // call switchMode with the mode, e.g. switchMode('pomodoro')
    switchMode(mode)
    stopTimer()
}

function switchMode(mode) {
    timer.mode = mode
    timer.remainingTime = {
        // timer[mode] is the value of the key mode in the timer object, e.g. timer['pomodoro'] is 25
        total: timer[mode] * 60,
        minutes: timer[mode],
        seconds: 0,
    }

    // <button data-mode="dark">Dark Mode</button>
    document
        .querySelectorAll('button[data-mode]')
        .forEach(e => e.classList.remove('active'))

    // the element with data-mode = mode will have the active class added to it when switchMode(mode) is called.
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active')
    document.body.style.backgroundColor = `var(--${mode})`

    updateClock()
}


function updateClock() {
    const { remainingTime } = timer
    // console.log(remainingTime)

    // can simply access the minutes and seconds properties of remainingTime like, 
    // remainingTime.minutes and remainingTime.seconds but to add additional 0s to the minutes and seconds, we can use the padStart method and use backticks to interpolate the values.
    const minutes = `${remainingTime.minutes}`.padStart(2, '0')
    const seconds = `${remainingTime.seconds}`.padStart(2, '0')

    // up until this point, we have minutes and seconds, now to change the textContent of the minutes and seconds elements in the DOM, we can use the getElementById method to get the elements and then change the textContent of the elements.
    const min = document.getElementById('js-minutes')
    const sec = document.getElementById('js-seconds')
    min.textContent = minutes
    sec.textContent = seconds

    // to modify the status in the title bar
    const text = timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!'
    document.title = `${minutes}:${seconds} — ${text}`

}

// Now start the timer

let interval

function startTimer() {
    let { total } = timer.remainingTime
    const endTime = Date.parse(new Date()) + total * 1000

    mainButton.dataset.action = 'stop'
    mainButton.textContent = 'stop'
    mainButton.classList.add('active')

    interval = setInterval(function () {
        timer.remainingTime = getRemainingTime(endTime)
        updateClock()

        total = timer.remainingTime.total
        if (total <= 0) {
            clearInterval(interval)
            document.querySelector(`[data-sound="${timer.mode}"]`).play()
        }

    }, 1000)
}

function getRemainingTime(endTime) {
    const currentTime = Date.parse(new Date())
    const difference = endTime - currentTime

    const total = Number.parseInt(difference / 1000, 10)
    const minutes = Number.parseInt((total / 60) % 60, 10)
    const seconds = Number.parseInt(total % 60, 10)

    return {
        total,
        minutes,
        seconds,
    }
}

// play sound
const buttonSound = new Audio('button-sound.mp3')

const mainButton = document.querySelector('#js-btn')
mainButton.addEventListener('click', function () {
    buttonSound.play()
    const { action } = mainButton.dataset
    if (action === 'start') startTimer()
    else stopTimer()
})

// just to switch to the pomodoro mode when the page loads
// This ensures that the default mode for the timer is pomodoro and the contents of timer.remainingTime is set to the appropriate values for a pomodoro session. 
document.addEventListener('DOMContentLoaded', () => {
    switchMode('pomodoro')
})


// to actually stop the timer
function stopTimer() {
    // to stop the timer, we can use the clearInterval method and pass in the interval variable that we declared earlier.
    clearInterval(interval)
    // console.log(interval)

    mainButton.dataset.action = 'start'
    mainButton.textContent = 'start'
    mainButton.classList.remove('active')
}


// Reflect the countdown in the page title

