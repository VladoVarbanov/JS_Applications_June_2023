import { createFact } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (handler) => html`<section id="create">
  <div class="form">
    <h2>Add Fact</h2>
    <form @submit=${handler} class="create-form">
      <input type="text" name="category" id="category" placeholder="Category" />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
      />
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      ></textarea>
      <textarea
        id="additional-info"
        name="additional-info"
        placeholder="Additional Info"
        rows="10"
        cols="50"
      ></textarea>
      <button type="submit">Add Fact</button>
    </form>
  </div>
</section>`;

export async function showCreate(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate(data) {
    const correctData = {
      category: data.category,
      imageUrl: data["image-url"],
      description: data.description,
      moreInfo: data["additional-info"],
    };

    if (
      !correctData.category ||
      !correctData.imageUrl ||
      !correctData.description ||
      !correctData.moreInfo
    ) {
      return alert("All fields are required!");
    }

    await createFact(correctData);
    ctx.page.redirect("/catalog");
  }
}
