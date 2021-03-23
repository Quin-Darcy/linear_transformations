// Constants
let W = window.innerWidth - 20;
let H = window.innerHeight - 20;
let type;
let style;
let button;
let slider;
let SCALE = 0.1;
let RADIUS = 1;
let STYLE = 1;
let RUN = false;
let IMG = false;
let c;

// Arrays
let points = [];
let DEFAULT_MATRIX = [1, 0, 0, 1];
let MATRIX = DEFAULT_MATRIX;

// Main Program
function setup() {
    c = createCanvas(W, H);
    background(0);
    textAlign(CENTER);
    style = createSelect();
    type = createSelect();
    style.position(.01*W, 10);
    type.position(0.24*W, 10);
    style.option('-Choose Style-');
    style.option('Fixed Radius and Color');
    style.option('Variable Radius and Color');
    type.option('-Choose Matrix-');
    type.option('1');
    type.option('2');
    type.option('3');
    type.option('4');
    type.option('5');
    type.option('6');
    type.option('7');
    type.option('8');
    type.option('9');
    type.option('10');
    button = createButton('Run');
    button.position(W-0.083*W, 10);
    button.mousePressed(run);
    slider = createSlider(1, 200, 0);
    slider.position(W*0.5, 10);
    slider.style('width', '15%');
    background(0);
}

function mouseDragged() {
    points.push(new Coordinate(mouseX, mouseY));
}

function run() {
    RUN = true;
    background(0);
    points = [];
    SCALE = slider.value()/100;
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        IMG = true;
    }
}

function draw() {
    if (style.value() != '-Choose Style-' && type.value() != '-Choose Matrix-' && slider.value() != 0 && RUN) {
        switch(style.value()) {
            case 'Fixed Radius and Color':
                STYLE = 1;
                break;
            case 'Variable Radius and Color':
                STYLE = 2;
                break;
        }
        switch(type.value()) {
            case '1':
                MATRIX = [1.01, -0.1, 0.98, 0.98];
                break;
            case '2':
                MATRIX = [-1.01, 1.01, 0.98, -1.01];
                break;
            case '3':
                MATRIX = [-1, 0.98, 1, -1];
                break;
            case '4':
                MATRIX = [1.01, 0.01, 0.98, -1.01];
                break;
            case '5':
                MATRIX = [-1.01, 0.001, 0.001, -1.01];
                break;
            case '6':
                MATRIX = [0.98, -0.98, 0.98, 0.98];
                break;
            case '7':
                MATRIX = [-1.1, -0.1, 0.1, 1.1];
                break;
            case '8':
                MATRIX = [1, 0.1, 1, -1];
                break;
            case '9':
                MATRIX = [0.997902826, -0.064729, 0.0421565323, 0.999111018];
                break;
        }
        for (let i = 0; i < points.length; i++) {
            if (STYLE === 1) {
                points[i].display1();
                points[i].move();
            } else if (STYLE === 2) {
                points[i].display2();
                points[i].move();
            }
        } 
    } else {
        background(0);
        points = [];
    }
    if (IMG) {
        noLoop();
        style.hide();
        type.hide();
        button.hide();
        slider.hide();
        saveCanvas(c, 'image', 'jpg');
        style.show();
        type.show();
        button.show();
        slider.show();
        IMG = false;
        loop();
    }
}

document.ontouchmove = function(event) {
    event.preventDefault();
};
