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

/*function moveObstacle() {
    if(obstacleX + size <= 0) {
        obstacleX = 800;
    }
    ctx.clearRect(obstacleX-speed, obstacleY, obstacleX+size, obstacleY+size);
    ctx.fillRect(obstacleX, obstacleY, size, size);
    obstacleX -= speed;
    window.requestAnimationFrame(moveObstacle);
}

window.requestAnimationFrame(moveObstacle);*/

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