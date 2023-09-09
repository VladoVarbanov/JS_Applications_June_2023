import { getAllMotors } from "../api/data.js";
import { html, nothing } from "../lib.js";

const cardTemplate = (
  motor,
  hasUser
) => html` <!-- Display a div with information about every post (if any)-->
  <div class="motorcycle">
    <img src=${motor.imageUrl} alt="example1" />
    <h3 class="model">${motor.model}</h3>
    <p class="year">Year: ${motor.year}</p>
    <p class="mileage">Mileage: ${motor.mileage} km.</p>
    <p class="contact">Contact Number: ${motor.contact}</p>
    <a class="details-btn" href="/details/${motor._id}">More Info</a>
  </div>`;

const catalogTemplate = (motors, hasUser) => html`<h2>Available Motorcycles</h2>
  <section id="dashboard">
    ${motors.length > 0
      ? motors.map((motor) => cardTemplate(motor, hasUser))
      : html`<!-- Display an h2 if there are no posts -->
          <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
  </section>`;

export async function showCatalog(ctx) {
  const allMotors = await getAllMotors();
  ctx.render(catalogTemplate(allMotors, !!ctx.user));
}
