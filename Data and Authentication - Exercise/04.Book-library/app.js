const url = "http://localhost:3030/jsonstore/collections/books";
const loadBtn = document.getElementById("loadBooks");
loadBtn.addEventListener("click", loadAllBooks);
const form = document.getElementById("form");
form.addEventListener("submit", sendForm);
let editId = "";

async function loadAllBooks() {
  let temp = document.getElementById("tbody");
  if (temp) {
    temp.remove();
  }
  let tbody = document.createElement("tbody");
  tbody.id = "tbody";
  const table = document.getElementById("table");
  table.appendChild(tbody);
  const data = await getAllBooks();
  Object.entries(data).map((bookData) => {
    const id = bookData[0];
    const book = bookData[1];
    tbody.appendChild(createHTMLElements(book.title, book.author, id));
  });
}

async function getAllBooks(e) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function createHTMLElements(title, author, id) {
  const _id = id;
  const fragment = document.createDocumentFragment();
  const tr = document.createElement("tr");

  const authorTd = document.createElement("td");
  authorTd.textContent = author;

  const titleTd = document.createElement("td");
  titleTd.textContent = title;

  const td = document.createElement("td");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", (e, _id) => editBook(e, id));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", (e, _id) => deleteBook(e, id));

  td.appendChild(editBtn);
  td.appendChild(deleteBtn);
  tr.appendChild(titleTd);
  tr.appendChild(authorTd);
  tr.appendChild(td);
  fragment.appendChild(tr);
  return fragment;
}

async function sendForm(event) {
  event.preventDefault();
  const submitBtn = document.getElementById("submit");
  if (submitBtn.textContent === "Save") {
    updateBook();
    return;
  }
  const data = new FormData(form);
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const titleForm = data.get("title");
  const authorForm = data.get("author");
  if (titleForm === "" || authorForm === "") {
    return;
  }
  const body = {
    author: authorForm,
    title: titleForm,
  };
  const options = {
    method: "Post",
    header: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  };
  const send = await fetch(url, options);
  titleInput.value = "";
  authorInput.value = "";
  loadAllBooks();

  return send;
}

async function deleteBook(event, id) {
  await fetch(`${url}/${id}`, { method: "delete" });
  loadAllBooks();
}

async function editBook(event, id) {
  const h3 = document.getElementById("headerH3");
  h3.textContent = "Edit FORM";
  const submit = document.getElementById("submit");
  submit.textContent = "Save";

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");

  const response = await fetch(`${url}/${id}`);
  const bookData = await response.json();
  titleInput.value = bookData.title;
  authorInput.value = bookData.author;
  editId = id;
}

async function updateBook(e) {
  const id = editId;
  const data = new FormData(form);
  const titleForm = data.get("title");
  const authorForm = data.get("author");
  if (titleForm === "" || authorForm === "") {
    return;
  }
  const body = {
    author: authorForm,
    title: titleForm,
  };

  const options = {
    method: "Put",
    header: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  };

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");

  await fetch(`${url}/${id}`, options);
  const h3 = document.getElementById("headerH3");
  h3.textContent = "FORM";
  const submit = document.getElementById("submit");
  submit.textContent = "Submit";
  titleInput.value = "";
  authorInput.value = "";
  loadAllBooks();
}
