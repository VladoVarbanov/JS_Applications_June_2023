const url = "http://localhost:3030/jsonstore/collections/students";

const form = document.getElementById("form");
form.addEventListener("submit", takeStudents);

async function takeStudents(e) {
  e.preventDefault();
  const data = new FormData(form);
  if (data.get("firstName") === "") {
    return;
  } else if (data.get("lastName") === "") {
    return;
  } else if (data.get("facultyNumber") === "") {
    return;
  } else if (data.get("grade") === "") {
    return;
  }
  let student = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    facultyNumber: data.get("facultyNumber"),
    grade: data.get("grade"),
  };

  await fetch(url, {
    method: "Post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(student),
  });
  getStudents();
}

async function getStudents() {
  const response = await fetch(url);
  const data = await response.json();
  const result = document.getElementById("results");
  const tbodyRemove = document.getElementById("tbody");
  tbodyRemove.remove();
  const tbody = document.createElement("tbody");
  tbody.id = "tbody";
  result.appendChild(tbody);

  Object.values(data).forEach((student) => {
    tbody.appendChild(
      showStudents(
        student.firstName,
        student.lastName,
        student.facultyNumber,
        student.grade
      )
    );
  });
}

function showStudents(firstName, lastName, facultyNumber, grade) {
  const tr = document.createElement("tr");
  tr.classList.add("tr");
  const firstNameTh = document.createElement("th");
  firstNameTh.textContent = firstName;
  const lastNameTh = document.createElement("th");
  lastNameTh.textContent = lastName;
  const facultyNumberTh = document.createElement("th");
  facultyNumberTh.textContent = facultyNumber;
  const gradeTh = document.createElement("th");
  gradeTh.textContent = grade;

  tr.appendChild(firstNameTh);
  tr.appendChild(lastNameTh);
  tr.appendChild(facultyNumberTh);
  tr.appendChild(gradeTh);
  return tr;
}
getStudents();
