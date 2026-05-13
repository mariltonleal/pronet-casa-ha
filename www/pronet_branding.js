/**
 * ProNet Casa — Home Assistant Branding Module v4
 *
 * DOM path (HA 2026.x):
 *   home-assistant > home-assistant-main > ha-sidebar
 *
 * Features:
 *   - Logo PNG real na sidebar (fundo branco arredondado)
 *   - Visual global (cards, scrollbar, transicoes)
 *
 * Nota: login page usa authorize_override.html (nao depende deste JS)
 */

const LOGO_URL = "/local/pronet_casa_logo.png";

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

  // Inject logo PNG com fundo branco arredondado
  const title = sr.querySelector(".menu .title");
  if (title && !title.querySelector(".pn-logo")) {
    title.style.cssText = "font-size:0;color:transparent;position:relative;min-height:48px;display:flex;align-items:center;overflow:visible;";

    const wrap = document.createElement("div");
    wrap.className = "pn-logo";
    wrap.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      border-radius: 12px;
      padding: 8px 14px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      margin: 4px 0;
    `;

    const img = document.createElement("img");
    img.src = LOGO_URL;
    img.alt = "ProNet Casa";
    img.style.cssText = "height:28px;width:auto;display:block;max-width:160px;object-fit:contain;";

    wrap.appendChild(img);
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
retryUntil(brandSidebar, 500, 30);

let prevPath = location.pathname;
setInterval(() => {
  if (location.pathname !== prevPath) {
    prevPath = location.pathname;
    retryUntil(brandSidebar, 500, 15);
  }
}, 1000);
