const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || 'C:\\Users\\dnbch\\OneDrive\\Documents\\Simple Genius\\ace-demo\\src\\App.jsx';

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');

// ── BOSS LOGO BASE64 ──────────────────────────────────────────────────────────
// Optimized 64x64 PNG, transparent background, ~8KB
const BOSS_B64 = fs.readFileSync(path.join(__dirname, 'boss_icon.txt'), 'utf8').trim();
const BOSS_SRC = `data:image/png;base64,${BOSS_B64}`;

// ── INJECT BOSS_LOGO CONSTANT near top of file ───────────────────────────────
// Add after the N8N_WEBHOOK_URL line
if (!code.includes('const BOSS_LOGO')) {
  code = code.replace(
    `const N8N_WEBHOOK_URL =`,
    `// Boss mascot logo (Wofford Terriers)\nconst BOSS_LOGO = "${BOSS_SRC}";\n\nconst N8N_WEBHOOK_URL =`
  );
  console.log('✅ BOSS_LOGO constant injected');
}

// ── REPLACE LIGHTNING BOLT ICONS WITH BOSS LOGO ──────────────────────────────

// Helper: replace Zap icon with Boss img in specific contexts
// We target: sidebar icon, chat header icon, message bubble avatar

// 1. Sidebar nav icon (Zap in the logo area)
code = code.replace(
  `<Zap size={16} style={{color:C.lime, position:'relative'}}/>`,
  `<img src={BOSS_LOGO} alt="Boss" style={{width:'20px',height:'20px',objectFit:'contain',position:'relative',filter:'drop-shadow(0 0 3px rgba(136,110,76,0.6))'}} />`
);
console.log('✅ Sidebar logo icon');

// 2. Chat header icon (Zap in the campaign header inside mobile demo)
code = code.replace(
  `<div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{background:'rgba(92,184,50,0.1)', border:'1px solid rgba(92,184,50,0.25)'}}>
              <Zap size={20} style={{color:C.lime}}/>
            </div>`,
  `<div className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden" style={{background:'rgba(136,110,76,0.1)', border:'1px solid rgba(136,110,76,0.25)'}}>
              <img src={BOSS_LOGO} alt="Boss" style={{width:'36px',height:'36px',objectFit:'contain'}} />
            </div>`
);
console.log('✅ Chat header icon');

// 3. Message bubble AI avatar (small Zap next to AI messages)
code = code.replace(
  `<div className="w-8 h-8 rounded-xl flex items-center justify-center mr-2 shrink-0 mt-1 shadow-md" style={{background:C.greenMid}}>
                <Zap size={13} style={{color:C.lime}}/>
              </div>`,
  `<div className="w-8 h-8 rounded-xl flex items-center justify-center mr-2 shrink-0 mt-1 shadow-md overflow-hidden" style={{background:C.greenMid}}>
                <img src={BOSS_LOGO} alt="Boss" style={{width:'28px',height:'28px',objectFit:'contain'}} />
              </div>`
);
console.log('✅ Message bubble avatar');

// 4. Typing indicator avatar
code = code.replace(
  `<div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md" style={{background:C.greenMid}}>
              <Zap size={13} style={{color:C.lime}}/>
            </div>`,
  `<div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md overflow-hidden" style={{background:C.greenMid}}>
              <img src={BOSS_LOGO} alt="Boss" style={{width:'28px',height:'28px',objectFit:'contain'}} />
            </div>`
);
console.log('✅ Typing indicator avatar');

// 5. Send button icon (Zap inside the send button)
// Keep this as Zap — it's a send action, not a branding element
// Actually replace it too for full consistency
code = code.replace(
  `<div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{background:'rgba(92,184,50,0.12)', border:'1px solid rgba(92,184,50,0.25)'}}>
              <Zap size={20} style={{color:C.lime}}/>
            </div>`,
  `<div className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden" style={{background:'rgba(136,110,76,0.12)', border:'1px solid rgba(136,110,76,0.25)'}}>
              <img src={BOSS_LOGO} alt="Boss" style={{width:'36px',height:'36px',objectFit:'contain'}} />
            </div>`
);

// 6. Campaign selector card icons — replace Zap in TICKETING and any campaign
code = code.replace(
  `icon: <Zap size={20} />,`,
  `icon: <img src={BOSS_LOGO} alt="Boss" style={{width:'20px',height:'20px',objectFit:'contain'}} />,`
);
console.log('✅ Campaign card icon');

// 7. CRM drafting sparkle — keep Sparkles icon, it's decorative not branding

// ── WRITE ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(APP_PATH, code);
console.log('\n🐾 Boss logo replacing lightning bolts — done!');
console.log('git add . && git commit -m "Boss logo replaces lightning bolt icons" && git push');
