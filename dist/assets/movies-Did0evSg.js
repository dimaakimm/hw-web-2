import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */const l=document.getElementById("movie-form"),d=document.getElementById("movie-q"),a=document.getElementById("movie-results"),r=document.getElementById("movie-empty"),o=document.getElementById("movie-loader");let i=[];async function m(){o.classList.add("show"),r.textContent="",a.innerHTML="",i=await(await fetch("https://ghibliapi.vercel.app/films")).json(),c(i),o.classList.remove("show")}function c(t){if(a.innerHTML="",!t.length){r.textContent="Ничего не найдено";return}const s=document.createDocumentFragment();t.forEach(e=>{const n=document.createElement("div");n.className="card",n.innerHTML=`
      <h3>${e.title}</h3>
      <div class="meta">
        <span class="badge">${e.original_title||""}</span>
        <span class="badge">${e.release_date||""}</span>
        <span class="badge">${e.running_time?e.running_time+" мин.":""}</span>
      </div>
      <p>${e.description?String(e.description).slice(0,160)+"…":""}</p>
      <a href="${e.url}" target="_blank" rel="noreferrer">Источник</a>
    `,s.appendChild(n)}),a.appendChild(s)}l.addEventListener("submit",t=>{t.preventDefault();const s=d.value.trim().toLowerCase(),e=i.filter(n=>n.title.toLowerCase().includes(s));c(e)});m();
