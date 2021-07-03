var backImage,backgr;
var player, player_running;
var ground,ground_img;
var food_img;
var obstacle_img;
var gameOver_img;
var score = 0;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  food_img = loadImage("banana.png");
  obstacle_img = loadImage("stone.png");
  gameOver_img = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  player.co
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200,20,20);
  gameOver.addImage(gameOver_img);
  gameOver.visible = false;

  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(player.y > 150){
    if(keyDown("space")) {
      player.velocityY = -12;
    }
  }
    player.velocityY = player.velocityY + 0.8;

    if(player.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score = score + 2;
      player.scale += + 0.06;
    }

    player.collide(ground);
    spawnFood();
    spawnObstacles();

    if(player.isTouching(obstacleGroup)){
      gameState = END;
    }

  }else if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();

    gameOver.visible = true;

  }
  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120,200);
    banana.addImage(food_img);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
    obstacle=createSprite(500,310,20,20);
    obstacle.addImage(obstacle_img);
    obstacle.velocityX=-5;
    obstacle.scale=0.4;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
    
  }
}