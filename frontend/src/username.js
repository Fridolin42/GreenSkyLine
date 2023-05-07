function getCookie(name) {
    // Get name followed by anything except a semicolon
    let cookieString = RegExp(name + "=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, "") : "");
}

$("#menuLoginOrUsername").ready(() => {
    let username = getCookie("username")
    console.log(username)
    if(username !== "" && username != null) {
        $("#menuUsername").show()
        $("#menuLoginAndSignUp").hide()
        $("#usernameField").text(username)
    }
})