//Variable erstellen
let number = 30

let myarray = [15, 3 ,7]
myarray[1] += 5
myarray.push(9)
console.log(
    myarray
)

for (const value of myarray) {
    console.log(
        value
    )
}

//If Abfragen
if(number === 15) {
    number = number / 3
}

//andere Variable erstellen
let out = ""

//For Schleife
for(let i = 0; i < number; i++) {
    out = out + "-"
}

//Ausgabe
console.log(out)

//FUnktionen
function AddThhreeNumbers(a, b, c) {
    d = a + b + c
    return d
}

console.log(AddThhreeNumbers(7, 3, 14))
console.log(AddThhreeNumbers(5, 6, 13))