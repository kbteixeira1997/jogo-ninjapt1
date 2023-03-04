var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ninja, ninja_running, ninja_jumping;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;

var score=0;




function preload(){
  ninja_running =   loadAnimation("png/Run__001.png","png/Run__002.png","png/Run__003.png",
                                  "png/Run__004.png","png/Run__005.png","png/Run__006.png",
                                  "png/Run__007.png","png/Run__008.png","png/Run__009.png");
  ninja_jumping = loadAnimation("png/Jump__001.png","png/Jump__002.png","png/Jump__003.png",
                                "png/Jump__004.png","png/Jump__005.png","png/Jump__006.png",
                                "png/Jump__007.png","png/Jump__008.png","png/Jump__009.png",);
  ninja_idle = loadAnimation("png/Idle__001.png","png/Idle__002.png","png/Idle__003.png",
                                "png/Idle__004.png","png/Idle__005.png","png/Idle__006.png",
                                "png/Idle__007.png","png/Idle__008.png","png/Idle__009.png",);
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  
  
  
}

function setup() {
  createCanvas(600, 200);
  
  ninja = createSprite(50,180,20,50);
  ninja.addAnimation("idle", ninja_idle);
  ninja.addAnimation("jumping", ninja_jumping);
  ninja.addAnimation("running", ninja_running);
  
  
  ninja.scale = 0.1;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
 
  
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
 
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  ninja.changeAnimation("idle",ninja_idle);
 
  
  if(keyDown("space") && ninja.y >= 159) {
    ninja.velocityY = -12;
    ninja.changeAnimation("jumping",ninja_jumping);
  }
  if(keyDown("d")) {
    ninja.x= ninja.x+3;
    ninja.changeAnimation("running",ninja_running);
  }
  if(keyDown("a")) {
    ninja.x= ninja.x-3;
  }
  
  ninja.velocityY = ninja.velocityY + 0.8
  
  
  
  ninja.collide(invisibleGround);
  spawnClouds();
   
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -1;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = ninja.depth;
    ninja.depth = ninja.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

