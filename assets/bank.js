/* ===== بنك الأسئلة الوزارية ===== */
document.addEventListener('DOMContentLoaded', () => {
  const id = document.body.dataset.bank; if (!id) return;
  const KEY = 'bank:' + id;
  let st = store.get(KEY, {});               // {qid: 0|1}
  const qs = [...document.querySelectorAll('.bq')];
  const score = document.querySelector('.bscore');
  const upd = () => {
    const v = Object.values(st), r = v.filter(x => x).length;
    score.innerHTML = `أجبت <b>${v.length}</b> من ${qs.filter(q => q.classList.contains('mcq')).length} — الصحيح <b>${r}</b>`;
  };
  const LET = ['أ', 'ب', 'ج', 'د'];
  const mark = (q, i, save) => {
    const a = +q.dataset.a, ok = i === a;
    q.querySelectorAll('.bo').forEach((b, j) => {
      b.disabled = true;
      b.classList.toggle('right', j === a);
      b.classList.toggle('wrong', j === i && !ok);
    });
    const v = q.querySelector('.bexp .v');
    v.textContent = ok ? '✔ إجابة صحيحة.' : `✘ الإجابة الصحيحة: (${LET[a]}).`;
    v.style.color = `var(${ok ? '--good' : '--bad'})`;
    q.classList.add('done', ok ? 'ok' : 'no');
    if (save) { st[q.id] = ok ? 1 : 0; store.set(KEY, st); upd(); }
  };
  // استرجاع الإجابات المحفوظة
  qs.forEach(q => { if (q.id in st && q.classList.contains('mcq')) mark(q, st[q.id] ? +q.dataset.a : (+q.dataset.a + 1) % 4, false); });
  document.querySelector('main.bank').addEventListener('click', e => {
    const b = e.target.closest('.bo'); if (!b || b.disabled) return;
    mark(b.closest('.bq'), +b.dataset.i, true);
  });
  upd();

  // التصفية
  let K = 'all', Y = 'all', only = null;
  const apply = () => {
    let shown = 0;
    document.querySelectorAll('.bsec').forEach(s => {
      let any = 0;
      s.querySelectorAll('.bq').forEach(q => {
        const okK = K === 'all' || q.classList.contains(K);
        const okY = Y === 'all' || q.dataset.y.split(' ').includes(Y);
        const okR = !only || only.has(q.id);
        const vis = okK && okY && okR; q.hidden = !vis; if (vis) { any++; shown++; }
      });
      s.hidden = !any;
    });
    document.querySelector('.bempty').hidden = !!shown;
  };
  const group = (sel, fn) => document.querySelectorAll(sel).forEach(c => c.addEventListener('click', () => {
    document.querySelectorAll(sel).forEach(x => x.classList.remove('on')); c.classList.add('on'); only = null; fn(c); apply();
  }));
  group('.bfilter [data-k]', c => K = c.dataset.k);
  group('.bfilter [data-y]', c => Y = c.dataset.y);
  document.getElementById('rand10').onclick = () => {
    const pool = qs.filter(q => q.classList.contains('mcq'));
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    only = new Set(pool.slice(0, 10).map(q => q.id));
    pool.slice(0, 10).forEach(q => resetQ(q));
    K = 'all'; Y = 'all';
    document.querySelectorAll('.bfilter .chip').forEach(x => x.classList.toggle('on', x.dataset.k === 'all' || x.dataset.y === 'all'));
    apply(); document.querySelector('.bsec:not([hidden])')?.scrollIntoView({ behavior: 'smooth' });
  };
  const resetQ = q => {
    delete st[q.id]; q.classList.remove('done', 'ok', 'no');
    q.querySelectorAll('.bo').forEach(b => { b.disabled = false; b.classList.remove('right', 'wrong'); });
  };
  document.getElementById('reset').onclick = () => { qs.forEach(resetQ); st = {}; store.set(KEY, st); upd(); };

  // التنقل بين البنوك
  const ids = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7', 'ch8'], i = ids.indexOf(id);
  const t = x => CHAPTERS.find(c => c.id === x);
  const pg = document.querySelector('.pager');
  if (pg) pg.innerHTML =
    (i > 0 ? `<a href="${ids[i - 1]}.html"><small>→ أسئلة الفصل السابق</small>${t(ids[i - 1]).t}</a>` : `<a href="../index.html#bank"><small>→ العودة</small>كل بنوك الأسئلة</a>`) +
    (i < ids.length - 1 ? `<a class="next" href="${ids[i + 1]}.html"><small>أسئلة الفصل التالي ←</small>${t(ids[i + 1]).t}</a>` : `<a class="next" href="../index.html#bank"><small>←</small>كل بنوك الأسئلة</a>`);
});
