function runTable(tableName, disableText) {
    document.getElementById(disableText).style = "display: none;";
    document.getElementById(tableName + "-box").style = "display: block;"
}
function stopTable(tableName, disabledText){
    document.getElementById(disabledText).style = "display: block;";
    document.getElementById(tableName + "-box").style = "display: none;"
}
function inputNewCell(tableName) {
    recreateTableWithNewCell(tableName);
    loadTableInsides(tableName);
}

function loadTableInsides(tableName) {
    let previousTableSize = parseInt(localStorage.getItem(tableName + "Size"));
    let tableSize

    if (isNaN(previousTableSize)) {
        tableSize = 0;
    } else {
        tableSize = previousTableSize;
    }

    for (let i = 0; i < tableSize; i++) {
        let cellInputId = tableName + "-input-" + i;
        let cellInput = document.getElementById(cellInputId);
        cellInput.value = localStorage.getItem(cellInputId);
    }
}

function saveTable(tableName) {
    let previousTableSize = parseInt(localStorage.getItem(tableName + "Size"));
    let tableSize

    if (isNaN(previousTableSize)) {
        tableSize = 0;
    } else {
        tableSize = previousTableSize;
    }

    for (let i = 0; i < tableSize; i++) {
        let cellInputId = tableName + "-input-" + i;
        let cellInput = document.getElementById(cellInputId).value;
        localStorage.setItem(cellInputId, cellInput);
    }
}

function recreateTable(tableName) {
    let previousTableSize = parseInt(localStorage.getItem(tableName + "Size"));
    let tableSize

    if (isNaN(previousTableSize)) {
        tableSize = 0;
    } else {
        tableSize = previousTableSize;
    }

    createTable(tableName, tableSize);
    loadTableInsides(tableName);
}

function recreateTableWithNewCell(tableName) {
    let previousTableSize = parseInt(localStorage.getItem(tableName + "Size"));
    let tableSize

    if (isNaN(previousTableSize)) {
        tableSize = 1;
    } else {
        tableSize = previousTableSize + 1;
    }

    localStorage.setItem(tableName + "Size", tableSize);

    createTable(tableName, tableSize);
}

function createTable(tableName, tableSize) {
    let tableBlock = document.getElementById(tableName + "-block");
    tableBlock.innerHTML = '';

    const table = document.createElement("table");
    table.style.width = '40px';
    table.style.border = '1px solid black';

    if (tableSize % 2 === 1) {
        let tableRow = table.insertRow();
        for (let i = 0; i < tableSize; i++) {
            createTableCell(tableName, tableRow, i);
        }
    } else {
        let tableRow = table.insertRow();
        let i = 0;

        for (; i < tableSize / 2; i++) {
            createTableCell(tableName, tableRow, i);
        }

        tableRow = table.insertRow();
        for (; i < tableSize; i++) {
            createTableCell(tableName, tableRow, i);
        }
    }
    tableBlock.appendChild(table);

}

function createTableCell(tableName, tableRow, i) {
    let tableCell = tableRow.insertCell();
    tableCell.id = tableName + "-cell-" + i;
    let input = document.createElement("input");
    input.id = tableName + "-input-" + i;
    input.style = "width:30px;"
    tableCell.appendChild(input);
}

function selectEvent() {
    let colorElement = document.getElementById("colorInput");
    document.getElementById("right-subCol").style = "background-color: " + colorElement.value + ";";
    localStorage.setItem("6boxColor", colorElement.value);
}

window.onload = (event) => {
    // localStorage.setItem("table1Size", 2);
    recreateTable("table1");

    let sixthBoxColor = localStorage.getItem("6boxColor");
    if (sixthBoxColor) {
        document.getElementById("right-subCol").style = "background-color: " + sixthBoxColor + ";";
    }

    let temp = getCookie("minNumber");
    if (temp) {
        displayForm(false);
        let hasToSave = confirm("Do you want to save the minimum number from cookie?: " + temp)
        if (hasToSave) {
            alert("Your cookies were saved. Page Reloaded")
        } else {
            temp = 0;
            deleteCookie("minNumber");
            deleteCookie("isOnLoad");
        }
    }

    if (temp) {
        alert("Current cookies are: minNumber=" + temp);
    } else {
        displayForm(true);
        alert("Current cookies are:");
    }

};

function displayForm(isDisplayed) {

    let form = document.getElementById("formId");

    if (isDisplayed) {
        form.style = "display: block;";
    } else {
        form.style = "display: none;";
    }
}

function deleteCookie(name) {
    document.cookie = name + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function swapBlocks() {
    let firstElement = document.getElementById("header-text");
    let sixthElement = document.getElementById("block6");

    let blockOneContent = firstElement.textContent;

    firstElement.textContent = sixthElement.textContent;
    sixthElement.textContent = blockOneContent;

}

function countCircleSquare() {
    let firstElement = document.getElementById("block5");

    let radius = 5;
    let square = parseFloat(Math.PI * radius * radius + "").toFixed(2);

    firstElement.textContent += "\n Circle Square with radius " + square + " is " + square;
}

function handleNumber(number) {
    try {
        let num = parseInt(number);
        if (isNaN(num)) {
            document.getElementById("error").textContent = "Please, input valid natural number";
        } else {
            document.getElementById("error").textContent = "";
            let numLine = ("" + num).split("");
            let smallest = 10;
            for (let i = 0; i < numLine.length; i++) {
                if (smallest > numLine[i]) {
                    smallest = numLine[i]
                }
            }
            alert("The smallest digit is " + smallest);
            document.cookie = "minNumber=" + smallest;
            // document.cookie = "saveOnLoad=false";
            document.cookie = "isOnLoad=true";
        }
    } catch (err) {
        document.getElementById("error").textContent = "Please, input valid natural number";
    }
}