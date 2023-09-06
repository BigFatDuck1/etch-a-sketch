
//Select the container of the grid
let div_container = document.querySelector(".div_container");

//Define dimension of grid
let number_of_rows = 16;
let number_of_columns = 16;
//Size of one square
let one_square_size = 1;
//Width of entire grid;
let entire_width = 300;

//Obtain user input for dimension of grid

//Calculate how big each square should be
let squareSize = (total_width, number_of_squares) => {
    return total_width / number_of_squares
}
//Overwrite one_square_size;
one_square_size = squareSize(entire_width, number_of_rows);

//This function ONLY creates 1 column! For the grid generating function see below!
let generateOneColumn = (dimensionY) => {
    for (let i = 0; i < dimensionY; i++) {
        let div_child = document.createElement("div");
        div_child.classList.add("div_child");
        div_container.appendChild(div_child);
    }
}

//Generate the grid according to the dimensions given
let createDivs = (dimensionX, dimensionY) => {

    //Loop specified number of times
    for (let i = 0; i < dimensionX; i++) { //dimensionX is number of columns
        generateOneColumn(dimensionY);
    }

}

createDivs(number_of_columns, number_of_rows);

//Modify the CSS grid so there is an appropiate number of columns for the grid
let changeGrid = () => {
    div_container.style.gridTemplateColumns = `repeat(${number_of_columns},${one_square_size}px)`
    let all_div_child = document.querySelectorAll(".div_child");
    all_div_child.forEach((item) => {
        item.style.height = `${one_square_size}px`;
        item.style.width = `${one_square_size}px`;

    })
}

changeGrid();

//Each div changes color when clicked