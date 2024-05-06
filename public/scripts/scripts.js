//canvas initializing, needed globally
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function jump(){
    //TODO: Make character jump
    console.log("JUMPED");
    
}

function drawChar() {
    //Draw rectangle
    ctx.fillStyle = "blue";
    ctx.fillRect(100, 100, 50, 50);
}

$("#canvas")[0].click((event) => {
    jump();
});

var score = 0;
const scoreX = canvas.width - 80;
const scoreY = 0;
const scoreW = 80;
const scoreH = 20;
function updateScore () {
    ctx.clearRect(scoreX, scoreY, scoreW, scoreH);
    score += .1;
    ctx.font = "20px Verdana";
    ctx.textAlign = "left";
    ctx.fillText(parseInt(score), scoreX + (scoreW / 2), scoreY + (scoreH / 2) + 10, scoreW - 10);
    window.requestAnimationFrame(updateScore);
};
window.requestAnimationFrame(updateScore);

let obX = canvas.width;
let obY = 125;
const obSize = 25;
var obSpeed = 2;
function moveObstacle () {
    ctx.clearRect(obX, obY, obSize, obSize);
    obX -= obSpeed;
    if (obX+obSize <= 0) {
        obX = canvas.width;
        obSpeed = Math.floor(Math.random() * (5 - 2) ) + 2;
    }
    ctx.fillRect(obX, obY, obSize, obSize);
    window.requestAnimationFrame(moveObstacle);
};
window.requestAnimationFrame(moveObstacle);

/*function init() {
    //drawChar();
}

//page is loaded, calls init function
$(() => {
    init();
});
*/