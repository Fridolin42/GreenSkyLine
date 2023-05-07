$(document).ready(async () => {
    let exercises = await listExercises()
    for (const exercise of exercises) {
        console.log(exercise)
        document.getElementById("exerciseCardHolder")
            .appendChild(createCard(exercise.title, exercise.description, exercise.points,
                "/exercise?id=" + exercise.id))
    }
})

function createCard(title, description, points, link) {
    //card
    const card = document.createElement("div")
    card.classList.add("card")
    //image
    const image = document.createElement("img")
    image.src = "logo.png"
    image.classList.add("card-img-top")
    image.alt = "..."
    card.appendChild(image)
    //card body
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    card.appendChild(cardBody)
    //card title
    const cardTitle = document.createElement("h5")
    cardTitle.classList.add("card-title")
    cardTitle.innerText = title + " -  " + points + " Punkte"
    cardBody.appendChild(cardTitle)
    //card text
    const cardText = document.createElement("p")
    cardText.classList.add("card-text")
    cardText.innerText = description
    cardBody.appendChild(cardText)
    //link
    const anchor = document.createElement("a")
    anchor.classList.add("btn")
    anchor.classList.add("btn-success")
    anchor.href = link
    anchor.innerText = "Details"
    cardBody.appendChild(anchor)

    return card
}

function listExercises() {
    return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append("ngrok-skip-browser-warning", "1");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("/api/exercises/list/dresden", requestOptions)
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
}