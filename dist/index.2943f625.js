const e={list:document.querySelector(".news-list"),form:document.querySelector(".js-search-form")},t=new class{constructor({selector:e,hidden:t=!1}){this.refs=this.getRefs(e),t&&this.hide()}getRefs(e){const t={};return t.button=document.querySelector(e),t.label=t.button.querySelector(".label"),t.spinner=t.button.querySelector(".spinner"),t}enable(){this.refs.button.disabled=!1,this.refs.label.textContent="Show more",this.refs.spinner.classList.add("is-hidden")}disable(){this.refs.button.disabled=!0,this.refs.label.textContent="...loading",this.refs.spinner.classList.remove("is-hidden")}show(){this.refs.button.classList.remove("is-hidden")}hide(){this.refs.button.classList.add("is-hidden")}}({selector:'[data-action="load-more"]',hidden:!0}),s=new class{constructor(){this.searchQuery="",this.page=1}fetchArticles(){const e=new URLSearchParams({q:this.searchQuery,pageSize:5,page:this.page});return fetch(`https://newsapi.org/v2/everything?${e}`,{headers:{"X-Api-Key":"b41603e50de9421aa47b2028dddacda6"}}).then((e=>e.json())).then((e=>(this.incrementPage(),e.articles)))}incrementPage(){this.page+=1}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}};function r(t){e.list.insertAdjacentHTML("beforeend",function(e){return e.map((({url:e,urlToImage:t,title:s,author:r,description:n})=>`<div class="element">\n        <a href="${e}">\n            <img src="${t}" alt=""/>\n            <h2>${s}</h2>\n            <p>Posted by: ${r}</p>\n            <p>${n}</p>\n        </a>\n      </div>`)).join("")}(t))}e.form.addEventListener("submit",(function(n){if(n.preventDefault(),s.query=n.target.query.value,""===n.target.query.value)return alert("Type smth");t.show(),s.resetPage(),e.list.innerHTML="",t.disable(),s.fetchArticles().then((s=>{r(s),e.list.classList.add("news-list-active"),t.enable()}))})),t.refs.button.addEventListener("click",(function(){t.disable(),s.fetchArticles().then((e=>{r(e),t.enable()}))}));
//# sourceMappingURL=index.2943f625.js.map
