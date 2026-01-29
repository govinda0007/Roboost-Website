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
