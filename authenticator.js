const router = require("express").Router



function authenticate(req, res, next) {
    const users = require(__dirname + "/db/user.json")
    let username = req.cookies.username
    let password = req.cookies.password


    let user = users[username]
    if (user != null && user["password"] === password) next()
    else return res.redirect("/login")
}

module.exports = router