// Stack Lab 桌面版：頁面掛在假網域 https://stacklab.invalid/，跟 Vercel 上一樣有同網域的 /tio/* → tetr.io 轉發
// （頁面程式完全不用改）；/tio/res/* 抓過一次就存在使用者資料夾，之後離線也能用
const { app, BrowserWindow, protocol, net, shell, Menu, session, screen } = require('electron');
const path = require('path'), fs = require('fs'), fsp = fs.promises, { pathToFileURL } = require('url');

const HOST = 'stacklab.invalid';                       // .invalid 是保留網域，永遠不會真的連出去
const APP_DIR = path.join(__dirname, 'app');
const CACHE = () => path.join(app.getPath('userData'), 'tio-cache');
const MIME = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.svg':'image/svg+xml', '.gif':'image/gif',
  '.mp3':'audio/mpeg', '.ogg':'audio/ogg', '.wav':'audio/wav', '.json':'application/json', '.js':'text/javascript', '.css':'text/css',
  '.html':'text/html', '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf', '.otf':'font/otf', '.fnt':'text/plain', '.txt':'text/plain' };
const mimeOf = p => MIME[path.extname(p).toLowerCase()] || 'application/octet-stream';

if (!app.requestSingleInstanceLock()) app.quit();

async function tio(req, u){
  const target = 'https://tetr.io' + u.pathname.slice(4) + u.search;
  // 非資源（API 等）：原樣轉發，不存
  if (!u.pathname.startsWith('/tio/res/') || req.method !== 'GET')
    return net.fetch(target, { method: req.method, headers: req.headers, body: req.body, duplex: 'half', bypassCustomProtocolHandlers: true }).catch(() => new Response(null, { status: 502 }));
  const rel = path.normalize(decodeURIComponent(u.pathname.slice('/tio/res/'.length))).replace(/^(\.\.[\\/])+/, '');
  const file = path.join(CACHE(), 'res', rel);
  if (!file.startsWith(path.join(CACHE(), 'res'))) return new Response('forbidden', { status: 403 });
  const fromDisk = async () => new Response(await fsp.readFile(file), { headers: { 'content-type': mimeOf(file), 'access-control-allow-origin': '*' } });
  if (fs.existsSync(file)) return fromDisk();
  try {
    const r = await net.fetch(target, { bypassCustomProtocolHandlers: true });
    if (!r.ok) return new Response(null, { status: r.status });
    const buf = Buffer.from(await r.arrayBuffer());
    fsp.mkdir(path.dirname(file), { recursive: true }).then(() => fsp.writeFile(file, buf)).catch(() => {});
    return new Response(buf, { headers: { 'content-type': r.headers.get('content-type') || mimeOf(file), 'access-control-allow-origin': '*' } });
  } catch (e) { return new Response(null, { status: 504 }); }
}

// TETR.IO PLUS 素材站（you.have.fail/tetrioplus）：頁面讀目錄清單、預覽、下載皮膚都走這裡（同網域，不受 CORS 限制）；圖檔存到硬碟快取
async function plus(req, u){
  const rest = u.pathname.slice('/plus/'.length);
  const target = 'https://you.have.fail/tetrioplus/' + rest + u.search;
  const cacheable = /\.(png|webp|jpg|svg|gif|json)$/i.test(rest);
  const rel = path.normalize(decodeURIComponent(rest)).replace(/^(\.\.[\\/])+/, '');
  const file = path.join(CACHE(), 'plus', rel);
  if (cacheable && file.startsWith(path.join(CACHE(), 'plus')) && fs.existsSync(file))
    return new Response(await fsp.readFile(file), { headers: { 'content-type': mimeOf(file), 'access-control-allow-origin': '*' } });
  try {
    const r = await net.fetch(target, { bypassCustomProtocolHandlers: true });
    if (!r.ok) return new Response(null, { status: r.status });
    const buf = Buffer.from(await r.arrayBuffer());
    if (cacheable && file.startsWith(path.join(CACHE(), 'plus'))) fsp.mkdir(path.dirname(file), { recursive: true }).then(() => fsp.writeFile(file, buf)).catch(() => {});
    return new Response(buf, { headers: { 'content-type': r.headers.get('content-type') || mimeOf(file), 'access-control-allow-origin': '*' } });
  } catch (e) { return new Response(null, { status: 504 }); }
}

// 網站下載時使用者可以順便存一份「自己瀏覽器裡的」素材包（StackLab-*.slpack）；這裡從「下載」資料夾找最新的一份給頁面匯入
async function packFromDownloads(req){
  try {
    const dir = app.getPath('downloads');
    const list = (await fsp.readdir(dir)).filter(n => /^StackLab.*\.slpack$/i.test(n));
    let best = null;
    for (const n of list){ const st = await fsp.stat(path.join(dir, n)); if (!best || st.mtimeMs > best.t) best = { n, t: st.mtimeMs, size: st.size }; }
    if (!best) return new Response(null, { status: 404 });
    const headers = { 'content-type': 'application/octet-stream', 'x-pack-time': String(Math.floor(best.t)), 'x-pack-name': encodeURIComponent(best.n), 'content-length': String(best.size) };
    if (req.method === 'HEAD') return new Response(null, { headers });
    return new Response(await fsp.readFile(path.join(dir, best.n)), { headers });
  } catch (e) { return new Response(null, { status: 404 }); }
}

// 視窗大小／位置／全螢幕記起來（下次開一樣）
const WIN_STATE = () => path.join(app.getPath('userData'), 'window-state.json');
function loadWinState(){ try { return JSON.parse(fs.readFileSync(WIN_STATE(), 'utf8')); } catch (e) { return {}; } }
function saveWinState(win){
  try { if (win.isDestroyed()) return; const st = { ...(win.isMaximized() || win.isFullScreen() ? loadWinState() : win.getBounds()), max: win.isMaximized(), full: win.isFullScreen() };
    fs.writeFileSync(WIN_STATE(), JSON.stringify(st)); } catch (e) {}
}
// 設定都存在頁面的 localStorage；Chromium 會延後寫進硬碟，關 App 太快可能來不及 → 關之前、失焦時、每 15 秒都強制寫一次
const flushStorage = () => { try { session.defaultSession.flushStorageData(); } catch (e) {} };

function createWindow(){
  const ws = loadWinState();
  // 上次的位置如果已經不在任何螢幕上（拔掉外接螢幕）→ 不用那個位置，交給系統置中
  try { if (ws.x != null && ws.y != null){ const r = { x: ws.x, y: ws.y, width: ws.width || 1280, height: ws.height || 800 };
    const ok = screen.getAllDisplays().some(d => { const w = d.workArea; return r.x < w.x + w.width - 80 && r.x + r.width > w.x + 80 && r.y < w.y + w.height - 60 && r.y + 40 > w.y; });
    if (!ok){ delete ws.x; delete ws.y; } } } catch (e) { delete ws.x; delete ws.y; }
  const win = new BrowserWindow({
    width: ws.width || 1280, height: ws.height || 800, x: ws.x, y: ws.y, minWidth: 360, minHeight: 480, backgroundColor: '#0b0d12', title: 'Stack Lab',
    autoHideMenuBar: true, icon: path.join(APP_DIR, 'icon.png'),
    webPreferences: { contextIsolation: true, sandbox: true, backgroundThrottling: false },
  });
  win.webContents.setWindowOpenHandler(({ url }) => {                   // 外部連結 → 系統瀏覽器
    if (!url.startsWith(`https://${HOST}/`)) { shell.openExternal(url); return { action: 'deny' }; }
    return { action: 'allow' };
  });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith(`https://${HOST}/`)){ e.preventDefault(); shell.openExternal(url); } });
  win.webContents.on('before-input-event', (e, i) => {
    if (i.type === 'keyDown' && i.key === 'F11'){ win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
  });
  if (ws.max) win.maximize();
  if (ws.full) win.setFullScreen(true);
  let t = null; const later = () => { clearTimeout(t); t = setTimeout(() => saveWinState(win), 400); };
  win.on('resize', later); win.on('move', later); win.on('enter-full-screen', later); win.on('leave-full-screen', later);
  win.on('close', () => { saveWinState(win); flushStorage(); });
  win.on('blur', flushStorage);
  win.loadURL(`https://${HOST}/`);
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  protocol.handle('https', async req => {
    const u = new URL(req.url);
    if (u.hostname !== HOST) return net.fetch(req, { bypassCustomProtocolHandlers: true }).catch(() => new Response(null, { status: 502 }));   // 沒網路：回錯誤碼，不要丟例外
    if (u.pathname.startsWith('/tio/')) return tio(req, u);
    if (u.pathname.startsWith('/plus/')) return plus(req, u);
    if (u.pathname === '/__pack') return packFromDownloads(req);
    let p = decodeURIComponent(u.pathname); if (p === '/' || p === '') p = '/index.html';
    const f = path.join(APP_DIR, path.normalize(p).replace(/^(\.\.[\\/])+/, ''));
    if (!f.startsWith(APP_DIR) || !fs.existsSync(f)) return new Response('not found', { status: 404 });
    return new Response(await fsp.readFile(f), { headers: { 'content-type': mimeOf(f) } });
  });
  createWindow();
  app.on('second-instance', () => { const w = BrowserWindow.getAllWindows()[0]; if (w){ if (w.isMinimized()) w.restore(); w.focus(); } });
});
app.on('before-quit', flushStorage);
setInterval(flushStorage, 15000);
app.on('window-all-closed', () => { flushStorage(); app.quit(); });
