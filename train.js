// 訓練 La bot 評分網路（純 JS，Bun 直接跑）：特徵 → MLP(ReLU) → 之後的折扣攻擊
// 用法：bun train.js data/d0_*.json --out nn.json --hidden 32,16 --epochs 60
const fs = require('fs');
const argv = process.argv.slice(2), opt = { out: 'nn.json', hidden: '32,16', epochs: '60', lr: '0.001', l2: '0.0001', init: '' }, files = [];
for (let i = 0; i < argv.length; i++){ if (argv[i].startsWith('--')) opt[argv[i].slice(2)] = argv[++i]; else files.push(argv[i]); }
let X = [], Y = [];
for (const f of files){ const d = JSON.parse(fs.readFileSync(f, 'utf8')); X.push(...d.X); Y.push(...d.y); }
const N = Y.length, D = X[0].length; if (!N) throw new Error('沒有資料');
let ym = 0; for (const v of Y) ym += v; ym /= N; let ys = 0; for (const v of Y) ys += (v - ym) ** 2; ys = Math.sqrt(ys / N) + 1e-6;
const yn = Float32Array.from(Y, v => (v - ym) / ys), Xf = X.map(r => Float32Array.from(r));
let S = 12345; const rnd = () => { S ^= S << 13; S >>>= 0; S ^= S >>> 17; S ^= S << 5; S >>>= 0; return S / 4294967296; };
const gauss = () => Math.sqrt(-2 * Math.log(rnd() + 1e-12)) * Math.cos(2 * Math.PI * rnd());
const sizes = [D, ...opt.hidden.split(',').map(Number), 1];
let L = sizes.slice(1).map((m, k) => { const n = sizes[k], s = Math.sqrt(2 / n); return { n, m, w: Float32Array.from({ length: n * m }, () => gauss() * s), b: new Float32Array(m) }; });
if (opt.init){ const I = JSON.parse(fs.readFileSync(opt.init, 'utf8')); if (I.layers.length === L.length && I.layers.every((l, k) => l.n === L[k].n && l.m === L[k].m)){ L = I.layers.map(l => ({ n: l.n, m: l.m, w: Float32Array.from(l.w), b: Float32Array.from(l.b) })); console.log('從', opt.init, '接著練'); } }
const adam = L.map(l => ({ mw: new Float32Array(l.w.length), vw: new Float32Array(l.w.length), mb: new Float32Array(l.m), vb: new Float32Array(l.m) }));
const idx = Array.from({ length: N }, (_, i) => i); for (let i = N - 1; i > 0; i--){ const j = (rnd() * (i + 1)) | 0; [idx[i], idx[j]] = [idx[j], idx[i]]; }
const nVal = Math.floor(N * .1), val = idx.slice(0, nVal), tr = idx.slice(nVal);
function forward(x, acts){ let a = x; acts.push(a); for (let k = 0; k < L.length; k++){ const { n, m, w, b } = L[k], o = new Float32Array(m);
  for (let j = 0; j < m; j++){ let s = b[j]; const off = j * n; for (let i = 0; i < n; i++) s += w[off + i] * a[i]; o[j] = k < L.length - 1 ? (s > 0 ? s : 0) : s; } a = o; acts.push(a); } return a[0]; }
function mse(set){ let e = 0; for (const i of set){ const p = forward(Xf[i], []); e += (p - yn[i]) ** 2; } return e / set.length; }
const lr = +opt.lr, l2 = +opt.l2, B = 256, b1 = .9, b2 = .999; let step = 0, best = Infinity, bestL = null, bad = 0;
const varY = 1;
for (let ep = 0; ep < +opt.epochs; ep++){
  for (let i = tr.length - 1; i > 0; i--){ const j = (rnd() * (i + 1)) | 0; [tr[i], tr[j]] = [tr[j], tr[i]]; }
  for (let s0 = 0; s0 < tr.length; s0 += B){
    const gw = L.map(l => new Float32Array(l.w.length)), gb = L.map(l => new Float32Array(l.m)), bs = Math.min(B, tr.length - s0);
    for (let t = 0; t < bs; t++){ const i = tr[s0 + t], acts = []; const p = forward(Xf[i], acts); let delta = new Float32Array([2 * (p - yn[i]) / bs]);
      for (let k = L.length - 1; k >= 0; k--){ const { n, m, w } = L[k], a = acts[k], nd = new Float32Array(n);
        for (let j = 0; j < m; j++){ const dj = delta[j]; if (!dj) continue; gb[k][j] += dj; const off = j * n; for (let q = 0; q < n; q++){ gw[k][off + q] += dj * a[q]; nd[q] += dj * w[off + q]; } }
        if (k) for (let q = 0; q < n; q++) if (acts[k][q] <= 0) nd[q] = 0; delta = nd; } }
    step++; const c1 = 1 - b1 ** step, c2 = 1 - b2 ** step;
    for (let k = 0; k < L.length; k++){ const l = L[k], A = adam[k];
      for (let q = 0; q < l.w.length; q++){ const g = gw[k][q] + l2 * l.w[q]; A.mw[q] = b1 * A.mw[q] + (1 - b1) * g; A.vw[q] = b2 * A.vw[q] + (1 - b2) * g * g; l.w[q] -= lr * (A.mw[q] / c1) / (Math.sqrt(A.vw[q] / c2) + 1e-8); }
      for (let q = 0; q < l.m; q++){ const g = gb[k][q]; A.mb[q] = b1 * A.mb[q] + (1 - b1) * g; A.vb[q] = b2 * A.vb[q] + (1 - b2) * g * g; l.b[q] -= lr * (A.mb[q] / c1) / (Math.sqrt(A.vb[q] / c2) + 1e-8); } }
  }
  const v = mse(val); console.log(`epoch ${ep + 1}  val R² ${(1 - v / varY).toFixed(3)}`);
  if (v < best - 1e-4){ best = v; bad = 0; bestL = L.map(l => ({ n: l.n, m: l.m, w: Array.from(l.w, x => +x.toFixed(5)), b: Array.from(l.b, x => +x.toFixed(5)) })); } else if (++bad >= 8) break;
}
fs.writeFileSync(opt.out, JSON.stringify({ layers: bestL, ym, ys, feat: D, samples: N }));
console.log(`存好 ${opt.out}（${N} 筆，最佳 val R² ${(1 - best).toFixed(3)}）`);
