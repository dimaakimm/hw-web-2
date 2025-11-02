import "./global.css";

const form = document.getElementById("job-form");
const input = document.getElementById("job-q");
const results = document.getElementById("job-results");
const empty = document.getElementById("job-empty");
const loader = document.getElementById("job-loader");

async function searchJobs(q) {
  loader.classList.add("show");
  empty.textContent = "";
  results.innerHTML = "";
  const url = new URL("https://remotive.com/api/remote-jobs");
  if (q) url.searchParams.set("search", q);
  const r = await fetch(url.toString());
  const data = await r.json();
  const list = data.jobs || [];
  if (!list.length) {
    empty.textContent = "Ничего не найдено";
    loader.classList.remove("show");
    return;
  }
  const frag = document.createDocumentFragment();
  list.slice(0, 30).forEach((job) => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <h3>${job.title}</h3>
      <div class="meta">
        <span class="badge">${job.company_name || "Компания"}</span>
        <span class="badge">${job.candidate_required_location || "Remote"}</span>
        <span class="badge">${job.job_type || ""}</span>
      </div>
      <p>${job.category || ""}</p>
      <a href="${job.url}" target="_blank" rel="noreferrer">Откликнуться</a>
    `;
    frag.appendChild(el);
  });
  results.appendChild(frag);
  loader.classList.remove("show");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchJobs(input.value.trim());
});

searchJobs("frontend");
