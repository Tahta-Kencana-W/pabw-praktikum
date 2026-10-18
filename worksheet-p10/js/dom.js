import { daftarProyek } from "./app.js";
import { cariNegara } from "./api.js";

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

  if (projects.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;
  const fragment = document.createDocumentFragment();
  projects.forEach((project) => fragment.append(buildCard(project)));
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

    inputs.forEach((input) => {
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

  inputs.forEach((input) => input.addEventListener("input", validateForm));

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
    row.append(nameCell);

    [beban, repetisi, frekuensi].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    });

    tableBody.append(row);
    formLatihan.reset();
    validateForm();
  });
}

const formNegara = document.querySelector("#form-negara");
const inputNegara = document.querySelector("#input-negara");
const pesanNegara = document.querySelector("#pesan-negara");
const daftarNegaraElement = document.querySelector("#daftar-negara");

function buatKartuNegara(negara) {
  const li = document.createElement("li");
  li.className = "card";

  const bendera = document.createElement("img");
  bendera.src = negara.flag.url_png;
  bendera.alt = negara.flag.description || `Bendera ${negara.names.common}`;
  bendera.width = 80;

  const judul = document.createElement("h3");
  judul.textContent = negara.names.common;

  const detail = document.createElement("p");
  const ibukota = negara.capitals?.[0]?.name || "-";
  const populasi = Number.isFinite(negara.population)
    ? negara.population.toLocaleString("id-ID")
    : "Tidak tersedia";
  const tahun = negara.populationYear ? ` (${negara.populationYear})` : "";
  const pesanPopulasi = negara.populationError ? ` — ${negara.populationError}` : "";
  detail.textContent = `Ibu kota: ${ibukota} • Populasi ibu kota${tahun}: ${populasi}${pesanPopulasi}`;

  li.append(bendera, judul, detail);
  return li;
}

formNegara.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nama = inputNegara.value.trim();
  if (!nama) return;

  pesanNegara.textContent = "Mencari...";
  daftarNegaraElement.textContent = "";

  try {
    const hasil = await cariNegara(nama);
    if (hasil.length === 0) {
      pesanNegara.textContent = "Negara tidak ditemukan.";
      return;
    }

    pesanNegara.textContent = "";
    hasil.forEach((negara) => {
      daftarNegaraElement.append(buatKartuNegara(negara));
    });
  } catch (error) {
    pesanNegara.textContent = error instanceof Error
      ? `Gagal mencari negara. ${error.message}`
      : "Gagal mencari negara karena terjadi kesalahan yang tidak diketahui.";
  }
});
