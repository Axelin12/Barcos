const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var balas = []
var barcos = []
function preload() {
  bg= loadImage("./assets/background.gif")
  torre = loadImage("./assets/tower.png")
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create()
  world= engine.world;
  tower = Bodies.rectangle(160, 350 , 160, 310, {isStatic:true})
  World.add(world, tower)
  ground = Bodies.rectangle(0, height-1, width*2, 1, {isStatic:true} )
  cannon = new Cannon(180, 110, 130, 100,4)
 World.add(world,ground)
}

function draw() {
  image(bg, 0,0,width,height)
  Engine.update(engine)
  rect(ground.position.x,ground.position.y, width*2, 1)
  push()
  imageMode(CENTER)
  image(torre, tower.position.x, tower.position.y, 160, 310)
  pop()
  for(var i = 0; i< balas.length; i++){
   balas[i].display();
  }
  cannon.display()
  mostrarBarcos()
}
function keyPressed(){
  if (keyCode == "32"){
    balas.forEach(elemento => {
      elemento.trayectoria = [];
    })
    bala = new Bala(cannon.x, cannon.y);
    balas.push(bala);
  }
}
function keyReleased() {
  if (keyCode == "32"){
     balas[balas.length -1].disparar();
    
  }
}

function mostrarBarcos(){
  if(barcos.length >0){
    for(var i = 0; i > barcos.length; i++){
      if(barcos[i]){
        barcos[i].display()
        Matter.Body.setVelocity(barcos[i].body,{x:-0.9,y:0});
       console.log("Holaaa")
      }
    }
  }else{
    barco = new Barco(width-400, height-200, 170,170);
    barcos.push(barco);
  }

}
