const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const users = require(__dirname + "/db/user.json")
const exercises = require(_dirname + "/db/exercises.json")
const fs = require("fs")
const authenticator = require("./authenticator.js")

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cookieParser());

app.use(authenticator)

app.get("/api/user/info", (req, res) => {
    let username = req.body.name
    let usernameInCookies = req.cookies.username
    if (username !== usernameInCookies) return res.send({"error": "no permission"})
    console.log(username)
    if (username === "" || username === null) return res.send({"error": "no username"})
    let user = users[username]
    if (user == null) return res.send({"error": "user not found"})
    res.send({
        "username": user["name"],
        "email": user["email"],
        "currentExercise": user["currentExercise"],
        "completedExercises": user["completedExercises"]
    })
})

app.post("/api/user/login", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let user = users[username]
    if (user != null && user["password"] === password)
        return res.cookie("password", password).cookie("username", username).send({"status": "Login successful!"})
    else return res.send({"status": "Login not successful"})
})

app.post("/api/user/signup", (req, res) => {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    if (username === "" || username == null) return res.send({"status": "no username found"})
    if (email === "" || email == null) return res.send({"status": "no email found"})
    if (password === "" || password == null) return res.send({"status": "no password found"})

    if (users[username] != null) return res.send({"error": "username is already taken"})
    let user = {
        name: username,
        password: password,
        email: email,
        currentExercise: "",
        completedExercises: []
    }
    users[username] = user
    fs.writeFileSync(__dirname + "/db/user.json", JSON.stringify(users))
    res.send({"status": "successful"})
})

app.post("/api/exercise/select", (req, res) => {
    let exercise = req.body.exercise
    let username = req.cookies.username
    users[username].currentExercise = exercise
    fs.writeFileSync(__dirname + "/db/users.json", JSON.stringify(users))
})

app.post("/api/exercise/solve", (req, res) => {

})

app.post("/", (req, res) => {
    let number = req.body.number
    console.log(req.body)
    if (number == null) number = 0
    number *= 3
    res.send({number: number})
})
app.get("api/exercises/list", (req, res) => {
    for (const exercise of exercises [req.body.city]) {
        let exercisesCity = []
        exercisesCity.push({
            "title": exercise.title,
            "description": exercise.description,
            "points": exercises.points
        })
        exercisesCity[1].push

    }


})


app.listen(1337, () => {
    console.log("Server started: http://localhost:1337")
})