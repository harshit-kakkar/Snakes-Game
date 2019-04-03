//snakes game

function init(){
    // console.log("init");
    canvas = document.getElementById('mycanvas');
    pen = canvas.getContext('2d');
    W = canvas.width;
    H = canvas.height;
    game_over =false;

    food = getRandomFood();

    score = 0;

    snake ={
        init_length: 5,
        color: "yellow",
        cells:[],
        direction: "right",

        createSnake: function(){
            for(var i=this.init_length-1;i>=0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake: function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle =this.color;

                pen.strokeStyle ="black";
                pen.lineWidth = 3;


                pen.strokeRect(this.cells[i].x*10, this.cells[i].y*10, 10, 10);
                pen.fillRect(this.cells[i].x*10, this.cells[i].y*10, 10, 10);

            }
        },

        updateSnake: function(){

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            //Assuming snake is moving right
            //Insertion at head;

            //nextheadX = headX+1;
            //this.cells.pop();
            //this.cells.unshift({x:nextheadX , y:headY});

            if(headX==food.x && headY==food.y){
                food = getRandomFood();
                score++;
            }
            else{
                this.cells.pop();
            }



            if (this.direction=="right"){
                nextX =headX+1;
                nextY = headY;
            }

            else if(this.direction=="left"){
                nextX = headX-1;
                nextY = headY;
            }

            else if(this.direction=="down"){
                nextX = headX;
                nextY = headY+1
            }

            else {
                nextX =headX;
                nextY =headY-1;
            }


            //Inserting new cell at head or front

            this.cells.unshift({x:nextX , y:nextY});


            var last_x = Math.round(W/10);
            var last_y = Math.round(H/10);

            if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>last_x || this.cells[0].y>last_y){
                alert("GameOver");
                game_over = true;
            }


        }

    };
    snake.createSnake();

    //Add event listeners to the game
    //listen for keyboard game

    function KeyPressed(e){
        if(e.key=="ArrowRight"){
            snake.direction ="right";
        }


        else if(e.key=="ArrowLeft"){
            snake.direction ="left";
        }

        
        else if(e.key=="ArrowDown"){
            snake.direction ="down";
        }

        else{
            snake.direction ="up";
        }
    }

    document.addEventListener('keydown', KeyPressed);

}


function draw(){
    // console.log("draw");
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    //drawing the food

    pen.fillStyle = food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);

    pen.fillStyle ="white";
    pen.font = "12px Roboto";
    pen.fillText("Score : "+score,10,10);

}


function update(){
    // console.log("update");
    snake.updateSnake();

}

function gameloop(){

    draw();
    update();

    if(game_over==true){
        clearInterval(c);
    }


}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-10)/10);
    var foodY = Math.round(Math.random()*(H-10)/10);

    foodColors =["red","green","aqua","coral","orchid"];
    var i = Math.round(Math.random()*foodColors.length);

    var food ={
        x:foodX,
        y:foodY,
        color: foodColors[i]
    }

    return food;
}

init();

//call gamelooper after t time
var c = setInterval(gameloop,100);