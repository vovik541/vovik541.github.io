function playCanvas() {
    displayBlock("work")
    displayBlock("closeCanvas");
    displayBlock("startCanvas");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    fillCanvasBackground(ctx);
}


function fillCanvasBackground(ctx) {

    const img = new Image();
    img.src = "./images/repeatable.jpg";
    img.onload = () => { // Only use the image after it's loaded
        ctx.fillStyle = ctx.createPattern(img, "repeat");
        ctx.fillRect(0, 0, 600, 600);
    };
}

function closeCanvas() {
    hideBlock("work")
}

function reloadCanvas() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    ctx.fillStyle = "green";
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(width - 10, 0, 10, 10);
    displayBlock("startCanvas");
    hideBlock("reloadCanvas");
}
function stopCanvas(){
    isStopped = true;
}

function startCanvas() {
    isStopped = false;
    hideBlock("startCanvas");
    displayBlock("stopCanvas");
    moveCanvas();
}

let isRunning = false;
let isStopped = false;
function moveCanvas() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let width = canvas.width;
    let height = canvas.height;
    let x = width - 10;
    let y = 0;
    let isBottomDirection = true;

    if(!isRunning){
        isRunning = true;
        ctx.fillStyle = "green";
        ctx.fillRect(x, y, 10, 10);
        requestAnimationFrame(draw);
    }
    function draw(timeStamp) {

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "green";
        ctx.fillRect(x, y, 10, 10);

        setTimeout(function() {
            // Whatever you want to do after the wait
        }, 500);

        // fillCanvasBackground(ctx);
        if (isBottomDirection) {
            if (y >= height - 10) {
                isBottomDirection = false;
            } else {
                y += 3;
                x -= 2;
            }
        } else {
            y -= 3;
            x -= 2;
        }

        if (isStopped){
            ctx = null;
            isRunning = false;
            displayBlock("startCanvas");
            hideBlock("stopCanvas");
            return
        }

        if (x < 0) {
            ctx = null;
            isRunning = false;
            displayBlock("reloadCanvas");
            hideBlock("stopCanvas");
            return;
        }

        setTimeout(draw, 16);
    }
}

function displayBlock(blockName) {
    document.getElementById(blockName)
        .style
        .display = "block";
}

function hideBlock(blockName) {
    document.getElementById(blockName)
        .style
        .display = "none";
}