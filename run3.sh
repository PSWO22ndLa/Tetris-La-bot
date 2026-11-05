#!/usr/bin/env bash
# La bot v3：搜尋蒸餾（expert iteration）
#   每一手先用「老師」搜一次（depth 6、beam 8），把「搜尋找到的最佳分數 − 規則版靜態評分」當目標
#   → 網路學會「這個盤面再往後看 6 手會比表面好／差多少」
#   → 下棋時搜尋照樣用規則版，最後一層前 10 名再用網路修正排名（網路當裁判，不會被搜尋鑽漏洞）
#   老師＝目前最強的網路（nn3_best.json，沒有就用規則版）；每輪新網路、目前最強、規則版用同一組新抽的垃圾比，
#   贏過目前最強才當老師，連規則版也贏過才更新 nn.json（之前用固定一組、拿歷史最高分當門檻，結果被一次走運的 654.8 卡死）
# 用法：ROUNDS=6 GAMES=16 ./run3.sh
set -euo pipefail
cd "$(dirname "$0")"
ROUNDS=${ROUNDS:-6}; GAMES=${GAMES:-16}; P=${P:-$(nproc)}; BENCH=${BENCH:-32}
mkdir -p data3 hist3
score(){ bun -e "const s=JSON.parse(require('fs').readFileSync('$1','utf8'));console.log((s.avgPieces*(1+s.app)).toFixed(1))"; }   # 綜合分：存活×(1＋每顆攻擊)
# 同一組垃圾（每輪換新種子）跑 BENCH 局，分兩個行程；輸出合併後的結果
bench(){ local out=$1 seed=$2; shift 2; local h=$((BENCH / 2))
  bun sim.js games=$h cap=500 seed=$seed beam=8 depth=6 "$@" > "$out.a" & bun sim.js games=$h cap=500 seed=$((seed + 7777)) beam=8 depth=6 "$@" > "$out.b" & wait
  bun -e "const f=require('fs'),a=JSON.parse(f.readFileSync('$out.a','utf8')),b=JSON.parse(f.readFileSync('$out.b','utf8')),n=a.games+b.games,p=(a.avgPieces*a.games+b.avgPieces*b.games)/n;
    f.writeFileSync('$out',JSON.stringify({games:n,avgPieces:+p.toFixed(1),app:+((a.app*a.avgPieces*a.games+b.app*b.avgPieces*b.games)/(p*n)).toFixed(3),deaths:a.deaths+b.deaths,maxB2B:Math.max(a.maxB2B,b.maxB2B)}))"; rm -f "$out.a" "$out.b"; }
TEACH=""; [ -f nn3_best.json ] && TEACH="nn=nn3_best.json"
echo "老師：${TEACH:-規則版}"
for r in $(seq 1 "$ROUNDS"); do
  tag=$(date +%Y%m%d_%H%M%S)
  echo "== 第 $r 輪：$P 個行程 × $GAMES 局（老師：${TEACH:-規則版}）"
  for p in $(seq 1 "$P"); do
    bun sim.js games="$GAMES" cap=500 seed="$RANDOM$p" beam=8 depth=6 $TEACH dist=1 eps=0.04 out="data3/${tag}_$p.json" > /dev/null &
  done
  wait
  ls -1t data3/*.json | tail -n +41 | xargs -r rm -f                 # 保留最新 40 份
  INIT=""; [ -f nn3_new.json ] && INIT="--init nn3_new.json"   # 接著上一輪練（沒被採用的也接著練）
  bun train.js data3/*.json --out nn3_new.json $INIT --hidden 64,32 --epochs 30 --max 400000 | tail -1
  bun -e "const f='nn3_new.json',d=JSON.parse(require('fs').readFileSync(f,'utf8'));d.dist=true;d.clip=150;d.rerank=10;require('fs').writeFileSync(f,JSON.stringify(d))"
  # 比較：新網路／目前最強／規則版 用同一組（這輪新抽的）垃圾，避免拿一次走運的高分當門檻
  S=$((RANDOM * 3 + r)); mkdir -p "hist3/$tag"
  bench "hist3/$tag/new.json" $S nn=nn3_new.json
  bench "hist3/$tag/classic.json" $S
  NEW=$(score "hist3/$tag/new.json"); CL=$(score "hist3/$tag/classic.json"); BEST=$CL
  if [ -f nn3_best.json ]; then bench "hist3/$tag/best.json" $S nn=nn3_best.json; BEST=$(score "hist3/$tag/best.json"); fi
  echo "新網路 $NEW　目前最強 $BEST　規則版 $CL（同一組 $BENCH 局）"
  if awk "BEGIN{exit !($NEW > $BEST)}"; then
    cp nn3_new.json nn3_best.json; TEACH="nn=nn3_best.json"; echo "→ 新網路當老師"
    if awk "BEGIN{exit !($NEW > $CL * 1.05)}"; then cp nn3_new.json nn.json; echo "→ 贏規則版 5% 以上：更新 nn.json（網站會抓這個）"; else echo "→ 但沒明顯贏過規則版（要多 5%），nn.json 不動"; fi   # 24 局的運氣差就有 ±10% 以上，差一點點不算
  else echo "→ 沒贏，維持原本的"; fi
done
