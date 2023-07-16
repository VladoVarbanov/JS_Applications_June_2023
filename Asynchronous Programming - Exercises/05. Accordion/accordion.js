async function solution() {
  const main = document.getElementById("main");
  // "http://localhost:3030/jsonstore/advanced/articles/list"
  let headData = await getData();

  headData.forEach((element) => {
    main.appendChild(createHTMLElements(element._id, element.title));
  });
}

function createHTMLElements(id, title, content) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("accordion");

  let headDiv = document.createElement("div");
  headDiv.classList.add("head");

  let span = document.createElement("span");
  span.textContent = title;

  let toggleBtn = document.createElement("button");
  toggleBtn.textContent = "More";
  toggleBtn.classList.add("button");
  toggleBtn.id = id;
  toggleBtn.addEventListener("click", showInfo);

  let extraDiv = document.createElement("div");
  extraDiv.classList.add("extra");

  let p = document.createElement("p");
  p.textContent = content;

  extraDiv.appendChild(p);
  headDiv.appendChild(span);
  headDiv.appendChild(toggleBtn);
  mainDiv.appendChild(headDiv);
  mainDiv.appendChild(extraDiv);

  return mainDiv;
}

async function getData() {
  let allData = await fetch(
    "http://localhost:3030/jsonstore/advanced/articles/list"
  );
  let data = await allData.json();

  return data;
}

async function showInfo(e) {
  let allData = await fetch(
    `http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`
  );
  let data = await allData.json();
  let parent = e.target.parentElement;
  let extra = parent.nextSibling;
  let paragraph = extra.querySelector("p");

  if (e.target.textContent === "Less") {
    extra.style.display = "none";
    e.target.textContent = "More";
    return;
  }

  paragraph.textContent = data.content;
  extra.style.display = "block";
  e.target.textContent = "Less";

  console.log(data);
  return data;
}

solution();
