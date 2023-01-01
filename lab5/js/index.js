// const beforeUnloadListener = (event) => {
//     event.preventDefault();
//     alert(document.cookie);
//     return event.returnValue = "Are you sure you want to exit?";
// };
//
// let numberInput ;
//
// window.onload = (event) => {
//     console.log("page is fully loaded");
//     numberInput = document.querySelector("#numberInput")
//
//     numberInput.addEventListener("input", (event) => {
//         if (event.target.value !== "") {
//             addEventListener("beforeunload", beforeUnloadListener, {capture: true});
//         } else {
//             removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
//         }
//     });
// };

window.onload = (event) => {

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