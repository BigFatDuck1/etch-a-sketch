

let div_container = document.querySelector(".div_container");

let number_of_divs = 16;

let createDivs = () => {

    console.log(div_container)

    //Loop specified number of times
    for (let i = 0; i < number_of_divs; i++) {
        let div_child = document.createElement("div");
        div_child.classList.add("div_child");
        div_container.appendChild(div_child);
        console.log(i)
    }

}

createDivs();