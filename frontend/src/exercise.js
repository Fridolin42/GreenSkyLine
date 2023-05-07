$(document).ready(async () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get('id');
    let entry = await getEntry(id)
    console.log(entry)
    $("#headline").text(entry.title)
    $("#longDescription").text(entry.longDescription)
    $("#instruction").attr("href", entry.instruction)
    $("#solveButton").text("Aufgabe erledigt! +" + entry.points + " Punkte")
})

function getEntry(id) {
    return new Promise((resolve, reject) => {
        let myHeaders = new Headers();
        myHeaders.append("ngrok-skip-browser-warning", "1");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("/api/exercises/get/dresden/" + id, requestOptions)
            .then(response => response.json())
            .then(result => resolve(result))
            .catch(error => reject(error));
    })
}