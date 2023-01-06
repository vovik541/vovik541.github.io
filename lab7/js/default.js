let defaultEventsLogs = [];

window.onload = (event) => {
    defaultEventsLogs = JSON.parse(localStorage.getItem("defaultEventsLogs"));
    if (defaultEventsLogs == null) {
        defaultEventsLogs = [];
    }
}

let square;
let width;
let height;
let startingHeight;

function playDefault() {
    // printMessageToConsole("Work is displayed");
    hideBlock("defaultReload");
    hideBlock("defaultStop");
    displayBlock("defaultWork");
    displayBlock("defaultClose");
    displayBlock("defaultStart");

    let animField = document.querySelector("#defaultAnimationField");
    square = document.querySelector("#square-box");
    width = animField.offsetWidth - 15;
    height = animField.offsetHeight;
    square.style.left = width + "px";
    startingHeight = document.querySelector("#defaultControls").offsetHeight + 5;
    square.style.top = "";
}

function closeDefault() {
    printMessageToDefaultConsole("Close button pressed");
    hideBlock("defaultWork");
    isDefaultStopped = true;
    localStorage.setItem("defaultEventsLogs", JSON.stringify(defaultEventsLogs));
    printToDefaultAfterCloseOutput();
}

let isDefaultStopped;

function startDefault() {
    printMessageToDefaultConsole("Start button pressed");
    hideBlock("defaultStart");
    displayBlock("defaultStop");

    let fromTop = startingHeight;
    let fromLeft = width;
    let isBottomDirection = true;
    isDefaultStopped = false;

    let interval = setInterval(
        function () {
            if (isBottomDirection) {
                if (fromTop > height + startingHeight - 25) {
                    isBottomDirection = false;
                    printMessageToDefaultConsole("Square touched bottom line");
                }
                fromTop += 5;
                fromLeft -= 3;
            } else {
                if (fromTop < startingHeight + 5) {
                    isBottomDirection = true;
                    printMessageToDefaultConsole("Square touched top line");
                }
                fromTop -= 5;
                fromLeft -= 3;
            }
            if (fromLeft < -50) {
                clearInterval(interval)
                printMessageToDefaultConsole("Square is out of animation block");
                hideBlock("defaultStop");
                displayBlock("defaultReload");

            }
            if (isDefaultStopped) {
                clearInterval(interval)
            }

            square.style.top = fromTop + "px";
            square.style.left = fromLeft + "px";
        }, 15);

}

function reloadDefault() {
    printMessageToDefaultConsole("Reload button pressed");
    hideBlock("defaultReload");
    displayBlock("defaultStart");

    let animField = document.querySelector("#defaultAnimationField");
    square = document.querySelector("#square-box");
    width = animField.offsetWidth - 15;
    height = animField.offsetHeight;
    square.style.left = width + "px";
    startingHeight = document.querySelector("#defaultControls").offsetHeight + 5;
    square.style.top = "";
}

function stopDefault() {
    printMessageToDefaultConsole("Stop button pressed");
    hideBlock("defaultStop");
    displayBlock("defaultStart");
    isDefaultStopped = true;
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

function printMessageToDefaultConsole(message) {
    let output = document.getElementById("defaultEventsOutput");
    output.textContent = message;

    defaultEventsLogs[defaultEventsLogs.length] = {
        message: message,
        time: getCurrentDayTime()
    }
    localStorage.setItem("defaultEventsLogs", JSON.stringify(eventsLogs));
}

function getCurrentDayTime() {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + " " + time;
}

function printToDefaultAfterCloseOutput() {
    defaultEventsLogs = JSON.parse(localStorage.getItem("defaultEventsLogs"));
    if (defaultEventsLogs == null) {
        defaultEventsLogs = [];
    }

    let out = document.getElementById("right-subCol");
    out.innerHTML = "";
    let outElement = document.createElement("p");
    outElement.textContent = "DEFAULT EVENT LOGS:";
    out.appendChild(outElement);

    for (let i = eventsLogs.length - 1; i > 0; i--) {
        outElement = document.createElement("p");
        outElement.textContent = eventsLogs[i].message + " " + eventsLogs[i].time + " ";
        out.appendChild(outElement);
    }
}