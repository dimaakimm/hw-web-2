import"./global-DDRV_GHX.js";const l=document.getElementById("job-form"),i=document.getElementById("job-q"),c=document.getElementById("job-results"),d=document.getElementById("job-empty"),a=document.getElementById("job-loader");async function m(t){a.classList.add("show"),d.textContent="",c.innerHTML="";const s=new URL("https://remotive.com/api/remote-jobs");t&&s.searchParams.set("search",t);const o=(await(await fetch(s.toString())).json()).jobs||[];if(!o.length){d.textContent="Ничего не найдено",a.classList.remove("show");return}const r=document.createDocumentFragment();o.slice(0,30).forEach(e=>{const n=document.createElement("div");n.className="card",n.innerHTML=`
      <h3>${e.title}</h3>
      <div class="meta">
        <span class="badge">${e.company_name||"Компания"}</span>
        <span class="badge">${e.candidate_required_location||"Remote"}</span>
        <span class="badge">${e.job_type||""}</span>
      </div>
      <p>${e.category||""}</p>
      <a href="${e.url}" target="_blank" rel="noreferrer">Откликнуться</a>
    `,r.appendChild(n)}),c.appendChild(r),a.classList.remove("show")}l.addEventListener("submit",t=>{t.preventDefault(),m(i.value.trim())});m("frontend");
