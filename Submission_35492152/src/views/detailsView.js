import { deleteById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (motor, isOwner, onDelete) => html`<section
  id="details"
>
  <div id="details-wrapper">
    <img id="details-img" src="${motor.imageUrl}" alt="example1" />
    <p id="details-title">${motor.model}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="year">Year: ${motor.year}</p>
        <p class="mileage">Mileage: ${motor.mileage} km.</p>
        <p class="contact">Contact Number: ${motor.contact}</p>
        <p id="motorcycle-description">${motor.about}.</p>
      </div>
      <!--Edit and Delete are only for creator-->
      <div id="action-buttons">
        ${isOwner
          ? html`<a href="/edit/${motor._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
                >Delete</a
              >`
          : nothing}
      </div>
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const motor = await getById(id);
  if (ctx.user !== undefined) {
    const isOwner = motor._ownerId === ctx.user._id;
    ctx.render(detailsTemplate(motor, isOwner, onDelete));
  } else {
    ctx.render(detailsTemplate(motor, false, onDelete));
  }

  async function onDelete() {
    const userConfirm = confirm("Are you sure?");
    if (!userConfirm) {
      return;
    }
    await deleteById(id);
    ctx.page.redirect("/catalog");
  }
}
