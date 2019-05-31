const getUNIXDate = () => {
    return Math.round((new Date()).getTime() / 1e3)
}

console.log("Hello World\n%d", getUNIXDate())

const rollTheDice = sides => {
    return Math.round(Math.random() * --sides) + 1
}

// document.querySelector("#rollTheDice").addEventListener("click", () => {
//     const e = document.createElement("article").classList.add("alert")
//     e.innerHTML = `<input type="number">`
//
// })
