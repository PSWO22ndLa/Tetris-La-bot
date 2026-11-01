// 訓練 La bot 評分網路 v2（Bun 直接跑）：30 特徵＋HOLD one-hot＋整個盤面 24×10 → MLP(ReLU) → 之後的折扣攻擊（含 B2B 小獎勵）
// 用法：bun train.js data/*.json --out nn.json --init nn.json --hidden 48,24 --epochs 30
const fs = require('fs');
const argv = process.argv.slice(2), opt = { out: 'nn.json', hidden: '48,24', epochs: '30', lr: '0.001', l2: '0.0001', init: '', max: '400000' }, files = [];
for (let i = 0; i < argv.length; i++){ if (argv[i].startsWith('--')) opt[argv[i].slice(2)] = argv[++i]; else files.push(argv[i]); }
const NIN = 277;
let D = [], A = [], Y = [];
for (const f of files.sort().reverse()){                                   // 新的資料優先
  let d; try { d = JSON.parse(fs.readFileSync(f, 'utf8')); } catch(e){ continue; }
  for (let i = 0; i < d.X.length; i++){ const x = d.X[i]; if (!x || !x.b) continue;        // 舊版（v1）資料跳過
    const den = new Float32Array(37); for (let k = 0; k < 30; k++) den[k] = x.f[k]; if (x.h >= 0) den[30 + x.h] = 1;
    const act = []; for (let y = 0; y < 24; y++){ let r = x.b[y]; while (r){ const bit = r & -r, xx = 31 - Math.clz32(bit); if (xx < 10) act.push(37 + y * 10 + xx); r ^= bit; } }
    D.push(den); A.push(Int16Array.from(act)); Y.push(d.y[i]); }
  if (Y.length >= +opt.max) break;
}
const N = Y.length; if (!N) throw new Error('沒有 v2 資料');
let ym = 0; for (const v of Y) ym += v; ym /= N; let ys = 0; for (const v of Y) ys += (v - ym) ** 2; ys = Math.sqrt(ys / N) + 1e-6;
const yn = Float32Array.from(Y, v => (v - ym) / ys);
let S = 12345; const rnd = () => { S ^= S << 13; S >>>= 0; S ^= S >>> 17; S ^= S << 5; S >>>= 0; return S / 4294967296; };
const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-12)) * Math.cos(2 * Math.PI * rnd());
const sizes = [NIN, ...opt.hidden.split(',').map(Number), 1];
let L = sizes.slice(1).map((m, k) => { const n = sizes[k], s = Math.sqrt(2 / (k ? n : 60)); return { n, m, w: Float32Array.from({ length: n * m }, () => gauss() * s), b: new Float32Array(m) }; });
if (opt.init && fs.existsSync(opt.init)){ const I = JSON.parse(fs.readFileSync(opt.init, 'utf8')); if (I.layers.length === L.length && I.layers.every((l, k) => l.n === L[k].n && l.m === L[k].m)){ L = I.layers.map(l => ({ n: l.n, m: l.m, w: Float32Array.from(l.w), b: Float32Array.from(l.b) })); console.log('從', opt.init, '接著練'); } }
const adam = L.map(l => ({ mw: new Float32Array(l.w.length), vw: new Float32Array(l.w.length), mb: new Float32Array(l.m), vb: new Float32Array(l.m) }));
const idx = Array.from({ length: N }, (_, i) => i); for (let i = N - 1; i > 0; i--){ const j = (rnd() * (i + 1)) | 0; [idx[i], idx[j]] = [idx[j], idx[i]]; }
const nVal = Math.floor(N * .1), val = idx.slice(0, nVal), tr = idx.slice(nVal);
function forward(i, acts){                                                 // acts[0]＝第一層輸出前的 null（稀疏輸入另外處理）
  const L0 = L[0], h = new Float32Array(L0.m), den = D[i], act = A[i];
  for (let j = 0; j < L0.m; j++){ const off = j * NIN; let s = L0.b[j]; for (let k = 0; k < 37; k++) s += L0.w[off + k] * den[k]; for (const k of act) s += L0.w[off + k]; h[j] = s > 0 ? s : 0; }
  acts.push(h); let a = h;
  for (let li = 1; li < L.length; li++){ const { n, m, w, b } = L[li], o = new Float32Array(m);
    for (let j = 0; j < m; j++){ let s = b[j]; const off = j * n; for (let k = 0; k < n; k++) s += w[off + k] * a[k]; o[j] = li < L.length - 1 ? (s > 0 ? s : 0) : s; } a = o; acts.push(a); }
  return a[0];
}
function mse(set){ let e = 0; for (const i of set){ const p = forward(i, []); e += (p - yn[i]) ** 2; } return e / set.length; }
const lr = +opt.lr, l2 = +opt.l2, B = 256, b1 = .9, b2 = .999; let step = 0, best = Infinity, bestL = null, bad = 0;
for (let ep = 0; ep < +opt.epochs; ep++){
  for (let i = tr.length - 1; i > 0; i--){ const j = (rnd() * (i + 1)) | 0; [tr[i], tr[j]] = [tr[j], tr[i]]; }
  for (let s0 = 0; s0 < tr.length; s0 += B){
    const gw = L.map(l => new Float32Array(l.w.length)), gb = L.map(l => new Float32Array(l.m)), bs = Math.min(B, tr.length - s0);
    for (let t = 0; t < bs; t++){ const i = tr[s0 + t], acts = []; const p = forward(i, acts); let delta = new Float32Array([2 * (p - yn[i]) / bs]);
      for (let k = L.length - 1; k >= 1; k--){ const { n, m, w } = L[k], a = acts[k - 1], nd = new Float32Array(n);
        for (let j = 0; j < m; j++){ const dj = delta[j]; if (!dj) continue; gb[k][j] += dj; const off = j * n; for (let q = 0; q < n; q++){ gw[k][off + q] += dj * a[q]; nd[q] += dj * w[off + q]; } }
        for (let q = 0; q < n; q++) if (a[q] <= 0) nd[q] = 0; delta = nd; }
      const den = D[i], act = A[i];                                          // 第一層：只更新有用到的輸入
      for (let j = 0; j < L[0].m; j++){ const dj = delta[j]; if (!dj) continue; gb[0][j] += dj; const off = j * NIN; for (let k = 0; k < 37; k++) if (den[k]) gw[0][off + k] += dj * den[k]; for (const k of act) gw[0][off + k] += dj; } }
    step++; const c1 = 1 - b1 ** step, c2 = 1 - b2 ** step;
    for (let k = 0; k < L.length; k++){ const l = L[k], Ad = adam[k];
      for (let q = 0; q < l.w.length; q++){ const g = gw[k][q] + l2 * l.w[q]; Ad.mw[q] = b1 * Ad.mw[q] + (1 - b1) * g; Ad.vw[q] = b2 * Ad.vw[q] + (1 - b2) * g * g; l.w[q] -= lr * (Ad.mw[q] / c1) / (Math.sqrt(Ad.vw[q] / c2) + 1e-8); }
      for (let q = 0; q < l.m; q++){ const g = gb[k][q]; Ad.mb[q] = b1 * Ad.mb[q] + (1 - b1) * g; Ad.vb[q] = b2 * Ad.vb[q] + (1 - b2) * g * g; l.b[q] -= lr * (Ad.mb[q] / c1) / (Math.sqrt(Ad.vb[q] / c2) + 1e-8); } }
  }
  const v = mse(val); console.log(`epoch ${ep + 1}  val R² ${(1 - v).toFixed(3)}`);
  if (v < best - 1e-4){ best = v; bad = 0; bestL = L.map(l => ({ n: l.n, m: l.m, w: Array.from(l.w, x => +x.toFixed(5)), b: Array.from(l.b, x => +x.toFixed(5)) })); } else if (++bad >= 6) break;
}
fs.writeFileSync(opt.out, JSON.stringify({ v: 2, layers: bestL, ym, ys, feat: NIN, samples: N }));
console.log(`存好 ${opt.out}（v2，${N} 筆，最佳 val R² ${(1 - best).toFixed(3)}）`);
