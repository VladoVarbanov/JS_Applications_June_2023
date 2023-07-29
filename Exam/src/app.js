import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { navTemplate, navTemplateGuest } from "./component/nav/navTemplate.js";
import { homeTemplate } from "./component/home/homeTemplate.js";
import { loginRender } from "./component/login/loginTemplate.js";
import { registerRender } from "./component/register/registerTemplate.js";
import { dashboardRender } from "./component/dashboard/dashboardTemplate.js";

const main = document.querySelector("#wrapper main");
const nav = document.querySelector("#wrapper header");

let isUserLoggedIn = false;

// Base URL.
const baseUrl = "http://localhost:3030";

if (isUserLoggedIn) {
  render(navTemplate, nav);
} else {
  render(navTemplateGuest, nav);
}

render(homeTemplate, main);

// Routing.
page("/index.html", "/");
// page(navComponent.showView);

// page("/", homeComponent.showView);
page("/login", () => loginRender(main));
page("/register", () => registerRender(main));
page("/dashboard", () => dashboardRender(main));
page.start();
