// Parallax leve em elementos com data-depth
const lerp = (a, b, t) => a + (b - a) * t;
const parallaxItems = [...document.querySelectorAll(".parallax")];
let mouseX = 0, mouseY = 0, viewX = 0, viewY = 0;

window.addEventListener("mousemove", (e) => {
  const { innerWidth:w, innerHeight:h } = window;
  mouseX = (e.clientX / w) * 2 - 1; // -1..1
  mouseY = (e.clientY / h) * 2 - 1;
});

function tick(){
  // suaviza o movimento
  viewX = lerp(viewX, mouseX, 0.06);
  viewY = lerp(viewY, mouseY, 0.06);

  parallaxItems.forEach(el => {
    const depth = parseFloat(el.dataset.depth || 0.2);
    const tx = -(viewX * 20 * depth);
    const ty = -(viewY * 16 * depth);
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${getComputedStyle(el).getPropertyValue('--rot') || '0deg'})`;
  });

  requestAnimationFrame(tick);
}
tick();

// Reveal suave ao entrar na tela
const reveal = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("in");
      reveal.unobserve(entry.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll(".card, .panel, .panel-title, .panel-text").forEach(el=>{
  el.style.opacity = "0";
  el.style.transform = "translateY(16px)";
  el.style.transition = "opacity .6s ease, transform .6s ease";
  reveal.observe(el);
});
const styleIn = document.createElement("style");
styleIn.textContent = `.in{opacity:1 !important; transform:none !important}`;
document.head.appendChild(styleIn);

// Form fake submit
const form = document.querySelector(".contact-form");
const msg = document.querySelector(".form-msg");
form?.addEventListener("submit", (e)=>{
  e.preventDefault();
  const nome = new FormData(form).get("nome") || "Aventureiro";
  msg.textContent = `Bem-vindo, ${nome}! Convite enviado para sua caixa de entrada.`;
  form.reset();
});
