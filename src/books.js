const form = document.getElementById("book-form");
const input = document.getElementById("book-q");
const results = document.getElementById("book-results");
const empty = document.getElementById("book-empty");
const loader = document.getElementById("book-loader");

async function searchBooks(q) {
  loader.classList.add("show");
  empty.textContent = "";
  results.innerHTML = "";
  const url = new URL("https://www.googleapis.com/books/v1/volumes");
  url.searchParams.set("q", q || "javascript");
  url.searchParams.set("maxResults", "20");
  const r = await fetch(url.toString());
  const data = await r.json();
  const list = data.items || [];
  if (!list.length) {
    empty.textContent = "Ничего не найдено";
    loader.classList.remove("show");
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach((item) => {
    const v = item.volumeInfo || {};
    const el = document.createElement("div");
    el.className = "card";
    const authors = (v.authors || []).join(", ");
    const thumb =
      v.imageLinks && v.imageLinks.thumbnail ? v.imageLinks.thumbnail : "";
    el.innerHTML = `
      <h3>${v.title || "Без названия"}</h3>
      <div class="meta">
        <span class="badge">${authors || "Автор не указан"}</span>
        <span class="badge">${v.publishedDate || ""}</span>
      </div>
      <p>${v.description ? String(v.description).slice(0, 160) + "…" : ""}</p>
      ${thumb ? `<img src="${thumb}" alt="" style="width:100%;border-radius:10px;border:1px solid #1b2134">` : ""}
      ${v.infoLink ? `<a href="${v.infoLink}" target="_blank" rel="noreferrer">Подробнее</a>` : ""}
    `;
    frag.appendChild(el);
  });
  results.appendChild(frag);
  loader.classList.remove("show");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchBooks(input.value.trim());
});

searchBooks("javascript");
