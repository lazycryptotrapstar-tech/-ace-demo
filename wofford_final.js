const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || 'C:\\Users\\dnbch\\OneDrive\\Documents\\Simple Genius\\ace-demo\\src\\App.jsx';

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');

// ── FIX APOSTROPHE BUG (permanent) ───────────────────────────────────────────
// This line breaks the build every time — fix it first, before anything else
code = code.replace(
  `detail:'Remember who didn't reply, write follow-ups manually', time:'2 hrs', pain:true },`,
  `detail:"Remember who didn't reply, write follow-ups manually", time:'2 hrs', pain:true },`
);
console.log('✅ Apostrophe bug fixed');

// ── WOFFORD COLORS (idempotent — safe to run multiple times) ─────────────────
const OLD_C = `const C = {
  green:      '#0f2213',
  greenMid:   '#1a3d20',
  greenLight: '#2a6632',
  lime:       '#5cb832',
  limeDim:    'rgba(92,184,50,0.12)',
  limeBright: '#72d43e',
  white:      '#ffffff',
  offWhite:   '#f4f7f2',
  slate:      '#445544',
  slateLight: '#dde8d8',
  // aliases so existing code that references gold still works
  gold:       '#5cb832',
  goldLight:  '#72d43e',
  cognac:     '#3a8c1e',
  cognacDim:  'rgba(58,140,30,0.12)',
};`;
const NEW_C = `// ── WOFFORD COLLEGE BRAND THEME ─────────────────────────────────────────────
// Old Gold #886E4C (PMS 873 C) · Khaki #C7B37F (PMS 466 C) · Black #000000
const C = {
  green:      '#1a1208',
  greenMid:   '#2a1e0e',
  greenLight: '#4a3520',
  lime:       '#886E4C',
  limeDim:    'rgba(136,110,76,0.12)',
  limeBright: '#C7B37F',
  white:      '#ffffff',
  offWhite:   '#F5F0E8',
  slate:      '#3a2e1e',
  slateLight: '#e8dfc8',
  gold:       '#886E4C',
  goldLight:  '#C7B37F',
  cognac:     '#6b5538',
  cognacDim:  'rgba(107,85,56,0.12)',
};`;
if (code.includes(OLD_C)) { code = code.replace(OLD_C, NEW_C); console.log('✅ C colors'); }

// CSS
const cssMap = [
  ['background-color: #0c1a0e;','background-color: #120d06;'],
  ['linear-gradient(170deg, #101e12 0%, #090f0a 100%);','linear-gradient(170deg, #1a1208 0%, #0d0905 100%);'],
  ['background: rgba(92,184,50,0.09) !important;','background: rgba(136,110,76,0.12) !important;'],
  ['border: 1px solid rgba(92,184,50,0.22) !important;','border: 1px solid rgba(136,110,76,0.28) !important;'],
  ['box-shadow: inset 3px 0 0 #5cb832;','box-shadow: inset 3px 0 0 #886E4C;'],
  ['background-color: #f4f7f2;','background-color: #F5F0E8;'],
  ['linear-gradient(rgba(15,34,19,0.04) 1px, transparent 1px),','linear-gradient(rgba(136,110,76,0.06) 1px, transparent 1px),'],
  ['linear-gradient(90deg, rgba(15,34,19,0.04) 1px, transparent 1px);','linear-gradient(90deg, rgba(136,110,76,0.06) 1px, transparent 1px);'],
  ['border: 1px solid #dde8d8;','border: 1px solid #e8dfc8;'],
  ['box-shadow: 0 2px 20px rgba(15,34,19,0.05);','box-shadow: 0 2px 20px rgba(136,110,76,0.07);'],
  ['box-shadow: 0 6px 32px rgba(92,184,50,0.12), 0 2px 12px rgba(15,34,19,0.07);','box-shadow: 0 6px 32px rgba(136,110,76,0.18), 0 2px 12px rgba(26,18,8,0.08);'],
  ['background: linear-gradient(145deg, #0c1a0e 0%, #132118 100%);','background: linear-gradient(145deg, #1a1208 0%, #2a1e0e 100%);'],
  ['border: 1px solid rgba(92,184,50,0.25);','border: 1px solid rgba(136,110,76,0.30);'],
  ['.gold-glow { text-shadow: 0 0 28px rgba(92,184,50,0.45); }','.gold-glow { text-shadow: 0 0 28px rgba(136,110,76,0.55); }'],
  ['.cognac-glow { text-shadow: 0 0 20px rgba(92,184,50,0.4); }','.cognac-glow { text-shadow: 0 0 20px rgba(199,179,127,0.5); }'],
  ['color: #5cb832; }','color: #886E4C; }'],
  ['background:#5cb832;\n      box-shadow: 0 0 8px rgba(92,184,50,0.8);','background:#886E4C;\n      box-shadow: 0 0 8px rgba(136,110,76,0.8);'],
];
cssMap.forEach(([a,b]) => { code = code.split(a).join(b); });
console.log('✅ CSS');

// Branding
code = code.split('Ticketing Intelligence').join('Wofford Terriers \u00B7 SoCon');
code = code.split('Ace \u00B7 Peak Sports AI').join('Ace \u00B7 Wofford Terriers');
code = code.split("style={{background:'#0f2213'}}>").join("style={{background:'#1a1208'}}>");
code = code.replace(/borderColor:'#c8dac8'/g,"borderColor:'#d4c4a0'");
code = code.replace(/background:'#eef3ee'/g,"background:'#F5ECD8'");
code = code.replace(/background:'#e4ede4'/g,"background:'#ede3cc'");
code = code.replace(/color:'#3a5c38'/g,"color:'#4a3520'");
code = code.replace(/color:'#4a6741'/g,"color:'#4a3520'");
code = code.split("background:'rgba(15,34,19,0.08)'").join("background:'rgba(136,110,76,0.10)'");
code = code.replace(/rgba\(92,184,50,/g,'rgba(136,110,76,');
code = code.replace(/rgba\(58,140,30,/g,'rgba(107,85,56,');
code = code.replace(/rgba\(15,34,19,/g,'rgba(26,18,8,');
const hexMap=[
  ['#0f2213','#1a1208'],['#1a3d20','#2a1e0e'],['#2a6632','#4a3520'],
  ['#5cb832','#886E4C'],['#72d43e','#C7B37F'],['#3a8c1e','#6b5538'],
  ['#f4f7f2','#F5F0E8'],['#dde8d8','#e8dfc8'],['#445544','#3a2e1e'],
  ['#132118','#2a1e0e'],['#0c1a0e','#180f07'],['#09100d','#120d06'],
  ['#0a1208','#100b04'],['#092818','#1a1208'],['#04101a','#100b04'],
  ['#0a1f18','#1a1208'],['#0d2a1e','#1a1208'],
];
hexMap.forEach(([a,b])=>{ code=code.split(a).join(b); });
console.log('✅ Colors done');

// ── GIBBS STADIUM ────────────────────────────────────────────────────────────
if (!code.includes('GIBBS')) {
  code = code.replace(
    `<text x={cx} y={cy+5} fill="rgba(255,255,255,0.12)" fontSize="11" fontWeight="black" textAnchor="middle" letterSpacing="3">FIELD</text>`,
    `<text x={cx} y={cy-6} fill="rgba(255,255,255,0.13)" fontSize="9" fontWeight="black" textAnchor="middle" letterSpacing="2">GIBBS</text>\n        <text x={cx} y={cy+7} fill="rgba(255,255,255,0.13)" fontSize="9" fontWeight="black" textAnchor="middle" letterSpacing="2">STADIUM</text>`
  );
  console.log('✅ Gibbs Stadium');
} else { console.log('✅ Gibbs Stadium (already applied)'); }

// ── TERRIERS mascot ref ───────────────────────────────────────────────────────
code = code.replace(
  `<p className="mono-label text-white/25" style={{fontSize:'8px'}}>Wofford Terriers \u00B7 SoCon</p>`,
  `<p className="mono-label text-white/25" style={{fontSize:'8px'}}>Wofford Terriers \u00B7 SoCon \u00B7 Go Terriers \uD83D\uDC3E</p>`
);

// ── TERRIERS sidebar mark ─────────────────────────────────────────────────────
const TERRIERS_MARK = `<div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'4px'}}>
                <svg width="14" height="14" viewBox="0 0 100 100" fill="none">
                  <ellipse cx="50" cy="54" rx="38" ry="30" fill="#886E4C" opacity="0.9"/>
                  <circle cx="35" cy="40" r="14" fill="#000" />
                  <circle cx="65" cy="40" r="14" fill="#000" />
                  <circle cx="35" cy="40" r="7" fill="#fff" opacity="0.9"/>
                  <circle cx="65" cy="40" r="7" fill="#fff" opacity="0.9"/>
                  <ellipse cx="50" cy="62" rx="14" ry="10" fill="#000" opacity="0.8"/>
                </svg>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:'8px',letterSpacing:'2px',color:'rgba(199,179,127,0.7)',textTransform:'uppercase'}}>Terriers</span>
              </div>`;

if (!code.includes("'Terriers'")) {
  code = code.replace(
    `<h1 className="futura-heading text-white" style={{fontSize:'22px', lineHeight:'1.1'}}>\n                Ace<span style={{color:C.limeBright}}>.</span><span style={{color:C.lime}}>ai</span>\n              </h1>`,
    `<h1 className="futura-heading text-white" style={{fontSize:'22px', lineHeight:'1.1'}}>\n                Ace<span style={{color:C.limeBright}}>.</span><span style={{color:C.lime}}>ai</span>\n              </h1>\n              ${TERRIERS_MARK}`
  );
  console.log('✅ Terriers sidebar mark');
} else { console.log('✅ Terriers mark (already applied)'); }

// ── SCOTT KULL active fan ─────────────────────────────────────────────────────
code = code.replace(
  `fans: [{ id: "FAN_77211", name: "Cara Holloway", loyaltyTier: "Gold", lastPurchase: { section: "109", row: "G" } }],`,
  `fans: [{ id: "FAN_KULL01", name: "Scott Kull", loyaltyTier: "Platinum", lastPurchase: { section: "120", row: "A" }, title: "Director of Athletics", org: "Wofford College", fanScore: 94, tenure: "11 yrs" }],`
);
// Fan card initials + name
code = code.replace(
  `<div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base" style={{background:C.greenMid}}>WH</div>\n                    <div>\n                      <p className="futura-heading text-slate-900" style={{fontSize:'16px'}}>Cara Holloway</p>\n                      <p className="text-sm text-slate-400 flex items-center gap-1.5"><span style={{color:C.lime}}>\u2605</span> Gold Member \u00B7 Sec 109</p>\n                    </div>`,
  `<div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base" style={{background:C.greenMid}}>SK</div>\n                    <div>\n                      <p className="futura-heading text-slate-900" style={{fontSize:'16px'}}>Scott Kull</p>\n                      <p className="text-sm text-slate-400 flex items-center gap-1.5"><span style={{color:C.lime}}>\u2605</span> Platinum \u00B7 Dir. of Athletics</p>\n                    </div>`
);
console.log('✅ Scott Kull active fan');

// ── BOSS MASCOT WATERMARK ─────────────────────────────────────────────────────
if (!code.includes('GIBBS') || !code.includes('Boss Mascot')) {
const BOSS = `
      {/* Wofford Boss Mascot watermark */}
      <div style={{position:'fixed',bottom:0,right:0,width:'420px',height:'420px',pointerEvents:'none',zIndex:0,opacity:0.04,userSelect:'none',overflow:'hidden'}}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
          <ellipse cx="100" cy="90" rx="68" ry="62" fill="#886E4C"/>
          <ellipse cx="44" cy="52" rx="20" ry="28" fill="#886E4C" transform="rotate(-15 44 52)"/>
          <ellipse cx="156" cy="52" rx="20" ry="28" fill="#886E4C" transform="rotate(15 156 52)"/>
          <ellipse cx="44" cy="50" rx="12" ry="20" fill="#000" transform="rotate(-15 44 50)"/>
          <ellipse cx="156" cy="50" rx="12" ry="20" fill="#000" transform="rotate(15 156 50)"/>
          <ellipse cx="100" cy="94" rx="62" ry="56" fill="#000"/>
          <ellipse cx="100" cy="78" rx="28" ry="36" fill="#fff"/>
          <circle cx="74" cy="72" r="16" fill="#fff"/>
          <circle cx="126" cy="72" r="16" fill="#fff"/>
          <circle cx="76" cy="74" r="9" fill="#000"/>
          <circle cx="128" cy="74" r="9" fill="#000"/>
          <circle cx="78" cy="72" r="3" fill="#fff"/>
          <circle cx="130" cy="72" r="3" fill="#fff"/>
          <ellipse cx="100" cy="106" rx="22" ry="14" fill="#000"/>
          <ellipse cx="100" cy="103" rx="14" ry="8" fill="#333"/>
          <path d="M82 118 Q100 132 118 118" stroke="#000" strokeWidth="3" fill="none"/>
          <rect x="32" y="148" width="136" height="22" rx="11" fill="#886E4C"/>
          <circle cx="60" cy="159" r="5" fill="#000"/>
          <circle cx="80" cy="159" r="5" fill="#000"/>
          <circle cx="100" cy="159" r="5" fill="#000"/>
          <circle cx="120" cy="159" r="5" fill="#000"/>
          <circle cx="140" cy="159" r="5" fill="#000"/>
          <circle cx="100" cy="172" r="9" fill="#C7B37F"/>
          <text x="100" y="177" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000">W</text>
        </svg>
      </div>`;

code = code.replace(
  `<div className="app-shell content-bg">`,
  `<div className="app-shell content-bg" style={{position:'relative'}}>`
);
// inject after Styles tag
code = code.replace(
  `<div className="app-shell content-bg" style={{position:'relative'}}>\n      <Styles/>`,
  `<div className="app-shell content-bg" style={{position:'relative'}}>\n      <Styles/>${BOSS}`
);
console.log('✅ Boss mascot watermark');
} else { console.log('✅ Boss mascot (already applied)'); }

// ── FULL WOFFORD CRM ROSTER ───────────────────────────────────────────────────
const contactsStart = code.indexOf('const contacts = [');
const contactsEnd = code.indexOf('];', contactsStart) + 2;
const NEW_CONTACTS = `const contacts = [

  // ── ADMINISTRATION ────────────────────────────────────────────────────────
  { id:1,  name:'Nayef Samhat',               school:'Wofford College', title:'President',                        tier:'Platinum', email:'samhatnr@wofford.edu',    phone:'(864) 597-4010', lastContact:'5 days ago',  status:'hot',  spend:0, tags:['Administration','Transitioning','Time-Sensitive'],    notes:'President since 2013. Leading $470M Drive for 5 campaign. Stepping down end of 2025-26 year. Prime outreach window.' },
  { id:2,  name:'Christopher A.P. Carpenter', school:'Wofford College', title:'Board of Trustees Chairman',       tier:'Platinum', email:'carpenter@wofford.edu',   phone:'(864) 597-4011', lastContact:'12 days ago', status:'warm', spend:0, tags:['Administration','Alumni','Board','Decision Maker'],    notes:"Class of 1990 alumnus. Overseeing search for Wofford's 12th president." },
  { id:3,  name:'Timothy Schmitz',            school:'Wofford College', title:'Willimon Family Provost',          tier:'Gold',     email:'schmitzta@wofford.edu',   phone:'(864) 597-4012', lastContact:'18 days ago', status:'warm', spend:0, tags:['Administration','Academic','Long-Tenured'],            notes:'At Wofford since 2000. Key academic decision-maker.' },
  { id:4,  name:'Calhoun L. Kennedy Jr.',     school:'Wofford College', title:'VP for Philanthropy & Engagement', tier:'Gold',     email:'kennedycl@wofford.edu',   phone:'(864) 597-4013', lastContact:'8 days ago',  status:'hot',  spend:0, tags:['Administration','Philanthropy','Sponsorship','Drive for 5'], notes:'Primary contact for sponsorships and the $470M Drive for 5 campaign.' },

  // ── ATHLETICS ─────────────────────────────────────────────────────────────
  { id:5,  name:'Shawn Watson',               school:'Wofford College', title:'Head Football Coach',              tier:'Gold',     email:'watsonsc@wofford.edu',    phone:'(864) 597-4020', lastContact:'3 days ago',  status:'hot',  spend:0, tags:['Athletics','Football','Coach','Year 3'],                notes:'Entering 3rd season. 6-6 record in 2025. Gibbs Stadium demand tied to team performance.' },
  { id:6,  name:'Kevin Giltner',              school:'Wofford College', title:"Head Men's Basketball Coach",      tier:'Gold',     email:'giltnerkj@wofford.edu',   phone:'(864) 597-4021', lastContact:'6 days ago',  status:'hot',  spend:0, tags:['Athletics','Basketball','Coach','Alumni','New Hire'],   notes:'Class of 2012 Wofford grad. Five-time SoCon champion. Returned from Virginia Tech. High fan energy.' },

  // ── TERRIER SPORTS PROPERTIES ─────────────────────────────────────────────
  { id:7,  name:'Shawn Tyler',                school:'Wofford College', title:'Director of Sales \u2014 Terrier Sports Properties',  tier:'Gold',     email:'shawn@terriersportsproperties.com', phone:'(864) 597-4000', lastContact:'2 days ago',  status:'hot',  spend:0, tags:['Sponsor','Key Contact','Peak Sports'] },
  { id:8,  name:'Devin Foster',               school:'Wofford College', title:'Ticketing \u2014 Terrier Sports Properties',           tier:'Gold',     email:'devin@terriersportsproperties.com', phone:'(864) 597-4001', lastContact:'2 days ago',  status:'hot',  spend:0, tags:['Ticketing','Key Contact','Peak Sports'] },
  { id:9,  name:'Scott Kull',                 school:'Wofford College', title:'Director of Athletics',            tier:'Platinum', email:'kullsr@wofford.edu',      phone:'(864) 597-4002', lastContact:'5 days ago',  status:'warm', spend:0, tags:['Admin','Decision Maker','VIP','Institutional'] },

];`;

if (contactsStart !== -1) {
  code = code.slice(0, contactsStart) + NEW_CONTACTS + code.slice(contactsEnd);
  console.log('✅ Full Wofford CRM roster (9 contacts)');
}

// CRM stats + filters
code = code.replace(`value:'8',   sub:'In this demo'`, `value:'9',   sub:'Wofford roster'`);
code = code.replace(`value:'2',   sub:'Ready to close'`, `value:'5',   sub:'Ready to close'`);
code = code.replace(
  `{['all','hot','warm','cold','movers'].map(s => (`,
  `{['all','hot','warm','cold','admin','athletics'].map(s => (`
);
code = code.replace(
  `const filteredContacts = filterStatus === 'all' ? contacts : filterStatus === 'movers' ? contacts.filter(c => c.tags.includes('New Mover')) : contacts.filter(c => c.status === filterStatus);`,
  `const filteredContacts = filterStatus === 'all' ? contacts
    : filterStatus === 'admin' ? contacts.filter(c => c.tags.includes('Administration') || c.tags.includes('Admin'))
    : filterStatus === 'athletics' ? contacts.filter(c => c.tags.includes('Athletics') || c.tags.includes('Coach'))
    : contacts.filter(c => c.status === filterStatus);`
);
console.log('✅ CRM filters');

// school colors
code = code.replace(/primary:'#4a3b28', secondary:'#886E4C'/g,"primary:'#886E4C', secondary:'#000000'");
code = code.replace(/primary:'#4a3520', secondary:'#C7B37F'/g,"primary:'#886E4C', secondary:'#000000'");
console.log('✅ School colors');

// ── WRITE ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(APP_PATH, code);
console.log('\n\uD83C\uDF89 All done! ' + code.length + ' chars');
console.log('git add . && git commit -m "Wofford complete" && git push');
