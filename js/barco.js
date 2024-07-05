class Barco {
    constructor(x,y, w, h){
        this.body = Bodies.rectangle(x,y,w,h,{
            restitution: 0.8,
            friction: 1.0,
            density:1.0
        });
        this.ancho = w
        this.alto = h
        this.image = loadImage("./assets/boat.png")
        World.add(world, this.body);
    
    }
    display(){
        var angulo = this.body.angle;
        var pos = this.body.position;
        push()
        translate(pos.x, pos.y);
        rotate(angulo)
        imageMode(CENTER);
        image(this.image, 0,0, this.ancho , this.alto);
        pop()
    }
}