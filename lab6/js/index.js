let accordions;

window.onload = (event) => {
    addListenersToAccordions();
    accordions = loadAccordions();
    addToDocument(accordions);
};

function addListenersToAccordions() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}


function createAccordionCell(numberInput, content, header) {

    if (numberInput >= accordions.length) {
        accordions.accordion[accordions.length] = {
            id: 0,
            header: header,
            content: content
        };
    } else {
        let accordion;
        let temp = {
            id: numberInput,
            header: header,
            content: content
        };

        if (numberInput < 1){
            numberInput = 1;
        }

        let length = accordions.length;
        for (let i = numberInput - 1; i <= length; i++) {
            accordion = accordions[i];
            accordions[i] = temp;
            accordions[i].id = i;
            temp = accordion;
        }

    }
    addToDocument(accordions);
    saveAccordionsToLocalStorage(accordions);
}
function addToDocument(accordions){
    let accordionBlock = document.getElementById("accordion-block");
    accordionBlock.innerHTML = "";

    for (let i = 0; i < accordions.length; i++) {
        let button = document.createElement("button");
        button.setAttribute("class", "accordion")
        button.textContent = accordions[i].id + 1 + ". " + accordions[i].header;
        accordionBlock.appendChild(button);

        let div = document.createElement("div");
        div.setAttribute("class", "panel");

        let p = document.createElement("p");
        p.textContent = accordions[i].content;

        div.appendChild(p);
        accordionBlock.appendChild(div);
    }
    addListenersToAccordions();
}

function saveAccordionsToLocalStorage(accordions){
    for (let i = 0; i < accordions.length; i++){
        localStorage.setItem("accordions" , JSON.stringify(accordions))
    }
}
function loadAccordions(){
    let accords = JSON.parse(localStorage.getItem("accordions"));
    if (accords == null){
        accords = [];
        let accBlock = document.getElementById("accordion-block");
        let id = 0;
        let i = 0;
        let header;
        let content;
        for (const child of accBlock.children) {
            if (i % 2 != 1){
                header = child.textContent;
            } else {
                content = child.textContent;
            }
            i++;
            if (i > 0 && i % 2 == 1){
                accords[id] = {id, header, content}
                id++;
            }

        }
    }
   return accords;
}
