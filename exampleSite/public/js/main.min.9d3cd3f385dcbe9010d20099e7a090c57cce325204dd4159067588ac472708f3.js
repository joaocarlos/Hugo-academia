(function(){"use strict";const a=document.getElementById("theme-toggle"),u=document.documentElement;function b(){const e=localStorage.getItem("theme");return e?e:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function c(e){u.setAttribute("data-theme",e),localStorage.setItem("theme",e)}function v(){const e=u.getAttribute("data-theme"),t=e==="dark"?"light":"dark";c(t)}a&&a.addEventListener("click",v),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{localStorage.getItem("theme")||c(e.matches?"dark":"light")});const t=document.getElementById("menu-toggle"),l=document.getElementById("menu-close"),e=document.getElementById("mobile-menu"),s=document.getElementById("mobile-menu-overlay");function h(){e.classList.add("mobile-menu--open"),s.classList.add("mobile-menu-overlay--visible"),t.setAttribute("aria-expanded","true"),e.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function n(){e.classList.remove("mobile-menu--open"),s.classList.remove("mobile-menu-overlay--visible"),t.setAttribute("aria-expanded","false"),e.setAttribute("aria-hidden","true"),document.body.style.overflow=""}t&&t.addEventListener("click",h),l&&l.addEventListener("click",n),s&&s.addEventListener("click",n),document.addEventListener("keydown",t=>{t.key==="Escape"&&e.classList.contains("mobile-menu--open")&&n()});const m=document.querySelectorAll(".mobile-menu__link");m.forEach(e=>{e.addEventListener("click",n)});const i=document.getElementById("toc-nav");if(i){const t=i.querySelectorAll("a"),e=[];if(t.forEach(t=>{const n=t.getAttribute("href");if(n&&n.startsWith("#")){const o=n.slice(1),s=document.getElementById(o);s&&e.push({element:s,link:t})}}),e.length>0){const s={root:null,rootMargin:"-80px 0px -70% 0px",threshold:0};let n=null;function o(e){n&&n.classList.remove("toc-active"),e&&(e.classList.add("toc-active"),n=e)}const i=new IntersectionObserver(t=>{t.forEach(t=>{if(t.isIntersecting){const n=e.find(e=>e.element===t.target);n&&o(n.link)}})},s);e.forEach(({element:e})=>{i.observe(e)});function f(){const t=window.scrollY,n=100;for(let s=e.length-1;s>=0;s--){const{element:i,link:a}=e[s],r=i.getBoundingClientRect(),c=r.top+t-n;if(t>=c){o(a);return}}e.length>0&&o(e[0].link)}f(),t.forEach(e=>{e.addEventListener("click",t=>{const n=e.getAttribute("href");if(n&&n.startsWith("#")){t.preventDefault();const e=document.querySelector(n);if(e){const t=80,s=e.getBoundingClientRect().top,o=s+window.pageYOffset-t;window.scrollTo({top:o,behavior:"smooth"}),history.pushState(null,null,n)}}})})}}document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(e){const t=this.getAttribute("href");if(t==="#")return;const n=document.querySelector(t);if(n){e.preventDefault();const s=80,o=n.getBoundingClientRect().top,i=o+window.pageYOffset-s;window.scrollTo({top:i,behavior:"smooth"}),history.pushState(null,null,t)}})});const p=document.querySelectorAll("pre > code");p.forEach(e=>{const n=e.parentElement;n.style.position="relative";const t=document.createElement("button");t.className="code-copy-btn",t.textContent="Copy",t.setAttribute("aria-label","Copy code to clipboard"),t.addEventListener("click",async()=>{const n=e.textContent;try{await navigator.clipboard.writeText(n),t.textContent="Copied!",t.classList.add("copied"),setTimeout(()=>{t.textContent="Copy",t.classList.remove("copied")},2e3)}catch{t.textContent="Error",setTimeout(()=>{t.textContent="Copy"},2e3)}}),n.appendChild(t)});const g=document.querySelectorAll('.content a[href^="http"]');g.forEach(e=>{e.hasAttribute("target")||(e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer"))});const d=document.querySelector(".reading-progress");if(d){const e=document.querySelector(".article__content");if(e){function r(){const t=e.getBoundingClientRect(),n=t.top+window.scrollY,s=t.height,o=window.innerHeight,i=window.scrollY,a=Math.min(Math.max((i-n+o*.3)/s,0),1);d.style.transform=`scaleX(${a})`}window.addEventListener("scroll",r,{passive:!0}),r()}}})();const copyButtonStyles=document.createElement("style");copyButtonStyles.textContent=`
  .code-copy-btn {
    position: absolute;
    top: var(--sp-2, 0.5rem);
    right: var(--sp-2, 0.5rem);
    padding: var(--sp-1, 0.25rem) var(--sp-3, 0.75rem);
    font-family: var(--font-sans, system-ui);
    font-size: var(--fs-xs, 0.75rem);
    font-weight: 500;
    color: var(--color-text-muted, #888);
    background: var(--color-bg-alt, #f5f5f5);
    border: 1px solid var(--color-border, #e0e0e0);
    border-radius: var(--radius-sm, 3px);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease, background 0.2s ease;
  }
  
  pre:hover .code-copy-btn {
    opacity: 1;
  }
  
  .code-copy-btn:hover {
    background: var(--color-bg-elevated, #fff);
  }
  
  .code-copy-btn.copied {
    color: var(--color-success, #48bb78);
    border-color: var(--color-success, #48bb78);
  }
`,document.head.appendChild(copyButtonStyles)