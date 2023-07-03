import { showViews } from "./util.js";

const section = document.getElementById("form-login");

const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);

export function loginPage() {
  showViews(section);
}

async function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch("s: http://localhost:3030/users/login", {
      method: "POST",
    });
  } catch (error) {}
}
