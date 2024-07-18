class Bala {
    constructor(x, y) {
        this.r = 50
        this.body = Bodies.circle(x, y, this.r, { isStatic: true })
        this.image = loadImage("./assets/cannonball.png")
        this.trayectoria= []
        this.animation = [this.image]
        this.speedAni = 0.05
        World.add(world, this.body)
    }
    animacion(){
        this.speedAni += 0.05;
    }
    display() {
        var frame = floor(this.speedAni % this.animation.length)
        push()
        imageMode(CENTER)
        image(this.animation[frame], this.body.position.x, this.body.position.y, this.r, this.r)
        pop()
        if(this.body.velocity.x> 0 && this.body.position.x>10){
            this.trayectoria.push([this.body.position.x, this.body.position.y])
        }
        this.trayectoria.forEach(bala => {image(this.image, bala[0],bala[1],5,5)})
    }
    disparar() {
        var newAngle = cannon.angle - 28;
        newAngle = newAngle * (3.14 / 180)
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, {
            x: velocity.x * (180 / 3.14), y: velocity.y * (180 / 3.14)
        });
    }
    balaDestruir(index){
        Matter.Body.setVelocity(this.body, {x:0, y:0})
        this.animacion = balaSplash
        setTimeout(() => {
            Matter.World.remove(world, this.body)
            delete balas[index]
        }, 1000);
    }
}
