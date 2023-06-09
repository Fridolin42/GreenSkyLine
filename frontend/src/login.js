$("#loginForm").ready(async () => {
    this.onsubmit = () => {
        let username = document.getElementById("floatingInput").value
        let password = document.getElementById("floatingPassword").value
        login(username, password)
        return false
    }
})

function login(username, password) {
    let myHeaders = new Headers();
    myHeaders.append("ngrok-skip-browser-warning", "1");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "password=123456; username=fridolin");

    let urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("/api/user/login", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status.includes("not")) {
                //Login fail
                alert("Login failed")
            } else {
                //Login successful
                window.location.href = "/"
            }
        })
        .catch(error => console.log('error', error));

}