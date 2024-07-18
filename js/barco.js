class Barco {
    constructor(x,y, w, h, ani){
        this.body = Bodies.rectangle(x,y,w,h,{
            restitution: 0.8,
            friction: 1.0,
            density:1.0
        });
        this.ancho = w
        this.alto = h
        this.image = loadImage("./assets/boat.png")
        this.animation = ani
        this.speedAni = 0.05
        this.hundido = false
        World.add(world, this.body);
     
    }
    animacion(){
        this.speedAni += 0.05;
    }
    display(){
        var angulo = this.body.angle;
        var pos = this.body.position;
        var frame = floor(this.speedAni % this.animation.length)
        push()
        translate(pos.x, pos.y);
        rotate(angulo)
        imageMode(CENTER);
        image(this.animation[frame], 0,-10, this.ancho , this.alto)
        pop()
    }
    destruir(i){
        this.animation= barcoRoto
        this.ancho= 300
        this.alto = 300
        setTimeout(()=>{Matter.World.remove(world,this.body);
            //delete barcos[i]
            barcos.splice(i,1)
        }, 2000)
    }
}