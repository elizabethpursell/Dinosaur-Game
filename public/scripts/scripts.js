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
        //console.log(imgObjects[0]);
        ctx.fillStyle = "blue";
        ctx.fillRect(this.currX, this.currY, this.width, this.height);
        //ctx.drawImage(imgObjects[0], this.currX, this.currY);
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
    if (jumping == false && lost == false) //only jump if not already jumping
        jump(myCharacter);
});

const imgSrcList = ["img/dino-character.png"];
var imgPromises = [];
var imgObjects = [];

function loadImages() {
    imgSrcList.forEach( (src, index) => {
        imgPromises.push(new Promise(function(resolve, reject) {
            let img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Image loaderror for ${src}`));
            document.head.append(img);
        }).then( result => { imgObjects.push(result); }));
    });
}

function resolveImages() {
    Promise.all(imgPromises).then( () => { 
        console.log("Images have loaded");
        myCharacter.draw();
    });
}

function init() {
    loadImages();
    resolveImages();
    //myCharacter.draw();
}

//page is loaded, calls init function
$(() => {
    init();
});

var score = 0;
var lost = false;
function updateScore() {
    const scoreX = 0;
    const scoreY = 10;
    const scoreW = canvas.width;
    const scoreH = 20;
    if(lost == false) {
        ctx.clearRect(scoreX, scoreY, scoreW, scoreH);
        score += .1;
        ctx.font = "16px Verdana";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText(parseInt(score), scoreX + 10, scoreY + 14, scoreW);
        window.requestAnimationFrame(updateScore);
    }
};
window.requestAnimationFrame(updateScore);

let obX = canvas.width;
const obSize = 35;
let obY = canvas.height - obSize;
var obSpeed = 2;
function moveObstacle() {
    ctx.clearRect(obX, obY, obSize, obSize);
    obX -= obSpeed;
    if (obX <= myCharacter.currX + myCharacter.width && obX >= myCharacter.currX && obY >= myCharacter.currY && obY <= myCharacter.currY + myCharacter.height) {
        lost = true;
        gameOver();
        return;
    }
    if (obX + obSize <= 0) {
        obX = canvas.width;
        obSpeed = Math.floor(Math.random() * (5 - 2)) + 2;
    }
    ctx.fillStyle = "black";
    ctx.fillRect(obX, obY, obSize, obSize);
    window.requestAnimationFrame(moveObstacle);
};
window.requestAnimationFrame(moveObstacle);

function gameOver() {
    ctx.fillStyle = "lightgrey";
    ctx.fillRect((canvas.width - 250) / 2, (canvas.height - 150) / 2, 250, 150);
    ctx.font = "16px Verdana";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2, 250);
    ctx.fillText("Score: " + parseInt(score), canvas.width / 2, (canvas.height / 2) + 20, 250);
}