import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/auth.js";

const template = (onLogin) => html`
    <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form class="login-form" @submit=${onLogin}>
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
    </section>
`

export function showLogin(ctx) {
  ctx.render(template(onLogin))

  async function onLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const pass = formData.get('password');

    if ([email, pass].some(el => el === '')) {
      alert('You have empty fields');
      return null;
    }


    try {
      await login(email, pass);

      ctx.page.redirect('/dashboard')
    } catch (err) {
      console.log(err.message);
    }
  }
}