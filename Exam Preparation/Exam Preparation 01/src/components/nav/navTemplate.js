import { html } from "../../../node_modules/lit-html/lit-html.js";

export const navTemplate = (
  isUserLoggedIn,
  logoutHandler
) => html` <!-- Navigation -->
  <a id="logo" href="/"><img id="logo-img" src="/images/logo.png" alt="" /></a>

  <nav>
    <div>
      <a href="/dashboard">Dashboard</a>
      <a href="/search">Search</a>
    </div>
    ${isUserLoggedIn
      ? html` <div class="user">
          <a href="/create">Add Pair</a>
          <a href="javascript:void(0)" @click=${logoutHandler}>Logout</a>
        </div>`
      : html`<div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>`}
  </nav>`;
