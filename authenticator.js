const router = require("express").Router

router.get("/api/user/info", (req, res, next) => {
    authenticate(req, res, next)
})
router.get("/api/exercise/select", (req, res, next) => {
    authenticate(req, res, next)
})
router.get("/api/exercise/solve", (req, res, next) => {
    authenticate(req, res, next)
})

function authenticate(req, res, next) {
    const users = require(__dirname + "/db/user.json")
    let username = req.cookies.username
    let password = req.cookies.password


    let user = users[username]
    if (user != null && user["password"] === password) next()
    else return res.redirect("/login")
}

module.exports = router