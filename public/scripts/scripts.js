//canvas initializing, needed globally
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

    draw() {
        //Draw rectangle
        ctx.fillStyle = "blue";
        ctx.fillRect(this.currX, this.currY, this.width, this.height);
    }

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
    if (Character.currY == groundLevel && jumping == true){

    }
    myCharacter.clear();
    myCharacter.move();
    window.requestAnimationFrame(jump);
    // console.log("JUMPED");
    // do {
    //     character.move();
    // }while (character.currY != groundLevel);
}

//if the canvas is clicked, character should jump
$("#canvas").click((event) => {
    jumping = true;
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