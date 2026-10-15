const projectList = document.querySelector("#project-list");
const filterButtons = document.querySelector("#filter-buttons");
const emptyMessage = document.querySelector("#empty-message");
const formLatihan = document.querySelector("#form-latihan");

console.log("Project List:", projectList);
console.log("Filter Buttons:", filterButtons);
console.log("Empty Message:", emptyMessage);
console.log("Form Latihan:", formLatihan);

import { daftarProyek } from "./app.js";

const container = document.querySelector("#list");

function buildCard(project) {
  const li = document.createElement("li");
  li.className = "card";
  li.textContent = project.judul;
  return li;
}

function renderProjects(projects) {
  container.textContent = "";

  const fragment = document.createDocumentFragment();

  projects.forEach((project) => {
    fragment.append(buildCard(project));
  });

  container.append(fragment);
}

renderProjects(daftarProyek);
