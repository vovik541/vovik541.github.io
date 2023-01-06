let eventsLogs = [];

window.onload = (event) => {
    eventsLogs = JSON.parse(localStorage.getItem("eventsLogs"));
    if (eventsLogs == null) {
        eventsLogs = [];
    }
}

function playCanvas() {
    displayBlock("work")
    displayBlock("closeCanvas");
    displayBlock("startCanvas");
    fillCanvasBackground();

    eventsLogs[eventsLogs.length] = {
        message: "WORK displayed",
        time: getCurrentDayTime()
    }
    localStorage.setItem("eventsLogs", JSON.stringify(eventsLogs));
}

let img;

function fillCanvasBackground() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    img = new Image();
    img.src = "./images/repeatable.jpg";

    img.onload = () => { // Only use the image after it's loaded
        ctx.fillStyle = ctx.createPattern(img, "repeat");
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "green";
        ctx.fillRect(canvas.width - 10, 0, 10, 10);
    };
}

function closeCanvas() {
    hideBlock("startCanvas");
    hideBlock("reloadCanvas");
    hideBlock("work");
    isStopped = true;
    printMessageToConsole("");

    eventsLogs[eventsLogs.length] = {
        message: "WORK stopped displaying",
        time: getCurrentDayTime()
    }
    localStorage.setItem("eventsLogs", JSON.stringify(eventsLogs));
    printToAfterCloseOutput();
}

function printToAfterCloseOutput() {
    eventsLogs = JSON.parse(localStorage.getItem("eventsLogs"));
    if (eventsLogs == null) {
        eventsLogs = [];
    }

    let out = document.getElementById("right-subCol");
    out.innerHTML = "";
    let outElement = document.createElement("p");
    outElement.textContent = "EVENT LOGS:";
    out.appendChild(outElement);

    for (let i = eventsLogs.length - 1; i > 0; i--) {
        outElement = document.createElement("p");
        outElement.textContent = eventsLogs[i].message + " " + eventsLogs[i].time + " ";
        out.appendChild(outElement);
    }
}

function reloadCanvas() {
    printMessageToConsole("Reloaded button pressed");
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let width = canvas.width;
    fillCanvasBackground();

    ctx.fillStyle = "green";
    ctx.fillRect(width - 10, 0, 10, 10);
    displayBlock("startCanvas");
    hideBlock("reloadCanvas");
}

function stopCanvas() {
    printMessageToConsole("Stop button pressed");
    isStopped = true;
}

function startCanvas() {
    printMessageToConsole("Start button pressed");
    isStopped = false;
    hideBlock("startCanvas");
    displayBlock("stopCanvas");
    fillCanvasBackground();
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

    if (!isRunning) {
        isRunning = true;
        ctx.fillStyle = "green";
        ctx.fillRect(x, y, 10, 10);
        requestAnimationFrame(draw);
    }

    function draw(timeStamp) {

        ctx.fillStyle = ctx.createPattern(img, "repeat");
        if (isBottomDirection) {
            ctx.fillRect(x, y - 6, 14, 14);
        } else {
            ctx.fillRect(x, y + 3, 14, 16);
        }
        ctx.fillStyle = "green";
        ctx.fillRect(x, y, 10, 10);

        setTimeout(function () {
            // Whatever you want to do after the wait
        }, 500);

        // fillCanvasBackground(ctx);
        if (isBottomDirection) {
            if (y >= height - 10) {
                isBottomDirection = false;
                printMessageToConsole("Square touched the border");
            } else {
                y += 3;
                x -= 2;
            }
        } else {
            if (y < 0){
                isBottomDirection = true;
                printMessageToConsole("Square touched the border");
            } else {
                y -= 3;
                x -= 2;
            }
        }

        if (isStopped) {
            ctx = null;
            isRunning = false;
            displayBlock("startCanvas");
            hideBlock("stopCanvas");
            return
        }

        if (x < 0) {
            ctx.fillStyle = ctx.createPattern(img, "repeat");
            ctx.fillRect(x, y-4, 20, 20);

            ctx = null;
            isRunning = false;
            displayBlock("reloadCanvas");
            hideBlock("stopCanvas");

            printMessageToConsole("Square run out of box");
            return;
        }


        setTimeout(draw, 16);
    }
}

function clearPrevCanvasStep(x, y) {
    if (isBottomDirection) {
        ctx.fillRect(x, y - 6, 14, 14);
    } else {
        ctx.fillRect(x, y + 3, 14, 16);
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

function printMessageToConsole(message) {
    let output = document.getElementById("canvasEventsOutput");
    output.textContent = message;

    eventsLogs[eventsLogs.length] = {
        message: message,
        time: getCurrentDayTime()
    }
    localStorage.setItem("eventsLogs", JSON.stringify(eventsLogs));
}

function getCurrentDayTime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + " " + time;
}