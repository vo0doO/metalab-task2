import "./styles/index.scss"
import $ from "jquery"

const userStack = {
    language: "JavaScript",
    framework: "Pug"
}

const user = {
    name: "Danila",
    age: 32,
    ...userStack
}
$(".block").html("Jquery работает")
console.log(user)