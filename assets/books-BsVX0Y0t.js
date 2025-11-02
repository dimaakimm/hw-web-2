import"./global-DDRV_GHX.js";const p=document.getElementById("book-form"),h=document.getElementById("book-q"),c=document.getElementById("book-results"),m=document.getElementById("book-empty"),o=document.getElementById("book-loader");async function l(e){o.classList.add("show"),m.textContent="",c.innerHTML="";const s=new URL("https://www.googleapis.com/books/v1/volumes");s.searchParams.set("q",e||"javascript"),s.searchParams.set("maxResults","20");const a=(await(await fetch(s.toString())).json()).items||[];if(!a.length){m.textContent="Ничего не найдено",o.classList.remove("show");return}const r=document.createDocumentFragment();a.forEach(d=>{const t=d.volumeInfo||{},n=document.createElement("div");n.className="card";const u=(t.authors||[]).join(", "),i=t.imageLinks&&t.imageLinks.thumbnail?t.imageLinks.thumbnail:"";n.innerHTML=`
      <h3>${t.title||"Без названия"}</h3>
      <div class="meta">
        <span class="badge">${u||"Автор не указан"}</span>
        <span class="badge">${t.publishedDate||""}</span>
      </div>
      <p>${t.description?String(t.description).slice(0,160)+"…":""}</p>
      ${i?`<img src="${i}" alt="" style="width:100%;border-radius:10px;border:1px solid #1b2134">`:""}
      ${t.infoLink?`<a href="${t.infoLink}" target="_blank" rel="noreferrer">Подробнее</a>`:""}
    `,r.appendChild(n)}),c.appendChild(r),o.classList.remove("show")}p.addEventListener("submit",e=>{e.preventDefault(),l(h.value.trim())});l("javascript");
