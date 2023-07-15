async function lockedProfile() {
  let main = document.getElementById("main");
  // let profile = document.querySelector(".profile");

  let response = await getUsers();
  let users = await response.json();
  let fragment = document.createDocumentFragment();

  Object.entries(users).forEach((user, id) => {
    fragment.appendChild(createUser(id + 1, user[1]));
  });

  main.appendChild(fragment);
}

function createUser(id, user) {
  let divProfile = document.createElement("div");
  divProfile.classList.add("profile");

  let img = document.createElement("img");
  img.src = "./iconProfile2.png";
  img.classList.add("userIcon");

  let labelLock = document.createElement("label");
  labelLock.textContent = "Lock";

  let inputLock = document.createElement("input");
  inputLock.type = "radio";
  inputLock.name = `user${id}Locked`;
  inputLock.value = "lock";
  inputLock.checked = true;

  let labelUnlock = document.createElement("label");
  labelUnlock.textContent = "Unlock";

  let inputUnlock = document.createElement("input");
  inputUnlock.type = "radio";
  inputUnlock.name = `user${id}Locked`;
  inputUnlock.value = "unlock";
  // inputUnlock.checked = false;

  let br = document.createElement("br");
  let hrOne = document.createElement("hr");

  let labelUsername = document.createElement("label");
  labelUsername.textContent = "Username";

  let inputUsername = document.createElement("input");
  inputUsername.type = "text";
  inputUsername.name = `user${id}Username`;
  inputUsername.value = user.username;
  inputUsername.readOnly = true;
  inputUsername.disabled = true;

  let div = document.createElement("div");
  div.id = `user${id}HiddenFields`;
  // div.classList.add(`user${id}Username`);

  let hrTwo = document.createElement("hr");

  let labelEmail = document.createElement("label");
  labelEmail.textContent = "Email:";

  let inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.name = `user${id}Email`;
  inputEmail.value = user.email;
  inputEmail.readOnly = true;
  inputEmail.disabled = true;

  let labelAge = document.createElement("label");
  labelAge.textContent = "Age:";

  let inputAge = document.createElement("input");
  inputAge.type = "email";
  inputAge.name = `user${id}Age`;
  inputAge.value = user.age;
  inputAge.readOnly = true;
  inputAge.disabled = true;

  let button = document.createElement("button");
  button.textContent = "Show more";
  button.addEventListener("click", () => {
    if (inputUnlock.checked === true && button.textContent === "Show more") {
      div.style.display = "inline-block";
      button.textContent = "Hide it";
    } else if (
      inputUnlock.checked === true &&
      button.textContent === "Hide it"
    ) {
      div.style.display = "none";
      button.textContent = "Show more";
    }
  });

  // Appending DOM elements.

  div.appendChild(hrTwo);
  div.appendChild(labelEmail);
  div.appendChild(inputEmail);
  div.appendChild(labelAge);
  div.appendChild(inputAge);

  divProfile.appendChild(img);
  divProfile.appendChild(labelLock);
  divProfile.appendChild(inputLock);
  divProfile.appendChild(labelUnlock);
  divProfile.appendChild(inputUnlock);
  divProfile.appendChild(br);
  divProfile.appendChild(hrOne);
  divProfile.appendChild(labelUsername);
  divProfile.appendChild(inputUsername);
  divProfile.appendChild(div);
  divProfile.appendChild(button);

  div.style.display = "none";

  return divProfile;
}

async function getUsers() {
  let users = await fetch("http://localhost:3030/jsonstore/advanced/profiles");

  return users;
}
