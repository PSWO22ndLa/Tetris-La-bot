// 自我對戰：La bot（經典或 NN 評分）在 QP 式垃圾壓力下打到死／上限，記錄 (特徵, 之後的折扣攻擊)
const C = require(require('path').resolve(process.argv.find(a => a.startsWith('core=')) ? process.argv.find(a => a.startsWith('core=')).slice(5) : './core.js')); const INIT = require('./init.json').init; C.init(INIT);
const W = INIT.W, BH = INIT.BOT_H, VAL = INIT.BOT_VAL;
const args = Object.fromEntries(process.argv.slice(2).map(a => a.split('=')));
const games = +(args.games || 4), cap = +(args.cap || 500), seed0 = +(args.seed || 1), out = args.out || null;
if (args.nn && require('fs').existsSync(args.nn)){ const N = JSON.parse(require('fs').readFileSync(args.nn, 'utf8')); N.v = N.v || (N.layers[0].n === 277 ? 2 : 1); N.pure = !N.dist && args.pure === '1'; N.mix = +(args.mix || 1); if (N.dist && args.k != null) N.k = +args.k; if (N.dist && args.clip != null) N.clip = +args.clip; if (N.dist && args.rerank != null) N.rerank = +args.rerank; C.setNN(N); }   // 沒有 nn.json（第一次）→ 用規則版產資料
if (args.qx != null && C.setQX) C.setQX(args.qx === '1');
for (const [k, v] of Object.entries(args)) if (k.startsWith('w.')) C.LBW[k.slice(2)] = +v;
if (args.beam) C.LBW.beam = +args.beam; if (args.depth) C.LBW.depth = +args.depth;
let S = seed0 * 2654435761 >>> 0; const rnd = () => { S ^= S << 13; S >>>= 0; S ^= S >>> 17; S ^= S << 5; S >>>= 0; return S / 4294967296; };
Math.random = rnd;
const EPS = +(args.eps || 0), B2BR = +(args.b2br ?? .5);
const GAMMA = +(args.gamma || .95), DEATH = +(args.death || 40);
const feats = [], targets = [], DIST = args.dist === '1';   // dist=1：v3 蒸餾資料（目標＝這一手搜尋找到的最佳分數，不看之後的運氣）
const stats = [];
for (let g = 0; g < games; g++){
  const L = +(args.lmin || .6) + rnd() * +(args.lrange || 1.8);                                  // 這局的垃圾壓力
  let bd = new Uint8Array(W * BH), hold = null, q = [], bag = [], b2b = -1, combo = -1, pending = [], hole = (rnd() * W) | 0, nextWave = 6 + rnd() * 10 / L;
  const fill = () => { while (q.length < 7){ if (!bag.length){ bag = ['I','J','L','O','S','T','Z']; for (let i = 6; i > 0; i--){ const k = (rnd() * (i + 1)) | 0; [bag[i], bag[k]] = [bag[k], bag[i]]; } } q.push(bag.pop()); } };
  const recF = [], recR = [], dIdx = []; let dead = false,   // dIdx：這局的蒸餾樣本在 targets 裡的位置＋第幾手（死掉時往回扣分）
   pieces = 0, sent = 0, t0 = Date.now(), maxB = 0, brk = 0, sumB = 0, nClr = 0;
  for (; pieces < cap; pieces++){
    fill();
    const pend = pending.reduce((a, p) => a + p.n, 0);
    let d = C.lbDecide({ bd, hold, q: q.slice(0, 6), bag: [], b2b, combo, noBook: true, pend, rules: null });
    if (DIST && d && C.lastV != null && isFinite(C.lastV)){ const bits = C.lbToBits(bd); feats.push({ f: Array.from(C.lbFeatB(bits, { b2b, combo }), v => +v.toFixed(4)), b: Array.from(bits), h: hold ? 'IJLOSTZ'.indexOf(hold) : -1 }); targets.push(+(C.lastV - C.evalBase(bits, { b2b, combo })).toFixed(3)); dIdx.push([targets.length - 1, pieces]); }   // 殘差：搜尋值 − 規則版靜態評分
    if (d && EPS && rnd() < EPS){ C.lbTables(); const ms = [...C.lbMovesB(C.lbToBits(bd), q[0]).values()]; if (ms.length) d = { m: ms[(rnd() * ms.length) | 0], held: false }; }   // 探索：偶爾亂放，讓資料涵蓋爛盤面
    if (!d){ dead = true; break; }
    if (d.held){ const h = hold; hold = q.shift(); if (h) q.unshift(h); }
    q.shift();
    const r = C.lbPlace(bd, d.m), st = { b2b, combo };
    C.setR({});
    const b0 = b2b; const atk = C.lbAttack(r.n, d.m.spin, st, r.pc, 0); b2b = st.b2b; combo = st.combo; bd = r.b; if (r.n){ nClr++; sumB += Math.max(0, b2b); if (b0 >= 3 && b2b < 0) brk++; } maxB = Math.max(maxB, b2b);
    let out2 = atk; while (out2 > 0 && pending.length){ const c = Math.min(out2, pending[0].n); pending[0].n -= c; out2 -= c; if (!pending[0].n) pending.shift(); }
    // 特徵：放完的盤面（跟搜尋葉節點一樣），pend＝這手之後還在排隊的量
    C.setR({ pend: Math.min(12, pending.reduce((a, p) => a + p.n, 0)) });
    { const bits = C.lbToBits(bd); recF.push({ f: Array.from(C.lbFeatB(bits, { b2b, combo }), v => +v.toFixed(4)), b: Array.from(bits), h: hold ? 'IJLOSTZ'.indexOf(hold) : -1 }); }
    recR.push(atk + (r.n && b2b >= 1 && b2b > b0 ? B2BR : 0)); sent += atk;   // v2 獎勵：攻擊＋B2B 接下去的小獎勵
    // 垃圾：倒數到 0 且這手沒消行 → 進場（一次最多 8）
    for (const p of pending) p.d--;
    if (!r.n){ let room = 8;
      while (room > 0 && pending.length && pending[0].d <= 0){ const p = pending[0], n = Math.min(room, p.n);
        for (let i = 0; i < n; i++){ for (let x = 0; x < W; x++) if (bd[x]){ dead = true; } if (dead) break;
          bd.copyWithin(0, W); if (rnd() < .2) hole = (rnd() * W) | 0; for (let x = 0; x < W; x++) bd[(BH - 1) * W + x] = x === hole ? 0 : 8; }
        if (dead) break; p.n -= n; room -= n; if (!p.n) pending.shift(); } }
    if (dead) break;
    let spawnBlocked = false; for (let y = 0; y < 4 && !spawnBlocked; y++) for (let x = 3; x < 7; x++) if (bd[y * W + x]){ spawnBlocked = true; break; }
    if (spawnBlocked){ dead = true; break; }
    if (--nextWave <= 0){ nextWave = (3 + rnd() * 9) / L; let n = 1 + Math.floor(-Math.log(rnd() + 1e-9) * 1.6 * L); if (rnd() < .08 * L) n += 5 + ((rnd() * 5) | 0); pending.push({ n: Math.min(n, 14), d: 2 + ((rnd() * 3) | 0) }); }
  }
  // 目標：之後的折扣攻擊（不含這手），死掉扣 DEATH
  let G = dead ? -DEATH : 0; const n = recF.length, tg = new Array(n);
  for (let i = n - 1; i >= 0; i--){ tg[i] = G; G = recR[i] + GAMMA * G; }
  const keep = dead ? n : Math.max(0, n - 40);                 // 沒死（到上限）：最後 40 手的目標被截斷，不要
  if (!DIST) for (let i = 0; i < keep; i++){ feats.push(recF[i]); targets.push(tg[i]); }
  // v3.1 保命：這局最後頂死 → 死前 DW 手內的盤面目標往下扣（越接近死越多），讓網路學會快頂時別硬撐 B2B
  if (DIST && dead){ const DW = +(args.dwin || 30), DP = +(args.dpen || 60); for (const [ti, pc] of dIdx){ const left = pieces - pc; if (left <= DW) targets[ti] = +(targets[ti] - DP * (1 - left / (DW + 1))).toFixed(3); } }
  stats.push({ maxB, brk, avgB: nClr ? sumB / nClr : 0, L: +L.toFixed(2), pieces, sent, app: +(sent / Math.max(1, pieces)).toFixed(3), dead, ms: Date.now() - t0 });
}
const surv = stats.reduce((a, s) => a + s.pieces, 0) / stats.length, app = stats.reduce((a, s) => a + s.sent, 0) / Math.max(1, stats.reduce((a, s) => a + s.pieces, 0));
console.log(JSON.stringify({ games, avgPieces: +surv.toFixed(1), app: +app.toFixed(3), deaths: stats.filter(s => s.dead).length, maxB2B: Math.max(...stats.map(s => s.maxB)), avgB2B: +(stats.reduce((a, s) => a + s.avgB, 0) / stats.length).toFixed(2), breaks3: stats.reduce((a, s) => a + s.brk, 0), msPerPiece: +(stats.reduce((a, s) => a + s.ms, 0) / stats.reduce((a, s) => a + s.pieces, 0)).toFixed(1) }));
if (out) require('fs').writeFileSync(out, JSON.stringify({ X: feats, y: targets, stats }));
