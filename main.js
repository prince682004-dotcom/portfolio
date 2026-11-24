(function(){
const S=window.SITE,$=s=>document.querySelector(s),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const esc=t=>String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const empty=m=>`<p class="empty">${m}</p>`;
const link=(t,u)=>u?`<a href="${esc(u)}">${esc(t)}</a>`:esc(t);
$('#courses').innerHTML=S.courses.map(c=>`<li>${esc(c)}</li>`).join('');
$('#timeline').innerHTML='<i class="fill"></i>'+S.education.map(e=>`<li><b>${esc(e.title)}</b><span>${esc(e.place)} · ${esc(e.year)}${e.score?' · '+esc(e.score):''}</span></li>`).join('');
$('#achievements-list').innerHTML=S.achievements.map(a=>`<li><span class="y">${esc(a.year)}</span><span>${esc(a.text)}</span></li>`).join('');
const items=(arr,fn,msg)=>arr.length?arr.map(x=>`<div class="item">${fn(x)}</div>`).join(''):empty(msg);
$('#projects').innerHTML=items(S.projects,p=>`<b>${esc(p.title)}</b><small>${esc(p.meta)}</small>${p.text?`<p>${esc(p.text)}</p>`:''}`,'Add a project in assets/js/data.js.');
$('#papers').innerHTML=items(S.papers,p=>`<b>${link(p.title,p.url)}</b><small>${esc(p.authors)} · ${esc(p.venue)} ${esc(p.year)}</small>`,'No papers yet. Add one in assets/js/data.js when you have it.');
$('#talks').innerHTML=items(S.talks,t=>`<b>${esc(t.title)}</b><small>${esc(t.speaker)} · ${esc(t.event)} · ${esc(t.date)}</small>`,'Add the talks and seminars you have attended.');
$('#blogs').innerHTML=items(S.blogs,b=>`<b>${link(b.title,b.url)}</b><small>${esc(b.date)}</small><p>${esc(b.summary)}</p>`,'No notes yet.');
$('#thoughts').innerHTML=items(S.thoughts,t=>`<b>${esc(t.title)}</b><small>${esc(t.date)}</small><p>${esc(t.text)}</p>`,'Short reflections go here.');
$('#pdfs').innerHTML=items(S.pdfs,p=>`<b>${link(p.title,p.file)}</b><small>${esc(p.note)}</small>`,'Put PDFs in assets/pdfs/ and list them in assets/js/data.js.');
$('#gallery-grid').innerHTML=S.gallery.length?S.gallery.map(g=>`<figure><img loading="lazy" src="${esc(g.src)}" alt="${esc(g.caption)}"><figcaption>${esc(g.caption)}</figcaption></figure>`).join(''):empty('Put images in assets/gallery/ and list them in assets/js/data.js.');
$('#links').innerHTML=S.links.filter(l=>l.url).map(l=>link(l.label,l.url)).join('')||'<span class="muted small">Add your LinkedIn URL in assets/js/data.js.</span>';
function math(){
  if(!window.katex)return;
  document.querySelectorAll('.m').forEach(e=>katex.render(e.dataset.tex,e,{throwOnError:false}));
  if(window.renderMathInElement)renderMathInElement(document.body,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});
}
addEventListener('load',math);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.reveal-title,.item,.rows li').forEach((e,i)=>{e.style.transitionDelay=(i%4)*70+'ms';io.observe(e)});
const bar=$('#progress'),fill=$('.timeline .fill'),tl=$('#timeline'),dots=[...tl.querySelectorAll('li')],paths=[...document.querySelectorAll('.divider path')];
paths.forEach(p=>p.setAttribute('pathLength',1));
const glyphs=['∫','∂','∑','∞','π','∇','ℝ','ε','⊗'].map((g,i)=>{const d=document.createElement('div');d.className='float';d.textContent=g;d.style.left=(8+i*10)+'%';d.style.top=(10+(i*37)%80)+'%';d.dataset.s=(.15+(i%4)*.08);document.body.prepend(d);return d});
let heroP=0;
function onScroll(){
  const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
  bar.style.transform=`scaleX(${h?y/h:0})`;
  heroP=Math.min(1,y/innerHeight);
  paths.forEach(p=>{const r=p.getBoundingClientRect();const t=Math.min(1,Math.max(0,1-(r.top-innerHeight*.35)/(innerHeight*.6)));p.style.strokeDashoffset=1-t});
  const r=tl.getBoundingClientRect(),f=Math.min(1,Math.max(0,(innerHeight*.6-r.top)/r.height));
  fill.style.height=Math.max(0,(r.height-12)*f)+'px';
  dots.forEach(d=>d.classList.toggle('on',d.getBoundingClientRect().top<innerHeight*.6));
  if(!reduce)glyphs.forEach(g=>g.style.transform=`translateY(${-y*g.dataset.s}px) rotate(${y*.02}deg)`);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
/* hero: lines y = t x - t^3 envelope the curve 27y^2 = 4x^3 */
const cv=$('#envelope'),cx=cv.getContext('2d');let W,H,DPR;
function size(){DPR=Math.min(2,devicePixelRatio||1);W=cv.clientWidth;H=cv.clientHeight;cv.width=W*DPR;cv.height=H*DPR;cx.setTransform(DPR,0,0,DPR,0,0)}
addEventListener('resize',size);size();
let time=0;
function draw(){
  time+=reduce?0:.004;
  cx.clearRect(0,0,W,H);
  const sc=Math.min(W,H)/7.5,ox=W*.66,oy=H*.5,X=x=>ox+x*sc,Y=y=>oy-y*sc;
  const N=14+Math.floor(heroP*70),tm=1.55+Math.sin(time)*.12;
  cx.lineWidth=1;
  for(let i=0;i<N;i++){
    const t=-tm+2*tm*i/(N-1),a=.10+.2*(1-Math.abs(t)/tm);
    cx.strokeStyle=`rgba(127,176,255,${a})`;cx.beginPath();
    cx.moveTo(X(-6),Y(t*-6-t**3));cx.lineTo(X(6),Y(t*6-t**3));cx.stroke();
  }
  cx.strokeStyle='#c8a35a';cx.lineWidth=2.2;cx.beginPath();
  for(let k=0;k<=160;k++){const t=-tm+2*tm*k/160,x=3*t*t,y=2*t**3;k?cx.lineTo(X(x),Y(y)):cx.moveTo(X(x),Y(y))}
  cx.stroke();
  cx.strokeStyle='rgba(255,255,255,.18)';cx.lineWidth=1;cx.beginPath();cx.moveTo(0,oy);cx.lineTo(W,oy);cx.moveTo(ox,0);cx.lineTo(ox,H);cx.stroke();
  if(scrollY<innerHeight*1.1)requestAnimationFrame(draw);else running=false;
}
let running=true;draw();
addEventListener('scroll',()=>{if(!running&&scrollY<innerHeight*1.1){running=true;draw()}},{passive:true});
})();
