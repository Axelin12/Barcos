class Bala {
    constructor(x, y) {
        this.r = 50
        this.body = Bodies.circle(x, y, this.r, { isStatic: true })
        this.image = loadImage("./assets/cannonball.png")
        this.trayectoria= []
        World.add(world, this.body)
    }
    display() {
        push()
        imageMode(CENTER)
        image(this.image, this.body.position.x, this.body.position.y, this.r, this.r)
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
}
