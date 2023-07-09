import { contacts } from "./contacts.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";
import { classMap } from "./node_modules/lit-html/directives/class-map.js.map";

let main = document.getElementById("contacts");

let contactTemplate = (contact, detailsHandler) => html` <div
  class="contact card"
>
  <div>
    <i class="far fa-user-circle gravatar"></i>
  </div>
  <div class="info">
    <h2>Name: ${contact.name}</h2>
    <button class="detailsBtn" @click=${(e) => detailsHandler(e, contact.name)}>
      Details
    </button>
    <div class="details hidden" id="${contact.id}">
      <p>Phone number: ${contact.phoneNumber}</p>
      <p>Email: ${contact.email}</p>
    </div>
  </div>
</div>`;

let contactsTemplate = (contacts, detailsHandler) => html`<main>
  ${contacts.length > 0
    ? html`${contacts.map((x) => contactTemplate(x, detailsHandler))}`
    : html`<div>No Content</div>`}
</main>`;

render(contactsTemplate(contacts, detailsHandler), main);

function detailsHandler(e, name) {
  console.log(name);
  let element = e.target;
  let details = element.parentElement.querySelector(".details");
  details.classList.toggle("hidden");
}
