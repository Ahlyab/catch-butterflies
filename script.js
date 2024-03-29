const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
const resume_btn = document.getElementById('resume-btn');
const quit_btn = document.getElementById('quit-btn');
let seconds = 0
let score = 0
let selected_insect = {}

let stopWaiting= function(){};

start_btn.addEventListener('click', () => screens[0].classList.add('up'))
quit_btn.addEventListener('click', ()=> {
    location.reload();
});

resume_btn.addEventListener('click', ()=> {
    message.classList.remove('visible');
    stopWaiting();
});

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_insect = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function createInsect() {
    const insect = document.createElement('div')
    let audio = new Audio("./sounds/pop.wav");
    audio.play();
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchInsect() {
    increaseScore()
    let audio  = new Audio("./sounds/hit.wav");
    audio.play();
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 2000)
    setTimeout(createInsect, 3500)
}


function startWaiting() {
    return new Promise(resolve => {
    stopWaiting = resolve;
  });
}

function increaseScore() {
    score++
    if(score%20==0) {
        message.classList.add('visible');
        startWaiting();
    }
    scoreEl.innerHTML = `Score: ${score}`
}