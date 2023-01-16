const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 25;

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 9 * box
}

let food = {
    x : Math.floor(Math.random()*16) * box,
    y : Math.floor(Math.random()*16) * box
}

let dir;

let score = 0;

document.addEventListener("keydown",direction);

function direction(event){
    if(event.keyCode == 37 && dir != "RIGHT"){
        dir = "LEFT";
    }else if(event.keyCode == 38 && dir != "DOWN"){
        dir = "UP";
    }else if(event.keyCode == 39 && dir != "LEFT"){
        dir = "RIGHT";
    }else if(event.keyCode == 40 && dir != "UP"){
        dir = "DOWN";
    }
}

let snakeX = snake[0].x;
let snakeY = snake[0].y;

function draw(){

    ctx.clearRect(0,0,500,500);

    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = "black";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x,snake[i].y, box, box);
    }

    if(dir == "LEFT") snakeX -= box;
    if(dir == "RIGHT") snakeX += box;
    if(dir == "UP") snakeY -= box;
    if(dir == "DOWN") snakeY += box;

    if(snakeX < 0){
        snakeX = box * 19;
    }else if(snakeX > box * 19){
        snakeX = 0;
    }else if(snakeY < 0){
        snakeY = box * 19;
    }else if(snakeY > box * 19){
        snakeY = 0;
    }

    if(snakeX == food.x && snakeY == food.y)
    {
        score++;
        food = {
            x : Math.floor(Math.random()*16) * box,
            y : Math.floor(Math.random()*16) * box
        }        

    }else{
        snake.pop();
    }

    for(let i=1;i<snake.length;i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
        {
            alert("game over");
            clearInterval(game)
        }
    }

    let nuovatesta = {
        x : snakeX,
        y : snakeY
    }

    snake.unshift(nuovatesta);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x,food.y,box,box);
    ctx.strokeStyle = "white";
    ctx.strokeRect(food.x,food.y, box, box);

    ctx.fillStyle = "black";
    ctx.font = "30px Changa one";
    ctx.fillText("score: " + score,5,500);
}

let game = setInterval( draw, 100);

