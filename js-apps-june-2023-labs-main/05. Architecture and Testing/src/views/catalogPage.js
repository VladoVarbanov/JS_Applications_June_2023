import { createElement } from "../util.js";
import * as recipeService from "../services/recipeService.js";
import { html } from "../../node_modules/lit-html/lit-html.js";

let allRecipePreviewsTemplate = (recipes, toggleCard) =>
  html` <section id="catalog">
    ${recipes.map((r) =>
      r.ingredients === undefined
        ? recipePreviewTemplate(r, toggleCard)
        : recipeCardTemplate(r)
    )}
  </section>`;

let recipePreviewTemplate = (recipe, toggleCard) =>
  html`<article class="preview" @click=${() => toggleCard(recipe._id)}>
    <div class="title"><h2>${recipe.name}</h2></div>
    <div class="small"><img src=${recipe.img} /></div>
  </article>`;

let recipeCardTemplate = (recipe) =>
  html` <article>
    <h2>${recipe.name}</h2>
    <div class="band">
      <div class="thumb"><img src=${recipe.img} /></div>
      <div class="ingredients">
        <h3>Ingredients:</h3>
        <ul>
          ${recipe.ingredients.map((i) => html`<li>${i}</li>`)}
        </ul>
      </div>
    </div>
    <div class="description">
      <h3>Preparation:</h3>
      ${recipe.steps.map((s) => html`<p>${s}</p>`)}
    </div>
    <button>Edit</button>
  </article>`;

let _navigate = undefined;
let _detailRecipes = [];
export async function showCatalog(navigate, extraParams) {
  _navigate = navigate;
  _detailRecipes = extraParams[0] != undefined ? extraParams[0] : [];
  let recipes = await recipeService.getRecipesWithSelectedColumns([
    "_id",
    "name",
    "img",
  ]);

  let recipesPromises = recipes.map((r) => {
    if (_detailRecipes.includes(r._id)) {
      return recipeService.getRecipeById(r._id);
    }
    return r;
  });
  recipes = await Promise.all(recipesPromises);

  let template = allRecipePreviewsTemplate(recipes, toggleCard);
  return template;
}

async function toggleCard(id) {
  _detailRecipes.push(id);
  _navigate("catalog", _detailRecipes);
}

function createRecipePreview(recipe) {
  const result = createElement(
    "article",
    { className: "preview", onClick: toggleCard },
    createElement(
      "div",
      { className: "title" },
      createElement("h2", {}, recipe.name)
    ),
    createElement(
      "div",
      { className: "small" },
      createElement("img", { src: recipe.img })
    )
  );

  return result;
}

function createRecipeCard(recipe) {
  const result = createElement(
    "article",
    {},
    createElement("h2", {}, recipe.name),
    createElement(
      "div",
      { className: "band" },
      createElement(
        "div",
        { className: "thumb" },
        createElement("img", { src: recipe.img })
      ),
      createElement(
        "div",
        { className: "ingredients" },
        createElement("h3", {}, "Ingredients:"),
        createElement(
          "ul",
          {},
          recipe.ingredients.map((i) => createElement("li", {}, i))
        )
      )
    ),
    createElement(
      "div",
      { className: "description" },
      createElement("h3", {}, "Preparation:"),
      recipe.steps.map((s) => createElement("p", {}, s))
    ),
    createElement(
      "button",
      { onClick: () => _navigate("editRecipe", recipe._id) },
      "Edit"
    ) //Should only show for the users that are owners
  );

  return result;
}
