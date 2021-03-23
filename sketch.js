// Constants
let W;
let H;
let SCALE = 0.1;
let STYLE = 1;
let RADIUS = 1;

// Arrays
let points = [];
let MATRIX = [];

function setup() {
    W = window.innerWidth;
    H = window.innerHeight;
    createCanvas(W, H);
}

function mouseDragged() {
    points.push(new Coordinate(mouseX, mouseY));
}

function draw() {
    for (let i = 0; i < points.length; i++) {
        if (STYLE === 2) {
            points[i].display1();
            points[i].move();
        } else if (STYLE === 1) {
            points[i].display2();
            points[i].move();
        }
    }
}

function reset() {
    W = window.innerWidth;
    H = window.innerHeight;

    createCanvas(W, H);

    points = [];
}


//Events
window.addEventListener("resize", onResize);

function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    createCanvas(width, height);
  }

window.addEventListener('load', () => {
    let editingMatrix = false;
    let matrixInputDiv = document.getElementById('matrix-input');
    let matrixInputWrapper = document.getElementById('matrix-input-wrapper');

    function getExprs() {
        let exprs = [];

        for (let i = 1; i <= 2; i++) {
            let row = [];
            for (let j = 1; j <= 2; j++) {
                row.push(document.getElementById('matrix-entry-' + i + j).value);
            }
            exprs.push(row);
        }
        return exprs;
    }

    function generateLaTeXMatrix() {
        let res = String.raw`\( \begin{bmatrix}`;

        let exprs = getExprs();
    
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let expr = exprs[i][j];
                MATRIX.push(exprs[i][j]);
                res += math.parse(expr).toTex();
                if (j < 1) {
                    res += '&';
                } else if (i < 1) {
                    res += '\\\\';
                }
            }
        }

        res += String.raw`\end{bmatrix} \)`;

        let matrixExpresssionDiv = document.getElementById('matrix-expression');
        matrixExpresssionDiv.textContent = res;
  
        renderMathInElement(matrixExpresssionDiv);
    }

    generateLaTeXMatrix();

    document.getElementById('info-button').addEventListener('click', () => {
        document.getElementById('info').classList.toggle('hidden');
    });

    document.getElementById('reset-button').addEventListener('click', () => {
        reset();
    });


    let editMatrixButton = document.getElementById('edit-matrix-button');
    editMatrixButton.addEventListener('click', () => {
        if (editingMatrix) {
            generateLaTeXMatrix();
            editMatrixButton.textContent = 'Edit Matrix Expression';
            let exprs = getExprs();
            MATRIX[0] = exprs[0][0];
            MATRIX[1] = exprs[0][1];
            MATRIX[2] = exprs[1][0];
            MATRIX[3] = exprs[1][1];
            reset();
            compiledExprs = exprs.map(row => row.map(expr => math.compile(expr)));
        } else {
            editMatrixButton.textContent = 'Update Matrix Expression';
        }
        editingMatrix = !editingMatrix;
        matrixInputWrapper.classList.toggle('hidden');
    });

    document.getElementById('scale-dot').addEventListener('change', event => {
        SCALE = parseFloat(event.target.value);
    });

    document.getElementById('style-select').addEventListener('change', event => {
        if (event.target.value === '1') {
            STYLE = 1;
        } else if (event.target.value === '2') {
            STYLE = 2;
        }
    });

    document.getElementById('matrix-select').addEventListener('change', event => {
        function setMatrixEntries(entries) {
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    let elementID = "matrix-entry-" + (i+1) + (j+1);
                    document.getElementById(elementID).value = entries[i][j];
                }
            }
        }
        let choice = event.target.value;
        if (choice == '1') {
            setMatrixEntries([
                ["1.01", "-0.1"],
                ["0.98", "0.98"]
            ]);
        } else if (choice == '2') {
            setMatrixEntries([
                ["-1.01",  "1.01"],
                ["0.98",  "-1.01"]
            ]);
        }  else if (choice == '3') {
            setMatrixEntries([
                ["-1", "0.98"],
                ["1",    "-1"]
            ]);
        } else if (choice == '4') {
            setMatrixEntries([
                ["1.01",   "0.01"],
                ["0.98",  "-1.01"]
            ]);
        } else if (choice == '5') {
            setMatrixEntries([
                ["-1.01",   "0.001"],
                ["0.001",   "-1.01"]
            ]);
        } else if (choice == '6') {
            setMatrixEntries([
                ["0.98",   "-0.98"],
                ["0.98",   "0.98"]
            ]);
        } else if (choice == '7') {
            setMatrixEntries([
                ["1.1", "-0.1"],
                ["0.1",  "1.1"]
            ]);
        } else if (choice == '8') {
            setMatrixEntries([
                ["1",   "0.1"],
                ["1",  "-1"]
            ]);
        } else if (choice == '9') {
            setMatrixEntries([
                ["0.997902826", "-0.0647298184"],
                ["0.647298184",   "0.997902826"]
            ]);
        }
    });

    renderMathInElement(document.body);
});
