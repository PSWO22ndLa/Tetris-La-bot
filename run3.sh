#!/usr/bin/env bash
# La bot v3：搜尋蒸餾（expert iteration）
#   每一手先用「老師」搜一次（depth 6、beam 8），把「搜尋找到的最佳分數 − 規則版靜態評分」當目標
#   → 網路學會「這個盤面再往後看 6 手會比表面好／差多少」
#   → 下棋時搜尋照樣用規則版，最後一層前 10 名再用網路修正排名（網路當裁判，不會被搜尋鑽漏洞）
#   老師＝目前最強的那個（規則版或上一版網路），新網路只有在同一組垃圾下比較強才會換上去
# 用法：ROUNDS=6 GAMES=16 ./run3.sh
set -euo pipefail
cd "$(dirname "$0")"
ROUNDS=${ROUNDS:-6}; GAMES=${GAMES:-16}; P=${P:-$(nproc)}; BENCH=${BENCH:-16}
mkdir -p data3 hist3
score(){ bun -e "const s=JSON.parse(require('fs').readFileSync('$1','utf8'));console.log((s.avgPieces*(1+s.app)).toFixed(1))"; }   # 綜合分：存活×(1＋每顆攻擊)
[ -f hist3/bench_classic.txt ] || bun sim.js games="$BENCH" cap=500 seed=101 beam=8 depth=6 > hist3/bench_classic.txt
BEST=$(score hist3/bench_classic.txt); TEACH=""
if [ -f nn3.json ] && [ -f hist3/best_score.txt ]; then BEST=$(cat hist3/best_score.txt); TEACH="nn=nn3.json"; fi
echo "起點：規則版 $(score hist3/bench_classic.txt)　目前最強 $BEST（老師：${TEACH:-規則版}）"
for r in $(seq 1 "$ROUNDS"); do
  tag=$(date +%Y%m%d_%H%M%S)
  echo "== 第 $r 輪：$P 個行程 × $GAMES 局（老師：${TEACH:-規則版}）"
  for p in $(seq 1 "$P"); do
    bun sim.js games="$GAMES" cap=500 seed="$RANDOM$p" beam=8 depth=6 $TEACH dist=1 eps=0.04 out="data3/${tag}_$p.json" > /dev/null &
  done
  wait
  ls -1t data3/*.json | tail -n +41 | xargs -r rm -f                 # 保留最新 40 份
  INIT=""; [ -f nn3_new.json ] && INIT="--init nn3_new.json"; [ -z "$INIT" ] && [ -f nn3.json ] && INIT="--init nn3.json"   # 接著上一輪練（沒被採用的也接著練）
  bun train.js data3/*.json --out nn3_new.json $INIT --hidden 64,32 --epochs 30 --max 400000 | tail -1
  bun -e "const f='nn3_new.json',d=JSON.parse(require('fs').readFileSync(f,'utf8'));d.dist=true;d.clip=150;d.rerank=10;require('fs').writeFileSync(f,JSON.stringify(d))"
  bun sim.js games="$BENCH" cap=500 seed=101 beam=8 depth=6 nn=nn3_new.json > "hist3/bench_$tag.txt"
  NEW=$(score "hist3/bench_$tag.txt")
  echo "新網路 $(cat hist3/bench_$tag.txt)"
  if awk "BEGIN{exit !($NEW > $BEST)}"; then
    cp nn3_new.json nn3.json; cp nn3_new.json nn.json; BEST=$NEW; echo "$BEST" > hist3/best_score.txt; TEACH="nn=nn3.json"
    echo "→ 換上新網路（綜合分 $NEW，規則版 $(score hist3/bench_classic.txt)）"
  else
    [ -f nn3.json ] || cp nn3_new.json nn3.json                       # 第一次：先留著當下一輪的初始權重（老師還是規則版）
    echo "→ 沒變強（$NEW ≤ $BEST），維持原本的"
  fi
done
echo "規則版 $(cat hist3/bench_classic.txt)"
