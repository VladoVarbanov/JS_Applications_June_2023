import { searchMotor } from "../api/data.js";
import { html, nothing } from "../lib.js";

const result = "No result.";

const searchTemplate = (
  isClicked,
  handler,
  motors,
  hasUser,
  result
) => html`<section id="search">
  <div class="form">
    <h4>Search</h4>
    <div class="search-form">
      <input type="text" name="search" id="search-input" />
      <button @click=${handler} class="button-list">Search</button>
    </div>
  </div>
  <h4 id="result-heading">Results:</h4>
  <!-- <div class="search-result"> -->
  ${isClicked ? createResultTemp(motors, hasUser, result) : nothing}
  <!-- </div> -->
</section>`;

const createResultTemp = (motors, hasUser, result) => {
  return html`${motors.length > 0
    ? html` ${motors.map((motor) => createCard(motor, hasUser))} `
    : html`<h2 class="no-avaliable">${result}</h2>`}`;
};

const createCard = (motor, hasUser) => html`
  <div class="motorcycle">
      <img src=${motor.imageUrl} alt="example1" />
      <h3 class="model">${motor.model}</h3>
      <a class="details-btn" href="/details/${motor._id}">More Info</a>
    </div>
  </div>`;

export async function showSearch(ctx) {
  ctx.render(searchTemplate(false, onSearch));
  async function onSearch(e) {
    const searchInput = document.getElementById("search-input").value;

    if (!searchInput) {
      return alert("All fields are required!");
    }

    const motors = await searchMotor(searchInput);
    ctx.render(
      searchTemplate(true, onSearch, motors, Boolean(ctx.user), result)
    );
  }
}
