import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { AuthService } from "./services/AuthService.js";
import { BaseApiService } from "./services/BaseApiService.js";
import { BaseCrudApiService } from "./services/BaseCrudApiService.js";
import { SessionService } from "./services/SessionService.js";
import { NavComponent } from "./components/nav/nav.js";
import { navTemplate } from "./components/nav/navTemplate.js";
import { HomeComponent } from "./components/home/home.js";
import { homeTemplate } from "./components/home/homeTemplate.js";
import { LoginComponent } from "./components/login/login.js";
import { loginTemplate } from "./components/login/loginTemplate.js";
import { DashboardComponent } from "./components/dashboard/dashboard.js";
import { dashboardTemplate } from "./components/dashboard/dashboardTemplate.js";

const main = document.querySelector("#wrapper main");
const nav = document.querySelector("#wrapper header");

// Router.
let router = {
  navigate: page.show,
  redirect: page.redirect,
};

// Base URL.
const baseUrl = "http://localhost:3030";

// Render handlers.
let renderBody = (template) => render(template, main);
let renderNav = (template) => render(template, nav);

// Service.
let sessionService = new SessionService();
let authService = new AuthService(baseUrl, sessionService);
let shoesService = new BaseCrudApiService(
  baseUrl,
  "/data/shoes",
  sessionService
);
// let baseApiService = new BaseApiService(baseUrl);

// Components.
let navComponent = new NavComponent(
  authService,
  renderNav,
  navTemplate,
  router
);
let homeComponent = new HomeComponent(renderBody, homeTemplate);
let loginComponent = new LoginComponent(
  authService,
  renderBody,
  loginTemplate,
  router
);
let dashboardComponent = new DashboardComponent(
  shoesService,
  renderBody,
  dashboardTemplate
);

// Routing.
page("/index.html", "/");
page(navComponent.showView);

page("/", homeComponent.showView);
page("/login", loginComponent.showView);
page("/dashboard", dashboardComponent.showView);
page.start();
