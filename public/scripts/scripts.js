//canvas initializing, needed globally
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//character class used to simplify character interactions
class Character {
    constructor(currX, currY, width, height, speed, floor, ceiling) {
        this.currX = currX; //x coor of upper left corner of char
        this.currY = currY; //y coor of upper left corner of char
        this.width = width; //width of character hitbox
        this.height = height; //height of character hitbox
        this.speed = speed; //jumpspeed
        this.floor = floor; //lowest the character can go
        this.ceiling = ceiling; //highest the character can go
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

    //moves character one frame using its speed vector
    move() {
        this.clear(); //clear character
        this.currY -= this.speed; //update y position
        if (this.currY <= this.ceiling || this.currY >= this.floor) { //if hits the ceiling/floor, change direction
            this.speed *= -1;
        }
        this.draw(); //redraw character in updated position
    }
}

let charHeight = 40; //height of character
let charWidth = 40; //width of character
let groundLevel = canvas.height - charHeight; //canvas is 300px, so top left corner should be 300-charHeight
let ceiling = groundLevel - charHeight * 3; //character can jump 3 times its height
let jumpSpeed = 3;
let leftMargin = 15; //space between character and left side of canvas
let myCharacter = new Character(leftMargin, groundLevel, charWidth, charHeight, jumpSpeed, groundLevel, ceiling);
let jumping = false; //default is to not be jumping

//makes character jump
function jump() {
    if (myCharacter.currY == groundLevel && jumping == true) { //when character returns to ground, stop
        jumping = false; //jumping is false again
        return; //exit function
    }
    if (myCharacter.currY == groundLevel && jumping == false) { //initial jump should catch here
        jumping = true; //jump initiated
    }
    myCharacter.move(); //move character one frame
    window.requestAnimationFrame(jump); //keeps moving the character one frame at a time
}

//if the canvas is clicked, character should jump
$("#canvas").click((event) => {
    if (jumping == false) //only jump if not already jumping
        jump(myCharacter);
});

function init() {
    myCharacter.draw();
}

//page is loaded, calls init function
$(() => {
    init();
});

var score = 0;
function updateScore() {
    const scoreX = 0;
    const scoreY = 10;
    const scoreW = canvas.width;
    const scoreH = 20;
    ctx.clearRect(scoreX, scoreY, scoreW, scoreH);
    score += .1;
    ctx.font = "16px Verdana";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(parseInt(score), scoreX + 10, scoreY + 14, scoreW);
    window.requestAnimationFrame(updateScore);
};
window.requestAnimationFrame(updateScore);

let obX = canvas.width;
const obSize = 35;
let obY = canvas.height - obSize;
var obSpeed = 2;
function moveObstacle() {
    ctx.clearRect(obX, obY, obSize, obSize);
    obX -= obSpeed;
    if (obX + obSize <= 0) {
        obX = canvas.width;
        obSpeed = Math.floor(Math.random() * (5 - 2)) + 2;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(obX, obY, obSize, obSize);
    window.requestAnimationFrame(moveObstacle);
};
window.requestAnimationFrame(moveObstacle);