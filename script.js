
let board = document.querySelector(".board");
let modal = document.querySelector(".modal");
let startBtn = document.querySelector(".btn-start");
let restartgame = document.querySelector(".restart-game");
let startgame = document.querySelector(".start-game");
let Restartbtn = document.querySelector(".btn-restart");
let restartmsg = document.querySelector("#restartmsg");
let highScoreElement = document.querySelector("#high-score");
let scoreElement = document.querySelector("#score");
let timeElement = document.querySelector("#time");

let score = 0;
let highScore = localStorage.getItem("highScore") ||0;
let time = "00-00";

highScoreElement.textContent = highScore;
scoreElement.textContent = score;


let intervalId;
let timeIntervalId;

const blockWidth = 50;
const blockHeight = 50;

const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);

let blocks = [];

for(let i = 0; i < rows; i++){

    for(let j = 0; j < cols; j++){

        let block = document.createElement("div");

        block.classList.add("block");

        board.appendChild(block);

        blocks[`${i}-${j}`] = block;
    }
}



let snake = [ {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)} ];




function generateFood(){

    let newFood;

    let isOnSnake = true;

    while(isOnSnake){

        newFood = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };

  
        isOnSnake = snake.some(segment => {

            return (
                segment.x === newFood.x &&
                segment.y === newFood.y
            );

        });
    }

    return newFood;
}

let food = generateFood();



let direction = "left";

window.addEventListener("keydown", function(dets){

    if(dets.key === "ArrowLeft" && direction !== "right"){
        direction = "left";
    }

    else if(dets.key === "ArrowRight" && direction !== "left"){
        direction = "right";
    }

    else if(dets.key === "ArrowUp" && direction !== "down"){
        direction = "up";
    }

    else if(dets.key === "ArrowDown" && direction !== "up"){
        direction = "down";
    }

});




function render(){

    let head = null;


    snake.forEach(segment => {

        blocks[`${segment.x}-${segment.y}`]
        .classList.remove("fill");

    });


    // remove old food
    document.querySelector(".food")?.classList.remove("food");


  
    // Calculate new head

    if(direction === "left"){

        head = { x: snake[0].x, y: snake[0].y - 1};

    }

    else if(direction === "right"){

        head = {x: snake[0].x, y: snake[0].y + 1};

    }

    else if(direction === "up"){

        head = {x: snake[0].x - 1, y: snake[0].y};

    }

    else if(direction === "down"){

        head = {x: snake[0].x + 1, y: snake[0].y};

    }



    if( head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols ){
        modal.classList.remove("hidden-modal");
        startgame.classList.add("hidden-modal");
        restartgame.classList.remove("hidden-modal");
        restartmsg.textContent = `Game Over! You hit the wall. Score: ${score}`;
        clearInterval(intervalId);
        clearInterval(timeIntervalId);
        timeIntervalId = null;
        intervalId = null;
        
        return;
    }
    
    

    for(let i = 0; i < snake.length; i++){
        
        if(head.x === snake[i].x && head.y === snake[i].y){
            modal.classList.remove("hidden-modal");
            startgame.classList.add("hidden-modal");
            restartgame.classList.remove("hidden-modal");
            restartmsg.textContent = `Game over! You hit yourself. Score: ${score}`;
            

            clearInterval(intervalId);
            intervalId = null;
            clearInterval(timeIntervalId);
            timeIntervalId = null;

            return;
        }
    }


    //food eat

    if(head.x === food.x && head.y === food.y){


        snake.unshift(head);
        score +=10;
        highScore = Math.max(score, highScore);
        highScoreElement.textContent = highScore;
        localStorage.setItem("highScore", highScore);

        scoreElement.textContent = score;
        food = generateFood();
    }

    else{

 
        snake.unshift(head);
        snake.pop();
    }



    blocks[`${food.x}-${food.y}`]
    .classList.add("food");



    document.querySelectorAll(".head").forEach(head => {

    head.classList.remove(
        "head",
        "head-right",
        "head-left",
        "head-up",
        "head-down"
    );

});




    snake.forEach(segment => {

        blocks[`${segment.x}-${segment.y}`]
        .classList.add("fill");

    });



    let snakeHead = blocks[`${snake[0].x}-${snake[0].y}`];

    snakeHead.classList.add("head");




    if(direction === "right"){

    snakeHead.classList.add("head-right");

    }

    else if(direction === "left"){

    snakeHead.classList.add("head-left");

    }

    else if(direction === "up"){

    snakeHead.classList.add("head-up");

    }

    else if(direction === "down"){

    snakeHead.classList.add("head-down");

    }
}



function startGame(){

    modal.classList.add("hidden-modal");

    if(!intervalId){

        intervalId = setInterval(render, 180);
        timeIntervalId = setInterval(() => {
            let [min, sec] = time.split("-").map(Number)
            if(sec=== 59){
                min +=1;
                sec=0;
            }
            else{
                sec+=1;

            }
            time = `${min}-${sec}`;
            timeElement.textContent = time;

        }, 1000);

    }
}

startBtn.addEventListener("click", startGame);



Restartbtn.addEventListener("click", function(){
    clearInterval(intervalId);
    clearInterval(timeIntervalId);
    timeIntervalId = null;
    time = "00-00";

    // timeElement.textContent = "00-00";
    timeElement.textContent = time;
    modal.classList.add("hidden-modal");
    restartgame.classList.add("hidden-modal");
    score = 0;
    scoreElement.textContent = score;
        
    document.querySelectorAll(".fill").forEach(block => block.classList.remove("fill"));
        
    document.querySelectorAll(".head").forEach(block => {
        block.classList.remove("head", "head-right", "head-left", "head-up", "head-down");
    });    
    
    document.querySelector(".food")?.classList.remove("food");
        
    snake = [ {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)} ];
        
    direction = "left";
        
    food = generateFood();
        
    startGame();
    
        
})