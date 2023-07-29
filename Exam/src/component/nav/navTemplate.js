import { html } from "../../../node_modules/lit-html/lit-html.js";

//isUserLoggedIn
export const navTemplate = html`<a id="logo" href="/"
    ><img id="logo-img" src="/images/logo.png" alt=""
  /></a>

  <nav>
    <div>
      <a href="/">Fun Facts</a>
    </div>

    <!-- Logged-in users -->
    <div class="user">
      <a href="/create">Add Fact</a>
      <a href="javascript:void(0)">Logout</a>
    </div>
  </nav>`;

// @click=${logoutHandler}

export const navTemplateGuest = html`<a id="logo" href="/"
    ><img id="logo-img" src="/images/logo.png" alt=""
  /></a>

  <nav>
    <div>
      <a href="/">Fun Facts</a>
    </div>
    <!-- Guest users -->
    <div class="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div>
  </nav>`;
