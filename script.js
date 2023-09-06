

let div_container = document.querySelector(".div_container");

let number_of_rows = 16;
let number_of_columns = 16;

let generateOneColumn = (dimensionY) => {
    for (let i = 0; i < dimensionY; i++) {
        let div_child = document.createElement("div");
        div_child.classList.add("div_child");
        div_container.appendChild(div_child);
    }
}

let createDivs = (dimensionX, dimensionY) => {

    //Loop specified number of times
    for (let i = 0; i < dimensionX; i++) { //dimensionX is number of columns
        generateOneColumn(dimensionY);
    }

}

createDivs(number_of_columns, number_of_rows);