const baseURL = "http://localhost:3030/jsonstore/phonebook";

function attachEvents() {
  const loadBtn = document.getElementById("btnLoad");
  const phonebook = document.getElementById("phonebook");
  const createBtn = document.getElementById("btnCreate");
  loadBtn.addEventListener("click", loadPhoneBook);
  phonebook.addEventListener("click", deletePhone);
  createBtn.addEventListener("click", createPhone);
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

async function createPhone(e) {
  let personInput = document.getElementById("person");
  let phoneInput = document.getElementById("phone");
  const personInputValue = personInput.value;
  const phoneInputValue = phoneInput.value;

  const phone = {
    person: personInputValue,
    phone: phoneInputValue,
  };

  const response = await fetch(baseURL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(phone),
  });

  personInput.value = "";
  phoneInput.value = "";

  loadPhoneBook();
}
