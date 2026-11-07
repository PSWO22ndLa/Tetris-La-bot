// Stack Lab 桌面版：頁面掛在假網域 https://stacklab.invalid/，跟 Vercel 上一樣有同網域的 /tio/* → tetr.io 轉發
// （頁面程式完全不用改）；/tio/res/* 抓過一次就存在使用者資料夾，之後離線也能用
const { app, BrowserWindow, protocol, net, shell, Menu } = require('electron');
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
    return net.fetch(target, { method: req.method, headers: req.headers, body: req.body, duplex: 'half', bypassCustomProtocolHandlers: true });
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

function createWindow(){
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 360, minHeight: 480, backgroundColor: '#0b0d12', title: 'Stack Lab',
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
  win.loadURL(`https://${HOST}/`);
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  protocol.handle('https', async req => {
    const u = new URL(req.url);
    if (u.hostname !== HOST) return net.fetch(req, { bypassCustomProtocolHandlers: true });
    if (u.pathname.startsWith('/tio/')) return tio(req, u);
    let p = decodeURIComponent(u.pathname); if (p === '/' || p === '') p = '/index.html';
    const f = path.join(APP_DIR, path.normalize(p).replace(/^(\.\.[\\/])+/, ''));
    if (!f.startsWith(APP_DIR) || !fs.existsSync(f)) return new Response('not found', { status: 404 });
    return new Response(await fsp.readFile(f), { headers: { 'content-type': mimeOf(f) } });
  });
  createWindow();
  app.on('second-instance', () => { const w = BrowserWindow.getAllWindows()[0]; if (w){ if (w.isMinimized()) w.restore(); w.focus(); } });
});
app.on('window-all-closed', () => app.quit());
