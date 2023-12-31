
//Select the container of the grid
let div_container = document.querySelector(".div_container");

//Define dimension of grid
let number_of_rows = 16;
let number_of_columns = 16;
//Size of one square
let one_square_size = 1;
//Width of entire grid;
let entire_width = 300;

//Mode: Erase = 0, Draw = 1
let mode = 1;

//Random number function 
let randNumber = (max) => {
    let number;
    number = Math.floor(Math.random() * max);
    return number;
}

//Erase or draw
let penButton = () => {
    document.querySelector(".draw_button").addEventListener("click", () => {
        //Mode: Draw
        mode = 1;
        //Button becomes activated
        document.querySelector(".draw_button").classList.add("btn_activated");
        //Deactivate other button
        document.querySelector(".erase_button").classList.remove("btn_activated")
        document.querySelector(".rainbow_button").classList.remove("btn_activated");

    })
}
let eraseButton = () => {
    document.querySelector(".erase_button").addEventListener("click", () => {
        //Mode: Erase
        mode = 0;
        //Button becomes activated
        document.querySelector(".erase_button").classList.add("btn_activated");
        //Deactivate other button
        document.querySelector(".draw_button").classList.remove("btn_activated")
        document.querySelector(".rainbow_button").classList.remove("btn_activated");

    })    
}
penButton();
eraseButton();

//Rainbow button
let rainbowButton = () => {
    document.querySelector(".rainbow_button").addEventListener("click", () => {
        //Mode: Rainbow
        mode = 2;
        //Button becomes activated
        document.querySelector(".rainbow_button").classList.add("btn_activated");
        //Deactivate other button
        document.querySelector(".draw_button").classList.remove("btn_activated");
        document.querySelector(".erase_button").classList.remove("btn_activated");
    })
}
rainbowButton();

//Defines dimension of container
let widthContainer = () => {
    div_container.style.height = `${entire_width}px`;
    div_container.style.width = `${entire_width}px`;

}

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

//Modify CSS grid so there is an appropiate number of columns for the grid
let changeGrid = () => {
    div_container.style.gridTemplateColumns = `repeat(${number_of_columns},${one_square_size}px)`
    let all_div_child = document.querySelectorAll(".div_child");
    all_div_child.forEach((item) => {
        item.style.height = `${one_square_size}px`;
        item.style.width = `${one_square_size}px`;

    })
    //Stores the "array" containing all children into a variable (it's not actually an array)
    div_child_array = all_div_child;
}

changeGrid();

//Updates grid - put this in whenever there are any updates to the parameters
let updateGrid = (event) => {
    //Remove previous grid
    while (div_container.firstChild) {
        div_container.removeChild(div_container.lastChild);
    }
    let new_grid_size = event;
    //Change grid dimension variables
    number_of_columns = new_grid_size;
    number_of_rows = new_grid_size;
    //Define the size of one square under the new dimensions
    one_square_size = squareSize(entire_width, number_of_rows);
    widthContainer();
    //Create a new grid with the right number of divs
    createDivs(number_of_columns, number_of_rows);
    //Change the height and width of each square so it is correct and forms a square
    changeGrid();
    //Adds event listener to the new divs (div_child)
    divChangesColor();
    //Updates label
    document.querySelector("#grid_size_label").textContent = `${number_of_columns}x${number_of_columns}`;
}

//Change grid size after input
let gridSubmit = () => {
    document.querySelector("#grid_size").addEventListener("input", (event) => {
        let new_size = event.target.value;
        updateGrid(new_size);
    })
}
gridSubmit();

//Change container width
let changeContainerWidth = () => {
    let width_form = document.querySelector("form");
    let width_size = document.querySelector("#width_size");
    width_form.addEventListener("submit", (event) => {
        event.preventDefault();
        //Stores value into variable
        entire_width = width_size.value;
        //Makes the field empty again
        width_size.value = "";
        //Run gridSubmit()
        updateGrid(number_of_columns);

    })
}
changeContainerWidth();

//Each div changes color when clicked
let divChangesColor = () => {
    let changeColor;
    let eraseColor;
    let rainbowColor;
    let all_div_child = document.querySelectorAll(".div_child");
    all_div_child.forEach((item) => {
        
        //Function that draws when cursor is over the div
        let hoverDraw = () => {
            if(mode == 1) {
                //Draw
                changeColor(item);
            } else if (mode == 0) {
                //Erase
                eraseColor(item);
            } else if (mode == 2) {
                //Rainbow
                rainbowColor(item);
            }
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
        change_me.style.backgroundColor = "black";
        change_me.classList.add("div_child_activated");
    }
    //Eraser
    eraseColor = (change_me) => {
        change_me.classList.remove("div_child_activated");
        change_me.style.backgroundColor = "white";
    }
    //Rainbow
    rainbowColor = (change_me) => {
        change_me.classList.add("div_child_rainbow");
        //Change it to random
        let r = randNumber(255);
        let g = randNumber(255);
        let b = randNumber(255)
        change_me.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
}

divChangesColor();

//Clear button
let clearButton = () => {
    let clear_button = document.querySelector(".clear_button");
    clear_button.addEventListener("click", () => {
        div_child_array.forEach((item) => {
            item.classList.remove("div_child_activated");
            item.style.backgroundColor = "white";
        })
    })
}
clearButton();