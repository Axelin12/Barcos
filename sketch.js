const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var balas = []
var barcos = []
var barcoNavegando = []
var barcoRoto = []
var balaSplash = []
var puntaje = 0;
function preload() {
  bg = loadImage("./assets/background.gif")
  torre = loadImage("./assets/tower.png")
  barcoAni  = loadImage("./assets/boat/boat.png")
  barcojson = loadJSON("./assets/boat/boat.json")
  barcoRIP = loadImage("./assets/boat/broken_boat.png")
  barcoRIPjson = loadJSON("./assets/boat/broken_boat.json")
  balaAni = loadImage("./assets/water_splash/water_splash.png")
  balajson = loadJSON("./assets/water_splash/water_splash.json")
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create()
  world = engine.world;
  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true })
  World.add(world, tower)
  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true })
  cannon = new Cannon(180, 110, 130, 100, 4)
  World.add(world, ground)
  var frames = barcojson.frames
  for(i = 0; i < frames.length; i++){
    var pos = frames [i].position
    var img= barcoAni.get(pos.x, pos.y,pos.w, pos.h)
    barcoNavegando.push(img)
  }
  frames = barcoRIPjson.frames
  for(i = 0; i < frames.length; i++){
    var pos = frames [i].position
    var img= barcoRIP.get(pos.x, pos.y,pos.w, pos.h)
    barcoRoto.push(img)
  }
  frames = balajson.frames
  for(i = 0; i < frames.length; i++){
    var pos = frames [i].position
    var img= balaAni.get(pos.x, pos.y,pos.w, pos.h)
    balaSplash.push(img)
  }
}

function draw() {
  image(bg, 0, 0, width, height)
  Engine.update(engine)
  rect(ground.position.x, ground.position.y, width * 2, 1)
  push()
  imageMode(CENTER)
  image(torre, tower.position.x, tower.position.y, 160, 310)
  pop()
  fill("brown")
  textSize(40)
  text("Puntuacion : "+ puntaje, width*0.5,150)
  textAlign(CENTER,CENTER)
  for (var i = 0; i < balas.length; i++) {
    if (balas[i]){
    balas[i].display();
    balas[i].animacion();
    if(balas[i].body.position.y >= height-50){
      balas[i].balaDestruir()
    }
    colision(i)
    }
  }
  cannon.display()
  mostrarBarcos()
  
}
function keyPressed() {
  if (keyCode == "32") {
    balas.forEach(elemento => {
      elemento.trayectoria = [];
    })
    bala = new Bala(cannon.x, cannon.y);
    balas.push(bala);
  }
}
function keyReleased() {
  if (keyCode == "32") {
    balas[balas.length - 1].disparar();

  }
}

function mostrarBarcos() {
  if (barcos.length > 0) {
    if (barcos[barcos.length - 1]&& barcos[barcos.length - 1].body.position.x < width - 500 || (barcos[barcos.length]== undefined && barcos.length <4)) {
      barco = new Barco(width + random([40, 80, 120, 160]), height - 100, 170, 170, barcoNavegando);
      barcos.push(barco);
    }
  for (var i = 0; i < barcos.length; i++) {
      if (barcos[i]) {
        barcos[i].display()
        barcos[i].animacion()
        Matter.Body.setVelocity(barcos[i].body, { x: -0.9, y: 0 });
        console.log("Holaaa")
      }
    }
  } else {
    barco = new Barco(width - 400, height - 100, 170, 170,barcoNavegando);
    barcos.push(barco);
  }

}
function colision(index){
  for (var i = 0; i < barcos.length; i++) {
    if (balas[index] !== undefined && barcos[i] !== undefined) {
      var collision = Matter.SAT.collides(balas[index].body, barcos[i].body);

      if (collision.collided && !barcos[i].hundido) {
        barcos[i].hundido = true
        barcos[i].destruir(i);
        puntaje+= 5
        Matter.World.remove(world, balas[index].body);
        delete balas[index];
      }
    }
    var collision = Matter.SAT.collides(tower, barcos[i].body);

      if (collision.collided && !barcos[i].hundido) {
       Gameover();
      }
  }
}
function Gameover (){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Has Perdido!",
    confirmButtonText: "Reiniciar",
}).then((result) => {
  if (result.isConfirmed) {
    location.reload()
  }
});
}