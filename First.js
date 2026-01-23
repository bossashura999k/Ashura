// Lesson 5
let digitsEl = document.getElementById("digits")
let value = 0
let addIt = document.getElementById("preEl")

function increase() {
    console.log("It worked")
    value += 1
    digitsEl.textContent = value
}

function save() {
    console.log("Saved")
    console.log(value)
    let previous = value + " -"
    addIt.textContent += previous
    value = 0
    digitsEl.textContent = value
}





// Lesson 4
// let HELLO = document.getElementById("hello")

// let confimation = "It works"
// HELLO.innerText = confimation
// HELLO.innerText = HELLO.innerText + "\n It still works"

// Lesson 3
// let name = "Ashura"
// let greeting = "Hello, "
// let MyGreeting = greeting + name
// console.log(MyGreeting)
// console.log(4 + 5)
// console.log("2" + "4")
// console.log("5" + 1)
// console.log(100 + "100")

// Lesson 2
// let digitsEl = document.getElementById("digits")
// let value = 0
// let addIt = document.getElementById("preEl")

// function increase() {
//     console.log("It worked")
//     value = value + 1
//     digitsEl.innerText = value
// }

// function save() {
//     console.log("Saved")
//     console.log(value)
//     let previous = value + " - " + " "
//     addIt.innerText = addIt.innerText + previous
// }


// Lesson 1
// let increase = 1

// increase = increase + 1