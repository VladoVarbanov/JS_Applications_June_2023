import { page, render } from "./lib.js";
import { showLogin } from "./views/loginView.js";
import { getUserData } from "./util.js";
import { showHome } from "./views/homeView.js";
import { updateNav } from "./views/nav.js";
import { showRegister } from "./views/registerView.js";
import { showCatalog } from "./views/catalogView.js";
import { showCreate } from "./views/createView.js";
import { showEdit } from "./views/editView.js";
import { showDetails } from "./views/detailsView.js";

const main = document.querySelector("main");

page(decorateContext);
page("/", showHome);
page("/home", showHome);
page("/catalog", showCatalog);
page("/catalog/:id", showEdit);
page("/edit/:id", showEdit);
page("/create", showCreate);
page("/details/:id", showDetails);
page("/login", showLogin);
page("/register", showRegister);

updateNav();
page.start();

function decorateContext(ctx, next) {
  ctx.render = renderMain;
  ctx.updateNav = updateNav;

  const user = getUserData();
  if (user) {
    ctx.user = user;
  }

  next();
}

function renderMain(content) {
  render(content, main);
}
