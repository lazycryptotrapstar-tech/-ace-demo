// ============================================================
// WOFFORD COLLEGE THEME — App.jsx Reskin Script
// Run: node apply_wofford.js
// Reads your App.jsx, applies Wofford brand + contacts,
// writes App_Wofford.jsx. Rename to App.jsx then git push.
// ============================================================
const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || path.join(process.env.USERPROFILE || process.env.HOME, 'Downloads', 'ace-demo', 'src', 'App.jsx');

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');
const orig = code.length;

// 1. C object
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
const NEW_C = `// Wofford College: Old Gold #886E4C | Khaki #C7B37F | Black #000000
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
code = code.includes(OLD_C) ? (console.log('C replaced'), code.replace(OLD_C, NEW_C)) : (console.log('C not matched'), code);

// 2. CSS
const css = [
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
];
css.forEach(([a,b]) => { code = code.split(a).join(b); });
console.log('CSS done');

// 3. Branding
code = code.split('Ticketing Intelligence').join('Wofford Terriers \u00B7 SoCon');
code = code.split('Peak Sports MGMT</p>').join('Wofford College</p>');
code = code.split('Ace \u00B7 Peak Sports AI').join('Ace \u00B7 Wofford Terriers');
console.log('Branding done');

// 4. CRM
code = code.split("style={{background:'#0f2213'}}>").join("style={{background:'#1a1208'}}>");
code = code.replace(/borderColor:'#c8dac8'/g,"borderColor:'#d4c4a0'");
code = code.replace(/background:'#eef3ee'/g,"background:'#F5ECD8'");
code = code.replace(/background:'#e4ede4'/g,"background:'#ede3cc'");
code = code.replace(/color:'#3a5c38'/g,"color:'#4a3520'");
code = code.replace(/color:'#4a6741'/g,"color:'#4a3520'");
code = code.split("background:'rgba(15,34,19,0.08)'").join("background:'rgba(136,110,76,0.10)'");
console.log('CRM done');

// 5. rgba
code = code.replace(/rgba\(92,184,50,/g,'rgba(136,110,76,');
code = code.replace(/rgba\(58,140,30,/g,'rgba(107,85,56,');
code = code.replace(/rgba\(15,34,19,/g,'rgba(26,18,8,');
console.log('rgba done');

// 6. Hex sweep
const hexMap=[
  ['#0f2213','#1a1208'],['#1a3d20','#2a1e0e'],['#2a6632','#4a3520'],
  ['#5cb832','#886E4C'],['#72d43e','#C7B37F'],['#3a8c1e','#6b5538'],
  ['#f4f7f2','#F5F0E8'],['#dde8d8','#e8dfc8'],['#445544','#3a2e1e'],
  ['#132118','#2a1e0e'],['#0c1a0e','#180f07'],['#09100d','#120d06'],
  ['#0a1208','#100b04'],['#092818','#1a1208'],['#04101a','#100b04'],
  ['#0a1f18','#1a1208'],['#0d2a1e','#1a1208'],
];
let hc=0; hexMap.forEach(([a,b])=>{const n=(code.split(a).length-1);hc+=n;code=code.split(a).join(b);});
console.log('Hex sweep: '+hc+' replacements');

// 7. Contacts
const OLD_CON = "const contacts = [\n  { id:1,  name:'Marcus Webb',";
const NEW_CON = `const contacts = [
  // Real Wofford / Terrier Sports Properties contacts
  { id:0,  name:'Shawn Tyler',  school:'Wofford College', title:'Director of Sales \u2014 Terrier Sports Properties', tier:'Gold', email:'shawn@terriersportsproperties.com', phone:'(864) 597-4000', lastContact:'2 days ago', status:'hot',  spend:0, tags:['Sponsor','Key Contact'] },
  { id:98, name:'Devin Foster', school:'Wofford College', title:'Ticketing \u2014 Terrier Sports Properties',          tier:'Gold', email:'devin@terriersportsproperties.com', phone:'(864) 597-4001', lastContact:'2 days ago', status:'hot',  spend:0, tags:['Ticketing','Key Contact'] },
  { id:99, name:'Scott Kull',   school:'Wofford College', title:'Director of Athletics \u2014 Wofford College',       tier:'Gold', email:'kullsr@wofford.edu',               phone:'(864) 597-4002', lastContact:'5 days ago', status:'warm', spend:0, tags:['Admin','Decision Maker'] },
  // Demo contacts
  { id:1,  name:'Marcus Webb',`;
if(code.includes(OLD_CON)){code=code.replace(OLD_CON,NEW_CON);console.log('Contacts added');}
else{console.log('Contacts not matched');}

// 8. Wofford school card
code=code.replace(/primary:'#4a3b28', secondary:'#886E4C'/g,"primary:'#886E4C', secondary:'#000000'");
code=code.replace(/primary:'#4a3520', secondary:'#C7B37F'/g,"primary:'#886E4C', secondary:'#000000'");
console.log('School colors fixed');

// Write
const out = APP_PATH.replace('App.jsx','App_Wofford.jsx');
fs.writeFileSync(out, code);
console.log('\nWofford theme complete!');
console.log('Input:',orig,'chars | Output:',code.length,'chars');
console.log('File:',out);
console.log('\n1. Rename App_Wofford.jsx to App.jsx');
console.log('2. git add . && git commit -m "Wofford theme + contacts"');
console.log('3. git push');
