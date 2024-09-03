let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }

  return entries;
};

let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();

  const tableEnteries = entries
    .map((entry) => {
      const nameCell = `<td >${entry.name}</td>`;
      const emailCell = `<td >${entry.email}</td>`;
      const passwordCell = `<td >${entry.password}</td>`;
      const dobCell = `<td >${entry.dob}</td>`;
      const acceptTermsCell = `<td >${entry.acceptedTAC}</td>`;

      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}`;
      return row;
    })
    .join("\n");

  const table = `
    <table><tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>DOB</th>
    <th>Accepted Terms?</th>
    </tr>${tableEnteries}</table>
    `;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  const acceptedTAC = document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTAC,
  };

  if (!emailValidation(email)) {
    alert("please enter avalid email address!!!!");
    return;
  }

  if (!ageValidation(dob)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};

function ageValidation(date) {
  const dob = new Date(date);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const mon = now.getMonth() - dob.getMonth();

  if (mon < 0 || (mon === 0 && now.getDate() < dob.getDate())) {
    age--;
  }

  return age >= 18 && age <= 55;
}

const emailValidation = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
