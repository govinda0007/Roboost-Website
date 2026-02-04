if ("scrollRestoration" in history) {
  history.scrollRestoration = "auto";
}

particlesJS("particles-js",{
  particles:{number:{value:60},size:{value:3},move:{speed:1},line_linked:{enable:true,opacity:0.2}},
  interactivity:{events:{onhover:{enable:true,mode:"repulse"}}}
});

const cards=document.querySelectorAll('.service-card');
window.addEventListener('scroll',()=>{
  const trigger=window.innerHeight*0.85;
  cards.forEach(card=>{
    if(card.getBoundingClientRect().top<trigger){
      card.classList.add('show')
    }
  })
});

const counters=document.querySelectorAll('.count');
counters.forEach(counter=>{
  const update=()=>{
    const target=+counter.getAttribute('data-target');
    const count=+counter.innerText;
    const inc=target/80;
    if(count<target){
      counter.innerText=Math.ceil(count+inc);
      setTimeout(update,30);
    } else {
      counter.innerText=target;
    }
  };
  update();
});
// ===== MANUAL SCROLL RESTORE (GitHub Pages safe) =====

// Save scroll position before leaving page
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem(
    "scrollPosition-" + location.pathname,
    window.scrollY
  );
});

// Restore scroll position when page loads
window.addEventListener("load", () => {
  const scrollPos = sessionStorage.getItem(
    "scrollPosition-" + location.pathname
  );

  if (scrollPos !== null) {
    window.scrollTo(0, parseInt(scrollPos, 10));
  }
});
