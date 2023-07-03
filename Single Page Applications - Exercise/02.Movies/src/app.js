// step 1.
// show/hide requested content (login, register, etc.).

import { homePage } from "./home.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { updateNavBar } from "./util.js";

// NAVIGATION - routes mapping.
// - /login => login page.
// - /register => register page.
//

const routes = {
  "/": homePage,
  "/login": loginPage,
  "/register": registerPage,
};

document.querySelector("nav").addEventListener("click", onNavigate);

function onNavigate(event) {
  if (event.target.tagName === "A" && event.target.href) {
    event.preventDefault();

    // if (event.target.text === "Login") {
    //   loginPage();
    // } else if (event.target.text === "Register") {
    //   registerPage();
    // } else if (event.target.text === "Movies") {
    //   homePage();
    // }

    const url = new URL(event.target.href);

    const view = routes[url.pathname];

    view();
  }
}
updateNavBar();

homePage();
