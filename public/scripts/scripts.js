//canvas initializing, needed globally
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//character class used to simplify character interactions
class Character {
    constructor(direction, currX, currY, width, height, speed, floor, ceiling) {
        this.direction = direction;
        this.currX = currX;
        this.currY = currY;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.floor = floor;
        this.ceiling = ceiling;
    }
    
    //Draw character at its current position
    draw() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.currX, this.currY, this.width, this.height);
    }

    //clears character from the board
    clear() {
        ctx.clearRect(this.currX, this.currY, this.width, this.height);
    }

    move() {
        this.clear();
        this.currY -= this.speed;
        if (this.currY == this.ceiling || this.currY == this.floor) {
            this.speed *= -1;
        }
        this.draw();
    }
}

let groundLevel = 120;
let ceiling = 70;
let myCharacter = new Character(1, 15, groundLevel, 30, 30, 1, groundLevel, ceiling);
let jumping = false;

//makes character jump
function jump() {
    if (myCharacter.currY == groundLevel && jumping == true) {
        jumping = false;
        return;
    }
    if (myCharacter.currY == groundLevel && jumping == false) { //initial jump should catch here
        jumping = true;
    }
    myCharacter.clear();
    myCharacter.move();
    window.requestAnimationFrame(jump);
}

//if the canvas is clicked, character should jump
$("#canvas").click((event) => {
    jump(myCharacter);
});

function init() {
    // myCharacter = new Character(1, 15, groundLevel, 20, 20, 1);
    myCharacter.draw();
}

//page is loaded, calls init function
$(() => {
    init();
});

var score = 0;
const scoreX = 0;
const scoreY = 0;
const scoreW = canvas.width;
const scoreH = 20;
function updateScore () {
    ctx.clearRect(scoreX, scoreY, scoreW, scoreH);
    score += .1;
    ctx.font = "10px Verdana";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(parseInt(score), scoreX + 10, scoreY + 14, scoreW);
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
    ctx.fillStyle = "black";
    ctx.fillRect(obX, obY, obSize, obSize);
    window.requestAnimationFrame(moveObstacle);
};
window.requestAnimationFrame(moveObstacle);