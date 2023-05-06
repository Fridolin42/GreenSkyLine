var myHeaders = new Headers();
myHeaders.append("ngrok-skip-browser-warning", "1");
myHeaders.append("", "");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("city", "dresden");

var requestOptions = {
method: 'GET',
headers: myHeaders,
body: urlencoded,
redirect: 'follow'
};

fetch("https://482f-87-129-162-138.ngrok-free.app/api/exercises/list", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
 
