import { getAllAlbums } from "../api/data.js";
import { html, nothing } from "../lib.js";

const cardTemplate = (album, hasUser) => html`
 
    <!-- Display a li with information about every post (if any)-->
    <li class="card">
      <img src=${album.imageUrl} alt="travis" />
      <p><strong>Singer/Band: </strong><span class="singer">${album.singer}</span></p>
      <p>
        <strong>Album name: </strong><span class="album">${album.album}</span>
      </p>
      <p>
        <strong>Sales:</strong
        ><span class="sales">${album.sales}</span>
      </p>
      <a class="details-btn" href="/details/${album._id}">Details</a>
    </li>
  
</section>`;

const catalogTemplate = (albums, hasUser) => html`<section id="dashboard">
  <h2>Albums</h2>
  <ul class="card-wrapper">
    ${albums.length > 0
      ? albums.map((album) => cardTemplate(album, hasUser))
      : html`<h2>There are no albums added yet.</h2>`}
  </ul>
</section>`;

export async function showCatalog(ctx) {
  const allAlbums = await getAllAlbums();
  ctx.render(catalogTemplate(allAlbums, !!ctx.user));
}
