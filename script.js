
//Select the container of the grid
let div_container = document.querySelector(".div_container");

//Define dimension of grid
let number_of_rows = 16;
let number_of_columns = 16;
//Size of one square
let one_square_size = 1;
//Width of entire grid;
let entire_width = 300;

let widthContainer = () => {
    div_container.style.height = `${entire_width}px`;
    div_container.style.width = `${entire_width}px`;

}
//widthContainer();

//All div_child
let div_child_array;

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
        console.log(item.style.height)

    })
    //Stores the "array" containing all children into a variable (it's not actually an array)
    div_child_array = all_div_child;
}

changeGrid();

//Change grid size after input
let gridSubmit = () => {
    document.querySelector("#grid_size").addEventListener("input", (event) => {
        while (div_container.firstChild) {
            div_container.removeChild(div_container.lastChild);
        }
        let new_grid_size = event.target.value;
        number_of_columns = new_grid_size;
        number_of_rows = new_grid_size;
        one_square_size = squareSize(entire_width, number_of_rows);
        console.log(one_square_size);
        createDivs(number_of_columns, number_of_rows);
        changeGrid();
        console.log(number_of_columns, ", ", number_of_rows);
        divChangesColor();


    })
}
gridSubmit();

//Each div changes color when clicked
let divChangesColor = () => {
    let changeColor;
    let all_div_child = document.querySelectorAll(".div_child");
    all_div_child.forEach((item) => {
        
        //Function that draws when cursor is over the div
        let hoverDraw = () => {
            changeColor(item);
        }
        //Only activate hoverDraw when mouse is down
        document.body.addEventListener("pointerdown", () => {
            item.addEventListener("pointermove", hoverDraw)
        });

        document.body.addEventListener("pointerup", () => {
            item.removeEventListener("pointermove", hoverDraw)
        });



    })

    //Change color function
    changeColor = (change_me) => {
        change_me.classList.add("div_child_activated");
    }
}

divChangesColor();

//Clear button
let clearButton = () => {
    let clear_button = document.querySelector(".clear_button");
    clear_button.addEventListener("click", () => {
        div_child_array.forEach((item) => {
            item.classList.remove("div_child_activated");
        })
    })
}
clearButton();