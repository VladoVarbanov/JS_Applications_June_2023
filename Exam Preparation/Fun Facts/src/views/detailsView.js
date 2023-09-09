import { deleteById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (fact, isOwner, onDelete) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${fact.imageUrl} alt="example1" />
    <p id="details-category">${fact.category}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p id="description">${fact.description}</p>
        <p id="more-info">${fact.moreInfo}</p>
      </div>

      <h3>Likes:<span id="likes">0</span></h3>
    ${
      isOwner
        ? html`<!--Edit and Delete are only for creator-->
            <div id="action-buttons">
              <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript: void(0)" id="delete-btn"
                >Delete</a
              >

              <!--Bonus - Only for logged-in users ( not authors )-->
              <!-- <a href="" id="like-btn">Like</a> -->
            </div>`
        : nothing
    }
      
      </div>
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const fact = await getById(id);
  if (ctx.user !== undefined) {
    const isOwner = fact._ownerId === ctx.user._id;
    ctx.render(detailsTemplate(fact, isOwner, onDelete));
  } else {
    ctx.render(detailsTemplate(fact, false, onDelete));
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
