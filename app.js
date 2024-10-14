let gameSeq = [];
let userSeq = [];
let start = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["red", "yellow", "green", "purple"];
let levels = [];
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function() {
    if (start === false) {
        start = true;
        levelUp();
    }   
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    levels.push(level);
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 3);
    let ranColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    btnFlash(randomBtn);
}

function hLevel() {
    let high = 0;
    for(let i=0; i<levels.length; i++) {
        if(levels[i] > high) {
            high = levels[i];
        }
        h3.innerHTML = `Highest Score : ${high}`;
    }
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}<b> <br> Press any key to Start.`; 
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    start = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    hLevel(); 
}