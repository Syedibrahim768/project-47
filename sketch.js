//we are declaring the variables
var bg,bgImage
var playerImage,player,playerShooting
var zombi,zombiImage,zombiGroup
var heart1,heart2,heart3
var heart1Image,heart2Image,heart3Image
var life=3
var score =0 
var bullets = 70
var gameState = "fight"
var bullet,bulletGroup

// we are loading the images
function preload (){
bgImage = loadImage("./assets/bg.jpeg")
playerImage = loadImage("./assets/shooter_2.png")
playerShooting = loadImage("./assets/shooter_3.png")
zombiImage = loadImage("./assets/zombie.png")
heart1Image = loadImage("./assets/heart_1.png")
heart2Image = loadImage("./assets/heart_2.png")
heart3Image = loadImage("./assets/heart_3.png")

}


function setup() {
  //creating the canvas
  createCanvas(windowWidth,windowHeight);
  //creating the background
 bg = createSprite (displayWidth/2-20,displayHeight/2-40,20,20)
 bg.addImage(bgImage)
 bg.scale = 1.1
 // creating the player
 player = createSprite(displayWidth-1150,displayHeight-300,50,50)
 player.addImage(playerImage)
 player.scale = 0.3
 player.setCollider("rectangle",0,0,300,300)
 //creating the zombie group
 zombiGroup = new Group()
 bulletGroup = new Group()
 //creating the health bar to the player
 heart1 = createSprite(displayWidth-150,40,20,20)
 heart1.visible = false
 heart1.addImage(heart1Image)
 heart1.scale = 0.4

heart2 = createSprite(displayWidth-100,40,20,20)
 heart2.visible = false
 heart2.addImage(heart2Image)
 heart2.scale = 0.4

 heart3 = createSprite(displayWidth-150,40,20,20)
 
 heart3.addImage(heart3Image)
 heart3.scale = 0.4
}

function draw() {
  background(0); 
  if (gameState === "fight"){
  //displaying the life bar
  if (life === 3){
    heart1.visible = false
    heart2.visible = false
    heart3.visible = true
  } 
  if(life === 2){
    heart1.visible = false
    heart2.visible = true
    heart3.visible = false
  }
  if (life === 1){
    heart1.visible = true
    heart2.visible = false
    heart3.visible = false
  }
  if(life ===0){
    gameState = "lost"
  }
  if(score ===100){
    gameState ="won"
  }
  //adding controls to the playable character
  if (keyDown("UP_ARROW")&&player.y>80){
    player.y-=30
  }

  if (keyDown("DOWN_ARROW")&&player.y<height-100){
    player.y+=30
  }
  //adding shooting functionality to the playable character
  if (keyWentDown("space")){
    bullet = createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.velocityX = 20
    bulletGroup.add(bullet)
    player.depth = bullet.depth
    player.depth = player.depth+2
    bullets = bullets-1
    player.addImage(playerShooting)
  }
  else if (keyWentUp("space")){
    player.addImage(playerImage)
  }
  if (bullets ===0){
    gameState = "bullet"
  }
  if (zombiGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombiGroup.length;i++){
      if (zombiGroup[i].isTouching(bulletGroup)){
        zombiGroup[i].destroy()
        bulletGroup.destroyEach()
        score = score+2
      }
    }
  }
  //checking collision between playable character and zombies
  if (zombiGroup.isTouching(player)){
    for(var i=0;i<zombiGroup.length;i++){
      if (zombiGroup[i].isTouching(player)){
        zombiGroup[i].destroy()
        life=life-1
      }
    }
  }
  //calling the enemy function and drawing sprites
  enemy()
}
  drawSprites();
  textSize(20)
  fill ("white")
  text("Bullets :"+bullets,displayWidth-210,displayHeight/2-250)
  text("Score :"+score,displayWidth-210,displayHeight/2-220)
  if(gameState === "lost"){
    textSize(100)
    fill ("red")
    text("You Lost ",400,400)
    zombiGroup.destroyEach()
    player.destroy ()
  }
  else if(gameState === "won"){
    textSize(100)
    fill ("yellow")
    text("You Won ",400,400)
    zombiGroup.destroyEach()
    player.destroy ()
  }
  else if(gameState === "bullet"){
    textSize(100)
    fill ("red")
    text("You ran out of bullets ",470,410)
    zombiGroup.destroyEach()
    player.destroy ()
    bulletGroup.destroyEach()
  }
}
//function to create the zombies
function enemy(){
  if (frameCount%100===0){
    zombi = createSprite(random(500,1100),random(100,500),40,40)
    zombi.addImage(zombiImage)
    zombi.scale = 0.15
    zombi.setCollider("rectangle",0,0,400,400)
    zombi.velocityX = -3
    zombi.lifeTime = 400
    zombiGroup.add(zombi)
  }
}