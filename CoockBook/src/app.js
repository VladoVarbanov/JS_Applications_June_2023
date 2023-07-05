async function getRecipes() {
  const response = await fetch("http://localhost:3030/data/recipes");
  const recipes = await response.json();

  return Object.values(recipes);
}

async function getRecipesWithSelectedColumns(columns) {
  let columnsString = columns.join(",");
  let encodedPart = encodeURIComponent(columnsString);
  const response = await fetch(
    `http://localhost:3030/data/recipes?select=${encodedPart}`
  );
  const recipes = await response.json();

  return Object.values(recipes);
}

async function getRecipeById(id) {
  const response = await fetch("http://localhost:3030/data/recipes/" + id);
  const recipe = await response.json();

  return recipe;
}

function createRecipePreview(recipe) {
  const result = e(
    "article",
    { className: "preview", onClick: toggleCard },
    e("div", { className: "title" }, e("h2", {}, recipe.name)),
    e("div", { className: "small" }, e("img", { src: recipe.img }))
  );

  return result;

  async function toggleCard() {
    const fullRecipe = await getRecipeById(recipe._id);

    result.replaceWith(createRecipeCard(fullRecipe));
  }
}

function createRecipeCard(recipe) {
  const result = e(
    "article",
    {},
    e("h2", {}, recipe.name),
    e(
      "div",
      { className: "band" },
      e("div", { className: "thumb" }, e("img", { src: recipe.img })),
      e(
        "div",
        { className: "ingredients" },
        e("h3", {}, "Ingredients:"),
        e(
          "ul",
          {},
          recipe.ingredients.map((i) => e("li", {}, i))
        )
      )
    ),
    e(
      "div",
      { className: "description" },
      e("h3", {}, "Preparation:"),
      recipe.steps.map((s) => e("p", {}, s))
    )
  );

  return result;
}

window.addEventListener("load", async () => {
  const main = document.querySelector("main");

  const recipes = await getRecipesWithSelectedColumns(["_id", "name", "img"]);
  const cards = recipes.map(createRecipePreview);

  let accessToken = sessionStorage.getItem("accessToken");
  if (accessToken == undefined) {
    let guest = document.getElementById("guest");
    guest.style.display = "inline-block";
  } else {
    let user = document.getElementById("user");
    user.style.display = "inline-block";
  }

  main.innerHTML = "";
  cards.forEach((c) => main.appendChild(c));
});

function e(type, attributes, ...content) {
  const result = document.createElement(type);

  for (let [attr, value] of Object.entries(attributes || {})) {
    if (attr.substring(0, 2) == "on") {
      result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
    } else {
      result[attr] = value;
    }
  }

  content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

  content.forEach((e) => {
    if (typeof e == "string" || typeof e == "number") {
      const node = document.createTextNode(e);
      result.appendChild(node);
    } else {
      result.appendChild(e);
    }
  });

  return result;
}
