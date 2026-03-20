const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || 'C:\\Users\\dnbch\\OneDrive\\Documents\\Simple Genius\\ace-demo\\src\\App.jsx';

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');

// ── RENAME ACE → BOSS (display only — not variable names or API calls) ────────

// Chat header title
code = code.split(`<p className="futura-heading text-white" style={{fontSize:'17px', lineHeight:'1.2'}}>{CAMPAIGNS[campaign]?.title}</p>`)
  .join(`<p className="futura-heading text-white" style={{fontSize:'17px', lineHeight:'1.2'}}>{CAMPAIGNS[campaign]?.title}</p>`);

// AI avatar icon label — Ace → Boss in message bubbles
code = code.replace(
  `<p className="mono-label text-center mt-2" style={{color:'rgba(255,255,255,0.18)', fontSize:'8px'}}>Ace \u00B7 Wofford Terriers</p>`,
  `<p className="mono-label text-center mt-2" style={{color:'rgba(255,255,255,0.18)', fontSize:'8px'}}>Boss \u00B7 Wofford Terriers</p>`
);

// Sidebar logo text Ace.ai → Boss.ai
code = code.replace(
  `Ace<span style={{color:C.limeBright}}>.</span><span style={{color:C.lime}}>ai</span>`,
  `Boss<span style={{color:C.limeBright}}>.</span><span style={{color:C.lime}}>ai</span>`
);

// Sidebar sub label
code = code.replace(
  `<p className="mono-label text-white/25" style={{fontSize:'8px'}}>Ticketing Intelligence</p>`,
  `<p className="mono-label text-white/25" style={{fontSize:'8px'}}>Wofford Terriers \u00B7 SoCon</p>`
);

// How It Works tab — "Ace Automated" section
code = code.replace(
  `After \u2014 Ace Automated`,
  `After \u2014 Boss Automated`
);
code = code.replace(
  `Simply Genius`,
  `Simple Genius`
);
code = code.replace(
  `powered by Simply Genius`,
  `powered by Simple Genius`
);

// How It Works automation chain — Ace AI step
code = code.replace(
  `{ step:'02', label:'Ace AI', sub:'Reads profile, drafts email'`,
  `{ step:'02', label:'Boss AI', sub:'Reads profile, drafts email'`
);

// CRM tab — AI Drafted label
code = code.replace(
  `<span className="text-sm font-black" style={{color:C.green}}>AI-Drafted \u00B7 {campaigns.find(c=>c.id===crmCampaign)?.label}</span>`,
  `<span className="text-sm font-black" style={{color:C.green}}>Boss-Drafted \u00B7 {campaigns.find(c=>c.id===crmCampaign)?.label}</span>`
);

// CRM loading state
code = code.replace(
  `<p className="text-xl font-black mb-2" style={{color:C.green}}>Drafting for {selectedContact?.name}...</p>
            <p className="text-slate-400 text-sm font-semibold">Ace is personalizing based on their history</p>`,
  `<p className="text-xl font-black mb-2" style={{color:C.green}}>Drafting for {selectedContact?.name}...</p>
            <p className="text-slate-400 text-sm font-semibold">Boss is personalizing based on their history</p>`
);

// System prompts — update Ace name in AI persona
code = code.replace(/You are Ace,/g, 'You are Boss,');
code = code.replace(/You are Ace /g, 'You are Boss ');

// Campaign sub labels that say "Ace"
code = code.replace(/Ace \u00B7/g, 'Boss \u00B7');
code = code.replace(/· Ace$/gm, '· Boss');

// Message placeholder
code = code.replace(
  `placeholder="Message Ace..."`,
  `placeholder="Message Boss..."`
);

// Mobile demo footer (catch any remaining)
code = code.split('Ace \u00B7 Wofford Terriers').join('Boss \u00B7 Wofford Terriers');
code = code.split('Ace \u00B7 Peak Sports AI').join('Boss \u00B7 Wofford Terriers');

// Page title / brand in any remaining spots  
// Note: do NOT rename the JS variable names (askAce, CAMPAIGNS etc) — those are internal only

console.log('✅ Ace → Boss display rename complete');

fs.writeFileSync(APP_PATH, code);
console.log('\n🐾 Boss is live!');
console.log('git add . && git commit -m "Rename Ace to Boss for Wofford" && git push');
