const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || path.join('C:\\Users\\dnbch\\OneDrive\\Documents\\Simple Genius\\ace-demo\\src\\App.jsx');

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');

// ── 1. GIBBS STADIUM on field map ────────────────────────────────────────────
code = code.replace(
  `<text x={cx} y={cy+5} fill="rgba(255,255,255,0.12)" fontSize="11" fontWeight="black" textAnchor="middle" letterSpacing="3">FIELD</text>`,
  `<text x={cx} y={cy-6} fill="rgba(255,255,255,0.13)" fontSize="9" fontWeight="black" textAnchor="middle" letterSpacing="2">GIBBS</text>
        <text x={cx} y={cy+7} fill="rgba(255,255,255,0.13)" fontSize="9" fontWeight="black" textAnchor="middle" letterSpacing="2">STADIUM</text>`
);
console.log('✅ Gibbs Stadium');

// ── 2. TERRIERS ref in Sales Agent header ────────────────────────────────────
code = code.replace(
  `<p className="mono-label text-white/25" style={{fontSize:'8px'}}>Wofford Terriers · SoCon</p>`,
  `<p className="mono-label text-white/25" style={{fontSize:'8px'}}>Wofford Terriers · SoCon · Go Terriers 🐾</p>`
);
console.log('✅ Terriers mascot ref');

// ── 3. WOFFORD WORDMARK in sidebar (replace Ace.ai logo block) ───────────────
code = code.replace(
  `<h1 className="futura-heading text-white" style={{fontSize:'22px', lineHeight:'1.1'}}>
                Ace<span style={{color:C.limeBright}}>.</span><span style={{color:C.lime}}>ai</span>
              </h1>`,
  `<h1 className="futura-heading text-white" style={{fontSize:'22px', lineHeight:'1.1'}}>
                Ace<span style={{color:C.limeBright}}>.</span><span style={{color:C.lime}}>ai</span>
              </h1>
              <div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'4px'}}>
                <svg width="14" height="14" viewBox="0 0 100 100" fill="none">
                  <ellipse cx="50" cy="54" rx="38" ry="30" fill="#886E4C" opacity="0.9"/>
                  <circle cx="35" cy="40" r="14" fill="#000" />
                  <circle cx="65" cy="40" r="14" fill="#000" />
                  <circle cx="35" cy="40" r="7" fill="#fff" opacity="0.9"/>
                  <circle cx="65" cy="40" r="7" fill="#fff" opacity="0.9"/>
                  <ellipse cx="50" cy="62" rx="14" ry="10" fill="#000" opacity="0.8"/>
                </svg>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:'8px',letterSpacing:'2px',color:'rgba(199,179,127,0.7)',textTransform:'uppercase'}}>Terriers</span>
              </div>`
);
console.log('✅ Wofford wordmark / Terriers mark in sidebar');

// ── 4. SCOTT KULL as active fan profile ──────────────────────────────────────
code = code.replace(
  `fans: [{ id: "FAN_77211", name: "Cara Holloway", loyaltyTier: "Gold", lastPurchase: { section: "109", row: "G" } }],`,
  `fans: [{ id: "FAN_KULL01", name: "Scott Kull", loyaltyTier: "Platinum", lastPurchase: { section: "120", row: "A" }, title: "Director of Athletics", org: "Wofford College", fanScore: 94, tenure: "11 yrs", sports: ["Football","Basketball","Baseball"], tags: ["Decision Maker","VIP","Institutional"] }],`
);
console.log('✅ Scott Kull as active fan');

// ── 5. UPDATE FAN CARD DISPLAY ───────────────────────────────────────────────
// Update the fan card initials WH → SK and name
code = code.replace(
  `<div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base" style={{background:C.greenMid}}>WH</div>
                    <div>
                      <p className="futura-heading text-slate-900" style={{fontSize:'16px'}}>Cara Holloway</p>
                      <p className="text-sm text-slate-400 flex items-center gap-1.5"><span style={{color:C.lime}}>★</span> Gold Member · Sec 109</p>
                    </div>`,
  `<div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base" style={{background:C.greenMid}}>SK</div>
                    <div>
                      <p className="futura-heading text-slate-900" style={{fontSize:'16px'}}>Scott Kull</p>
                      <p className="text-sm text-slate-400 flex items-center gap-1.5"><span style={{color:C.lime}}>★</span> Platinum · Dir. of Athletics</p>
                    </div>`
);
console.log('✅ Fan card updated to Scott Kull');

// ── 6. WOFFORD SCHOOL CARD color in Data Insights (all sport datasets) ───────
// Already handled by apply_wofford.js — verify and reinforce
code = code.replace(/primary:'#4a3b28', secondary:'#886E4C'/g, "primary:'#886E4C', secondary:'#000000'");
code = code.replace(/primary:'#4a3520', secondary:'#C7B37F'/g, "primary:'#886E4C', secondary:'#000000'");
console.log('✅ Wofford school card colors');

// ── 7. BOSS MASCOT SVG watermark — full app background ───────────────────────
// Inject a fixed-position SVG watermark into the app shell
// The Boss terrier head as a simplified SVG path, very low opacity
const BOSS_SVG = `
      {/* Wofford Boss Mascot — full app watermark */}
      <div style={{
        position:'fixed', bottom:0, right:0,
        width:'420px', height:'420px',
        pointerEvents:'none', zIndex:0,
        opacity:0.04, userSelect:'none',
        overflow:'hidden',
      }}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
          {/* Boston Terrier head — simplified Boss mascot */}
          {/* Skull */}
          <ellipse cx="100" cy="90" rx="68" ry="62" fill="#886E4C"/>
          {/* Ears */}
          <ellipse cx="44" cy="52" rx="20" ry="28" fill="#886E4C" transform="rotate(-15 44 52)"/>
          <ellipse cx="156" cy="52" rx="20" ry="28" fill="#886E4C" transform="rotate(15 156 52)"/>
          <ellipse cx="44" cy="50" rx="12" ry="20" fill="#000" transform="rotate(-15 44 50)"/>
          <ellipse cx="156" cy="50" rx="12" ry="20" fill="#000" transform="rotate(15 156 50)"/>
          {/* Face */}
          <ellipse cx="100" cy="94" rx="62" ry="56" fill="#000"/>
          {/* White blaze */}
          <ellipse cx="100" cy="78" rx="28" ry="36" fill="#fff"/>
          {/* Eyes */}
          <circle cx="74" cy="72" r="16" fill="#fff"/>
          <circle cx="126" cy="72" r="16" fill="#fff"/>
          <circle cx="76" cy="74" r="9" fill="#000"/>
          <circle cx="128" cy="74" r="9" fill="#000"/>
          <circle cx="78" cy="72" r="3" fill="#fff"/>
          <circle cx="130" cy="72" r="3" fill="#fff"/>
          {/* Nose */}
          <ellipse cx="100" cy="106" rx="22" ry="14" fill="#000"/>
          <ellipse cx="100" cy="103" rx="14" ry="8" fill="#333"/>
          {/* Mouth */}
          <path d="M82 118 Q100 132 118 118" stroke="#000" strokeWidth="3" fill="none"/>
          {/* Collar */}
          <rect x="32" y="148" width="136" height="22" rx="11" fill="#886E4C"/>
          <circle cx="60" cy="159" r="5" fill="#000"/>
          <circle cx="80" cy="159" r="5" fill="#000"/>
          <circle cx="100" cy="159" r="5" fill="#000"/>
          <circle cx="120" cy="159" r="5" fill="#000"/>
          <circle cx="140" cy="159" r="5" fill="#000"/>
          {/* Collar tag */}
          <circle cx="100" cy="172" r="9" fill="#C7B37F"/>
          <text x="100" y="177" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000">W</text>
        </svg>
      </div>`;

// Inject right after the opening <div className="app-shell content-bg">
code = code.replace(
  `<div className="app-shell content-bg">
      <Styles/>`,
  `<div className="app-shell content-bg" style={{position:'relative'}}>
      <Styles/>
      ${BOSS_SVG}`
);
console.log('✅ Boss mascot watermark injected');

// ── 8. WRITE OUTPUT ──────────────────────────────────────────────────────────
const out = APP_PATH;
fs.writeFileSync(out, code);
console.log('\n🎉 Wofford update 2 complete!');
console.log('Output:', out);
console.log('\ngit add . && git commit -m "Wofford branding v2" && git push');
