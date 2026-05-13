/**
 * ProNet Casa — Home Assistant Branding Module v3
 *
 * DOM path (HA 2026.x):
 *   home-assistant > home-assistant-main > ha-sidebar
 *
 * Features:
 *   - SVG logo on sidebar (replaces "Home Assistant" title)
 *   - Login page branding
 *   - Global visual polish (cards, scrollbar, transitions)
 */

const LOGO_URL = "/local/pronet_casa_logo.png";

/* ── SVG logo (white + yellow accent on dark sidebar) ── */
const SIDEBAR_LOGO_SVG = `
<svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
  <text x="4" y="34" font-family="'Nunito Sans',sans-serif" font-weight="800"
        font-size="28" fill="#FFFFFF" letter-spacing="-0.5">
    Pro<tspan fill="#35BFFF">N</tspan>et
  </text>
  <g transform="translate(135,6)">
    <path d="M22,4 L34,14 L34,28 L28,28 L28,20 L22,20 L22,28 L10,28 L10,14 Z"
          fill="none" stroke="#FBB724" stroke-width="2" stroke-linejoin="round"/>
    <rect x="24" y="12" width="4" height="4" fill="#FBB724" rx="0.5"/>
    <text x="-2" y="42" font-family="'Nunito Sans',sans-serif"
          font-weight="700" font-size="14" fill="#FBB724">Casa</text>
  </g>
</svg>`;

/* ── helpers ─────────────────────────────────────────── */

function injectStyle(root, id, css) {
  if (!root || root.querySelector("#" + id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.textContent = css;
  root.appendChild(s);
}

function retryUntil(fn, interval, maxTries) {
  let n = 0;
  const id = setInterval(() => {
    if (fn() || ++n >= maxTries) clearInterval(id);
  }, interval);
}

/* ── sidebar ─────────────────────────────────────────── */

function brandSidebar() {
  const ha = document.querySelector("home-assistant");
  const main = ha?.shadowRoot?.querySelector("home-assistant-main");
  const sidebar = main?.shadowRoot?.querySelector("ha-sidebar");
  const sr = sidebar?.shadowRoot;
  if (!sr) return false;

  // Inject logo SVG
  const title = sr.querySelector(".menu .title");
  if (title && !title.querySelector(".pn-logo")) {
    title.style.cssText = "font-size:0;color:transparent;position:relative;min-height:48px;display:flex;align-items:center;overflow:visible;";
    const wrap = document.createElement("div");
    wrap.className = "pn-logo";
    wrap.style.cssText = "height:36px;display:flex;align-items:center;";
    wrap.innerHTML = SIDEBAR_LOGO_SVG;
    wrap.querySelector("svg").style.cssText = "height:36px;width:auto;";
    title.appendChild(wrap);
  }

  // Inject styles
  injectStyle(sr, "pn-sidebar", `
    .menu {
      border-bottom: 1px solid rgba(53,191,255,0.12) !important;
      padding-bottom: 8px !important;
    }
    ha-md-list-item {
      border-radius: 12px !important;
      margin: 1px 8px !important;
      transition: background-color 0.2s ease !important;
    }
    :host::after {
      content: "";
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 80px;
      background: linear-gradient(180deg, transparent, rgba(0,119,255,0.05));
      pointer-events: none;
    }
  `);

  return true;
}

/* ── login page ──────────────────────────────────────── */

function brandLogin() {
  const auth = document.querySelector("ha-authorize");
  if (!auth) return false;

  const root = auth.shadowRoot || auth;

  injectStyle(root, "pn-login", `
    :host {
      --primary-color: #0077FF !important;
      background: linear-gradient(170deg, #003A70 0%, #0077FF 100%) !important;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    ha-auth-flow, .card-content {
      background: #FFFFFF !important;
      border-radius: 24px !important;
      box-shadow: 0 8px 40px rgba(0,58,112,0.2) !important;
    }
    :host::before {
      content: "";
      display: block;
      width: 240px; height: 80px;
      margin: 0 auto 32px;
      background: url("${LOGO_URL}") center / contain no-repeat;
    }
    :host::after {
      content: "";
      position: fixed;
      bottom: 0; left: 0; right: 0;
      height: 100px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='rgba(255,255,255,0.07)' d='M0,50 C320,100 640,0 960,50 S1440,80 1440,50 L1440,100 L0,100Z'/%3E%3C/svg%3E") bottom/100% 100px no-repeat;
      pointer-events: none;
    }
  `);

  injectStyle(document.head, "pn-login-body", `
    body {
      background: linear-gradient(170deg, #003A70 0%, #0077FF 100%) !important;
      font-family: 'Nunito Sans', sans-serif !important;
    }
  `);

  return true;
}

/* ── global polish ───────────────────────────────────── */

function brandGlobal() {
  injectStyle(document.head, "pn-global", `
    ha-card {
      transition: box-shadow 0.3s ease, transform 0.2s ease !important;
    }
    ha-card:hover {
      box-shadow: 0 4px 20px rgba(0,58,112,0.10) !important;
      transform: translateY(-1px);
    }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(0,119,255,0.2); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(0,119,255,0.4); }
    @keyframes pnFadeIn {
      from { opacity:0; transform:translateY(6px); }
      to   { opacity:1; transform:translateY(0); }
    }
    hui-view { animation: pnFadeIn 0.35s ease-out; }
  `);
}

/* ── init ────────────────────────────────────────────── */

brandGlobal();

if (location.pathname.includes("/auth/")) {
  retryUntil(brandLogin, 500, 30);
} else {
  retryUntil(brandSidebar, 500, 30);
}

let prevPath = location.pathname;
setInterval(() => {
  if (location.pathname !== prevPath) {
    prevPath = location.pathname;
    if (location.pathname.includes("/auth/")) {
      retryUntil(brandLogin, 500, 15);
    } else {
      retryUntil(brandSidebar, 500, 15);
    }
  }
}, 1000);
