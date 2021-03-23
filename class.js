class Coordinate {
    constructor(x, y) {
        this.x = (x - W/2)*SCALE  || 0;
        this.y = (y - H/2)*SCALE || 0;
        this.ox = (x - W/2)*SCALE;
        this.oy = (y - H/2)*SCALE;
        this.row_0 = new p5.Vector(MATRIX[0], MATRIX[1]);
        this.row_1 = new p5.Vector(MATRIX[2], MATRIX[3]);
    }
    move() {
        this.x = this.row_0.x * this.x + this.row_0.y * this.y;
        this.y = this.row_1.x * this.x + this.row_1.y * this.y;
    }
    display1() {
        noStroke();
        fill(255);
        ellipse(this.x/SCALE+W/2, this.y/SCALE+H/2, RADIUS);
    }
    display2() {
        let R = map(Math.abs(this.x-this.ox), -W*SCALE/2, W*SCALE/2, 0, 255);
        let G = map(Math.abs(this.y-this.oy), -H*SCALE/2, H*SCALE/2, 0, 255);
        let B = map(dist(0, 0, this.x, this.y), -SCALE/2*dist(0,0,W,H), SCALE/2*dist(0,0,W,H), 0, 255);
        fill(R, G, B);
        ellipse(this.x/SCALE+W/2, this.y/SCALE+H/2, dist(this.x, this.y, this.ox, this.oy));
    }
}
