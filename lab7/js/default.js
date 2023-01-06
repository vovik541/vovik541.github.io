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
    hideBlock("defaultReload");
    displayBlock("defaultWork");
    displayBlock("defaultClose");
    displayBlock("defaultStart");

    let animField = document.querySelector("#defaultAnimationField");
    square = document.querySelector("#square-box");
    width = animField.offsetWidth - 15;
    height = animField.offsetHeight;
    square.style.left = width + "px";
    startingHeight = document.querySelector("#defaultControls").offsetHeight + 5;
    square.style.top = startingHeight;
}

function closeDefault() {
    hideBlock("defaultWork");
}

function startDefault() {
    hideBlock("defaultStart");
    displayBlock("defaultReload");

    let fromTop = startingHeight;
    let fromLeft = width;
    let isBottomDirection = true;

    let interval = setInterval(
        function () {
            if (isBottomDirection) {
                if (fromTop > height + startingHeight - 25) {
                    isBottomDirection = false;
                }
                fromTop += 5;
                fromLeft -= 3;
            } else {
                if (fromTop < startingHeight + 5) {
                    isBottomDirection = true;
                }
                fromTop -= 5;
                fromLeft -= 3;
            }
            if (fromLeft < -50) {
                clearInterval(interval)
            }

            square.style.top = fromTop + "px";
            square.style.left = fromLeft + "px";
        }, 15);

}

function reloadDefault() {

}

function stopDefault() {

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