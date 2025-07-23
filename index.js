let studentdetails = document.querySelector("#studentdetails");
let studentdata = document.querySelector("#studentdata tbody");
let students = JSON.parse(localStorage.getItem("students")) || [];

function renderTable() {
  studentdata.innerHTML = "";
  students.forEach((student, index) => {
    let row = `<tr >
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.cls}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td><i class="fa-solid fa-pen" id="edit" onclick = "editstudentdata(${index})"></i></td>
            <td><i class="fa-solid fa-trash" id="delete" onclick = "deletestudentdata(${index})"></i></td>
            
           </tr>`;
    studentdata.innerHTML += row;
  });
}

function validateinputs(name, id, cls, email, contact) {
  let isalpha = /^[A-Za-z ]+$/;
  let isemail = /^\S+@\S+\.\S+$/;
  return (
    isalpha.test(name) &&
    !isNaN(id) &&
    isalpha.test(cls) &&
    isemail.test(email) &&
    !isNaN(contact)
  );
}

studentdetails.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("studentname").value.trim();
  const id = document.getElementById("studentid").value.trim();
  const cls = document.getElementById("studentclass").value.trim();
  const email = document.getElementById("studentemail").value.trim();
  const contact = document.getElementById("studentcontact").value.trim();

  if (!validateinputs(name, id, cls, email, contact)) {
    alert("Please enter valid inputs!");
    return;
  }

  students.push({ name, id, cls, email, contact });

  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
  studentdetails.reset();
});

function editstudentdata(index) {
  let student = students[index];
  document.getElementById("studentname").value = student.name;
  document.getElementById("studentid").value = student.id;
  document.getElementById("studentclass").value = student.cls;
  document.getElementById("studentemail").value = student.email;
  document.getElementById("studentcontact").value = student.contact;

  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

function deletestudentdata(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

window.onload = renderTable;