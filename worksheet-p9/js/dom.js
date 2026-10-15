import { daftarProyek } from "./app.js";



const container = document.querySelector("#list");
const filterRow = document.querySelector("#filter");
const emptyMessage = document.querySelector("#empty-message");

function buildCard(project) {
  const li = document.createElement("li");
  li.className = "card";

  const title = document.createElement("h3");
  title.textContent = project.judul;

  const details = document.createElement("p");
  details.textContent = `Tahun: ${project.tahun} • ${project.selesai ? "Selesai" : "Belum selesai"}`;

  const category = document.createElement("span");
  category.className = "project-category";
  category.textContent = project.kategori;

  li.append(title, details, category);
  return li; 
}

function render(projects) {
  container.textContent = "";

  // D.1: Check the empty state
  if (projects.length === 0) {
    emptyMessage.hidden = false;
    return;
  }
  
  emptyMessage.hidden = true;

  const fragment = document.createDocumentFragment();
  projects.forEach((project) => {
    fragment.append(buildCard(project)); 
  });
  container.append(fragment);
}

function markActiveButton(activeButton) {
  filterRow.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button === activeButton);
  });
}

filterRow.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || !filterRow.contains(button)) return;

  const category = button.dataset.category;
  const selected = daftarProyek.filter(
    (project) => category === "all" || project.kategori === category
  );

  markActiveButton(button);
  render(selected);
});

render(daftarProyek);
const allButton = filterRow.querySelector('[data-category="all"]');
if (allButton) markActiveButton(allButton);



const formLatihan = document.querySelector("#form-latihan");
const tableBody = document.querySelector("#tabel-riwayat-body");

if (formLatihan && tableBody) {
  const inputs = formLatihan.querySelectorAll("input");
  const submitBtn = formLatihan.querySelector('button[type="submit"]');
  
  function validateForm() {
    let isValid = true;

    inputs.forEach(input => {
      const value = input.value.trim();
      
      if (value === "") {
        isValid = false;
        input.setAttribute("aria-invalid", "true"); 
      } else {
        input.removeAttribute("aria-invalid");
      }
    });

    submitBtn.disabled = !isValid; 
  }

  inputs.forEach(input => {
    input.addEventListener("input", validateForm);
  });

  formLatihan.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputNama = document.querySelector("#nama-gerakan");
    const nama = inputNama.value.trim();
    const beban = document.querySelector("#berat-beban").value;
    const repetisi = document.querySelector("#jumlah-repetisi").value;
    const frekuensi = document.querySelector("#frekuensi-mingguan").value;

    if (!nama || !beban || !repetisi || !frekuensi) {
      inputNama.focus(); 
      return;
    }

    const row = document.createElement("tr");
    row.className = "catatan-baru";

    const nameCell = document.createElement("th");
    nameCell.scope = "row";
    nameCell.textContent = nama;

    const values = [beban, repetisi, frekuensi];
    row.append(nameCell);

    values.forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });

    tableBody.append(row);
    formLatihan.reset();
    
    validateForm(); 
  });
}