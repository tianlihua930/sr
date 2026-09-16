'use strict';
const paragraphs = JSON.parse(document.getElementById('letter-data').textContent);
const content = document.getElementById('letter-content');
paragraphs.forEach(text => { const p = document.createElement('p'); p.textContent = text; content.appendChild(p); });
const arrival = document.getElementById('arrival');
const letter = document.getElementById('letter-view');
const openButton = document.getElementById('open-letter');
const closeButton = document.getElementById('close-letter');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
openButton.addEventListener('click', () => {
  openButton.disabled = true;
  arrival.classList.add('leaving');
  setTimeout(() => {
    arrival.hidden = true; letter.hidden = false;
    window.scrollTo({top:0,behavior:'instant'});
    closeButton.focus({preventScroll:true});
    arrival.classList.remove('leaving'); openButton.disabled = false;
  }, reduced.matches ? 0 : 430);
});
closeButton.addEventListener('click', () => {
  letter.hidden = true; arrival.hidden = false;
  window.scrollTo({top:0,behavior:'instant'}); openButton.focus({preventScroll:true});
});
document.getElementById('wish-button').addEventListener('click', event => {
  document.getElementById('wish-message').textContent = '愿望已悄悄收好。生日快乐，星笺！';
  if (reduced.matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  for (let i=0;i<18;i++) {
    const spark=document.createElement('span');spark.className='spark';spark.textContent='✧';spark.setAttribute('aria-hidden','true');
    spark.style.left=(rect.left+Math.random()*rect.width)+'px';spark.style.top=rect.top+'px';spark.style.setProperty('--dx',(Math.random()*260-130)+'px');spark.style.animationDelay=(Math.random()*.3)+'s';
    document.body.appendChild(spark);setTimeout(()=>spark.remove(),3000);
  }
});
const surprise = document.getElementById('birthday-surprise');
const surpriseClose = document.getElementById('surprise-close');
document.getElementById('wish-button').addEventListener('click', () => { surprise.showModal(); surpriseClose.focus(); });
surpriseClose.addEventListener('click', () => surprise.close());
surprise.addEventListener('click', e => { if(e.target === surprise) { const r=surprise.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) surprise.close(); } });
surprise.addEventListener('close',()=>document.getElementById('wish-button').focus({preventScroll:true}));
function birthdaySparkles(){
  if(reduced.matches)return;
  for(let i=0;i<22;i++){
    const s=document.createElement('span');s.className='delivery-spark';s.textContent=i%3?'✧':'✦';s.setAttribute('aria-hidden','true');
    s.style.left=(8+Math.random()*82)+'%';s.style.top=(40+Math.random()*50)+'%';s.style.animationDelay=(Math.random()*.6)+'s';
    surprise.appendChild(s);setTimeout(()=>s.remove(),2800);
  }
}
document.getElementById('wish-button').addEventListener('click',()=>{
  surprise.classList.remove('cake-received');
  document.getElementById('receive-cake').textContent='收下蛋糕，许个愿';
  document.getElementById('cake-message').textContent='';
  document.getElementById('wish-message').textContent='';
  birthdaySparkles();
});
const surpriseArt=surprise.querySelector('img');
const surpriseHeading=document.getElementById('surprise-title');
const surpriseDescription=surprise.querySelector('.surprise-caption>p');
const cakeAction=document.getElementById('receive-cake');
const bouquetPreload=new Image();bouquetPreload.src='wildling-bouquet.png';
document.getElementById('wish-button').addEventListener('click',()=>{
  surprise.classList.remove('bouquet-arrival');
  surpriseArt.src='wildling-cake.png';
  surpriseArt.alt='野人穆罗骑着野猪，向你送上点着蜡烛的生日蛋糕';
  surpriseHeading.textContent='星笺，生日快乐！';
  surpriseDescription.textContent='野人和他的伙伴，带着蛋糕来啦。';
  cakeAction.hidden=false;
});
cakeAction.addEventListener('click',()=>{
  surprise.classList.remove('cake-received');
  surpriseArt.src='wildling-bouquet.png';
  surpriseArt.alt='野人穆罗骑着野猪，将一捧鲜花送到你面前';
  surpriseHeading.textContent='还有一束花，送给你。';
  surpriseDescription.textContent='愿新的一岁，有鲜花，也有好多开心的小事。';
  document.getElementById('cake-message').textContent='生日快乐，星笺。';
  cakeAction.hidden=true;
  surprise.classList.add('bouquet-arrival');
  surpriseClose.focus({preventScroll:true});
});function bouquetConfetti(){
  if(reduced.matches)return;
  const colors=['#e2bf77','#e9dbc0','#9fbfb0','#9f4545','#f4d992'];
  for(let i=0;i<72;i++){
    const piece=document.createElement('i');piece.className='birthday-confetti';piece.setAttribute('aria-hidden','true');
    piece.style.left=(i%2?24:76)+'%';piece.style.top='56%';
    piece.style.setProperty('--confetti-color',colors[i%colors.length]);
    piece.style.setProperty('--confetti-x',(Math.random()-.5)*window.innerWidth*.95+'px');
    piece.style.setProperty('--confetti-y',(-300+Math.random()*650)+'px');
    piece.style.setProperty('--confetti-spin',(Math.random()*1000-500)+'deg');
    piece.style.animationDelay=Math.random()*.35+'s';
    surprise.appendChild(piece);setTimeout(()=>piece.remove(),3000);
  }
}
cakeAction.addEventListener('click',bouquetConfetti);
surprise.addEventListener('close',()=>surprise.querySelectorAll('.birthday-confetti').forEach(el=>el.remove()));
