import { html, render } from "../../../node_modules/lit-html/lit-html.js";

export const dashboardTemplate = html`<h2>Fun Facts</h2>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    <div class="fact">
      <img src="/images/fact 1.png" alt="example1" />
      <h3 class="category">History</h3>
      <p class="description">
        Uncover the intriguing tale of the shortest war in history! The
        Anglo-Zanzibar War of 1896 lasted a mere 38 minutes, making it an
        astonishingly brief conflict that's sure to leave you amazed by the
        brevity of battle.
      </p>
      <a class="details-btn" href="">More Info</a>
    </div>
    <div class="fact">
      <img src="/images/fact 2.jpg" alt="example2" />
      <h3 class="category">Science</h3>
      <p class="description">
        Did you know that the Earth's oceans contain enough salt to cover all
        the continents in a layer 500 feet thick? Dive into the depths of this
        salty fact and explore the wonders of our planet's aquatic wonders.
      </p>
      <a class="details-btn" href="">More Info</a>
    </div>
    <div class="fact">
      <img src="/images/fact 3.jpg" alt="example3" />
      <h3 class="category">Nature</h3>
      <p class="description">
        Prepare to be astounded by the power of hummingbirds! These tiny marvels
        can flap their wings up to 80 times per second, enabling them to hover,
        fly backward, and even upside down. Discover more about these delightful
        creatures and their extraordinary abilities.
      </p>
      <a class="details-btn" href="">More Info</a>
    </div>
  </section>
  <!-- Display an h2 if there are no posts -->
  <h2>No Fun Facts yet.</h2>`;

export function dashboardRender(DOM) {
  render(dashboardTemplate, DOM);
}
