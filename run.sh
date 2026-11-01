#!/usr/bin/env bash
# La bot 神經網路：產資料 → 訓練 → 比較，重複 ROUNDS 輪
# 用法：ROUNDS=5 GAMES=40 ./run.sh      （P＝同時開幾個行程，預設＝CPU 核心數）
set -euo pipefail
cd "$(dirname "$0")"
ROUNDS=${ROUNDS:-3}; GAMES=${GAMES:-40}; P=${P:-$(nproc)}; BENCH=${BENCH:-16}
mkdir -p data hist
for r in $(seq 1 "$ROUNDS"); do
  tag=$(date +%Y%m%d_%H%M%S)
  echo "== 第 $r 輪：$P 個行程 × $GAMES 局 自我對戰（用目前的 nn.json，偶爾亂放）"
  for p in $(seq 1 "$P"); do
    bun sim.js games="$GAMES" cap=600 seed="$RANDOM$p" beam=8 depth=6 nn=nn.json mix=1 eps=0.08 out="data/${tag}_$p.json" > /dev/null &
  done
  wait
  echo "== 訓練（接著上一版的權重）"
  bun train.js data/*.json --out nn_new.json --init nn.json --hidden 48,24 --epochs 20 --max 150000 | tail -1
  [ -f nn.json ] && cp nn.json "hist/nn_before_$tag.json"; cp nn_new.json nn.json
  echo "== 比較（同一組垃圾，$BENCH 局）"
  bun sim.js games="$BENCH" cap=500 seed=101 beam=8 depth=6 > hist/bench_classic.txt &
  bun sim.js games="$BENCH" cap=500 seed=101 beam=8 depth=6 nn=nn.json mix=1 > "hist/bench_hybrid_$tag.txt" &
  bun sim.js games="$BENCH" cap=500 seed=101 beam=8 depth=6 nn=nn.json pure=1 > "hist/bench_neural_$tag.txt" &
  wait
  printf "CLASSIC %s\nHYBRID  %s\nNEURAL  %s\n" "$(cat hist/bench_classic.txt)" "$(cat hist/bench_hybrid_$tag.txt)" "$(cat hist/bench_neural_$tag.txt)"
done
echo "完成：把 nn.json 上傳到網頁 設定 → CUSTOMIZATION → LA BOT BRAIN → LOAD nn.json"
