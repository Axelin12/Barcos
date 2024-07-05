class Cannon {
    constructor(x,y, w,h,angle){
        this.x= x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = angle;
        this.base = loadImage("./assets/cannonBase.png")
        this.cannon = loadImage("./assets/canon.png")
    }
    display(){
        if(keyIsDown(RIGHT_ARROW) || keyIsDown(DOWN_ARROW) && this.angle< 90){
            this.angle += 2;

        }
        if(keyIsDown(LEFT_ARROW) || keyIsDown(UP_ARROW) && this.angle > -30 ){
            this.angle -= 2;
        } 
        push()
        angleMode(DEGREES);
        imageMode(CENTER);
        translate(this.x, this.y)
        rotate(this.angle)
        image(this.cannon, 0,0, this.w, this.h)
        pop()
        image(this.base, 70, 20, 200, 200)
    }
}