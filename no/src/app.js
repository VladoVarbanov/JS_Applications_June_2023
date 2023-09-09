import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { showCatalog } from "./views/catalogView.js";
import { showCreate } from "./views/createView.js";
import { showDetails } from "./views/detailsView.js";
import { showEdit } from "./views/editView.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginView.js";
import { updateNav } from "./views/nav.js";
import { showRegister } from "./views/registerView.js";
import { showSearch } from "./views/searchView.js";


const main = document.getElementById("main-content");


page(decorateContext);
page("/", showHome);
page("/home", showHome);
page("/register", showRegister);
page("/login", showLogin);


page("/catalog", showCatalog);
page("/create", showCreate);
page("/details/:id", showDetails);
page("/edit/:id", showEdit);


page("/search", showSearch);

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
