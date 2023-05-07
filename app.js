const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const users = require(__dirname + "/db/user.json")
const exercises = require(__dirname + "/db/exercises.json")
const fs = require("fs")

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("frontend"))

app.use(cookieParser());

app.use("/api/user/info", authenticate)
app.use("/api/exercise/select", authenticate)
app.use("/api/exercise/solve", authenticate)

function authenticate(req, res, next) {
    const users = require(__dirname + "/db/user.json")
    let username = req.cookies.username
    let password = req.cookies.password


    let user = users[username]
    if (user != null && user["password"] === password) next()
    else return res.redirect("/login")
}

app.get("/api/user/info", (req, res) => {
    let username = req.cookies.username
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
    console.log(username + "|" + password)
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

app.get("/api/exercises/list/:city", (req, res) => {
    let city = req.params.city
        let exercisesCity = []
        for (const i in exercises[city]) {
            exercisesCity.push({
                "title": exercises[city][i].title,
                "description": exercises[city][i].description,
                "points": exercises[city][i].points,
                "id": exercises[city][i].id
            })
        }
        res.send(exercisesCity)
    }
)

//TODO Add City parameter
app.post("/api/exercise/select", (req, res) => {
    let exercise = req.body.exercise
    let username = req.cookies.username
    users[username].currentExercise = exercise
    fs.writeFileSync(__dirname + "/db/user.json", JSON.stringify(users))
    res.send({"status": "successful"})
})

app.post("/api/exercise/solve", (req, res) => {
    let username = req.cookies.username
    let exercise = users[username].currentExercise
    //let city = req.body.city
    users[username].completedExercises.push(exercise)
    users[username].currentExercise = ""
    fs.writeFileSync(__dirname + "/db/user.json", JSON.stringify(users))
    res.send({"status": "successful"})
})

app.get("/", (req, res) => {
    res.send("Hello")
})
// app.get("/api/exercises/list/:city", (req, res) => {
//     let city = req.params.city
//     let exercisesCity = []
//     for (const i in exercises[city]) {
//         exercisesCity.push({
//             "title": exercises[city][i].title,
//             "description": exercises[city][i].description,
//             "points": exercises[city][i].points
//         })
//
//     }
//     res.send(exercisesCity)
// })
app.get("/api/exercises/get/:city/:id", (req, res) => {
    let city = req.params.city
    let id = req.params.id
    let exercise = exercises[city][id]
    res.send(exercise)
})

app.listen(1337, () => {
    console.log("Server started: http://localhost:1337")
})