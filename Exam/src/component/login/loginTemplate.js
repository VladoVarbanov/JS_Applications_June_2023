import { html, render } from "../../../node_modules/lit-html/lit-html.js";
import page from "../../../node_modules/page/page.mjs";
import { UserReadableError } from "../../errors/UserReadableError.js";
import { AuthService } from "../../services/AuthService.js";
import { SessionService } from "../../services/SessionService.js";
import { dashboardRender } from "../dashboard/dashboardTemplate.js";
import { navTemplate } from "../nav/navTemplate.js";

const baseUrl = "http://localhost:3030";
export const loginTemplate = () => html`<section id="login">
  <div class="form">
    <h2>Login</h2>
    <form class="login-form" @submit=${submitHandler}>
      <input type="text" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <button type="submit">login</button>
      <p class="message">
        Not registered? <a href="/register">Create an account</a>
      </p>
    </form>
  </div>
</section>`;

export function loginRender(DOM) {
  render(loginTemplate(), DOM);
}

export async function submitHandler(e) {
  e.preventDefault();
  let form = e.target;
  let formData = new FormData(form);

  let email = formData.get("email");
  let password = formData.get("password");

  if (email == "" || password == "") {
    alert("Email and Password must not be empty");
    return;
  }

  let user = { email, password };
  let sessionService = new SessionService();
  let authservice = new AuthService(baseUrl, sessionService.setAccessToken());
  try {
    let result = await authservice.login(user);
    console.log("res");
    // this.router.navigate("/dashboard");
  } catch (error) {
    if (error instanceof UserReadableError) {
      alert(error.message);
      return;
    }
  }
  //   let res = result.json();

  const nav = document.querySelector("#wrapper header");
  render(navTemplate, nav);
  page.show("/dashboard");
}
