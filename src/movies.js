const form = document.getElementById("movie-form");
const input = document.getElementById("movie-q");
const results = document.getElementById("movie-results");
const empty = document.getElementById("movie-empty");
const loader = document.getElementById("movie-loader");

let cache = [];

async function loadMovies() {
  loader.classList.add("show");
  empty.textContent = "";
  results.innerHTML = "";
  const r = await fetch("https://ghibliapi.vercel.app/films");
  cache = await r.json();
  render(cache);
  loader.classList.remove("show");
}

function render(list) {
  results.innerHTML = "";
  if (!list.length) {
    empty.textContent = "Ничего не найдено";
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach((m) => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <h3>${m.title}</h3>
      <div class="meta">
        <span class="badge">${m.original_title || ""}</span>
        <span class="badge">${m.release_date || ""}</span>
        <span class="badge">${m.running_time ? m.running_time + " мин." : ""}</span>
      </div>
      <p>${m.description ? String(m.description).slice(0, 160) + "…" : ""}</p>
      <a href="${m.url}" target="_blank" rel="noreferrer">Источник</a>
    `;
    frag.appendChild(el);
  });
  results.appendChild(frag);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = input.value.trim().toLowerCase();
  const filtered = cache.filter((x) => x.title.toLowerCase().includes(q));
  render(filtered);
});

loadMovies();
