// canvas initializing, needed globally
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var obstacleX = 800;
var obstacleY = 500;
var size = 100;
var speed = 5;

function moveObstacle() {
    if(obstacleX + size <= 0) {
        obstacleX = 800;
    }
    ctx.clearRect(obstacleX-speed-1, obstacleY, obstacleX+size+2, obstacleY+size+2);
    ctx.fillRect(obstacleX, obstacleY, size, size);
    obstacleX += speed;
    window.requestAnimationFrame(moveObstacle);
}

window.requestAnimationFrame(moveObstacle);