# labot-train

> **v2（學 fusion）**：網路改看整個 24×10 盤面＋HOLD＋30 個特徵（277 輸入、48→24 隱藏層），訓練獎勵多一項「B2B 接下去」。舊版（v1，30 輸入）的網路和資料放在 `archive_v1/`，v2 從零重新練。

La bot 的神經網路評分訓練工具。全部用 Bun 跑，不需要 Python。

## 自動訓練（GitHub Actions）

- 每 6 小時自動跑 3 輪，跑完把新的 `nn.json`、比較結果（`last_run.txt`）存回這個 repo。
- 手動多跑：GitHub App → Actions → **train** → Run workflow。
- 網頁設定 → LA BOT BRAIN 的網址填 `https://raw.githubusercontent.com/PSWO22ndLa/Tetris-La-bot/main/nn.json`，每次打開遊戲會自動抓最新版。

## 在自己電腦跑

```sh
chmod +x run.sh
ROUNDS=3 GAMES=40 ./run.sh
```

每一輪做三件事：

1. **自我對戰**：用目前的 `nn.json` 開 `P` 個行程（預設＝CPU 核心數）。
2. **訓練**：用 `data/` 裡全部的資料接著練。
3. **比較**：CLASSIC／HYBRID／NEURAL 用同一組垃圾各打 16 局。

## 比較的輸出怎麼看

| 欄位 | 意思 |
|---|---|
| `avgPieces` | 平均撐幾塊（上限 500） |
| `app` | 每塊攻擊 |
| `deaths` | 16 局裡死幾局 |

`avgPieces × app` 約等於每局總攻擊，越高越好。

## 放回網頁

設定 → CUSTOMIZATION → **LA BOT BRAIN**：

- 選 HYBRID 或 NEURAL。
- 按 **LOAD nn.json** 上傳。
- 設定會影響所有用 La bot 搜尋的 AI（La bot、QP 觀戰的人、TL CPU）。

## 單獨用

```sh
bun sim.js games=20 cap=600 seed=1 nn=nn.json mix=1 eps=0.08 out=data/x.json   # 產資料
bun train.js data/*.json --out nn.json --init nn.json --hidden 32,16              # 訓練
bun sim.js games=16 cap=500 seed=101                                              # 規則版
bun sim.js games=16 cap=500 seed=101 nn=nn.json pure=1                            # 網路版
```

## 檔案

| 檔案 | 用途 |
|---|---|
| `core.js` | 從網頁抽出來的 La bot 搜尋核心＋網路評分（對應目前網頁版本） |
| `nn.json` | 目前的網路，起點＝第 1 輪 |
| `labot_start_data.json` | 已經跑好的兩輪資料（約 7 萬筆）：放進 `data/` 資料夾就會被一起拿來練 |

## 注意

- v2 網路輸入 277 個（30 特徵＋HOLD 7＋盤面 240），網頁 `lbNNv2` 對應；v1（30 輸入）網頁也還認得。
- 比較結果多了 `maxB2B`（最長 B2B）、`avgB2B`（消行時平均 B2B）、`breaks3`（B2B ≥3 時被斷幾次）。
- 第 1 輪實測：HYBRID 比 CLASSIC 多撐約 10%，NEURAL 還很弱。純網路要多跑幾輪才會追上。

## v3：搜尋蒸餾（2026-11）
v2（自我對戰、學「之後實際打出多少攻擊」）卡住了：目標被運氣（方塊順序、垃圾）蓋過，R² 停在 0.58，越練越亂。

v3 改成學「老師搜尋的結果」：
- 每一手都讓老師（規則版或目前最強的網路）用 depth 6、beam 8 搜一次，目標＝搜到的最佳分數 − 這個盤面的規則版靜態評分。
  同一個盤面每次算出來幾乎一樣，沒有運氣雜訊。
- 下棋時搜尋照樣用規則版，只在最後一層前 10 名用網路修正排名（網路當裁判，不會被搜尋鑽漏洞）。
- 新網路要在同一組垃圾、16 局下比目前最強的更好，才會換上去（`nn.json`）並當下一輪的老師。

跑法：`ROUNDS=4 GAMES=16 ./run3.sh`。結果在 `hist3/`，訓練資料在 `data3/`（保留最新 40 份）。
