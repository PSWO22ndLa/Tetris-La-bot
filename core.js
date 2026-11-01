let W, BOT_H, SHAPES, KICK_JLSTZ, KICK_I_PLUS, KICK_180, BOT_VAL, CLIMB_CFG, LBW, LB_BOOK, LB_NN = null, LB_QX = true, LBT = null, PER = 8, LB_R = {}; const LB_ASCK = {}; const lbSx = t => LB_R.sx && LB_R.sx[t] != null ? LB_R.sx[t] : t === 'O' ? 4 : 3; let LB_DIRS = [1, 3, 2], LB_OSPIN = false; const LB_GW = 30, LB_GPOT = {"f_osgl":"O","f_odbl":"O","b_ostill":"O","c_oodbl":"O","b_o6":"O","f_szdbl":"SZ","d_szdbl2":"SZ","f_ljtrp":"LJ","d_ljtrp2":"LJ","e_tss":"T","e_tsd":"T","c_tst":"T","b_tsdup":"T","b_tsdcmb":"T","a_tsdedge":"T","c_mini4":"T","e_spin":"TSZLJ","d_spin0x3":"TSZLJ","b_spin3p":"TSZLJI","e_szspin":"SZ","c_szspin3":"SZ","c_szgarb":"SZ","a_szspin2x2":"SZ","e_ljspin":"LJ","b_ljspin3":"LJ","c_ljgarb":"LJ","a_ljspin2x2":"LJ","d_szlj2":"SZLJ","d_ispin":"I","a_ispin2":"I","h_ospin2x2":"O","f_quad":"I","b_quad4":"I","b_quad2row":"I","d_quadup":"I","d_quadcmb":"I","c_quad2col":"I","c_trp3":"IJLT"}, LB_TMPL = {"rv_tmini":[{"F":[1022,1008,1008,0],"E":[1,15,15,15]},{"F":[511,63,63,0],"E":[512,960,960,960]},{"F":[1016,1017,0,0],"E":[7,6,15,15]},{"F":[127,639,0,0],"E":[896,384,960,960]},{"F":[1021,1016,1017,0],"E":[2,7,6,15]},{"F":[767,127,639,0],"E":[256,896,384,960]}],"rv_tst":[{"F":[1019,1017,1019,8,12,0],"E":[4,6,4,7,3,15]},{"F":[895,639,895,64,192,0],"E":[128,384,128,896,768,960]}],"rv_tsdup":[{"F":[1019,1009,1019,8,12,0],"E":[4,14,4,7,3,15]},{"F":[895,575,895,64,192,0],"E":[128,448,128,896,768,960]}],"rv_tedge":[{"F":[255,255,511,96,608,0],"E":[768,768,512,896,384,992]},{"F":[1020,1020,1022,24,25,0],"E":[3,3,1,7,6,31]}],"rv_sz1":[{"F":[1009,1011,0],"E":[14,12,31]},{"F":[575,831,0],"E":[448,192,992]},{"F":[1017,1011,0],"E":[6,12,31]},{"F":[639,831,0],"E":[384,192,992]},{"F":[1017,1011,19],"E":[6,12,12]},{"F":[639,831,800],"E":[384,192,192]}],"rv_sz3":[{"F":[1019,1017,1021,8,0,0],"E":[4,6,2,7,15,15]},{"F":[895,639,767,64,0,0],"E":[128,384,256,896,960,960]},{"F":[1021,1017,1019,8,12,0],"E":[2,6,4,7,3,15]},{"F":[767,639,895,64,192,0],"E":[256,384,128,896,768,960]},{"F":[1021,1017,1019,8,8,12],"E":[2,6,4,7,7,3]},{"F":[767,639,895,64,64,192],"E":[256,384,128,896,896,768]}],"rv_szg":[{"F":[1019,993,993,3,0],"E":[4,30,30,28,31]},{"F":[895,543,543,768,0],"E":[128,480,480,224,992]},{"F":[1019,1000,1004,8,0],"E":[4,23,19,23,31]},{"F":[895,95,223,64,0],"E":[128,928,800,928,992]}],"rv_lj1":[{"F":[1009,1011,0],"E":[14,12,31]},{"F":[575,831,0],"E":[448,192,992]},{"F":[1021,993,3],"E":[2,30,28]},{"F":[767,543,768],"E":[256,480,224]},{"F":[1021,1009,24],"E":[2,14,7]},{"F":[767,575,96],"E":[256,448,896]}],"rv_lj3":[{"F":[1017,1019,1019,8,12,0],"E":[6,4,4,7,3,15]},{"F":[639,895,895,64,192,0],"E":[384,128,128,896,768,960]},{"F":[1017,1019,1019,8,8,12],"E":[6,4,4,7,7,3]},{"F":[639,895,895,64,64,192],"E":[384,128,128,896,896,768]}],"rv_ljg":[{"F":[1019,995,51,0],"E":[4,28,12,63]},{"F":[895,799,816,0],"E":[128,224,192,1008]},{"F":[1021,993,3,0],"E":[2,30,28,31]},{"F":[767,543,768,0],"E":[256,480,224,992]}],"rv_i1":[{"F":[993,35,32,32,0],"E":[30,28,31,31,63]},{"F":[543,784,16,16,0],"E":[480,224,992,992,1008]},{"F":[995,993,35,35],"E":[28,30,28,28]},{"F":[799,543,784,784],"E":[224,480,224,224]},{"F":[995,995,993,35],"E":[28,28,30,28]},{"F":[799,799,543,784],"E":[224,224,480,224]}],"rv_i2":[{"F":[1007,1007,992,992,48,0],"E":[16,16,31,31,15,63]},{"F":[991,991,31,31,48,0],"E":[32,32,992,992,960,1008]},{"F":[1007,1007,993,993,49,0],"E":[16,16,30,30,14,63]},{"F":[991,991,543,543,560,0],"E":[32,32,480,480,448,1008]},{"F":[1007,999,1007,993,49,1],"E":[16,24,16,30,14,62]},{"F":[991,927,991,543,560,512],"E":[32,96,32,480,448,496]}],"rv_sz2x2":[{"F":[1017,1017,1011,1011,0],"E":[6,6,12,12,31]},{"F":[639,639,831,831,0],"E":[384,384,192,192,992]},{"F":[1011,1017,1017,1011,0],"E":[12,6,6,12,31]},{"F":[831,639,639,831,0],"E":[192,384,384,192,992]}],"rv_lj2x2":[{"F":[1016,1022,1016,1022,0],"E":[7,1,7,1,15]},{"F":[127,511,127,511,0],"E":[896,512,896,512,960]},{"F":[1022,1016,1022,1016,1020,0],"E":[1,7,1,7,3,15]},{"F":[511,127,511,127,255,0],"E":[512,896,512,896,768,960]}],"rv_obox":[{"F":[3,1020,1020,7,0,0],"E":[0,3,3,0,3,3],"deep":1},{"F":[768,255,255,896,0,0],"E":[0,768,768,0,768,768],"deep":1}]}, LB_SETUPS = [{"k":"tst","F":[1019,1017,1019,120,60],"E":[4,6,4,7,3],"tot":34,"nT":1,"tst":true},{"k":"tst","F":[895,639,895,120,240],"E":[128,384,128,896,768],"tot":34,"nT":1,"tst":true},{"k":"tsttower","F":[1019,1017,1019,1019,1017,1019,8,12],"E":[4,6,4,4,6,4,23,19],"tot":55,"nT":2,"tst":true},{"k":"tsttower","F":[895,639,895,895,639,895,64,192],"E":[128,384,128,128,384,128,928,800],"tot":55,"nT":2,"tst":true},{"k":"stsd","F":[1017,1017,1019,1016,1020],"E":[6,6,4,7,3],"tot":40,"nT":1,"tst":false},{"k":"stsd","F":[639,639,895,127,255],"E":[384,384,128,896,768],"tot":40,"nT":1,"tst":false},{"k":"fractal","F":[1007,967,1007,967,12],"E":[16,56,16,56,242],"tot":34,"nT":2,"tst":false},{"k":"fractal","F":[991,911,991,911,192],"E":[32,112,32,112,316],"tot":34,"nT":2,"tst":false},{"k":"dtc","F":[1019,1019,1009,1017,1019,8,12],"E":[4,4,14,6,4,55,51],"tot":45,"nT":2,"tst":true},{"k":"dtc","F":[895,895,575,639,895,64,192],"E":[128,128,448,384,128,944,816],"tot":45,"nT":2,"tst":true},{"k":"kcrimson","F":[1017,1017,1019,1019,1017,1019,1016,12],"E":[6,6,4,4,6,4,7,19],"tot":60,"nT":3,"tst":true},{"k":"kcrimson","F":[639,639,895,895,639,895,127,192],"E":[384,384,128,128,384,128,896,800],"tot":60,"nT":3,"tst":true},{"k":"trinity_a","F":[1019,1009,1011,1011,1015,1009,25],"E":[4,14,12,12,8,14,38],"tot":51,"nT":3,"tst":false},{"k":"trinity_a","F":[895,575,831,831,959,575,608],"E":[128,448,192,192,64,448,400],"tot":51,"nT":3,"tst":false},{"k":"trinity_b","F":[1019,1009,1017,1017,1019,1016,12],"E":[4,14,6,6,4,7,51],"tot":50,"nT":3,"tst":false},{"k":"trinity_b","F":[895,575,639,639,895,127,192],"E":[128,448,384,384,128,896,816],"tot":50,"nT":3,"tst":false},{"k":"tsd","F":[1007,967,15],"E":[16,56,240],"tot":20,"nT":1,"tst":false},{"k":"tsd","F":[991,911,960],"E":[32,112,60],"tot":20,"nT":1,"tst":false},{"k":"tsd","F":[991,911,30],"E":[32,112,480],"tot":20,"nT":1,"tst":false},{"k":"tsd","F":[1007,967,480],"E":[16,56,30],"tot":20,"nT":1,"tst":false},{"k":"t3n","F":[1007,975,1007,8,24],"E":[16,48,16,244,228],"tot":29,"nT":1,"tst":true},{"k":"t3n","F":[991,975,991,64,96],"E":[32,48,32,188,156],"tot":29,"nT":1,"tst":true},{"k":"stsdsnake","F":[1011,1011,1015,1009,1017,1017,1021,1009,1011,1011,1015,1009,1017,1017,1021,1009,19,0],"E":[12,12,8,14,6,6,2,14,12,12,8,14,6,6,2,14,44,63],"tot":131,"nT":8,"tst":false},{"k":"stsdsnake","F":[831,831,959,575,639,639,767,575,831,831,959,575,639,639,767,575,800,0],"E":[192,192,64,448,384,384,256,448,192,192,64,448,384,384,256,448,208,1008],"tot":131,"nT":8,"tst":false},{"k":"tdouble","F":[1019,1021,1017,1021,1009,1011],"E":[4,2,6,2,14,12],"tot":50,"nT":2,"tst":true},{"k":"tdouble","F":[895,767,639,767,575,831],"E":[128,256,384,256,448,192],"tot":50,"nT":2,"tst":true},{"k":"tstdt","F":[1019,1019,1009,1017,1019,1019,1017,1019,1016,12],"E":[4,4,14,6,4,4,6,4,7,51],"tot":77,"nT":3,"tst":true},{"k":"tstdt","F":[895,895,575,639,895,895,639,895,127,192],"E":[128,128,448,384,128,128,384,128,896,816],"tot":77,"nT":3,"tst":true}], LB_MIDBOOK = [{"name":"STSD","n":5,"rows":[1020,1016,1019,1017,1017],"slots":[{"p":"J","rel":[20,21,30,40]},{"p":"Z","rel":[24,33,34,43]},{"p":"I","rel":[44,45,46,47]},{"p":"I","rel":[18,28,38,48]},{"p":"I","rel":[19,29,39,49]},{"p":"O","rel":[25,26,35,36]},{"p":"L","rel":[16,17,27,37]},{"p":"L","rel":[13,14,15,23]},{"p":"I","rel":[2,3,4,5]},{"p":"I","rel":[6,7,8,9]}]},{"name":"STSD·M","n":5,"rows":[255,127,895,639,639],"slots":[{"p":"I","rel":[40,41,42,43]},{"p":"I","rel":[14,24,34,44]},{"p":"O","rel":[35,36,45,46]},{"p":"L","rel":[28,29,39,49]},{"p":"J","rel":[20,30,31,32]},{"p":"L","rel":[12,13,23,33]},{"p":"Z","rel":[10,11,21,22]},{"p":"L","rel":[4,5,15,25]},{"p":"J","rel":[6,7,16,26]},{"p":"I","rel":[0,1,2,3]}]},{"name":"STSD·M","n":5,"rows":[255,127,895,639,639],"slots":[{"p":"I","rel":[40,41,42,43]},{"p":"I","rel":[14,24,34,44]},{"p":"O","rel":[35,36,45,46]},{"p":"L","rel":[28,29,39,49]},{"p":"J","rel":[20,30,31,32]},{"p":"L","rel":[12,13,23,33]},{"p":"Z","rel":[10,11,21,22]},{"p":"O","rel":[15,16,25,26]},{"p":"I","rel":[0,1,2,3]},{"p":"I","rel":[4,5,6,7]}]}], LB_GTMPL = {"h_ospin2x2":"rv_obox","c_tst":"rv_tst","b_tsdup":"rv_tsdup","a_tsdedge":"rv_tedge","c_szspin3":"rv_sz3","b_ljspin3":"rv_lj3","a_ispin2":"rv_i2","d_ispin":"rv_i1","a_szspin2x2":"rv_sz2x2","a_ljspin2x2":"rv_lj2x2","e_szspin":"rv_sz1","e_ljspin":"rv_lj1","c_mini4":"rv_tmini","c_szgarb":"rv_szg","c_ljgarb":"rv_ljg"}, LBW_G = {"holes":2.1513,"cover":1.0718,"bump":0.1877,"rowT":0.1989,"sum":0.0031,"danger":0.3214,"well":0.3118,"tsd":6.9221,"tst":20,"atk":3.904,"burn":3.0753,"b2b":1.689,"tspin":1.2767,"pc":4.2074,"chain":3,"b2bLv":0.3658}; function botFill(){}
const LB_SEEN = new Uint32Array(8192), LB_Q = new Int32Array(8192); let LB_GEN = 0; const LB_H = new Int32Array(32), LB_TOP = new Int32Array(32), LB_HH = new Int32Array(32), LB_TSTC = new Map(), LB_FH = new Int32Array(32), LB_FT = new Int32Array(32);
const lbOccB = (bb, x, y) => x < 0 || x >= W || y >= BOT_H || (y >= 0 && ((bb[y] >> x) & 1) === 1);
function lbAscK(dir){                                                 // 五／六連塊、突變塊：ASC-DX（±3 範圍近的先試，同 ascKicks）
  if (LB_ASCK[dir]) return LB_ASCK[dir];
  const L = [], sx = dir === 3 ? 1 : -1;
  for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) L.push([dx, dy]);
  L.sort((a, b) => (Math.abs(a[0]) + Math.abs(a[1])) - (Math.abs(b[0]) + Math.abs(b[1])) || (b[1] - a[1]) || (b[0] * sx - a[0] * sx));
  return (LB_ASCK[dir] = L);
}
function lbTables(only){
  if (!LBT) LBT = {};
  for (const t of only ? [only] : Object.keys(SHAPES)){
    if (LBT[t] || !SHAPES[t]) continue;
    LBT[t] = SHAPES[t].map(cells => { const by = {}; let mn = 99, mx = -99;
      for (const [cx, cy] of cells){ by[cy] = (by[cy] || 0) | (1 << cx); mn = Math.min(mn, cx); mx = Math.max(mx, cx); }
      return { rows: Object.keys(by).map(k => [+k, by[k]]), minX: mn, maxX: mx, cells }; });
  }
  return LBT;
}
function lbPop(v){ v = v - ((v >>> 1) & 0x55555555); v = (v & 0x33333333) + ((v >>> 2) & 0x33333333); return (((v + (v >>> 4)) & 0x0F0F0F0F) * 0x01010101) >>> 24; }
function lbToBits(bd){ const b = new Uint32Array(BOT_H); for (let y = 0; y < BOT_H; y++){ let r = 0; for (let x = 0; x < W; x++) if (bd[y * W + x]) r |= 1 << x; b[y] = r; } return b; }
function lbFitsB(bb, P, x, y){
  if (x + P.minX < 0 || x + P.maxX >= W) return false;
  const R = P.rows;
  for (let i = 0; i < R.length; i++){ const Y = y + R[i][0]; if (Y >= BOT_H) return false; if (Y >= 0 && (bb[Y] & (x >= 0 ? R[i][1] << x : R[i][1] >> -x))) return false; }
  return true;
}
function lbSpinB(bb, type, rot, x, y, kick){                        // 最後一步是旋轉時呼叫：2 = 正式 T-Spin、1 = Mini
  const P = LBT[type][rot];
  const imm = !lbFitsB(bb, P, x - 1, y) && !lbFitsB(bb, P, x + 1, y) && !lbFitsB(bb, P, x, y - 1);
  if (type === 'T'){
    const c = [lbOccB(bb, x, y), lbOccB(bb, x + 2, y), lbOccB(bb, x, y + 2), lbOccB(bb, x + 2, y + 2)];
    if (c[0] + c[1] + c[2] + c[3] >= 3){ const F = [[0,1],[1,3],[2,3],[0,2]][rot]; return (c[F[0]] && c[F[1]]) || kick === 4 ? 2 : 1; }
    return imm ? 1 : 0;
  }
  return imm ? 1 : 0;
}
function lbKicks(type, from, to){
  if (!'IJLOSTZ'.includes(type) || type.length > 1) return lbAscK((to - from) & 3);
  if (((to - from + 4) & 3) === 2) return KICK_180[`${from}${to}`] || [[0, 0]];
  return (type === 'I' ? KICK_I_PLUS : KICK_JLSTZ)[`${from}${to}`] || [[0, 0]];
}
function lbMovesB(bb, type){
  const T = lbTables(type)[type], sx = lbSx(type), out = new Map();
  if (!lbFitsB(bb, T[0], sx, 0)) return out;
  if (++LB_GEN >= 0xFFFFFFF0){ LB_SEEN.fill(0); LB_GEN = 1; }
  const g = LB_GEN; let qh = 0, qt = 0;
  // 狀態打包：((y+4)*32 + (x+4))*8 + rot*2 + 最後是否旋轉；佇列再 *8 + (kick+1)
  const push = (x, y, r, l, k) => { const s = (((y + 4) << 5) + x + 4) * 8 + r * 2 + l; if (LB_SEEN[s] === g) return; LB_SEEN[s] = g; LB_Q[qt++] = s * 8 + k + 1; };
  push(sx, 0, 0, 0, -1);
  while (qh < qt){
    const v = LB_Q[qh++], k = (v & 7) - 1, s = v >> 3, l = s & 1, r = (s >> 1) & 3, xy = s >> 3, x = (xy & 31) - 4, y = (xy >> 5) - 4, P = T[r];
    if (lbFitsB(bb, P, x - 1, y)) push(x - 1, y, r, 0, -1);
    if (lbFitsB(bb, P, x + 1, y)) push(x + 1, y, r, 0, -1);
    if (lbFitsB(bb, P, x, y + 1)) push(x, y + 1, r, 0, -1);
    else {
      const spin = l ? lbSpinB(bb, type, r, x, y, k) : 0;
      const c = P.cells.map(([cx, cy]) => (y + cy) * W + x + cx).sort((a, b) => a - b);
      const ck = c.length === 4 ? ((c[0] * 512 + c[1]) * 512 + c[2]) * 512 + c[3] : c.join(','), prev = out.get(ck);
      if (!prev || spin > prev.spin) out.set(ck, { type, rot: r, x, y, spin, cells: c });
    }
    if (type === 'O'){ if (LB_OSPIN && !l) push(x, y, (r + 1) & 3, 1, -1); continue; }   // Bleeding Hearts：O 原地「轉」一下也算旋轉（O-Spin）
    for (const d of LB_DIRS){
      const nr = (r + d) & 3, ks = lbKicks(type, r, nr), NP = T[nr];
      for (let i = 0; i < ks.length; i++){ const dx = ks[i][0], dy = ks[i][1]; if (lbFitsB(bb, NP, x + dx, y + dy)){ push(x + dx, y + dy, nr, 1, d === 2 ? -1 : i); break; } }
    }
  }
  return out;
}
function lbPlaceB(bb, m){
  const b = bb.slice(), P = LBT[m.type][m.rot];
  for (const [dy, mk] of P.rows){ const Y = m.y + dy; if (Y >= 0) b[Y] |= m.x >= 0 ? mk << m.x : mk >> -m.x; }
  const full = (1 << W) - 1; let n = 0, w = BOT_H - 1, lo = BOT_H, ys = 0;
  const pm = BOT_H - (LB_R.perm || 0); for (let y = BOT_H - 1; y >= 0; y--){ if (b[y] === full && y < pm){ n++; ys |= 1 << y; if (y < lo) lo = y; } else b[w--] = b[y]; }   // 最底 perm 行是永久行
  for (; w >= 0; w--) b[w] = 0;
  let pc = n > 0; if (pc) for (let y = 0; y < BOT_H; y++) if (b[y]){ pc = false; break; }
  return { b, n, pc, lo, ys };                                           // lo：消掉的最上面那一行（任務判定「上半部」用）
}
function comboAttack(atk, combo, mode = 'multiplier'){
  if (combo < 1) return atk;
  if (mode === 'multiplier'){ atk *= 1 + 0.25 * combo; if (combo > 1) atk = Math.max(Math.log1p(1 * combo * 1.25), atk); return atk; }
  const T = COMBO_TABLES[mode] || [0]; return atk + T[Math.max(0, Math.min(combo - 1, T.length - 1))];
}
function lbAttack(n, spin, st, pc, garb){                            // st：{ b2b, combo }，回傳攻擊並更新 st；LB_R.tl＝TETRA LEAGUE 規則（跟玩家同一套），否則 QP 規則
  const C = CLIMB_CFG;
  if (!n){ st.combo = -1; return 0; }
  st.combo++;
  const diff = spin > 0 || (n >= 4 && !LB_R.voidPlain);   // Warlock：非 spin 的 Quad 是 VOID，不接 B2B
  let atk = spin === 2 ? (C.spin[n] ?? 12 + 2 * (n - 5)) : spin === 1 ? (C.mini[n] ?? n) : (C.attack[n] ?? 5 + (n - 5));
  let surge = 0;
  if (diff){ if (st.b2b >= 0) atk += 1; st.b2b++; }
  // SURGE＝官方 charge（btb − 4 + base）：QP base 0 → B2B−3；TL base 3 → B2B 數本身；Warlock base 3
  else { if (st.b2b >= 4) surge = LB_R.warlock || LB_R.tl ? st.b2b : st.b2b - 3; st.b2b = -1; }
  atk = comboAttack(atk, st.combo, 'multiplier');                    // 官方 multiplier combo
  if (LB_R.tl && LB_R.gm > 1) atk *= LB_R.gm;                        // TL：garbage margin（3 分鐘後倍率上升），跟玩家一樣在取整前乘
  atk = Math.floor(atk + 1e-9);
  if (LB_R.tl && garb > 0 && (n >= 4 || spin === 2)) atk += 1;      // TL：garbage special bonus（清到垃圾的 Quad／完整 Spin +1）
  if (!LB_R.tl && !spin && n === 1 && st.combo <= 0) atk = C.qpSingle === false ? 0 : 1;   // QP 專屬：0 combo 的普通 Single 固定送 1（TL 沒有）
  if (pc){ if (LB_R.tl){ atk += 5; st.b2b += 1; } else { atk += 3; st.b2b += 2; } if (st.b2b >= 1) surge = 0; }   // All Clear：TL 5 行＋B2B+1、QP 3 行＋B2B+2（跟玩家同）
  return atk + surge;
}
function lbHolesB(b){
  const full = (1 << W) - 1; let seen = 0, holes = 0; LB_HH.fill(0);
  for (let y = 0; y < BOT_H; y++){ const r = b[y]; let nw = r & ~seen; while (nw){ const bit = nw & -nw, x = 31 - Math.clz32(bit); LB_HH[x] = BOT_H - y; nw ^= bit; } seen |= r; holes += lbPop(seen & ~r & full); }
  return holes;
}
function lbTsdB(b, h){
  let best = 0;
  for (let cx = 1; cx < W - 1; cx++){
    const top = BOT_H - Math.max(h[cx - 1], h[cx], h[cx + 1]);
    for (let cy = Math.max(1, top - 2); cy < BOT_H - 1 && cy <= top + 3; cy++){
      if ((b[cy] >> (cx - 1)) & 7 || (b[cy + 1] >> cx) & 1) continue;
      if (!lbOccB(b, cx - 1, cy + 1) || !lbOccB(b, cx + 1, cy + 1)) continue;
      if (!lbOccB(b, cx - 1, cy - 1) && !lbOccB(b, cx + 1, cy - 1)) continue;
      const e1 = W - lbPop(b[cy]), e2 = W - lbPop(b[cy + 1]);
      if (e1 === 3 && e2 === 1) return 2; else if (e2 === 1) best = 1;
    }
  }
  return best;
}
function lbTstB(b){
  const full = (1 << W) - 1;
  // 快速排除（實測這個函式佔搜尋 ~27%）：TST 要三行連續都幾乎滿（每行最多缺 2 格），而且要有屋簷（被蓋住的空格）
  let ok = false, seen = 0, cov = false;
  for (let y = 0; y < BOT_H; y++){ if (seen & ~b[y] & full) cov = true; seen |= b[y]; }
  if (!cov) return 0;
  for (let y = 0; y + 2 < BOT_H && !ok; y++) if (lbPop(b[y]) >= W - 2 && lbPop(b[y + 1]) >= W - 2 && lbPop(b[y + 2]) >= W - 2) ok = true;
  if (!ok) return 0;
  for (const rot of [1, 3]){
    const P = LBT.T[rot];
    for (let x = -1; x < W - 1; x++){
      let y = -2; while (y < BOT_H && lbFitsB(b, P, x, y + 1)) y++;   // 直接掉下去會停的位置以下才可能是洞
      for (let yy = y + 1; yy < BOT_H - 2; yy++){
        if (!lbFitsB(b, P, x, yy) || lbFitsB(b, P, x, yy + 1)) continue;
        if (lbOccB(b, x, yy) + lbOccB(b, x + 2, yy) + lbOccB(b, x, yy + 2) + lbOccB(b, x + 2, yy + 2) < 3) continue;
        let n = 0;
        for (const [dy, mk] of P.rows){ const r = b[yy + dy] | (x >= 0 ? mk << x : mk >> -x); if (r === full) n++; }
        if (n !== 3) continue;
        // 形狀對了才真的跑一次 T 的落點搜尋，確認走得進去而且是正式 T-Spin。實測這裡佔了搜尋時間的 1/4（TST 洞會一路留在後代盤面上）→ 用盤面當 key 快取
        let key = rot + ':' + x + ':' + yy; for (let r = 0; r < BOT_H; r++) key += ',' + b[r];   // 整個盤面（上面的屋簷也會擋路）
        let hit = LB_TSTC.get(key);
        if (hit === undefined){ hit = 0; for (const m of lbMovesB(b, 'T').values()) if (m.rot === rot && m.x === x && m.y === yy && m.spin === 2){ hit = 1; break; } if (LB_TSTC.size > 20000) LB_TSTC.clear(); LB_TSTC.set(key, hit); }
        if (hit) return 1;
      }
    }
  }
  return 0;
}
function lbTstPotB(b){
  const full = (1 << W) - 1; let best = 0;
  for (let y = 1; y + 2 < BOT_H; y++){
    const r0 = b[y], r1 = b[y + 1], r2 = b[y + 2]; if (!r2) continue;
    for (let c = 1; c < W - 1; c++){
      const bc = 1 << c; if ((r0 | r1 | r2 | b[y - 1]) & bc) continue;          // 槽那一欄要空、上方要能進
      for (const sd of [-1, 1]){
        const cs = c + sd, cw = c - sd, bs = 1 << cs, bw = cw >= 0 && cw < W ? 1 << cw : 0;
        if ((r1 & bs) || !(r0 & bs) || !(r2 & bs)) continue;                    // 側邊缺口在中間那行，上下要有東西夾住
        if (bw && (!(r0 & bw) || !(r1 & bw) || !(r2 & bw))) continue;          // 另一邊是牆
        const m0 = full & ~bc, m1 = full & ~bc & ~bs, m2 = m0;
        const f = (lbPop(r0 & m0) + lbPop(r1 & m1) + lbPop(r2 & m2)) / (lbPop(m0) + lbPop(m1) + lbPop(m2));
        if (f >= 0.7 && f * f > best) best = f * f;
      }
    }
  }
  return best;
}
function lbEvalB(b){
  const full = (1 << W) - 1, h = LB_H, topY = LB_TOP, wall = (1 << (W + 1)) | 1, tm = (1 << (W + 1)) - 1;
  h.fill(0); let seen = 0, holes = 0, cover = 0, rowT = 0;
  for (let y = 0; y < BOT_H; y++){
    const r = b[y];
    let nw = r & ~seen;
    while (nw){ const bit = nw & -nw, x = 31 - Math.clz32(bit); h[x] = BOT_H - y; topY[x] = y; nw ^= bit; }
    seen |= r;
    let hl = seen & ~r & full;
    while (hl){ const bit = hl & -hl, x = 31 - Math.clz32(bit); holes++; cover += Math.min(4, y - topY[x]); hl ^= bit; }
    const v = (r << 1) | wall; rowT += lbPop((v ^ (v >> 1)) & tm);
  }
  let bump = 0, maxH = 0, sum = 0; for (let x = 0; x < W; x++){ maxH = Math.max(maxH, h[x]); sum += h[x]; if (x) bump += Math.abs(h[x] - h[x - 1]); }
  let wx = 0; for (let x = 0; x < W; x++) if (h[x] < h[wx]) wx = x;
  const l = wx ? h[wx - 1] : 99, r = wx < W - 1 ? h[wx + 1] : 99, well = Math.min(4, Math.min(l, r) - h[wx]);
  bump -= Math.min(l === 99 ? r : l, r === 99 ? l : r) - h[wx];      // 井本身不算凹凸
  const danger = Math.max(0, maxH + (LB_R.hpad || 0) + (LB_R.pend || 0) - 10), w = LBW;   // pend：排隊中的垃圾，進場就會把盤面推高
  // 井在倒數第二欄、最外側那欄卻比井高（一根柱子）：之後消行會把柱子切成一段一段的懸空格，只能單消慢慢挖、必斷 B2B（使用者截圖）
  const px = wx === 1 ? 0 : wx === W - 2 ? W - 1 : -1, pillar = px >= 0 ? Math.max(0, Math.min(6, h[px] - h[wx])) : 0;
  // 第二口（以上）深井：主井以外的欄若比兩側都低 ≥3 格，只能靠 I 填、常常兩條溝一起長高把自己疊死（使用者回報）→ 依深度平方扣分；權重 8 是所有項目裡最重的（使用者：最不該疊出這種東西）
  let well2 = 0; for (let x = 0; x < W; x++){ if (x === wx) continue; const d = Math.min(x ? h[x - 1] : 99, x < W - 1 ? h[x + 1] : 99) - h[x]; if (d >= 3) well2 += (d - 2) * (d - 2); }
  return -w.holes * holes - w.cover * cover - w.bump * bump - w.rowT * rowT - w.sum * sum - w.danger * danger * danger - (w.pillar || 0) * pillar - (w.well2 || 0) * well2
    + (danger < 4 ? w.well * well : 0) + (danger < 3 ? w.tsd * lbTsdB(b, h) : 0) + (danger < 4 && w.tst ? w.tst * lbTstB(b) : 0) + (danger < 3 && w.tstPot ? w.tstPot * lbTstPotB(b) : 0);
}
function lbFeatB(b, st){
  const full = (1 << W) - 1, h = LB_FH, topY = LB_FT, wall = (1 << (W + 1)) | 1, tm = (1 << (W + 1)) - 1;
  h.fill(0); let seen = 0, holes = 0, cover = 0, rowT = 0, holeRows = 0;
  for (let y = 0; y < BOT_H; y++){
    const r = b[y]; let nw = r & ~seen;
    while (nw){ const bit = nw & -nw, x = 31 - Math.clz32(bit); h[x] = BOT_H - y; topY[x] = y; nw ^= bit; }
    seen |= r;
    let hl = seen & ~r & full; if (hl) holeRows++;
    while (hl){ const bit = hl & -hl, x = 31 - Math.clz32(bit); holes++; cover += Math.min(4, y - topY[x]); hl ^= bit; }
    const v = (r << 1) | wall; rowT += lbPop((v ^ (v >> 1)) & tm);
  }
  let colT = 0; for (let y = 1; y < BOT_H; y++) colT += lbPop((b[y] ^ b[y - 1]) & full);
  let bump = 0, maxH = 0; for (let x = 0; x < W; x++){ maxH = Math.max(maxH, h[x]); if (x) bump += Math.abs(h[x] - h[x - 1]); }
  let wx = 0; for (let x = 0; x < W; x++) if (h[x] < h[wx]) wx = x;
  const l = wx ? h[wx - 1] : 99, r = wx < W - 1 ? h[wx + 1] : 99, well = Math.min(6, Math.min(l, r) - h[wx]);
  let well2 = 0; for (let x = 0; x < W; x++){ if (x === wx) continue; const d = Math.min(x ? h[x - 1] : 99, x < W - 1 ? h[x + 1] : 99) - h[x]; if (d >= 3) well2 += d - 2; }
  const pend = LB_R.pend || 0, hp = LB_R.hpad || 0, b2 = st ? st.b2b : -1, cb = st ? st.combo : -1;
  const f = new Float32Array(30);
  for (let x = 0; x < W && x < 10; x++) f[x] = h[x] / 20;
  f[10] = holes / 10; f[11] = cover / 20; f[12] = rowT / 40; f[13] = colT / 40; f[14] = bump / 30; f[15] = maxH / 20;
  f[16] = well / 6; f[17] = well2 / 10; f[18] = lbTsdB(b, h) / 2; f[19] = lbTstB(b); f[20] = holeRows / 10;
  f[21] = Math.max(0, b2) / 10; f[22] = b2 >= 0 ? 1 : 0; f[23] = Math.max(0, cb) / 10; f[24] = pend / 12; f[25] = hp / 10;
  f[26] = Math.max(0, maxH + hp + pend - 10) / 10; f[27] = wx / 9; f[28] = Math.min(maxH + hp + pend, 24) >= 18 ? 1 : 0; f[29] = 1;
  return f;
}
function lbNNv(f){                                                  // MLP：relu 隱藏層 ×2
  const N = LB_NN, L = N.layers; let a = f;
  for (let li = 0; li < L.length; li++){
    const { w, b, n, m } = L[li], o = new Float32Array(m);
    for (let j = 0; j < m; j++){ let s = b[j]; const off = j * n; for (let i = 0; i < n; i++) s += w[off + i] * a[i]; o[j] = li < L.length - 1 ? (s > 0 ? s : 0) : s; }
    a = o;
  }
  return a[0] * (N.ys || 1) + (N.ym || 0);
}
function LB_NN_LEAF(b, st){
  const v = lbNNv(lbFeatB(b, st)) * LBW.atk;
  if (LB_NN.pure) return v;
  return lbEvalB(b) + (LBW.chain || 0) * Math.max(0, st.b2b - 3) + (LB_NN.mix || 1) * v;
}
function lbSetupAnchor(b, prefer){
  if (!LB_SETUPS || !LB_SETUPS.length) return null;
  let best = null;
  for (const T of LB_SETUPS){
    const n = T.F.length;
    for (let k = 0; k <= 8; k++){
      const base = BOT_H - 1 - k; if (base - n + 1 < 5) break;
      if (k && lbPop(b[base + 1]) < W - 3) continue;                  // 結構底下要有（幾乎）滿的行撐著
      let f = 0, v = 0;
      for (let i = 0; i < n; i++){ const r = b[base - i]; f += lbPop(r & T.F[i]); v += lbPop(r & T.E[i]); if (v) break; }
      if (v) continue;
      let above = 0; for (let y = base - n; y >= Math.max(0, base - n - 3); y--) above |= b[y]; if (above) continue;   // 結構上面不能已經有東西壓著
      const fr = f / T.tot; if (fr < 0.45) continue;                  // 至少要已經有快一半：看到「蓋得出來的形狀」才開始
      const sc = fr + (T.k === prefer ? 0.08 : 0) + (T.tst ? 0.03 : 0) - k * 0.01;
      if (!best || sc > best.sc){ const Fa = new Uint32Array(BOT_H), Ea = new Uint32Array(BOT_H); for (let i = 0; i < n; i++){ Fa[base - i] = T.F[i]; Ea[base - i] = T.E[i]; }
        best = { sc, Fa, Ea, k: T.k, done: f === T.tot }; }
    }
  }
  return best;
}
function lbSetupPlan(o){
  if (!LB_SETUPS || !LB_SETUPS.length) return null;
  const b0 = lbToBits(o.bd), full = (1 << W) - 1;
  const cand = [];
  for (const T of LB_SETUPS){
    const n = T.F.length;
    for (let k = 0; k <= 8; k++){
      const base = BOT_H - 1 - k; if (base - n + 1 < 5) break;
      if (k && lbPop(b0[base + 1]) < W - 3) continue;
      let v = 0, miss = 0; const need = new Uint32Array(BOT_H), avoid = new Uint32Array(BOT_H);
      for (let i = 0; i < n; i++){ const r = b0[base - i]; v += lbPop(r & T.E[i]); need[base - i] = T.F[i] & ~r; avoid[base - i] = T.E[i]; miss += lbPop(need[base - i]); }
      if (v || miss % 4 || miss > 36) continue;
      let above = 0; for (let y = base - n; y >= Math.max(0, base - n - 3); y--) above |= b0[y]; if (above) continue;
      cand.push({ T, need, avoid, miss, k });
    }
  }
  if (!cand.length) return null;
  cand.sort((a, c) => ((a.T.k === o.setupKey ? -8 : 0) + a.miss) - ((c.T.k === o.setupKey ? -8 : 0) + c.miss) || (c.T.tst - a.T.tst) || (a.k - c.k));
  const tInQ = (hold, q) => (hold === 'T' ? 1 : 0) + q.filter(t => t === 'T').length;
  for (const C of cand.slice(0, 12)){
    if (C.miss === 0) continue;                                      // 已經蓋好：交給搜尋打 T-Spin
    const pcs = C.miss / 4;
    // DFS：每一步可以放目前這顆或 HOLD 那顆；放的格子必須全在 need 裡
    const dfs = (bb, need, hold, q, left, first) => {
      if (!left) return tInQ(hold, q) >= C.T.nT ? first : null;     // 蓋完之後手上／NEXT 還要有足夠的 T
      if (!q.length) return null;
      const opts = [{ use: q[0], hold, q: q.slice(1), held: false }];
      if (hold !== q[0]) opts.push(hold ? { use: hold, hold: q[0], q: q.slice(1), held: true } : { use: q[1], hold: q[0], q: q.slice(2), held: true });
      for (const op of opts){
        if (!op.use || (op.use === 'T' && tInQ(op.hold, op.q) < C.T.nT)) continue;   // T 留著打 spin
        for (const m of lbMovesB(bb, op.use).values()){
          let ok = true; for (const kk of m.cells){ const y = (kk / W) | 0, x = kk % W; if (y < 0 || !(need[y] >> x & 1)){ ok = false; break; } }
          if (!ok) continue;
          const nb = bb.slice(), nn = need.slice(); for (const kk of m.cells){ const y = (kk / W) | 0, x = kk % W; nb[y] |= 1 << x; nn[y] &= ~(1 << x); }
          let fullRow = false; for (let y = 0; y < BOT_H; y++) if (nb[y] === full){ fullRow = true; break; }
          if (fullRow) continue;                                     // 蓋的過程不能先消行（會把結構拆掉）
          let hang = false; for (const kk of m.cells){ const y = (kk / W) | 0, x = kk % W; if (y + 1 < BOT_H && !(nb[y + 1] >> x & 1) && !(C.avoid[y + 1] >> x & 1) && !(nn[y + 1] >> x & 1)){ hang = true; break; } }
          if (hang) continue;
          const r = dfs(nb, nn, op.hold, op.q, left - 1, first || { m, held: op.held, atk: 0, setup: C.T.k + ':plan' });
          if (r) return r;
        }
      }
      return null;
    };
    if (pcs <= 5){ const r = dfs(b0, C.need, o.hold || null, o.q.slice(), pcs, null); if (r) return r; }
  }
  // 一次補不完：先放一顆「整顆都落在結構要填的格子裡」的（越低越好），剩下的格子還要拼得起來（每塊相連的缺口都是 4 的倍數）
  const comps = need => { const seen = new Uint32Array(BOT_H); for (let y = 0; y < BOT_H; y++) for (let x = 0; x < W; x++){ if (!(need[y] >> x & 1) || seen[y] >> x & 1) continue;
      let n = 0; const st = [[x, y]]; seen[y] |= 1 << x;
      while (st.length){ const [cx, cy] = st.pop(); n++; for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]){ const nx = cx + dx, ny = cy + dy; if (nx < 0 || nx >= W || ny < 0 || ny >= BOT_H) continue; if ((need[ny] >> nx & 1) && !(seen[ny] >> nx & 1)){ seen[ny] |= 1 << nx; st.push([nx, ny]); } } }
      if (n % 4) return false; } return true; };
  let best = null;
  for (const C of cand.slice(0, 6)){
    if (!C.miss) continue;
    const hold = o.hold || null, q = o.q;
    const opts = [{ use: q[0], held: false, rest: [hold, ...q.slice(1)] }];
    if (hold !== q[0]) opts.push(hold ? { use: hold, held: true, rest: [q[0], ...q.slice(1)] } : { use: q[1], held: true, rest: [q[0], ...q.slice(2)] });
    for (const op of opts){
      if (!op.use || (op.use === 'T' && op.rest.filter(t => t === 'T').length < C.T.nT)) continue;
      for (const m of lbMovesB(b0, op.use).values()){
        let ok = true, ys = 0; for (const kk of m.cells){ const y = (kk / W) | 0, x = kk % W; if (y < 0 || !(C.need[y] >> x & 1)){ ok = false; break; } ys += y; }
        if (!ok) continue;
        const nb = b0.slice(), nn = C.need.slice(); for (const kk of m.cells){ const y = (kk / W) | 0, x = kk % W; nb[y] |= 1 << x; nn[y] &= ~(1 << x); }
        let fr = false; for (let y = 0; y < BOT_H; y++) if (nb[y] === full){ fr = true; break; } if (fr) continue;
        let hang = false; for (const kk of m.cells){ const y = (kk / W) | 0, x = kk % W; if (y + 1 < BOT_H && !(nb[y + 1] >> x & 1) && !(C.avoid[y + 1] >> x & 1)){ hang = true; break; } }
        if (hang) continue;                                          // 由下往上蓋：底下不能懸空（只有結構本身的洞可以空著）
        if (!comps(nn)) continue;
        const sc = ys - C.miss * 2 + (C.T.k === o.setupKey ? 20 : 0) + (C.T.tst ? 4 : 0);
        if (!best || sc > best.sc) best = { sc, d: { m, held: op.held, atk: 0, setup: C.T.k + ':build' } };
      }
    }
  }
  return best ? best.d : null;
}
function lbMidBookMove(o){
  if (!LB_MIDBOOK || !LB_MIDBOOK.length || W !== 10) return null;
  const bd = o.bd, bb0 = lbToBits(bd), live = [];
  for (const E of LB_MIDBOOK){
    for (let k = 0; k <= 10; k++){
      const base = BOT_H - 1 - k, top = base - E.n + 1; if (top < 5) break;
      let ok = true;
      for (let i = 0; i < E.n && ok; i++) if (bb0[top + i] & ~E.rows[i]) ok = false;   // 結構那幾行：盤面上的格子都要是結構的
      if (!ok) continue;
      for (let y = Math.max(0, top - 3); y < top; y++) if (bb0[y]){ ok = false; break; }   // 上面不能有東西
      if (!ok) continue;
      let filled = 0, left = 0, have = 0;
      const slots = E.slots.map((s, i) => { const cells = s.rel.map(q => q + top * W).sort((a, b) => a - b), c = cells;
        const nIn = cells.reduce((a, q) => a + (bd[q] ? 1 : 0), 0); if (nIn === 4){ filled |= 1 << i; have++; } else if (nIn) ok = false; else left++;
        return { p: s.p, cells, ck: ((c[0] * 512 + c[1]) * 512 + c[2]) * 512 + c[3] }; });
      if (!ok || !left) continue;
      live.push({ bk: { name: E.name, slots }, filled, left, have, k });
    }
  }
  if (!live.length) return null;
  const q = o.q;
  const dfs = (bk, bb, filled, hold, qi, depth) => {
    if (qi >= q.length || depth > 6) return { n: 0 };
    let best = { n: 0 };
    const tryUse = (use, nh, nq, held) => {
      if (!use || use === 'T') return;                               // T 留著打 spin
      const mv = lbMovesB(bb, use);
      bk.slots.forEach((s, i) => {
        if (filled & (1 << i) || s.p !== use) return;
        const m = mv.get(s.ck); if (!m || m.spin) return;
        const pb = lbPlaceB(bb, m); if (pb.n) return;                 // 蓋的過程不能先消行
        const r = dfs(bk, pb.b, filled | (1 << i), nh, nq, depth + 1);
        if (r.n + 1 > best.n) best = { n: r.n + 1, m, held };
      });
    };
    tryUse(q[qi], hold, qi + 1, false);
    if (hold){ if (hold !== q[qi]) tryUse(hold, q[qi], qi + 1, true); }
    else tryUse(q[qi + 1], q[qi], qi + 2, true);
    return best;
  };
  let pick = null;
  for (const L of live){
    const r = dfs(L.bk, bb0, L.filled, o.hold || null, 0, 0);
    if (!r.n) continue;
    if (!L.have && r.n < Math.min(3, L.left)) continue;             // 還沒開始蓋的：眼前這串至少要能放 3 顆才開工
    const cont = o.book === L.bk.name ? 50 : 0;                       // 正在蓋的優先
    const sc = cont + (r.n >= L.left ? 30 : 0) + L.have * 3 + r.n * 2 - L.k * 0.5 + Math.random() * 0.5;
    if (!pick || sc > pick.sc) pick = { sc, r, name: L.bk.name };
  }
  if (!pick) return null;
  return { m: pick.r.m, held: pick.r.held, atk: 0, book: pick.name };
}
function rootTop0(bd){ let t = 0; while (t < BOT_H && !bd.subarray(t * W, t * W + W).some(v => v)) t++; return t; }
function lbPcMove(o, color){
  if (W !== 10) return null;
  lbTables();
  let bb0 = lbToBits(o.bd), gN = 0; const q = o.q; let hgt = 0, cnt = 0;
  const keepB2B = !LB_R.noB2B && (o.b2b ?? -1) >= 0;                 // B2B 連著的時候：只接受「每次消行都是 Quad／Spin」的 PC（B2B 比 PC 重要）
  if (color){                                                        // Color Clear：把底下的垃圾行當地板，上面清空就算
    for (let y = BOT_H - 1; y >= 0; y--){ let g = false; for (let x = 0; x < W; x++) if (o.bd[y * W + x] === 8){ g = true; break; } if (g) gN++; else break; }
    if (gN){ const v = new Uint32Array(BOT_H); for (let y = 0; y < BOT_H - gN; y++) v[y + gN] = bb0[y]; bb0 = v; }
  }
  for (let y = 0; y < BOT_H; y++) if (bb0[y]){ hgt = Math.max(hgt, BOT_H - y); cnt += lbPop(bb0[y]); }
  if (!cnt || hgt > 4) return null;
  const full = (1 << W) - 1; let budget = 2500;
  // 空格分區：每一塊相連的空格數都要是 4 的倍數，不然不可能填滿
  const okRegions = (b, Hc) => {
    const top = BOT_H - Hc, seen = new Uint8Array(Hc * W);
    for (let i = 0; i < Hc * W; i++){
      const y0 = (i / W) | 0, x0 = i % W;
      if (seen[i] || (b[top + y0] >> x0) & 1) continue;
      let n = 0; const st = [i]; seen[i] = 1;
      while (st.length){ const c = st.pop(), y = (c / W) | 0, x = c % W; n++;
        for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]){
          if (nx < 0 || nx >= W || ny < 0 || ny >= Hc) continue; const k = ny * W + nx;
          if (seen[k] || (b[top + ny] >> nx) & 1) continue; seen[k] = 1; st.push(k); } }
      if (n % 4) return false;
    }
    return true;
  };
  const memo = new Set();
  const dfs = (b, hold, qi, Hc) => {
    if (Hc === 0) return { ok: true };
    if (--budget < 0 || qi >= q.length) return null;
    let key = hold + qi + ':' + Hc; for (let y = BOT_H - Hc; y < BOT_H; y++) key += ',' + b[y];
    if (memo.has(key)) return null; memo.add(key);
    const opts = [[q[qi], hold, qi + 1, false]];
    if (hold){ if (hold !== q[qi]) opts.push([hold, q[qi], qi + 1, true]); }
    else if (qi + 1 < q.length) opts.push([q[qi + 1], q[qi], qi + 2, true]);
    const top = BOT_H - Hc;
    for (const [use, nh, nq, held] of opts){
      for (const m of lbMovesB(b, use).values()){
        if (m.cells[0] < top * W) continue;                          // 超出 PC 範圍
        const r = lbPlaceB(b, m), H2 = Hc - r.n;
        if (keepB2B && r.n > 0 && r.n < 4 && !m.spin) continue;        // 普通消行會斷 B2B：這條 PC 路線不要
        if (H2 && !okRegions(r.b, H2)) continue;
        if (r.n && H2){ let bad = false; for (let y = 0; y < BOT_H - H2; y++) if (r.b[y]){ bad = true; break; } if (bad) continue; }
        const res = dfs(r.b, nh, nq, H2);
        if (res) return { ok: true, m, held };
      }
    }
    return null;
  };
  const avail = q.length + (o.hold ? 1 : 0);
  for (let H = hgt; H <= 4; H++){
    const need = H * W - cnt; if (need % 4 || need / 4 > avail - 1) continue;
    if (!okRegions(bb0, H)) continue;
    const r = dfs(bb0, o.hold || null, 0, H);
    if (r && r.m){
      if (!gN) return { m: r.m, held: r.held, atk: 0, pc: true };
      const cells = r.m.cells.map(k => k - gN * W);                  // 從虛擬盤面換回真盤面
      return { m: { ...r.m, y: r.m.y - gN, cells }, held: r.held, atk: 0, pc: true };
    }
  }
  return null;
}
function lbBookMove(o){
  if (!LB_BOOK || W !== 10) return null;
  const bd = o.bd, q = o.q, live = [];
  for (const bk of LB_BOOK){
    let ok = true;
    for (let i = 0; i < bd.length && ok; i++) if (bd[i] && bd[i] !== bk.cellT[i]) ok = false;
    if (!ok) continue;
    let filled = 0, left = 0;
    bk.slots.forEach((s, i) => { const n = s.cells.reduce((a, c) => a + (bd[c] ? 1 : 0), 0); if (n === 4) filled |= 1 << i; else if (n) ok = false; else left++; });
    if (ok && left) live.push({ bk, filled, left });
  }
  if (!live.length) return null;
  const bb0 = lbToBits(bd);
  const dfs = (bk, bb, filled, hold, qi, depth) => {
    if (qi >= q.length || depth > 7) return { n: 0 };
    let best = { n: 0 };
    const tryUse = (use, nh, nq, held) => {
      if (!use) return;
      const mv = lbMovesB(bb, use);
      bk.slots.forEach((s, i) => {
        if (filled & (1 << i) || s.p !== use) return;
        const m = mv.get(s.ck); if (!m) return;
        const r = dfs(bk, lbPlaceB(bb, m).b, filled | (1 << i), nh, nq, depth + 1);
        if (r.n + 1 > best.n) best = { n: r.n + 1, m, held };
      });
    };
    tryUse(q[qi], hold, qi + 1, false);
    if (hold) { if (hold !== q[qi]) tryUse(hold, q[qi], qi + 1, true); }
    else tryUse(q[qi + 1], q[qi], qi + 2, true);
    return best;
  };
  let pick = null;
  for (const L of live){
    const r = dfs(L.bk, bb0, L.filled, o.hold || null, 0, 0);
    if (!r.n) continue;
    const full = r.n >= L.left ? 1 : 0;                              // 眼前這串就蓋得完的優先，其次放得越多越好
    const sc = full * 100 + r.n + Math.random() * 0.5;
    if (!pick || sc > pick.sc) pick = { sc, r, name: L.bk.name };
  }
  if (!pick) return null;
  return { m: pick.r.m, held: pick.r.held, atk: 0, book: pick.name };
}
function lbGoalRew(G, c){
  const n = c.n, t = c.type, sp = c.spin, T2 = sp === 2 && t === 'T', any = sp > 0, has = (set) => set.includes(t);
  const hit = v => LB_GW * v, miss = v => -LB_GW * v;
  switch (G.id){
    case 'f_combo3': case 'e_combo5': case 'a_combo7': {
      const need = G.id === 'a_combo7' ? 8 : G.id === 'e_combo5' ? 6 : 4;
      if (n && c.combo0 < 0 && c.pot < need - 1) return miss(0.4 * n);         // 井還不夠深就先別開始 combo
      return n ? hit(0.4 * (c.combo + 1)) : (c.combo0 >= 0 ? miss(0.6) : 0);
    }
    case 'd_cmb3nh': return (n ? hit(0.4 * (c.combo + 1)) : 0) + (c.held ? miss(1) : 0);
    case 'f_dbl2': case 'd_dbl4': return n === 2 ? hit(1) : 0;
    case 'f_quad': case 'b_quad4': return n >= 4 ? hit(1) : 0;
    case 'b_quad2row': return n >= 4 ? hit(1) : n ? miss(1) : 0;
    case 'f_lines6': case 'a_lines40': return hit(0.5 * n);
    case 'f_osgl': return t === 'O' && n === 1 ? hit(1) : 0;
    case 'f_odbl': return t === 'O' && n === 2 ? hit(1) : 0;
    case 'f_szdbl': case 'd_szdbl2': return has('SZ') && n === 2 ? hit(1) : 0;
    case 'f_ljtrp': case 'd_ljtrp2': return has('LJ') && n === 3 ? hit(1) : 0;
    case 'f_holdi': return (c.holdT === 'I' ? hit(0.5 * n) + hit(0.1) : 0);
    case 'f_hold8': return c.held ? hit(0.5) : 0;
    case 'c_hold12': return c.held ? hit(0.5) : miss(2);
    case 'c_nohold25': return c.held ? miss(2) : 0;
    case 'f_sgl2': return n === 1 ? hit(1) : n > 1 ? miss(1) : 0;
    case 'e_spin': return any ? hit(1) : 0;
    case 'e_tss': return T2 && n === 1 ? hit(1) : 0;
    case 'e_tsd': return T2 && n === 2 ? hit(1) : 0;
    case 'c_tst': return T2 && n === 3 ? hit(1) : 0;
    case 'e_szspin': return any && has('SZ') && n ? hit(1) : 0;
    case 'e_ljspin': return any && has('LJ') && n ? hit(1) : 0;
    case 'e_hi': return t === 'I' && !(c.rot & 1) ? hit(0.5 * n) : 0;
    case 'e_send6': case 'c_send14': return hit(0.25 * c.atk);
    case 'e_oo': return t === 'O' ? (c.prevT === 'O' ? hit(2) : hit(0.3)) : (c.holdT === 'O' ? hit(0.15) : 0);
    case 'e_sgl6': return n === 1 && c.combo === 0 ? hit(1) : n ? miss(0.3) : 0;
    case 'd_still3': case 'b_still5': return c.plain ? hit(0.6) : miss(1);
    case 'd_noclr14': return c.ptop < 14 ? (n ? hit(0.2 * n) : 0) : (n ? miss(10) : hit(0.3));   // 不消行：只要還有空間就絕不消（扣分加重）   // 太高先挖到剩 10 行以下，再開始連續不消行
    case 'd_ispin': return any && t === 'I' && n ? hit(1) : 0;
    case 'a_ispin2': return any && t === 'I' && n === 2 ? hit(1) : 0;
    case 'd_quadup': return n >= 4 ? (c.upper ? hit(1) : miss(0.5)) : 0;
    case 'd_quadcmb': return n >= 4 && c.combo >= 2 ? hit(1) : n ? hit(0.3 * (c.combo + 1)) : 0;
    case 'd_szsgl2': return has('SZ') && n === 1 ? hit(1) : n ? miss(1) : 0;
    case 'd_spin0x3': return any && !n ? hit(1) : 0;
    case 'd_szlj2': return any && has('SZLJ') ? hit(1) : 0;
    case 'c_trp3': return n === 3 ? hit(1) : 0;
    case 'c_b2b4': return n && c.b2b >= 0 ? hit(0.3 * (c.b2b + 1)) : 0;
    case 'c_quad2col': return n >= 4 && !(G.cols || []).includes(c.lx) ? hit(1) : 0;
    case 'c_noti10': return n ? ('TI'.includes(t) ? miss(1) : hit(0.3 * n)) : 0;
    case 'c_szspin3': return any && has('SZ') && n === 3 ? hit(1) : 0;
    case 'b_ljspin3': return any && has('LJ') && n === 3 ? hit(1) : 0;
    case 'c_oodbl': return t === 'O' && n === 2 ? hit(1) : n ? miss(1) : 0;
    case 'c_mini4': return t === 'T' && sp === 1 && n ? hit(1) : 0;
    case 'c_dbl3same': return n === 2 ? hit(t === G.best ? 1 : 0.3) : 0;
    case 'c_ljgarb': return any && has('LJ') && c.garb ? hit(1) : 0;
    case 'c_szgarb': return any && has('SZ') && c.garb ? hit(1) : 0;
    case 'c_ocol1': return t === 'O' && c.lx === 0 ? hit(1) : 0;
    case 'c_istill': return t === 'I' && n === 1 && c.plain ? hit(1) : 0;
    case 'c_das6': return c.lx === 0 ? hit(0.5) : miss(1);
    case 'c_spin2cmb': case 'a_spin4cmb': {
      if (G.id === 'a_spin4cmb' && n && c.combo0 < 0 && c.pot < 6) return miss(0.4 * n);
      return n ? hit((any ? 0.8 : 0.2) + 0.2 * (c.combo + 1)) : (c.combo0 >= 0 ? miss(0.6) : 0);
    }
    case 'b_o6': return t === 'O' ? hit(0.5 * n) : 0;
    case 'b_spin3p': return any && n && !(G.types || []).includes(t) ? hit(1) : 0;
    case 'b_sgl8': return n === 1 ? hit(1) : (n > 1 || c.held) ? miss(1) : 0;
    case 'b_nogarb4': return hit(0.5 * c.garb);
    case 'b_nocancel8': return c.atk ? miss(0.5) : 0;
    case 'b_tsdup': return T2 && n === 2 && c.rot === 0 ? hit(1) : 0;
    case 'b_ostill': return t === 'O' && n === 2 && c.plain ? hit(1) : 0;
    case 'b_t3norot': return t === 'T' ? (c.rot === 0 && !sp ? hit(1) : miss(1)) : 0;
    case 'b_tsdcmb': return T2 && n === 2 && c.combo >= 2 ? hit(1) : n ? hit(0.3 * (c.combo + 1)) : 0;
    case 'a_szspin2x2': return any && has('SZ') && n === 2 ? hit(1) : n ? miss(0.5) : 0;
    case 'a_ljspin2x2': return any && has('LJ') && n === 2 ? hit(1) : n ? miss(0.5) : 0;
    case 'a_color': return c.color ? hit(2) : 0;
    case 'h_ospin2x2': return t === 'O' && sp && n === 2 ? hit(1) : t === 'O' ? miss(0.2) : 0;   // O 先留著（HOLD）等框蓋好
    case 'a_tsdedge': return T2 && n >= 2 && (c.lx + 1 === 0 || c.lx + 1 === 9 || c.cx === 0 || c.cx === 9) ? hit(1) : 0;
  }
  return 0;
}
function lbGoalPot(G, ch){
  const types = LB_GPOT[G.id]; if (!types) return 0;
  let best = 0;
  for (const t of types){
    for (const m of lbMovesB(ch.bd, t).values()){
      const r = lbPlaceB(ch.bd, m); if (!r.n && !(G.id === 'e_spin' || G.id === 'd_spin0x3')) continue;
      const garb = r.n && ch.gN ? lbPop(r.ys >>> (BOT_H - ch.gN)) : 0;
      const v = lbGoalRew(G, { n: r.n, type: t, rot: m.rot, spin: m.spin, combo: r.n ? ch.st.combo + 1 : -1, combo0: ch.st.combo, b2b: ch.st.b2b, held: false, holdT: ch.hold,
        atk: 0, plain: false, lx: Math.min(...m.cells.map(k => k % W)), cx: m.x + 1, garb, color: false, upper: r.n > 0 && r.lo < 14 });
      if (v > best) best = v;
    }
  }
  return best * 0.45;
}
function lbTmplScore(b, list){
  let best = -1;
  for (const T of list){
    let tot = 0; for (const f of T.F) tot += lbPop(f);
    for (let k = 0; k <= 12; k++){
      const base = BOT_H - 1 - k; if (base - T.F.length + 1 < 4) break;
      let f = 0, v = 0;
      for (let i = 0; i < T.F.length; i++){ const r = b[base - i]; f += lbPop(r & T.F[i]); v += lbPop(r & T.E[i]); }
      const sc = (f - 3 * v) / tot; if (sc > best) best = sc;
    }
  }
  return best;
}
function lbTmplAnchor(b, list){
  let best = null;
  for (const T of list){
    for (let k = 0; k <= (T.deep ? 11 : 5); k++){                    // 只在盤面底部附近蓋（太高蓋會頂死）；O-Spin 的框要蓋在垃圾上面，可以高一點
      const base = BOT_H - 1 - k, n = T.F.length; if (base - n + 1 < 4) break;
      let f = 0, v = 0, tot = 0;
      for (let i = 0; i < n; i++){ const r = b[base - i]; f += lbPop(r & T.F[i]); v += lbPop(r & T.E[i]); tot += lbPop(T.F[i]); }
      if (v) continue;
      if (base + 1 < BOT_H && !b[base + 1] && k) continue;            // 樣板底下要有東西撐著
      const sc = f / tot - k * 0.002;
      if (!best || sc > best.sc){ const Fa = new Uint32Array(BOT_H), Ea = new Uint32Array(BOT_H); for (let i = 0; i < n; i++){ Fa[base - i] = T.F[i]; Ea[base - i] = T.E[i]; }
        best = { sc, Fa, Ea, done: f === tot }; }
    }
  }
  return best;
}
function lbComboPot(b){                                             // 4 寬 combo 井：從底往上，外面 6 欄滿、裡面 4 欄沒滿的行數
  const out = ((1 << W) - 1) & ~0xF; let k = 0;
  for (let y = BOT_H - 1; y >= 0; y--){ const r = b[y]; if (!r) break; if ((r & out) === out && (r & 0xF) !== 0xF) k++; else break; }
  return k;
}
function lbGoalEval(G, b, gN){
  if (LB_GTMPL[G.id]){
    let top = 0; while (top < BOT_H && !b[top]) top++;
    return LB_GW * 1.2 * Math.max(0, lbTmplScore(b, LB_TMPL[LB_GTMPL[G.id]])) - LB_GW * 0.06 * Math.max(0, 14 - top);   // 太高就先往下挖，才有地方蓋
  }
  switch (G.id){
    case 'd_noclr14': {                                                // 14 顆不消行：先挖出空間
      let top = 0; while (top < BOT_H && !b[top]) top++;
      return -LB_GW * 0.08 * Math.max(0, 17 - top);
    }
    case 'd_still3': case 'b_still5': {                                // 不移不轉＝都落在中間 3–6 欄：中間太高就先挖低
      let top = 0; while (top < BOT_H && !(b[top] & 0x78)) top++;
      return -LB_GW * 0.1 * Math.max(0, 15 - top);
    }
    case 'c_istill': case 'b_ostill': case 'b_tsdcmb': {   // 要乾淨盤面的：先往下挖
      let top = 0; while (top < BOT_H && !b[top]) top++;
      return -LB_GW * 0.08 * Math.max(0, 16 - top);
    }
    case 'c_top3': {                                                   // 在旁邊蓋一根塔到可視區最上面 3 行（第 4–6 列）
      let best = 99; for (let y = 0; y < BOT_H; y++) if (b[y] & 0x3){ best = y; break; }
      return -LB_GW * 0.15 * Math.max(0, best - 4);
    }
    case 'b_nogarb4': return -LB_GW * 0.3 * gN;
    case 'd_quadup': case 'd_quadcmb': {                                                 // 先把盤面墊高（留一條井），Quad 才會在上半部
      let h = 0; for (let y = 0; y < BOT_H; y++) if (b[y]){ h = BOT_H - y; break; }
      let wellOk = 0; for (let y = BOT_H - 1; y >= BOT_H - h && y >= 0; y--) if ((b[y] & 1) === 0 && (b[y] | 1) === (1 << W) - 1) wellOk++;   // 第 1 欄留井
      return LB_GW * 0.15 * Math.min(h, 14) + LB_GW * 0.1 * Math.min(wellOk, 14);
    }
    case 'f_combo3': case 'e_combo5': case 'a_combo7': case 'd_cmb3nh': case 'c_spin2cmb': case 'a_spin4cmb': {
      // combo 潛力：每一行的空格都落在同一個 4 寬井（第 0–3 欄）裡、而且只差 1–4 格 → 可以連續消
      return LB_GW * 0.2 * Math.min(lbComboPot(b), 10);
    }
  }
  return 0;
}
function lbOHover(o){
  const g = o.ready || 0; if (!g || W !== 10) return null;
  const types = [[o.q[0], false]]; if (o.hold) types.push([o.hold, true]); else if (o.q[1]) types.push([o.q[1], true]);
  const pick = types.find(([t]) => t === 'O'); if (!pick) return null;
  const B = lbToBits(o.bd), full = (1 << W) - 1, B2 = new Uint32Array(BOT_H);
  for (let y = 0; y < BOT_H - g; y++) B2[y] = B[y + g];
  for (let i = 0; i < g; i++) B2[BOT_H - g + i] = full & ~(1 << ((o.holes && o.holes[i] != null) ? o.holes[i] : 0));
  const occ = (b, x, y) => x < 0 || x >= W || y >= BOT_H || (y >= 0 && ((b[y] >> x) & 1) === 1);
  // O 在原盤面上走得到的懸空位置（左右、往下，不用轉）
  const seen = new Set(), st = [[4, 0]], reach = new Set();
  const free = (b, x, y) => !occ(b, x, y) && !occ(b, x + 1, y) && !occ(b, x, y + 1) && !occ(b, x + 1, y + 1);
  if (!free(B, 4, 0)) return null;
  while (st.length){ const [x, y] = st.pop(), k = x * 64 + y; if (seen.has(k)) continue; seen.add(k); reach.add(k);
    for (const [dx, dy] of [[-1, 0], [1, 0], [0, 1]]){ const nx = x + dx, ny = y + dy; if (nx >= 0 && nx <= W - 2 && free(B, nx, ny)) st.push([nx, ny]); } }
  for (const k of reach){
    const x = (k / 64) | 0, y = k % 64;
    if (!free(B2, x, y)) continue;                                   // 升上來之後這格要剛好空著
    if (!(occ(B2, x - 1, y) && occ(B2, x - 1, y + 1) && occ(B2, x + 2, y) && occ(B2, x + 2, y + 1) && occ(B2, x, y - 1) && occ(B2, x + 1, y - 1) && occ(B2, x, y + 2) && occ(B2, x + 1, y + 2))) continue;
    const m2 = 3 << x; if ((B2[y] | m2) !== full || (B2[y + 1] | m2) !== full) continue;   // 要剛好消 2 行
    return { m: { type: 'O', rot: 1, x: x, y: y, spin: 1, cells: [y * W + x, y * W + x + 1, (y + 1) * W + x, (y + 1) * W + x + 1] }, held: pick[1], atk: 0, hover: g };
  }
  return null;
}
function lbDecide(o){
  if (o.goal && !o._gw){                                             // 任務模式：暫時換成任務用權重
    const keep = {}; for (const k in LBW_G){ keep[k] = LBW[k]; LBW[k] = LBW_G[k]; }
    o._gw = true; try { return lbDecide(o); } finally { Object.assign(LBW, keep); o._gw = false; }
  }
  LB_R = { ...(o.rules || {}), pend: Math.min(12, o.pend || 0) };
  botFill(o);
  if (!LB_BOOK && typeof lbBuildBook === 'function') lbBuildBook();
  lbTables();
  const odd = LB_R.poly || LB_R.hpad || W !== 10;                     // 五連塊／矮盤面／寬度不是 10：開局庫、PC 找法都不適用
  if (o.goal && o.goal.id === 'h_ospin2x2' && o.ospin){ const hv = lbOHover(o); if (hv) return hv; }
  const pc = odd || LB_R.noHold ? null : o.goal ? (o.goal.id === 'a_color' ? lbPcMove(o, true) : null) : lbPcMove(o); if (pc) return pc;
  const bk = o.noBook || o.goal || odd || LB_R.noHold ? null : lbBookMove(o); if (bk) return bk;
  if (o.midBook && !o.goal && !odd && !LB_R.noHold && (o.pend || 0) <= 2 && rootTop0(o.bd) >= 9){ if (!LB_MIDBOOK && typeof lbBuildMidBook === 'function') lbBuildMidBook(); const mb = lbMidBookMove(o); if (mb) return mb; }
  if (o.setups && !o.goal && !odd && (o.pend || 0) <= 3){ if (!LB_SETUPS && typeof lbBuildSetups === 'function') lbBuildSetups(); const sp = lbSetupPlan(o); if (sp) return sp; }
  const G = o.goal || null;
  let gN0 = 0; for (let y = BOT_H - 1; y >= 0; y--){ let g = false; for (let x = 0; x < W; x++) if (o.bd[y * W + x] === 8){ g = true; break; } if (g) gN0++; else break; }
  LB_DIRS = G && G.id === 'e_ccw12' ? [3] : [1, 3, 2]; LB_OSPIN = !!o.ospin;
  let rootTop = 0; while (rootTop < BOT_H && !o.bd.subarray(rootTop * W, rootTop * W + W).some(v => v)) rootTop++;
  const AN = G && LB_GTMPL[G.id] && !/garb$/.test(G.id) && rootTop >= (G.id === 'h_ospin2x2' ? 8 : 12) ? lbTmplAnchor(lbToBits(o.bd), LB_TMPL[LB_GTMPL[G.id]]) : null;
  if (o.setups && !LB_SETUPS && typeof lbBuildSetups === 'function') lbBuildSetups();
  const SU = !G && o.setups && LBW.suF && (o.pend || 0) <= 3 && rootTop >= 10 ? lbSetupAnchor(lbToBits(o.bd), o.setupKey) : null;   // 複合結構：垃圾快進來、疊太高就先不蓋
  o.setupOut = SU && !SU.done ? SU.k : null;
  const root = { bd: lbToBits(o.bd), hold: o.hold || null, q: o.q.slice(), st: { b2b: o.b2b ?? -1, combo: o.combo ?? -1, la: LB_R.la || null, ls: LB_R.ls || null }, acc: 0, first: null, gN: gN0, lastT: o.lastType || null };
  let layer = [root];
  const qN = Math.min(LBW.depth, o.q.length), depthN = qN + (LB_QX && qN === o.q.length && (o.hold || o.q.length > 1) ? 1 : 0);   // 照 fusion 的 quiescence：NEXT 用完後，B2B／combo 進行中的盤面再用 HOLD 那顆多看一步
  for (let depth = 0; depth < depthN; depth++){
    if (depth > 0 && o.deadline && performance.now() > o.deadline) break;   // 時間到：用已經算完的那一層裡最好的（快速時自動變淺，不會卡）
    const next = [], seen = new Map(), qx = depth >= qN;              // qx：延伸層
    if (qx) for (const s of layer) if (!(s.st.b2b >= 1 || s.st.combo >= 1) || !s.hold){ s.qxKeep = true; next.push(s); }   // 安靜的盤面不延伸，原分數直接留著比
    for (const s of layer){
      if (qx && s.qxKeep) continue;
      if (depth > 0 && o.deadline && next.length && performance.now() > o.deadline) break;   // 層內也看時間：20 PPS 一顆只有 50ms，等整層算完會超時（父節點已照分數排好，先算的是最好的幾個）
      const pot = G ? lbComboPot(s.bd) : 0;
      let ptop = 0; if (G) while (ptop < BOT_H && !s.bd[ptop]) ptop++;
      const opts = [];
      if (s.q.length) opts.push({ use: s.q[0], hold: s.hold, q: s.q.slice(1), held: false });
      else if (qx && s.hold) opts.push({ use: s.hold, hold: null, q: [], held: true });   // 延伸：NEXT 用完，放 HOLD 那顆
      if (LB_R.noHold){}                                              // NO HOLD／ASCETICISM：不考慮 hold
      else if (s.hold && s.q.length){ if (s.hold !== s.q[0]) opts.push({ use: s.hold, hold: s.q[0], q: s.q.slice(1), held: true }); }
      else if (!s.hold && s.q.length > 1) opts.push({ use: s.q[1], hold: s.q[0], q: s.q.slice(2), held: true });
      for (const op of opts){
        for (const m of lbMovesB(s.bd, op.use).values()){
          const r = lbPlaceB(s.bd, m), st = { b2b: s.st.b2b, combo: s.st.combo, la: s.st.la, ls: s.st.ls };
          const spA = LB_R.allspin && m.type !== 'T' && m.spin ? 2 : m.spin;   // ALL-SPIN／WARLOCK：非 T 的 spin 算正式
          let atk = lbAttack(r.n, spA, st, r.pc);
          if (LB_R.voidPlain && r.n && !spA) atk = Math.min(atk, (CLIMB_CFG.attack[1] || 0) + (CLIMB_CFG.combo[Math.min(st.combo, CLIMB_CFG.combo.length - 1)] || 0));   // WARLOCK：非 spin 消行 VOID，送的量同 Single
          if (LB_R.noB2B) st.b2b = -1;                                 // DAMNATION：沒有 B2B
          const brokeB2B = !LB_R.noB2B && s.st.b2b >= 0 && r.n > 0 && (st.b2b < 0 || (r.pc && r.n < 4 && !spA));   // 普通消行的 PC：B2B 先歸零再 +2，一樣算斷
          const plain = r.n > 0 && r.n < 4 && !m.spin;                 // 普通消行（會斷 B2B）
          let b2bK = 1;                                               // 疊太高時 B2B 讓位給地形（保命優先）：b2bSafe 高度以上線性降到 0
          if (LBW.b2bSafe){ let t = 0; while (t < BOT_H && !s.bd[t]) t++; b2bK = Math.max(0, Math.min(1, 1 - (BOT_H - t + (LB_R.hpad || 0) + Math.max(0, (LB_R.pend || 0) - atk) - LBW.b2bSafe) / 6)); }   // pend 先扣掉這一手的攻擊（會先抵銷排隊垃圾）：不然 F10 一直有大垃圾在排，B2B 權重永遠被壓成 0
          let rew = LB_NN && LB_NN.pure && !G ? LBW.atk * atk + (r.pc ? LBW.pc : 0) : LBW.atk * atk - (plain && !r.pc ? LBW.burn * r.n * b2bK : 0) - (brokeB2B ? (LBW.b2b + (LBW.b2bLv || 0) * s.st.b2b) * b2bK : 0) + (r.pc ? LBW.pc : 0) + (spA === 2 && r.n ? LBW.tspin : 0);
          if (m.spin === 2 && !r.n && !LB_R.allspin) rew -= 1;         // 白轉（ALL-SPIN 的 Spin-Zero 可以拿來隔開重複動作，不扣）
          if (!r.n && LBW.newHole){                                   // 新蓋出洞（之後只能單消慢慢挖、斷 B2B）：重罰；但 T-Spin 的屋簷（蓋完有 TSD／TST 洞）不算
            const h0 = lbHolesB(s.bd), h1 = lbHolesB(r.b);
            if (h1 > h0 && !lbTsdB(r.b, LB_HH) && !lbTstB(r.b)) rew -= LBW.newHole * (h1 - h0) * Math.max(.4, b2bK);
          }
          if (r.n && (LB_R.warlock || LB_R.allspin)){                   // 重複同一種消行會長 Wound（WARLOCK 一次 20 行＝等於死）
            const act = LB_R.warlock ? (spA ? 'spin' + r.n : 'void') : (spA ? m.type + '-Spin' + (m.spin === 1 && m.type === 'T' ? 'm' : '') : 'clear') + r.n;   // 格式跟遊戲的 climb.lastAction 一樣
            const pact = LB_R.pact && spA && st.ls === m.type;          // BLOOD PACT：spin 不能連用同一種方塊
            if (act === st.la || pact) rew -= LB_R.warlock ? 300 : 8;      // Wound＝一行打不掉的垃圾（再重 bot 會為了避開重複而疊死）
            st.la = act; if (spA) st.ls = m.type;
          } else if (!r.n && spA && (LB_R.warlock || LB_R.allspin)){ st.la = (LB_R.warlock ? 'spin' : m.type + '-Spin' + (m.spin === 1 && m.type === 'T' ? 'm' : '')) + '0'; st.ls = m.type; }
          let gN = s.gN;
          if (G){
            const garb = r.n && s.gN ? lbPop(r.ys >>> (BOT_H - s.gN)) : 0;   // 消掉的行有幾行在垃圾區（垃圾都在最底下）
            gN = s.gN - garb;
            const sx = m.type === 'O' ? 4 : 3, lx = Math.min(...m.cells.map(k => k % W));
            let plain = false;
            if (m.rot === 0 && m.x === sx && !m.spin){ let y = 0; const P = LBT[m.type][0]; while (lbFitsB(s.bd, P, sx, y + 1)) y++; plain = y === m.y; }
            let color = false;
            if (r.n && gN >= 0){ color = true; for (let y = 0; y < BOT_H - gN; y++) if (r.b[y]){ color = false; break; } }
            let top = 0; while (top < BOT_H && !r.b[top]) top++;
            if (G.id === 'c_top3'){ top = 0; while (top < BOT_H && !(r.b[top] & 0x78)) top++; }   // 蓋塔任務：只看中間 4 欄（出生區）會不會頂到
            const safe = G.id === 'd_quadup' || G.id === 'd_quadcmb' ? Math.max(0, Math.min(1, (top - 5) / 3)) : Math.max(0, Math.min(1, (top - 9) / 5));   // 疊太高就先保命，任務分數打折（復活時頂死＝兩個都死）；上半部 Quad 本來就要疊高
            if (AN && !AN.done){                                       // 蓋樣板：F 格加分、E 格重扣、其他地方小扣
              for (const k of m.cells){ const y = (k / W) | 0, x = k % W; if (y < 0) continue;
                rew += AN.Fa[y] >> x & 1 ? LB_GW * 0.25 : AN.Ea[y] >> x & 1 ? -LB_GW * 1.2 : -LB_GW * 0.35; }
            }
            if (G.id === 'd_noclr14' && r.n && ptop >= 6) rew -= 400;   // 不消行任務：還沒頂到快死（上面還有 6 行）就絕對不消，不受 safe 縮放
            rew += safe * lbGoalRew(G, { pot, ptop, prevT: s.lastT, n: r.n, type: m.type, rot: m.rot, spin: m.spin, combo: st.combo, combo0: s.st.combo, b2b: st.b2b, held: op.held, holdT: op.hold, atk, plain, lx, cx: m.x + 1, garb, color, upper: r.n > 0 && r.lo < 14 });
          }
          if (SU && !SU.done && !(m.type === 'T' && m.spin === 2)){   // 蓋結構：F 格加分、E 格（洞／T 的路）重扣、其他地方小扣；T 轉進洞（正式 T-Spin）不扣——那就是目的
            for (const k of m.cells){ const y = (k / W) | 0, x = k % W; if (y < 0) continue;
              rew += SU.Fa[y] >> x & 1 ? (LBW.suF || 2) : SU.Ea[y] >> x & 1 ? -(LBW.suE || 8) : -(LBW.suO || 0.4); }
          }
          // 同盤面＋同 HOLD 只留分數高的那個（不同順序放出一樣的盤面很常見，留著會把 beam 塞滿）
          let h1 = 0, h2 = 7; for (let y = 0; y < BOT_H; y++){ h1 = (Math.imul(h1, 31) + r.b[y]) | 0; h2 = (Math.imul(h2, 1000003) ^ r.b[y]) | 0; }
          const key = h1 + ':' + h2 + ':' + op.hold + ':' + st.b2b + ':' + (st.la || '');
          const acc = s.acc + rew;
          const old = seen.get(key);
          if (old){ if (acc > old.acc){ old.score += acc - old.acc; old.acc = acc; old.st = st; old.first = s.first || { m, held: op.held, atk }; } continue; }
          const child = { bd: r.b, hold: op.hold, q: op.q, st, acc, first: s.first || { m, held: op.held, atk }, gN, lastT: m.type };
          child.score = acc + (LB_NN && !G ? LB_NN_LEAF(r.b, st) : lbEvalB(r.b) + (LBW.chain || 0) * Math.max(0, st.b2b - 3)) + (G ? lbGoalEval(G, r.b, gN) : 0);   // 有載入神經網路（設定頁）：葉節點改用網路評分
          seen.set(key, child); next.push(child);
        }
      }
    }
    if (!next.length) break;
    next.sort((a, b) => b.score - a.score);
    if (G && LB_GPOT[G.id]){                                         // 前面幾名再算「任務潛力」重新排
      const K = Math.min(next.length, LBW.beam * 2);
      for (let i = 0; i < K; i++){ let top = 0; while (top < BOT_H && !next[i].bd[top]) top++; next[i].score += Math.max(0, Math.min(1, (top - 9) / 5)) * lbGoalPot(G, next[i]); }
      next.sort((a, b) => b.score - a.score);
    }
    layer = next.slice(0, depth === depthN - 1 ? 1 : depth === qN - 1 && depthN > qN ? Math.max(4, LBW.beam) : LBW.beam);
  }
  const res = layer[0] && layer[0].first ? layer[0].first : null;
  return res && SU ? { ...res, setup: SU.done ? SU.k + ':ready' : SU.k } : res;
}
function lbPlace(bd, m){
  const b = bd.slice(); for (const k of m.cells) b[k] = BOT_VAL[m.type];
  let n = 0;
  for (let y = BOT_H - 1; y >= 0; y--){
    let full = true; for (let x = 0; x < W; x++){ const v = b[y * W + x]; if (!v || v === 10){ full = false; break; } }   // 10＝永久行
    if (full){ b.copyWithin(W, 0, y * W); b.fill(0, 0, W); n++; y++; }
  }
  return { b, n, pc: n > 0 && !b.some(v => v) };
}
module.exports = { init(d){ ({ W, BOT_H, SHAPES, KICK_JLSTZ, KICK_I_PLUS, KICK_180, BOT_VAL, CLIMB_CFG, LBW, LB_BOOK } = d); },
  lbDecide, lbPlace, lbAttack, lbToBits, lbFeatB, lbMovesB, lbTables, setNN(n){ LB_NN = n; }, setR(r){ LB_R = r; }, setQX(v){ LB_QX = v; }, get LBW(){ return LBW; } };
