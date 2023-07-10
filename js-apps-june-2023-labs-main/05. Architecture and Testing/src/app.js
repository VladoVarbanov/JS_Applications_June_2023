import { init, navigate } from "./nav.js";

const main = document.querySelector("main");
const navElement = document.querySelector("nav");
main.innerHTML = "";

init(main, navElement);
navigate("catalog");
