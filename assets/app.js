/* ===== فيزياء توجيهي تفاعلي — السكربت المشترك ===== */
const CHAPTERS = [
  {id:'ch1', unit:1, n:'الفصل الأول', t:'الزخم الخطي والدفع', ic:'⚽', d:'الزخم، الدفع، نظرية الدفع–الزخم، وحفظ الزخم.'},
  {id:'ch2', unit:1, n:'الفصل الثاني', t:'التصادمات', ic:'🎱', d:'التصادم المرن وغير المرن وعديم المرونة، والتصادم في بعدين.'},
  {id:'ch3', unit:1, n:'الفصل الثالث', t:'الحركة الدورانية', ic:'🎡', d:'العزم، القصور الدوراني، نيوتن الثاني الدوراني، الطاقة الدورانية، والزخم الزاوي.'},
  {id:'ch4', unit:2, n:'الفصل الرابع', t:'التيار الكهربائي والمقاومة', ic:'💡', d:'التيار، السرعة الانسياقية، المقاومية، قانون أوم، والقدرة الكهربائية.'},
  {id:'ch5', unit:2, n:'الفصل الخامس', t:'دارات التيار المستمر', ic:'🔋', d:'القوة الدافعة، فرق الجهد بين نقطتين، قنطرة ويتستون، وقانونا كيرشوف.'},
  {id:'ch6', unit:3, n:'الفصل السادس', t:'المجال المغناطيسي', ic:'🧲', d:'المجال حول سلك مستقيم وملف دائري وملف حلزوني، وقانون أمبير.'},
  {id:'ch7', unit:3, n:'الفصل السابع', t:'القوة المغناطيسية', ic:'🌀', d:'القوة على شحنة متحركة وعلى موصل، القوة بين سلكين، السيكلترون ومنتقي السرعات.'},
  {id:'ch8', unit:3, n:'الفصل الثامن', t:'الحث الكهرومغناطيسي', ic:'⚡', d:'التدفق، قانونا فارادي ولنز، الحث الذاتي، دارة RL، والمولد.'},
  {id:'ch9', unit:4, n:'الفصل التاسع', t:'نظرية الكم', ic:'🌈', d:'إشعاع الجسم الأسود، الظاهرة الكهروضوئية، نموذج بور، دي برولي، واللايقين.'},
  {id:'ch10',unit:4, n:'الفصل العاشر', t:'بنية النواة والإشعاع النووي', ic:'☢️', d:'مكونات النواة، حجمها وكثافتها، القوة النووية، طاقة الربط، والنظائر.'}
];

/* ---------- أيقونات الفصول (SVG بخط واحد، بلون الموقع) ---------- */
const ICONS = {
 ch1:'<path d="M6 24h14"/><path d="M14 18l6 6-6 6"/><circle cx="29" cy="24" r="7"/><path d="M4 31h6M4 17h4"/>',
 ch2:'<circle cx="14" cy="24" r="7"/><circle cx="34" cy="24" r="7"/><path d="M24 14v-6M24 40v-6M19 16l-3-4M29 16l3-4"/>',
 ch3:'<circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="2.5"/><path d="M24 10a14 14 0 0 1 13 9"/><path d="M37 13v6h-6"/>',
 ch4:'<path d="M8 24h6l3-7 5 14 5-14 5 14 3-7h5"/>',
 ch5:'<rect x="8" y="12" width="32" height="24" rx="2"/><path d="M20 12v-4M28 12v-4M8 24h-4M40 24h4"/><path d="M18 20v8M23 22v4"/>',
 ch6:'<path d="M14 8v18a10 10 0 0 0 20 0V8"/><path d="M14 8h7v18a3 3 0 0 0 6 0V8h7"/>',
 ch7:'<circle cx="24" cy="24" r="4"/><path d="M24 20V8M20 6l4-4 4 4"/><path d="M12 36a17 17 0 0 1 0-24M36 12a17 17 0 0 1 0 24"/>',
 ch8:'<path d="M8 24c3-6 5-6 8 0s5 6 8 0 5-6 8 0 5 6 8 0"/><path d="M26 6l-6 12h8l-6 12"/>',
 ch9:'<circle cx="16" cy="18" r="5"/><path d="M16 6v3M16 27v3M4 18h3M25 18h3"/><path d="M24 30c3-4 5-4 8 0s5 4 8 0"/><path d="M26 38h14"/>',
 ch10:'<circle cx="24" cy="24" r="4"/><ellipse cx="24" cy="24" rx="18" ry="7"/><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="18" ry="7" transform="rotate(120 24 24)"/>',
};
function icon(id, cls='ico'){ return `<svg class="${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[id]||''}</svg>`; }

const UNITS = {1:'الميكانيكا',2:'الكهرباء المتحركة',3:'الكهرومغناطيسية',4:'الفيزياء الحديثة'};

/* ---------- تخزين آمن ---------- */
const store = {
  get(k, d){ try{ const v = localStorage.getItem('phys12:'+k); return v===null? d : JSON.parse(v);}catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('phys12:'+k, JSON.stringify(v)); }catch(e){} }
};

/* ---------- الوضع الليلي ---------- */
(function(){ const t = store.get('theme', null); if(t) document.documentElement.dataset.theme = t; })();
function toggleTheme(){
  const cur = document.documentElement.dataset.theme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light');
  const nx = cur==='dark' ? 'light':'dark';
  document.documentElement.dataset.theme = nx; store.set('theme', nx);
  document.dispatchEvent(new Event('themechange'));
}

/* ---------- رياضيات KaTeX ---------- */
function renderMath(el){
  if(window.renderMathInElement) renderMathInElement(el||document.body,{
    delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],
    throwOnError:false
  });
}

/* ---------- ألوان من CSS للرسم ---------- */
function cssv(name){ return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
function setupCanvas(cv, h){
  if(!cv.hasAttribute('aria-label')){ const t=cv.closest('.sim')?.querySelector('h3,h4,.sim-t'); cv.setAttribute('role','img'); cv.setAttribute('aria-label','محاكاة تفاعلية'+(t?': '+t.textContent.trim():'')); }
  const dpr = window.devicePixelRatio||1, w = cv.clientWidth;
  cv.style.height = h+'px'; cv.width = w*dpr; cv.height = h*dpr;
  const ctx = cv.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.direction='ltr'; ctx.textAlign='start';
  return {ctx, w, h};
}
function arrow(ctx,x1,y1,x2,y2,color,lw=2.5,head=9){
  const a=Math.atan2(y2-y1,x2-x1), len=Math.hypot(x2-x1,y2-y1); if(len<1) return;
  ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=lw;
  ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2-Math.cos(a)*head*.6,y2-Math.sin(a)*head*.6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x2,y2);
  ctx.lineTo(x2-head*Math.cos(a-0.45),y2-head*Math.sin(a-0.45));
  ctx.lineTo(x2-head*Math.cos(a+0.45),y2-head*Math.sin(a+0.45)); ctx.closePath(); ctx.fill();
}
function fmt(x, d=2){
  if(!isFinite(x)) return '∞';
  const ax=Math.abs(x);
  if(ax===0) return '0';
  if(ax>=1e5 || ax<1e-2){ const e=Math.floor(Math.log10(ax)); let m=x/10**e; m=+m.toFixed(2);
    const sup=String(e).replace(/-/g,'⁻').replace(/\d/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[c]); return m+'×10'+sup; }
  if(ax<1) return (+x.toPrecision(3)).toString();
  return (+x.toFixed(d)).toString();
}

/* ---------- ربط المنزلقات ---------- */
function bindRanges(root, cb){
  const inputs = root.querySelectorAll('input[type=range]');
  const vals = {};
  const upd = ()=>{
    inputs.forEach(i=>{ vals[i.name]=+i.value; const o=root.querySelector('output[for="'+i.id+'"]'); if(o) o.textContent = i.value + (i.dataset.u? ' '+i.dataset.u:''); });
    cb(vals);
  };
  inputs.forEach(i=>i.addEventListener('input',upd));
  upd(); return upd;
}

/* ---------- أمثلة بخطوات ---------- */
function initSteps(){
  document.querySelectorAll('.steps').forEach(st=>{
    const ss=[...st.querySelectorAll(':scope>.s')]; if(!ss.length) return;
    ss.forEach((s,i)=>{ const n=document.createElement('span'); n.className='n'; n.textContent='خطوة '+(i+1); s.prepend(n); });
    let k=0;
    const ctrl=document.createElement('div'); ctrl.className='ctrl';
    const b1=document.createElement('button'); b1.className='btn'; b1.textContent='اعرض الخطوة الأولى ⬇';
    const b2=document.createElement('button'); b2.className='btn ghost'; b2.textContent='اعرض الحل كاملاً';
    const b3=document.createElement('button'); b3.className='btn ghost'; b3.textContent='إخفاء الحل'; b3.style.display='none';
    const sync=()=>{ ss.forEach((s,i)=>s.classList.toggle('on',i<k));
      b1.style.display = k>=ss.length?'none':''; b2.style.display = k>=ss.length?'none':''; b3.style.display = k>0?'':'none';
      b1.textContent = k===0?'اعرض الخطوة الأولى ⬇':'الخطوة التالية ⬇'; };
    b1.onclick=()=>{k++;sync();}; b2.onclick=()=>{k=ss.length;sync();}; b3.onclick=()=>{k=0;sync();};
    ctrl.append(b1,b2,b3); st.append(ctrl); sync();
  });
}

/* ---------- اختبار تفاعلي ---------- */
const LET=['أ','ب','ج','د','هـ'];
function Quiz(sel, qs, key){
  const root=document.querySelector(sel); if(!root) return;
  root.classList.add('quiz');
  let answered=0, right=0;
  const score=document.createElement('div'); score.className='qscore';
  const st=document.createElement('span'); const rb=document.createElement('button'); rb.className='btn'; rb.textContent='أعد الاختبار ↺';
  rb.onclick=()=>{ root.innerHTML=''; Quiz(sel,qs,key); root.scrollIntoView({behavior:'smooth'}); };
  score.append(st,rb);
  const upd=()=>{ st.innerHTML = `أجبت <b>${answered}</b> من ${qs.length} — الصحيح: <b>${right}</b>`;
    if(answered===qs.length){ const pct=Math.round(100*right/qs.length);
      st.innerHTML += pct>=85?' — ممتاز! 🌟': pct>=60?' — جيد، راجع الأخطاء 👍':' — راجع الفصل وحاول مرة ثانية 💪';
      if(key){ const best=store.get('score:'+key,0); if(pct>best) store.set('score:'+key,pct); } } };
  qs.forEach((q,qi)=>{
    const c=document.createElement('div'); c.className='qcard';
    c.innerHTML=`<div class="qn">سؤال ${qi+1}</div><div class="qt">${q.q}</div><div class="opts"></div><div class="qexp"></div>`;
    const os=c.querySelector('.opts'), ex=c.querySelector('.qexp');
    q.o.forEach((o,oi)=>{
      const b=document.createElement('button'); b.className='opt'; b.innerHTML=`<span class="l">${LET[oi]}</span><span>${o}</span>`;
      b.onclick=()=>{
        os.querySelectorAll('.opt').forEach((x,xi)=>{ x.disabled=true; if(xi===q.a) x.classList.add('ok'); });
        const ok = oi===q.a; if(!ok) b.classList.add('no');
        answered++; if(ok) right++;
        ex.innerHTML=`<b class="v" style="color:var(${ok?'--good':'--bad'})">${ok?'✔ إجابة صحيحة':'✘ الإجابة الصحيحة: ('+LET[q.a]+')'}</b>${q.e||''}`;
        ex.classList.add('show'); renderMath(ex); upd();
      };
      os.append(b);
    });
    root.append(c); c.querySelectorAll('.circ').forEach(drawCirc);
  });
  root.append(score); upd(); renderMath(root);
}

/* ---------- فهرس الفصل + التقدم ---------- */
function initChapter(){
  const id=document.body.dataset.ch; if(!id) return;
  const secs=[...document.querySelectorAll('main.chapter section[id]')];
  const toc=document.querySelector('.toc');
  secs.forEach(s=>{ const h=s.querySelector('h2'); if(!h) return; const m=h.innerHTML.match(/^(\d+-\d+)\s+/); if(m) h.innerHTML=`<span class="sn" dir="ltr">${m[1]}</span> `+h.innerHTML.slice(m[0].length); });
  const done=new Set(store.get('done:'+id,[]));
  if(toc){
    const ol=document.createElement('ol');
    secs.forEach(s=>{
      const h=s.querySelector('h2'); const li=document.createElement('li');
      li.innerHTML=`<a href="#${s.id}" data-s="${s.id}"><span class="ck">✓</span><span>${h?h.innerHTML:s.id}</span></a>`;
      ol.append(li);
    });
    toc.innerHTML='<h4>محتويات الفصل</h4>'; toc.append(ol);
    toc.insertAdjacentHTML('beforeend','<div class="chap-prog">تقدّمك في الفصل: <b class="pc">0%</b><div class="bar"><i></i></div></div>');
    toc.addEventListener('click',e=>{ if(e.target.closest('a')) document.body.classList.remove('toc-open'); });
  }
  const refresh=()=>{
    secs.forEach(s=>{ const a=toc&&toc.querySelector(`a[data-s="${s.id}"]`); if(a) a.classList.toggle('done',done.has(s.id));
      const b=s.querySelector('.donebtn'); if(b){ b.classList.toggle('on',done.has(s.id)); b.textContent=done.has(s.id)?'✓ أنهيت هذا القسم':'فهمت هذا القسم ✓'; } });
    const pc=Math.round(100*done.size/Math.max(1,secs.length));
    if(toc){ toc.querySelector('.pc').textContent=pc+'%'; toc.querySelector('.bar>i').style.width=pc+'%'; }
    store.set('done:'+id,[...done]); store.set('pct:'+id,pc);
  };
  secs.forEach(s=>{
    if(s.dataset.nodone!==undefined) return;
    const r=document.createElement('div'); r.className='done-row';
    const b=document.createElement('button'); b.className='donebtn';
    b.onclick=()=>{ done.has(s.id)?done.delete(s.id):done.add(s.id); refresh(); };
    r.append(b); s.append(r);
  });
  refresh();
  // scrollspy
  const links=toc?[...toc.querySelectorAll('a')]:[];
  const io=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting){ links.forEach(l=>l.classList.toggle('active',l.dataset.s===e.target.id)); } }); },{rootMargin:'-30% 0px -65% 0px'});
  secs.forEach(s=>io.observe(s));
  // شريط القراءة
  const pl=document.querySelector('.progress-line');
  if(pl) addEventListener('scroll',()=>{ const h=document.documentElement; pl.style.width=(100*h.scrollTop/Math.max(1,h.scrollHeight-h.clientHeight))+'%'; },{passive:true});
  // التنقل بين الفصول
  if(/^ch[1-8]$/.test(id)){ const pg0=document.querySelector('.pager'); if(pg0){ const b=document.createElement('a'); b.className='bankcta'; b.href='../bank/'+id+'.html';
    b.innerHTML=`<span class="bi">📝</span><span><b>أسئلة وزارية على هذا الفصل</b><small>امتحانات الثانوية العامة 2017–2025 مع الإجابات — جرّب حالك قبل الامتحان</small></span><span class="ar">←</span>`; pg0.before(b);} }
  const i=CHAPTERS.findIndex(c=>c.id===id), pg=document.querySelector('.pager');
  if(pg){ const p=CHAPTERS[i-1], n=CHAPTERS[i+1];
    pg.innerHTML=(p?`<a href="${p.id}.html"><small>→ السابق</small>${p.n}: ${p.t}</a>`:'<a href="../index.html"><small>→ العودة</small>الصفحة الرئيسية</a>')+
                 (n?`<a class="next" href="${n.id}.html"><small>التالي ←</small>${n.n}: ${n.t}</a>`:'<a class="next" href="../index.html"><small>انتهى الكتاب 🎉</small>الصفحة الرئيسية</a>'); }
}


/* ---------- رسم الدارات والأشكال (SVG) ---------- */
function drawCirc(el){
  let spec; try{ spec= el.dataset.f ? (window.FIGS||{})[el.dataset.f] : JSON.parse(el.dataset.c); }catch(e){ console.error('circ',e); return; }
  if(!spec){ console.error('missing fig',el.dataset.f); return; }
  const U=+(el.dataset.u||52), NS='http://www.w3.org/2000/svg';
  let mnx=1e9,mny=1e9,mxx=-1e9,mxy=-1e9;
  const ext=(x,y)=>{mnx=Math.min(mnx,x);mny=Math.min(mny,y);mxx=Math.max(mxx,x);mxy=Math.max(mxy,y);};
  spec.forEach(e=>{ const t=e[0]; if(['d','t','o','x','g'].includes(t)) ext(e[1],e[2]); else if(t==='c'){ext(e[1]-e[3],e[2]-e[3]);ext(e[1]+e[3],e[2]+e[3]);} else if(t==='f'){ext(e[1],e[2]);ext(e[3],e[4]);} else {ext(e[1],e[2]);ext(e[3],e[4]);} });
  const pad=0.75; const W=(mxx-mnx+2*pad)*U, H=(mxy-mny+2*pad)*U;
  const X=x=>(x-mnx+pad)*U, Y=y=>(y-mny+pad)*U;
  let o=[];
  const ln=(x1,y1,x2,y2,cls='')=>o.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${cls}"/>`);
  const txt=(x,y,s,cls='lbl',anc='middle')=>o.push(`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anc}" dominant-baseline="middle">${s}</text>`);
  const seg=(e)=>{ const [t,a,b,c,d]=e; const x1=X(a),y1=Y(b),x2=X(c),y2=Y(d); const L=Math.hypot(x2-x1,y2-y1), ux=(x2-x1)/L, uy=(y2-y1)/L, nx=-uy, ny=ux; return {x1,y1,x2,y2,L,ux,uy,nx,ny,mx:(x1+x2)/2,my:(y1+y2)/2}; };
  const lab=(g,s,side,dist=17)=>{ if(s===undefined||s==='') return; let sd=side||1; let nx=g.nx,ny=g.ny; if(Math.abs(g.uy)<0.5){ if(ny>0){nx=-nx;ny=-ny;} txt(g.mx+nx*dist*sd,g.my+ny*dist*sd,s); } else { if(nx<0){nx=-nx;ny=-ny;} const d=Math.min(dist,15); txt(g.mx+nx*d*sd,g.my+ny*d*sd,s,'lbl',sd>0?'start':'end'); } };
  spec.forEach(e=>{ const t=e[0];
    if(t==='w'){ const g=seg(e); ln(g.x1,g.y1,g.x2,g.y2); }
    else if(t==='dash'){ const g=seg(e); ln(g.x1,g.y1,g.x2,g.y2,'dsh'); if(e[5]) lab(g,e[5],e[6]); }
    else if(t==='r'){ const g=seg(e); const half=Math.min(20,g.L*0.3); const a1x=g.mx-g.ux*half,a1y=g.my-g.uy*half,a2x=g.mx+g.ux*half,a2y=g.my+g.uy*half;
      ln(g.x1,g.y1,a1x,a1y); ln(a2x,a2y,g.x2,g.y2); let pts=[[a1x,a1y]]; const n=6; for(let k=1;k<n;k++){ const f=k/n, s=(k%2?1:-1)*7; pts.push([a1x+(a2x-a1x)*f+g.nx*s, a1y+(a2y-a1y)*f+g.ny*s]); } pts.push([a2x,a2y]);
      o.push(`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" class="res"/>`); lab(g,e[5],e[6],19); }
    else if(t==='b'){ const g=seg(e); const gp=4; const p1x=g.mx-g.ux*gp,p1y=g.my-g.uy*gp,p2x=g.mx+g.ux*gp,p2y=g.my+g.uy*gp;
      ln(g.x1,g.y1,p1x,p1y); ln(p2x,p2y,g.x2,g.y2);
      ln(p1x-g.nx*7,p1y-g.ny*7,p1x+g.nx*7,p1y+g.ny*7,'neg'); ln(p2x-g.nx*14,p2y-g.ny*14,p2x+g.nx*14,p2y+g.ny*14,'pos');
      txt(p2x+g.ux*10+g.nx*14,p2y+g.uy*10+g.ny*14,'+','pm'); lab(g,e[5],e[6],24); }
    else if(t==='s'){ const g=seg(e); const h=14; const a1x=g.mx-g.ux*h,a1y=g.my-g.uy*h,a2x=g.mx+g.ux*h,a2y=g.my+g.uy*h;
      ln(g.x1,g.y1,a1x,a1y); ln(a2x,a2y,g.x2,g.y2); const ang=-0.5; ln(a1x,a1y,a1x+(g.ux*Math.cos(ang)-g.uy*Math.sin(ang))*26,a1y+(g.ux*Math.sin(ang)+g.uy*Math.cos(ang))*26);
      o.push(`<circle cx="${a1x}" cy="${a1y}" r="2.6" class="dot"/><circle cx="${a2x}" cy="${a2y}" r="2.6" class="dot"/>`); lab(g,e[5],e[6]==null?-1:e[6],18); }
    else if(t==='m'||t==='l'){ const g=seg(e); const r=13; ln(g.x1,g.y1,g.mx-g.ux*r,g.my-g.uy*r); ln(g.mx+g.ux*r,g.my+g.uy*r,g.x2,g.y2);
      o.push(`<circle cx="${g.mx}" cy="${g.my}" r="${r}" class="meter"/>`);
      if(t==='m') txt(g.mx,g.my+1,e[5]||'A','mt'); else { const d=r*0.7; ln(g.mx-d,g.my-d,g.mx+d,g.my+d); ln(g.mx+d,g.my-d,g.mx-d,g.my+d); lab(g,e[5],e[6],24); } }
    else if(t==='i'){ const g=seg(e); ln(g.x1,g.y1,g.x2,g.y2,'cur'); const hx=g.x2,hy=g.y2; o.push(`<polygon points="${hx},${hy} ${hx-g.ux*9+g.nx*5},${hy-g.uy*9+g.ny*5} ${hx-g.ux*9-g.nx*5},${hy-g.uy*9-g.ny*5}" class="curh"/>`); lab(g,e[5],e[6],13); }
    else if(t==='a'){ const g=seg(e); ln(g.x1,g.y1,g.x2,g.y2,'arw'); const hx=g.x2,hy=g.y2; o.push(`<polygon points="${hx},${hy} ${hx-g.ux*10+g.nx*5},${hy-g.uy*10+g.ny*5} ${hx-g.ux*10-g.nx*5},${hy-g.uy*10-g.ny*5}" class="arwh"/>`); lab(g,e[5],e[6],14); }
    else if(t==='d'){ o.push(`<circle cx="${X(e[1])}" cy="${Y(e[2])}" r="3.6" class="dot"/>`); if(e[3]) txt(X(e[1])+(e[4]||0)*U,Y(e[2])+(e[5]!=null?e[5]:-0.32)*U,e[3],'nd'); }
    else if(t==='t'){ txt(X(e[1]),Y(e[2]),e[3],e[4]||'lbl'); }
    else if(t==='o'||t==='x'){ const cx=X(e[1]),cy=Y(e[2]); o.push(`<circle cx="${cx}" cy="${cy}" r="11" class="meter"/>`);
      if(t==='o') o.push(`<circle cx="${cx}" cy="${cy}" r="3.4" class="dot"/>`); else { ln(cx-6,cy-6,cx+6,cy+6); ln(cx+6,cy-6,cx-6,cy+6); }
      if(e[3]) txt(cx+(e[4]!=null?e[4]:0)*U,cy+(e[5]!=null?e[5]:0.48)*U,e[3]); }
    else if(t==='c'){ const [_,cx,cy,r,a1,a2,cls]=e; const P=a=>[X(cx+r*Math.cos(a*Math.PI/180)),Y(cy-r*Math.sin(a*Math.PI/180))]; const [sx,sy]=P(a1),[ex,ey]=P(a2); const large=Math.abs(a2-a1)>180?1:0, sw=a2>a1?0:1;
      o.push(`<path d="M${sx},${sy} A${r*U},${r*U} 0 ${large} ${sw} ${ex},${ey}" class="${cls||'wire'}"/>`); }
    else if(t==='f'){ const [_,x1,y1,x2,y2,kind]=e; o.push(`<rect x="${X(Math.min(x1,x2))}" y="${Y(Math.min(y1,y2))}" width="${Math.abs(x2-x1)*U}" height="${Math.abs(y2-y1)*U}" class="fld"/>`);
      for(let x=Math.min(x1,x2)+0.25;x<Math.max(x1,x2);x+=0.5) for(let y=Math.min(y1,y2)+0.25;y<Math.max(y1,y2);y+=0.5){ if(kind==='x') txt(X(x),Y(y),'×','fx'); else o.push(`<circle cx="${X(x)}" cy="${Y(y)}" r="2" class="fdot"/>`); } }
    else if(t==='g'){ const cx=X(e[1]),cy=Y(e[2]); ln(cx-12,cy,cx+12,cy); ln(cx-8,cy+5,cx+8,cy+5); ln(cx-4,cy+10,cx+4,cy+10); }
  });
  el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" width="${W}" style="max-width:100%;height:auto;direction:ltr" role="img" aria-label="${el.dataset.alt||'شكل توضيحي'}">${o.join('')}</svg>${el.dataset.cap?`<figcaption>${el.dataset.cap}</figcaption>`:''}`;
  fitSvg(el.querySelector('svg'));
}
/* ضبط حدود الرسم على محتواه الفعلي حتى لا تُقص التسميات */
function fitSvg(sv){ if(!sv) return; try{ const b=sv.getBBox(); if(!b.width) return; const p=8;
  sv.setAttribute('viewBox',`${(b.x-p).toFixed(1)} ${(b.y-p).toFixed(1)} ${(b.width+2*p).toFixed(1)} ${(b.height+2*p).toFixed(1)}`);
  sv.setAttribute('width',(b.width+2*p).toFixed(0)); sv.dataset.fit=1; }catch(e){} }
document.addEventListener('toggle',e=>{ if(e.target.open) e.target.querySelectorAll('.circ svg:not([data-fit])').forEach(fitSvg); },true);
if(document.fonts) document.fonts.ready.then(()=>document.querySelectorAll('.circ svg').forEach(fitSvg));

/* ---------- شريط علوي مشترك ---------- */
function topbar(root){
  const tb=document.querySelector('.topbar'); if(!tb) return;
  tb.innerHTML=`<div class="in">
    ${document.querySelector('.toc')?`<button class="iconbtn toc-toggle" aria-label="المحتويات" onclick="document.body.classList.toggle('toc-open')">☰</button>`:''}
    <a class="brand" href="${root}index.html"><span class="logo">⚛</span><span class="t">فيزياء التوجيهي التفاعلية</span></a>
    <span class="sp"></span>
    <a class="iconbtn" style="display:grid;place-items:center;text-decoration:none" href="${root}index.html" title="الرئيسية">🏠</a>
    <button class="iconbtn" onclick="toggleTheme()" title="الوضع الليلي">🌓</button>
  </div><div class="progress-line"></div>`;
}

document.addEventListener('DOMContentLoaded',()=>{
  topbar(document.body.dataset.root||'');
  document.querySelectorAll('.circ').forEach(drawCirc);
  initSteps(); initChapter();
  if(window.renderMathInElement) renderMath(document.body);
  else { const k=document.querySelector('script[src*="auto-render"]'); if(k) k.addEventListener('load',()=>renderMath(document.body)); }
});
