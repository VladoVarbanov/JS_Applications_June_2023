import { editMotor, getById } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (motor, handler) => html`<section id="edit">
  <h2>Edit Motorcycle</h2>
  <div class="form">
    <h2>Edit Motorcycle</h2>
    <form @submit=${handler} class="edit-form">
      <input
        type="text"
        name="model"
        id="model"
        placeholder="Model"
        .value=${motor.model}
      />
      <input
        type="text"
        name="imageUrl"
        id="moto-image"
        placeholder="Moto Image"
        .value=${motor.imageUrl}
      />
      <input
        type="number"
        name="year"
        id="year"
        placeholder="Year"
        .value=${motor.year}
      />
      <input
        type="number"
        name="mileage"
        id="mileage"
        placeholder="mileage"
        .value=${motor.mileage}
      />
      <input
        type="number"
        name="contact"
        id="contact"
        placeholder="contact"
        .value=${motor.contact}
      />
      <textarea
        id="about"
        name="about"
        placeholder="about"
        rows="10"
        cols="50"
        .value=${motor.about}
      ></textarea>
      <button type="submit">Edit Motorcycle</button>
    </form>
  </div>
</section>`;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const motor = await getById(id);
  ctx.render(editTemplate(motor, createSubmitHandler(onEdit)));

  async function onEdit(data) {
    const { model, imageUrl, year, mileage, contact, about } = data;
    if (!model || !imageUrl || !year || !mileage || !contact || !about) {
      return alert("All fields are required!");
    }

    await editMotor(id, data);
    ctx.page.redirect("/details/" + id);
  }
}
