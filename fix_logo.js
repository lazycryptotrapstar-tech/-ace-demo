const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || 'C:\\Users\\dnbch\\OneDrive\\Documents\\Simple Genius\\ace-demo\\src\\App.jsx';

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');

// ── APPROACH: Replace broken BOSS_LOGO with inline SVG terrier ───────────────
// The base64 approach failed because boss_icon.txt wasn't read at runtime.
// SVG inline is more reliable — no external file dependency, renders everywhere.

const BOSS_SVG_LOGO = `
// ── BOSS MASCOT — inline SVG logo (no external file dependency) ──────────────
const BOSS_LOGO_SVG = (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    {/* Boston Terrier head — Boss mascot */}
    <ellipse cx="50" cy="46" rx="38" ry="34" fill="#886E4C"/>
    <ellipse cx="28" cy="28" rx="13" ry="18" fill="#886E4C" transform="rotate(-12 28 28)"/>
    <ellipse cx="72" cy="28" rx="13" ry="18" fill="#886E4C" transform="rotate(12 72 28)"/>
    <ellipse cx="28" cy="26" rx="8" ry="13" fill="#000" transform="rotate(-12 28 26)"/>
    <ellipse cx="72" cy="26" rx="8" ry="13" fill="#000" transform="rotate(12 72 26)"/>
    <ellipse cx="50" cy="50" rx="33" ry="28" fill="#000"/>
    <ellipse cx="50" cy="38" rx="18" ry="22" fill="#fff"/>
    <circle cx="36" cy="36" r="11" fill="#fff"/>
    <circle cx="64" cy="36" r="11" fill="#fff"/>
    <circle cx="37" cy="37" r="6" fill="#000"/>
    <circle cx="65" cy="37" r="6" fill="#000"/>
    <circle cx="39" cy="35" r="2" fill="#fff"/>
    <circle cx="67" cy="35" r="2" fill="#fff"/>
    <ellipse cx="50" cy="58" rx="14" ry="9" fill="#1a1208"/>
    <ellipse cx="50" cy="55" rx="9" ry="5" fill="#333"/>
    <path d="M38 66 Q50 76 62 66" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <rect x="20" y="76" width="60" height="14" rx="7" fill="#886E4C"/>
    <circle cx="34" cy="83" r="4" fill="#000"/>
    <circle cx="50" cy="83" r="4" fill="#000"/>
    <circle cx="66" cy="83" r="4" fill="#000"/>
    <circle cx="50" cy="92" r="6" fill="#C7B37F"/>
    <text x="50" y="96" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#000">W</text>
  </svg>
);
const BOSS_LOGO = null; // SVG version used instead
`;

// Find where BOSS_LOGO is currently defined and replace the whole block
const bossStart = code.indexOf('// Boss mascot logo');
const bossEnd = code.indexOf('\n\n', code.indexOf('const BOSS_LOGO')) + 2;

if (bossStart !== -1 && bossEnd > bossStart) {
  code = code.slice(0, bossStart) + BOSS_SVG_LOGO + code.slice(bossEnd);
  console.log('✅ BOSS_LOGO replaced with inline SVG');
} else {
  // Try replacing just the BOSS_LOGO line
  const logoLine = code.indexOf('const BOSS_LOGO =');
  if (logoLine !== -1) {
    const logoEnd = code.indexOf(';\n', logoLine) + 2;
    code = code.slice(0, logoLine) + BOSS_SVG_LOGO + code.slice(logoEnd);
    console.log('✅ BOSS_LOGO line replaced with inline SVG');
  } else {
    console.log('⚠️  BOSS_LOGO not found — injecting after N8N_WEBHOOK_URL');
    code = code.replace(
      "|| 'https://n8n-production-f9c2.up.railway.app/webhook/2e28cfe9-961f-48fb-a548-3f0306448996/chat';",
      "|| 'https://n8n-production-f9c2.up.railway.app/webhook/2e28cfe9-961f-48fb-a548-3f0306448996/chat';\n" + BOSS_SVG_LOGO
    );
  }
}

// ── NOW update all BOSS_LOGO img tags to use SVG component ───────────────────
// Replace: <img src={BOSS_LOGO} alt="Boss" style={{...}} />
// With: <div style={{...}}>{BOSS_LOGO_SVG}</div>

// Sidebar logo (largest instance)
code = code.replace(
  `<img src={BOSS_LOGO} alt="Boss" style={{width:'20px',height:'20px',objectFit:'contain',position:'relative',filter:'drop-shadow(0 0 3px rgba(136,110,76,0.6))'}} />`,
  `<div style={{width:'20px',height:'20px',position:'relative'}}>{BOSS_LOGO_SVG}</div>`
);

// Chat header icon
code = code.replace(
  `<img src={BOSS_LOGO} alt="Boss" style={{width:'36px',height:'36px',objectFit:'contain'}} />`,
  `<div style={{width:'32px',height:'32px'}}>{BOSS_LOGO_SVG}</div>`
);

// Message bubble avatar (28px)
code = code.replace(
  `<img src={BOSS_LOGO} alt="Boss" style={{width:'28px',height:'28px',objectFit:'contain'}} />`,
  `<div style={{width:'24px',height:'24px'}}>{BOSS_LOGO_SVG}</div>`
);

// Campaign card icon
code = code.replace(
  `icon: <img src={BOSS_LOGO} alt="Boss" style={{width:'20px',height:'20px',objectFit:'contain'}} />,`,
  `icon: <div style={{width:'20px',height:'20px'}}>{BOSS_LOGO_SVG}</div>,`
);

console.log('✅ All BOSS_LOGO img tags replaced with inline SVG');

fs.writeFileSync(APP_PATH, code);
console.log('\n🐾 Logo fix complete!');
console.log('git add . && git commit -m "Boss logo fix - inline SVG" && git push');
