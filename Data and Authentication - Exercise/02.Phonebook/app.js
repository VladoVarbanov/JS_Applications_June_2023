const baseURL = "http://localhost:3030/jsonstore/phonebook";

function attachEvents() {
  const loadBtn = document.getElementById("btnLoad");
  const phonebook = document.getElementById("phonebook");
  loadBtn.addEventListener("click", loadPhoneBook);
  phonebook.addEventListener("click", deletePhone);
}

attachEvents();

async function loadPhoneBook() {
  const response = await fetch(baseURL);
  const data = await response.json();

  const ulElem = document.getElementById("phonebook");
  ulElem.textContent = "";

  Object.values(data).forEach((x) => {
    const liElem = document.createElement("li");
    liElem.textContent = `${x.person}: ${x.phone}`;

    const deleteBtnElem = document.createElement("button");
    deleteBtnElem.textContent = "Delete";
    deleteBtnElem.setAttribute("id", x._id);

    liElem.appendChild(deleteBtnElem);
    ulElem.appendChild(liElem);
  });
}

async function deletePhone(e) {
  if (e.target.textContent !== "Delete") {
    return;
  }
  const currentPhoneId = e.target.id;

  const response = await fetch(`${baseURL}/${currentPhoneId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  loadPhoneBook();
}
