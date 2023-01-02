window.onload = (event) => {
    addListenersToAccordions();
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

const accordions = {
    accordion: []
};
function createAccordionCell(numberInput, content, header) {

    if (numberInput >= accordions.accordion.length) {
        accordions.accordion[accordions.accordion.length] = {
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

        let length = accordions.accordion.length;
        for (let i = numberInput - 1; i <= length; i++) {
            accordion = accordions.accordion[i];
            accordions.accordion[i] = temp;
            accordions.accordion[i].id = i;
            temp = accordion;
        }
    }

    let accordionBlock = document.getElementById("accordion-block");
    accordionBlock.innerHTML = "";

    for (let i = 0; i < accordions.accordion.length; i++) {
        let button = document.createElement("button");
        button.setAttribute("class", "accordion")
        button.textContent = accordions.accordion[i].id + 1 + ". " + accordions.accordion[i].header;
        accordionBlock.appendChild(button);

        let div = document.createElement("div");
        div.setAttribute("class", "panel");

        let p = document.createElement("p");
        p.textContent = accordions.accordion[i].content;

        div.appendChild(p);
        accordionBlock.appendChild(div);
    }
    addListenersToAccordions();

}

function saveAccordionsToJsonFile(accordions){
    var json = JSON.stringify(accordions);

}