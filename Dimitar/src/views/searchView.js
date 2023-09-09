import { searchAlbum } from "../api/data.js";
import { html, nothing } from "../lib.js";

const searchTemplate = (isClicked, handler, albums, hasUser) => html`<section
  id="searchPage"
>
  <h1>Search by Name</h1>

  <div class="search">
    <input
      id="search-input"
      type="text"
      name="search"
      placeholder="Enter desired albums's name"
    />
    <button @click=${handler} class="button-list">Search</button>
  </div>

  <h2>Results:</h2>
  <div class="search-result">
    ${isClicked ? createResultTemp(albums, hasUser) : nothing}
  </div>
</section>`;

const createResultTemp = (albums, hasUser) => {
  return html`${albums.length > 0
    ? html` ${albums.map((album) => createCard(album, hasUser))} `
    : html`<p class="no-result">No result.</p>`}`;
};

const createCard = (album, hasUser) => html`<div class="card-box">
  <img src=${album.imgUrl} />
  <div>
    <div class="text-center">
      <p class="name">Name: ${album.name}</p>
      <p class="artist">Artist: ${album.artist}</p>
      <p class="genre">Genre: ${album.genre}</p>
      <p class="price">Price: $${album.price}</p>
      <p class="date">Release Date: ${album.releaseDate}</p>
    </div>
    ${hasUser
      ? html`<div class="btn-group">
          <a href="/details/${album._id}" id="details">Details</a>
        </div>`
      : nothing}
  </div>
</div>`;

export async function showSearch(ctx) {
  //   let isClicked = false;
  ctx.render(searchTemplate(false, onSearch));
  async function onSearch(e) {
    const searchInput = document.getElementById("search-input").value;

    if (!searchInput) {
      return alert("All fields are required!");
    }

    const albums = await searchAlbum(searchInput);
    ctx.render(searchTemplate(true, onSearch, albums, Boolean(ctx.user)));
  }
}
