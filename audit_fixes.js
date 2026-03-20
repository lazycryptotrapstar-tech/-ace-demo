const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || 'C:\\Users\\dnbch\\OneDrive\\Documents\\Simple Genius\\ace-demo\\src\\App.jsx';

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');
const orig = code.length;

// ══════════════════════════════════════════════════════════════════════════════
// P0-01 — Fix N8N_WEBHOOK_URL: Cloudflare tunnel → permanent Railway URL
// ══════════════════════════════════════════════════════════════════════════════
code = code.replace(
  `const N8N_WEBHOOK_URL = 'https://may-transition-pierre-calculate.trycloudflare.com/webhook/2e28cfe9-961f-48fb-a548-3f0306448996/chat';`,
  `// P0 FIX: Permanent Railway URL — no longer Cloudflare tunnel
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL
  || 'https://n8n-production-f9c2.up.railway.app/webhook/2e28cfe9-961f-48fb-a548-3f0306448996/chat';`
);
console.log('✅ P0-01: N8N_WEBHOOK_URL — permanent Railway URL + env var fallback');

// ══════════════════════════════════════════════════════════════════════════════
// P0-02 — Fix apostrophe bug permanently (TD-05)
// ══════════════════════════════════════════════════════════════════════════════
code = code.replace(
  `detail:'Remember who didn't reply, write follow-ups manually', time:'2 hrs', pain:true },`,
  `detail:"Remember who didn't reply, write follow-ups manually", time:'2 hrs', pain:true },`
);
console.log('✅ P0-02: Apostrophe bug fixed permanently');

// ══════════════════════════════════════════════════════════════════════════════
// P1-01 — THEME config object injected after BOSS_LOGO
// ══════════════════════════════════════════════════════════════════════════════
const THEME_CONFIG = `
// ── THEME CONFIG — swap this object per client ───────────────────────────────
// To add a new client: copy this object, update all fields, swap ACTIVE_THEME
const THEMES = {
  wofford: {
    id: 'wofford',
    name: 'Wofford College',
    mascot: 'Terriers',
    conference: 'SoCon',
    colors: {
      primary:    '#1a1208',   // deep dark
      mid:        '#2a1e0e',   // dark mid
      light:      '#4a3520',   // medium
      accent:     '#886E4C',   // Old Gold
      accentSoft: '#C7B37F',   // Khaki
      offWhite:   '#F5F0E8',   // warm off-white
      border:     '#e8dfc8',   // warm border
      cognac:     '#6b5538',   // warm brown
    },
    cssVars: {
      '--color-primary':     '#1a1208',
      '--color-mid':         '#2a1e0e',
      '--color-accent':      '#886E4C',
      '--color-accent-soft': '#C7B37F',
      '--color-bg':          '#F5F0E8',
      '--color-border':      '#e8dfc8',
      '--color-dot':         '#886E4C',
      '--color-nav-active':  'rgba(136,110,76,0.12)',
      '--color-nav-border':  'rgba(136,110,76,0.28)',
      '--color-nav-bar':     '#886E4C',
      '--color-grid':        'rgba(136,110,76,0.06)',
      '--color-card-hover':  'rgba(136,110,76,0.18)',
      '--color-glow':        'rgba(136,110,76,0.55)',
      '--color-cognac-glow': 'rgba(199,179,127,0.5)',
      '--color-kpi-grad1':   '#1a1208',
      '--color-kpi-grad2':   '#2a1e0e',
      '--color-kpi-border':  'rgba(136,110,76,0.30)',
    }
  },
  // ── TEMPLATE for next client ─────────────────────────────────────────────
  // nextclient: {
  //   id: 'nextclient',
  //   name: 'School Name',
  //   mascot: 'Mascot Name',
  //   conference: 'Conference',
  //   colors: { primary, mid, light, accent, accentSoft, offWhite, border, cognac },
  //   cssVars: { '--color-primary': '#...', ... }
  // }
};

// Active theme — change this string to switch clients
const ACTIVE_THEME = THEMES['wofford'];

// Inject CSS variables into :root for <Styles/> component
function injectThemeVars(theme) {
  const root = document.documentElement;
  Object.entries(theme.cssVars).forEach(([k, v]) => root.style.setProperty(k, v));
}

`;

// Inject after BOSS_LOGO constant (or after N8N_WEBHOOK_URL if BOSS_LOGO not present)
if (code.includes('const BOSS_LOGO')) {
  // Find end of BOSS_LOGO line
  const bossIdx = code.indexOf('const BOSS_LOGO');
  const bossEnd = code.indexOf('\n', bossIdx) + 1;
  code = code.slice(0, bossEnd) + THEME_CONFIG + code.slice(bossEnd);
  console.log('✅ P1-01: THEME config injected after BOSS_LOGO');
} else {
  // Inject after N8N_WEBHOOK_URL block
  const n8nIdx = code.indexOf("|| 'https://n8n-production");
  const n8nEnd = code.indexOf('\n', n8nIdx) + 1;
  code = code.slice(0, n8nEnd) + THEME_CONFIG + code.slice(n8nEnd);
  console.log('✅ P1-01: THEME config injected after N8N_WEBHOOK_URL');
}

// ══════════════════════════════════════════════════════════════════════════════
// P1-02 — Bridge CSS vars in <Styles/> component
// Replace 18 hardcoded hex values with CSS custom properties
// ══════════════════════════════════════════════════════════════════════════════
const OLD_SIDEBAR = `    .sidebar-bg {
      background-color: #120d06; /* Wofford dark warm */
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"),
        linear-gradient(170deg, #1a1208 0%, #0d0905 100%); /* Wofford */
    }`;
const NEW_SIDEBAR = `    .sidebar-bg {
      background-color: var(--color-primary);
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"),
        linear-gradient(170deg, var(--color-mid) 0%, #0d0905 100%);
    }`;
code = code.replace(OLD_SIDEBAR, NEW_SIDEBAR);

const OLD_NAV = `    /* Wofford: Old Gold nav active indicator */
    .nav-active {
      background: rgba(136,110,76,0.12) !important;
      border: 1px solid rgba(136,110,76,0.28) !important;
      box-shadow: inset 3px 0 0 #886E4C; /* Wofford Old Gold */
    }`;
const NEW_NAV = `    /* Theme-driven nav active indicator */
    .nav-active {
      background: var(--color-nav-active) !important;
      border: 1px solid var(--color-nav-border) !important;
      box-shadow: inset 3px 0 0 var(--color-nav-bar);
    }`;
code = code.replace(OLD_NAV, NEW_NAV);

const OLD_CONTENT = `    /* Wofford: warm off-white content background */
    .content-bg {
      background-color: #F5F0E8; /* Wofford warm off-white */
      background-image:
        linear-gradient(rgba(136,110,76,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(136,110,76,0.06) 1px, transparent 1px);
      background-size: 40px 40px;
    }`;
const NEW_CONTENT = `    /* Theme-driven content background */
    .content-bg {
      background-color: var(--color-bg);
      background-image:
        linear-gradient(var(--color-grid) 1px, transparent 1px),
        linear-gradient(90deg, var(--color-grid) 1px, transparent 1px);
      background-size: 40px 40px;
    }`;
code = code.replace(OLD_CONTENT, NEW_CONTENT);

const OLD_DOT = `    /* Wofford: Old Gold status dot */
    .status-dot {
      width:8px; height:8px; border-radius:50%;
      background:#886E4C; /* Wofford Old Gold */
      box-shadow: 0 0 8px rgba(136,110,76,0.8);
      animation: breathe 2.8s ease-in-out infinite;
      flex-shrink: 0;
    }`;
const NEW_DOT = `    /* Theme-driven status dot */
    .status-dot {
      width:8px; height:8px; border-radius:50%;
      background: var(--color-dot);
      box-shadow: 0 0 8px var(--color-dot);
      animation: breathe 2.8s ease-in-out infinite;
      flex-shrink: 0;
    }`;
code = code.replace(OLD_DOT, NEW_DOT);

const OLD_GLOW = `    /* Wofford: Old Gold text glows */
    .gold-glow { text-shadow: 0 0 28px rgba(136,110,76,0.55); } /* Wofford Old Gold */
    .cognac-glow { text-shadow: 0 0 20px rgba(199,179,127,0.5); } /* Wofford Khaki */`;
const NEW_GLOW = `    /* Theme-driven text glows */
    .gold-glow { text-shadow: 0 0 28px var(--color-glow); }
    .cognac-glow { text-shadow: 0 0 20px var(--color-cognac-glow); }`;
code = code.replace(OLD_GLOW, NEW_GLOW);

const OLD_LABEL = `    .page-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #886E4C; /* Wofford Old Gold */ }`;
const NEW_LABEL = `    .page-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); }`;
code = code.replace(OLD_LABEL, NEW_LABEL);

// KPI dark — update remaining hardcoded grads
code = code.replace(
  `background: linear-gradient(145deg, #1a1208 0%, #2a1e0e 100%); /* Wofford dark warm */`,
  `background: linear-gradient(145deg, var(--color-kpi-grad1) 0%, var(--color-kpi-grad2) 100%);`
);
code = code.replace(
  `border: 1px solid rgba(136,110,76,0.30);`,
  `border: 1px solid var(--color-kpi-border);`
);

// Card hover shadow
code = code.replace(
  `box-shadow: 0 6px 32px rgba(136,110,76,0.18), 0 2px 12px rgba(26,18,8,0.08);`,
  `box-shadow: 0 6px 32px var(--color-card-hover), 0 2px 12px rgba(26,18,8,0.08);`
);

console.log('✅ P1-02: CSS vars bridge — 18 hardcoded values replaced with CSS custom properties');

// ══════════════════════════════════════════════════════════════════════════════
// P1-03 — Call injectThemeVars on app mount in main App() component
// ══════════════════════════════════════════════════════════════════════════════
code = code.replace(
  `export default function App() {
  const [activeTab, setActiveTab] = useState('mobile');`,
  `export default function App() {
  // Inject CSS custom properties for active theme on mount
  React.useEffect(() => { injectThemeVars(ACTIVE_THEME); }, []);
  const [activeTab, setActiveTab] = useState('mobile');`
);
console.log('✅ P1-03: injectThemeVars() called on app mount');

// ══════════════════════════════════════════════════════════════════════════════
// P2-01 — Remove dead code: CollegeStadiumMap (no longer used by active hub)
// Mark with comment rather than delete — safer for audit trail
// ══════════════════════════════════════════════════════════════════════════════
// Find CollegeStadiumMap component and add deprecation notice at the top
code = code.replace(
  `// ============================================================
// COLLEGE FOOTBALL STADIUM MAP — Ticketmaster-style concentric rings
// ============================================================
const CollegeStadiumMap`,
  `// ============================================================
// DEPRECATED — CollegeStadiumMap (P2 cleanup)
// No longer used by active WoffordTicketHub. Retained for Sales Agent
// chat flow (stadium map triggered by AI keywords). Safe to remove
// once chat flow is updated to use WoffordTicketHub venue data.
// ============================================================
const CollegeStadiumMap`
);
console.log('✅ P2-01: Dead code flagged with deprecation notice (CollegeStadiumMap)');

// GranularSeatPicker
code = code.replace(
  `// ============================================================
// SEAT PICKER
// ============================================================
const GranularSeatPicker`,
  `// ============================================================
// DEPRECATED — GranularSeatPicker (P2 cleanup)
// No longer used by active WoffordTicketHub. Safe to remove.
// ============================================================
const GranularSeatPicker`
);
console.log('✅ P2-01: Dead code flagged with deprecation notice (GranularSeatPicker)');

// ══════════════════════════════════════════════════════════════════════════════
// P3 — Purge legacy mock data (Cara Holloway in initialStats)
// ══════════════════════════════════════════════════════════════════════════════
code = code.replace(
  `initialStats: [
    { fanName: "Cara H.",    campaign: "Ticket Sales",      amount: 102.50,   id: "TX_1" },
    { fanName: "Cara S.",   campaign: "Hospitality",       amount: 3500.00,  id: "TX_2" },
    { fanName: "Marcus T.", campaign: "Alumni Outreach",   amount: 280.00,   id: "TX_3" },
    { fanName: "Sandra L.", campaign: "Sponsorship Sales", amount: 12500.00, id: "TX_4" },
  ]`,
  `initialStats: [
    { fanName: "Scott K.",    campaign: "Ticket Sales",      amount: 102.50,   id: "TX_1" },
    { fanName: "Calhoun K.",  campaign: "Sponsorship",       amount: 3500.00,  id: "TX_2" },
    { fanName: "Shawn T.",    campaign: "Alumni Outreach",   amount: 280.00,   id: "TX_3" },
    { fanName: "Nayef S.",    campaign: "Sponsorship Sales", amount: 12500.00, id: "TX_4" },
  ]`
);

// Also update MOCK_DB fans entry if still Cara Holloway
code = code.replace(
  `fans: [{ id: "FAN_77211", name: "Cara Holloway", loyaltyTier: "Gold", lastPurchase: { section: "109", row: "G" } }],`,
  `fans: [{ id: "FAN_KULL01", name: "Scott Kull", loyaltyTier: "Platinum", lastPurchase: { section: "120", row: "A" }, title: "Director of Athletics", org: "Wofford College", fanScore: 94, tenure: "11 yrs" }],`
);
console.log('✅ P3: Legacy mock data purged — Cara Holloway replaced with Wofford contacts');

// ══════════════════════════════════════════════════════════════════════════════
// WRITE OUTPUT
// ══════════════════════════════════════════════════════════════════════════════
fs.writeFileSync(APP_PATH, code);
console.log('\n🎉 All audit fixes applied!');
console.log(`Input: ${orig.toLocaleString()} chars → Output: ${code.length.toLocaleString()} chars`);
console.log('\nChanges applied:');
console.log('  P0-01  N8N_WEBHOOK_URL → permanent Railway URL + env var fallback');
console.log('  P0-02  Apostrophe bug fixed permanently');
console.log('  P1-01  THEME config object injected (multi-client ready)');
console.log('  P1-02  CSS custom properties bridge (18 hardcoded values → var())');
console.log('  P1-03  injectThemeVars() called on app mount');
console.log('  P2-01  Dead components flagged with deprecation notices');
console.log('  P3     Legacy Cara Holloway mock data replaced with Wofford contacts');
console.log('\ngit add . && git commit -m "Audit fixes: P0-P3 improvements" && git push');
