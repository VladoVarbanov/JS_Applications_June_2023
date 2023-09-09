import { getAllFacts } from "../api/data.js";
import { html, nothing } from "../lib.js";

const cardTemplate = (fact, hasUser) => html`<div class="fact">
  <img src=${fact.imageUrl} alt="example1" />
  <h3 class="category">${fact.category}</h3>
  <p class="description">${fact.description}</p>
  <a class="details-btn" href="/details/${fact._id}">More Info</a>
</div>`;

const catalogTemplate = (facts, hasUser) => html`<h2>Fun Facts</h2>
  <section id="dashboard">
    ${
      facts.length > 0
        ? facts.map((fact) => cardTemplate(fact, hasUser))
        : html`<h2>No Fun Facts yet.</h2>`
    }
  </section>
</section>`;

export async function showCatalog(ctx) {
  const allFacts = await getAllFacts();

  ctx.render(catalogTemplate(allFacts, !!ctx.user));
}
