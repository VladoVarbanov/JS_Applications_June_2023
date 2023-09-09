import { deleteById, getById, getLikes, giveLike } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (
  album,
  isOwner,
  onDelete,
  likes,
  onLike,
  hasUser
) => html`<section id="details">
  <div id="details-wrapper">
    <p id="details-title">Album Details</p>
    <div id="img-wrapper">
      <img src=${album.imageUrl} alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>
        <strong>Band:</strong><span id="details-singer">${album.singer}</span>
      </p>
      <p>
        <strong>Album name:</strong
        ><span id="details-album">${album.album}</span>
      </p>
      <p>
        <strong>Release date:</strong
        ><span id="details-release">${album.release}</span>
      </p>
      <p>
        <strong>Label:</strong><span id="details-label">${album.label}</span>
      </p>
      <p>
        <strong>Sales:</strong><span id="details-sales">${album.sales}</span>
      </p>
    </div>
    <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

    <!--Edit and Delete are only for creator-->

    ${hasUser
      ? html`<div id="action-buttons">
          ${isOwner
            ? html`
                <a href="/edit/${album._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript: void(0)" id="delete-btn"
                  >Delete</a
                >
              `
            : html`<a
                @click=${onLike}
                href="/details/${album._id}"
                id="like-btn"
                >Like</a
              >`}
        </div>`
      : nothing}
  </div>
</section>`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const album = await getById(id);
  const likes = await getLikes(id);
  const hasUser = ctx.user !== undefined;
  console.log(likes);

  if (hasUser) {
    const isOwner = album._ownerId === ctx.user._id;
    if (isOwner) {
      ctx.render(
        detailsTemplate(album, isOwner, onDelete, likes, onLike, hasUser)
      );
    } else {
      ctx.render(
        detailsTemplate(album, false, onDelete, likes, onLike, hasUser)
      );
    }
  } else {
    ctx.render(detailsTemplate(album, false, onDelete, likes, onLike, hasUser));
  }

  async function onLike() {
    debugger;
    return giveLike({ id });
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
