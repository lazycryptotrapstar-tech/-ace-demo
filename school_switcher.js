const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || 'C:\\Users\\dnbch\\OneDrive\\Documents\\Simple Genius\\ace-demo\\src\\App.jsx';

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');

// ============================================================
// SCHOOL VENUE DATA — 4 Peak Sports portfolio schools
// ============================================================
const SCHOOL_DATA = `
// ============================================================
// PEAK SPORTS PORTFOLIO — SCHOOL VENUE DATA
// 4 schools ranging from small (Wofford 13k) to mid-major (Akron 30k)
// ============================================================
const PEAK_SCHOOLS = {

  wofford: {
    id: 'wofford',
    name: 'Wofford College',
    mascot: 'Terriers',
    conference: 'SoCon',
    tier: 'Small',
    colors: { primary:'#1a1208', accent:'#886E4C', accent2:'#C7B37F', text:'#ffffff' },
    football: {
      stadium: 'Gibbs Stadium',
      subtitle: 'Mike Ayers Field · Spartanburg, SC',
      capacity: 13000,
      capacityLabel: '13,000',
      opened: 1996,
      surface: 'Grass',
      sections: [
        { id:'H1',  label:'H1',    zone:'home_chairback', name:'Home Chairback H1', price:27,  status:'HIGH', desc:'Home sideline · Chairback · 40-50 yd line' },
        { id:'H2',  label:'H2',    zone:'home_chairback', name:'Home Chairback H2', price:27,  status:'MED',  desc:'Home sideline · Chairback · 40-50 yd line' },
        { id:'H3',  label:'H3',    zone:'home_chairback', name:'Home Chairback H3', price:27,  status:'HIGH', desc:'Home sideline · Chairback · 50 yd line center' },
        { id:'HB1', label:'HB1',   zone:'home_bleacher',  name:'Home Bleacher HB1', price:15,  status:'HIGH', desc:'Home sideline · Bleacher · 20-40 yd' },
        { id:'HB2', label:'HB2',   zone:'home_bleacher',  name:'Home Bleacher HB2', price:15,  status:'HIGH', desc:'Home sideline · Bleacher · 20-40 yd' },
        { id:'MR',  label:'VIP',   zone:'vip',            name:'Mungo Room',        price:85,  status:'LOW',  desc:"President's Box · Mungo Room · 50 yd · Hospitality suite" },
        { id:'S1',  label:'VER-A', zone:'south_ez',       name:'Verandah Lot A',    price:20,  status:'MED',  desc:'South End Zone · Verandah Lot · Terrier Club donors' },
        { id:'N1',  label:'NEZ',   zone:'north_ez',       name:'North End Zone',    price:10,  status:'HIGH', desc:'North End Zone · Video board end' },
        { id:'V1',  label:'V1',    zone:'visitor',        name:'Visitor Side V1',   price:12,  status:'HIGH', desc:'Visitor sideline · Bleacher' },
      ],
      zones: {
        home_chairback: { label:'Home Chairback', color:'#886E4C' },
        home_bleacher:  { label:'Home Bleacher',  color:'#6b5538' },
        vip:            { label:'Mungo Room VIP', color:'#C7B37F' },
        south_ez:       { label:'Verandah Lot',   color:'#4a3520' },
        north_ez:       { label:'North End Zone', color:'#2a1e0e' },
        visitor:        { label:'Visitor Side',   color:'#3a2e1e' },
      }
    }
  },

  eku: {
    id: 'eku',
    name: 'Eastern Kentucky',
    mascot: 'Colonels',
    conference: 'ASUN',
    tier: 'Small',
    colors: { primary:'#4a0020', accent:'#8A0039', accent2:'#ffffff', text:'#ffffff' },
    football: {
      stadium: 'CG Bank Field at Roy Kidd Stadium',
      subtitle: 'Richmond, KY · Est. 1969',
      capacity: 20000,
      capacityLabel: '20,000',
      opened: 1969,
      surface: 'FieldTurf',
      sections: [
        { id:'RC1',  label:'RC1',  zone:'reserved_chair', name:'Reserved Chairback A', price:25, status:'MED',  desc:'Home sideline · Reserved chairback · midfield' },
        { id:'RC2',  label:'RC2',  zone:'reserved_chair', name:'Reserved Chairback B', price:25, status:'HIGH', desc:'Home sideline · Reserved chairback · 40-50 yd' },
        { id:'RC3',  label:'RC3',  zone:'reserved_chair', name:'Reserved Chairback C', price:25, status:'MED',  desc:'Home sideline · Reserved chairback · 30-40 yd' },
        { id:'GA1',  label:'GA-A', zone:'general',        name:'General Admission A',  price:13, status:'HIGH', desc:'Home sideline · Bleacher · General admission' },
        { id:'GA2',  label:'GA-B', zone:'general',        name:'General Admission B',  price:13, status:'HIGH', desc:'Home sideline · Bleacher · General admission' },
        { id:'LW',   label:'LAWN', zone:'lawn',           name:'Lawn Reserve',         price:18, status:'MED',  desc:'East end zone · Grass lawn seating · Great views' },
        { id:'VIS',  label:'VIS',  zone:'visitor',        name:'Visitor Bleachers',    price:10, status:'HIGH', desc:'Visitor sideline · Bleacher seating' },
        { id:'STU',  label:'STU',  zone:'student',        name:'Student Section',      price:0,  status:'HIGH', desc:'Student section · Free with EKU ID' },
      ],
      zones: {
        reserved_chair: { label:'Reserved Chairback', color:'#8A0039' },
        general:        { label:'General Admission',  color:'#6b0030' },
        lawn:           { label:'Lawn Reserve',       color:'#4a0020' },
        visitor:        { label:'Visitor Side',       color:'#3a2e1e' },
        student:        { label:'Student Section',    color:'#1a1208' },
      }
    }
  },

  ballstate: {
    id: 'ballstate',
    name: 'Ball State University',
    mascot: 'Cardinals',
    conference: 'MAC',
    tier: 'Mid-Major',
    colors: { primary:'#6b0010', accent:'#BA0C2F', accent2:'#ffffff', text:'#ffffff' },
    football: {
      stadium: 'Scheumann Stadium',
      subtitle: 'Muncie, IN · Est. 1967, Renovated 2007',
      capacity: 22500,
      capacityLabel: '22,500',
      opened: 1967,
      surface: 'FieldTurf',
      sections: [
        { id:'WS1',  label:'W1',   zone:'west_side',  name:'West Sideline 1',      price:35, status:'HIGH', desc:'Home sideline · West grandstand · 40-50 yd line' },
        { id:'WS2',  label:'W2',   zone:'west_side',  name:'West Sideline 2',      price:35, status:'MED',  desc:'Home sideline · West grandstand · 30-40 yd' },
        { id:'WS3',  label:'W3',   zone:'west_side',  name:'West Sideline 3',      price:30, status:'HIGH', desc:'Home sideline · West grandstand · 20-30 yd' },
        { id:'SUB',  label:'SUITE',zone:'suite',      name:'Kozel Communications', price:95, status:'LOW',  desc:'Luxury suite · Kozel Communications Center · Catered' },
        { id:'ES1',  label:'E1',   zone:'east_side',  name:'East Sideline 1',      price:20, status:'HIGH', desc:'Visitor sideline · East grandstand · midfield' },
        { id:'ES2',  label:'E2',   zone:'east_side',  name:'East Sideline 2',      price:20, status:'HIGH', desc:'Visitor sideline · East grandstand' },
        { id:'SEZ',  label:'SEZ',  zone:'south_ez',   name:'South End Zone',       price:18, status:'HIGH', desc:'South end zone · Grandstand seating' },
        { id:'LAWN', label:'LAWN', zone:'lawn',       name:'North Lawn',           price:10, status:'MED',  desc:'North end zone · Grass lawn · Family Zone · Cardinals pillars' },
        { id:'STU',  label:'STU',  zone:'student',    name:'Student Section',      price:0,  status:'HIGH', desc:'Student section · "The Chirp" tradition' },
      ],
      zones: {
        west_side: { label:'West Sideline',  color:'#BA0C2F' },
        suite:     { label:'Luxury Suites',  color:'#8B0020' },
        east_side: { label:'East Sideline',  color:'#6b0010' },
        south_ez:  { label:'South End Zone', color:'#4a0010' },
        lawn:      { label:'North Lawn',     color:'#3a2e1e' },
        student:   { label:'Student Section',color:'#1a1208' },
      }
    }
  },

  akron: {
    id: 'akron',
    name: 'University of Akron',
    mascot: 'Zips',
    conference: 'MAC',
    tier: 'Mid-Major',
    colors: { primary:'#021028', accent:'#041E42', accent2:'#A89968', text:'#ffffff' },
    football: {
      stadium: 'InfoCision Stadium — Summa Field',
      subtitle: 'Akron, OH · Opened 2009',
      capacity: 30000,
      capacityLabel: '30,000',
      opened: 2009,
      surface: 'FieldTurf',
      sections: [
        { id:'WCL',  label:'CLUB', zone:'club',       name:'Huntington Club Level', price:65, status:'MED',  desc:'West side · Club level · Partially covered · 522 seats' },
        { id:'LOG',  label:'LOGE', zone:'loge',       name:'Loge Boxes',           price:95, status:'LOW',  desc:'Open-air covered loge boxes · 38 boxes · 4 seats per box' },
        { id:'SUI',  label:'SUITE',zone:'suite',      name:'Private Suite',        price:140,status:'LOW',  desc:'17 suites · 16 private (16 seats) + Presidential Suite (52 seats)' },
        { id:'WP1',  label:'W1',   zone:'west_pri',   name:'West Priority 1',      price:40, status:'HIGH', desc:'West side · Priority reserved · 40-50 yd line' },
        { id:'WP2',  label:'W2',   zone:'west_pri',   name:'West Priority 2',      price:40, status:'MED',  desc:'West side · Priority reserved · 30-40 yd' },
        { id:'WG1',  label:'WG',   zone:'west_gen',   name:'West General',         price:20, status:'HIGH', desc:'West side · General seating · Bleacher w/ back support midfield' },
        { id:'EG1',  label:'EG',   zone:'east_gen',   name:'East General',         price:15, status:'HIGH', desc:'East side · General admission · $15' },
        { id:'SKN',  label:'KNOLL',zone:'knoll',      name:'South Grassy Knoll',   price:10, status:'HIGH', desc:'South end · Standing room + grassy knoll · Casual atmosphere' },
        { id:'STU',  label:'STU',  zone:'student',    name:'Student Section',      price:0,  status:'HIGH', desc:'Student section · Free with Akron ID' },
      ],
      zones: {
        club:     { label:'Club Level',       color:'#A89968' },
        loge:     { label:'Loge Boxes',       color:'#041E42' },
        suite:    { label:'Private Suites',   color:'#0a3060' },
        west_pri: { label:'West Priority',    color:'#041E42' },
        west_gen: { label:'West General',     color:'#021028' },
        east_gen: { label:'East General',     color:'#021028' },
        knoll:    { label:'Grassy Knoll',     color:'#1a2030' },
        student:  { label:'Student Section',  color:'#010815' },
      }
    }
  }
};

`;

// Inject PEAK_SCHOOLS before WoffordTicketHub or before WOFFORD_VENUES
if (code.includes('const WOFFORD_VENUES')) {
  code = code.replace('const WOFFORD_VENUES', SCHOOL_DATA + '\nconst WOFFORD_VENUES');
  console.log('✅ PEAK_SCHOOLS injected before WOFFORD_VENUES');
} else {
  // inject before WoffordTicketHub
  code = code.replace('const WoffordTicketHub', SCHOOL_DATA + '\nconst WoffordTicketHub');
  console.log('✅ PEAK_SCHOOLS injected before WoffordTicketHub');
}

// ============================================================
// SCHOOL SELECTOR HEADER — inject into WoffordTicketHub
// Replace the venue selector section with school + venue selector
// ============================================================

// Replace the venue selector buttons block with school dropdown + venue selector
const OLD_VENUE_HEADER = `      {/* ── VENUE SELECTOR ── */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {Object.values(WOFFORD_VENUES).map(vn => (
          <button key={vn.id} onClick={() => { setVenue(vn.id); setSelectedSection(null); setFilterZone('all'); }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl font-bold transition-all border-2"
            style={venue === vn.id
              ? { background:'#1a1208', color:'white', borderColor:'#886E4C', boxShadow:'0 4px 20px rgba(136,110,76,0.3)' }
              : { background:'white', color:'#3a2e1e', borderColor:'#e8dfc8' }}>
            <span style={{fontSize:'18px'}}>{vn.icon}</span>
            <div className="text-left">
              <p className="futura-heading" style={{fontSize:'15px', lineHeight:'1.1'}}>{vn.sport}</p>
              <p className="mono-label" style={{fontSize:'8px', color: venue === vn.id ? '#C7B37F' : '#886E4C'}}>{vn.name.split(' ').slice(0,2).join(' ')}</p>
            </div>
          </button>
        ))}
      </div>`;

const NEW_VENUE_HEADER = `      {/* ── SCHOOL + VENUE SELECTOR ── */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        {/* School Dropdown */}
        <div className="flex flex-col gap-1.5">
          <p className="mono-label" style={{fontSize:'9px', color: activeSchool.colors.accent, letterSpacing:'2px'}}>SELECT SCHOOL</p>
          <div className="relative">
            <select
              value={schoolId}
              onChange={e => { setSchoolId(e.target.value); setVenue('football'); setSelectedSection(null); setFilterZone('all'); }}
              className="appearance-none w-full md:w-72 px-4 py-3 pr-10 rounded-2xl font-bold text-base border-2 cursor-pointer"
              style={{ background:'#1a1208', color:'white', borderColor: activeSchool.colors.accent,
                       fontFamily:'Rajdhani, sans-serif', fontSize:'15px',
                       boxShadow:\`0 4px 20px \${activeSchool.colors.accent}40\` }}>
              {Object.values(PEAK_SCHOOLS).map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} — {s.mascot} ({s.tier})
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{color: activeSchool.colors.accent}}>▼</div>
          </div>
        </div>

        {/* School info strip */}
        <div className="flex items-center gap-4 px-5 py-3 rounded-2xl border-2"
          style={{background: activeSchool.colors.primary, borderColor: activeSchool.colors.accent,
                  boxShadow:\`0 4px 20px \${activeSchool.colors.accent}30\`}}>
          {/* Tier badge */}
          <div className="text-center px-3 py-1.5 rounded-xl" style={{background: activeSchool.colors.accent}}>
            <p className="futura-heading text-white" style={{fontSize:'11px', lineHeight:'1'}}>{activeSchool.tier.toUpperCase()}</p>
            <p className="mono-label text-white/70" style={{fontSize:'8px'}}>{activeSchool.conference}</p>
          </div>
          <div>
            <p className="futura-heading text-white" style={{fontSize:'16px', lineHeight:'1.1'}}>{activeSchool.name}</p>
            <p className="mono-label" style={{color: activeSchool.colors.accent2 === '#ffffff' ? 'rgba(255,255,255,0.6)' : activeSchool.colors.accent2, fontSize:'9px'}}>
              {activeVenue.stadium} · {activeVenue.capacityLabel} capacity
            </p>
          </div>
          {/* Capacity bar visual */}
          <div className="hidden md:block ml-auto">
            <p className="mono-label text-white/40" style={{fontSize:'8px', marginBottom:'4px'}}>CAPACITY vs WOFFORD</p>
            <div className="flex items-end gap-1">
              {Object.values(PEAK_SCHOOLS).map(s => (
                <div key={s.id} title={s.name}
                  style={{
                    width:'16px',
                    height:\`\${Math.round((s.football.capacity / 30000) * 32)}px\`,
                    background: s.id === schoolId ? activeSchool.colors.accent : 'rgba(255,255,255,0.15)',
                    borderRadius:'3px 3px 0 0',
                    transition:'all 0.3s ease'
                  }}/>
              ))}
            </div>
          </div>
        </div>

        {/* Sport selector pills */}
        <div className="flex items-end gap-2 flex-wrap">
          {['football'].map(sp => (
            <button key={sp} onClick={() => { setVenue(sp); setSelectedSection(null); setFilterZone('all'); }}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl font-bold border-2 transition-all"
              style={venue === sp
                ? { background: activeSchool.colors.primary, color:'white', borderColor: activeSchool.colors.accent,
                    boxShadow:\`0 4px 16px \${activeSchool.colors.accent}40\` }
                : { background:'white', color:'#3a2e1e', borderColor:'#e8dfc8' }}>
              <span>🏈</span>
              <div className="text-left">
                <p className="futura-heading" style={{fontSize:'13px', lineHeight:'1'}}>Football</p>
                <p className="mono-label" style={{fontSize:'8px', color: venue === sp ? activeSchool.colors.accent : '#886E4C'}}>
                  {activeVenue.stadium.split(' ').slice(0,2).join(' ')}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>`;

if (code.includes(OLD_VENUE_HEADER)) {
  code = code.replace(OLD_VENUE_HEADER, NEW_VENUE_HEADER);
  console.log('✅ School selector + venue header replaced');
} else {
  console.log('⚠️  Venue selector not found — may need manual placement');
}

// ============================================================
// UPDATE WoffordTicketHub state + data references
// ============================================================

// Add schoolId state and derive active school/venue
const OLD_STATE = `  const [venue, setVenue] = React.useState('football');
  const [selectedSection, setSelectedSection] = React.useState(null);
  const [qty, setQty] = React.useState(2);
  const [hubState, setHubState] = React.useState('browse');
  const [filterZone, setFilterZone] = React.useState('all');

  const v = WOFFORD_VENUES[venue];`;

const NEW_STATE = `  const [schoolId, setSchoolId] = React.useState('wofford');
  const [venue, setVenue] = React.useState('football');
  const [selectedSection, setSelectedSection] = React.useState(null);
  const [qty, setQty] = React.useState(2);
  const [hubState, setHubState] = React.useState('browse');
  const [filterZone, setFilterZone] = React.useState('all');

  // Active school + venue derived from state
  const activeSchool = PEAK_SCHOOLS[schoolId] || PEAK_SCHOOLS.wofford;
  const activeVenue = activeSchool.football; // expand when adding basketball
  const ac = activeSchool.colors; // shorthand for colors

  // Build v-compatible object from PEAK_SCHOOLS for backward compatibility
  const v = {
    ...WOFFORD_VENUES[venue] || WOFFORD_VENUES.football,
    name: activeVenue.stadium,
    subtitle: activeVenue.subtitle,
    capacity: activeVenue.capacityLabel,
    sport: 'Football',
    icon: '🏈',
    description: \`Home of \${activeSchool.name} \${activeSchool.mascot} Football\`,
    sections: activeVenue.sections,
    zones: activeVenue.zones,
  };`;

if (code.includes(OLD_STATE)) {
  code = code.replace(OLD_STATE, NEW_STATE);
  console.log('✅ State updated with schoolId + activeSchool');
} else {
  console.log('⚠️  State block not matched exactly — check WoffordTicketHub');
}

// ============================================================
// UPDATE venue banner to use active school colors
// ============================================================
const OLD_BANNER = `          <div className="rounded-2xl mb-4 p-5 relative overflow-hidden" style={{background:'linear-gradient(135deg, #1a1208, #2a1e0e)', minHeight:'80px'}}>`;
const NEW_BANNER = `          <div className="rounded-2xl mb-4 p-5 relative overflow-hidden transition-all duration-500"
            style={{background:\`linear-gradient(135deg, \${ac.primary}, \${ac.accent})\`, minHeight:'80px'}}>`;

code = code.replace(OLD_BANNER, NEW_BANNER);
console.log('✅ Venue banner uses active school colors');

// Update order panel header to use school colors
const OLD_PANEL_HEADER = `            <p className="futura-heading text-white relative z-10" style={{fontSize:'20px'}}>Order Summary</p>
              <p className="mono-label relative z-10 mt-1" style={{color:'#C7B37F', fontSize:'9px'}}>WOFFORD TERRIERS · {v.sport.toUpperCase()}</p>`;
const NEW_PANEL_HEADER = `            <p className="futura-heading text-white relative z-10" style={{fontSize:'20px'}}>Order Summary</p>
              <p className="mono-label relative z-10 mt-1" style={{color: ac.accent2, fontSize:'9px'}}>{activeSchool.name.toUpperCase()} · {activeSchool.mascot.toUpperCase()}</p>`;

code = code.replace(OLD_PANEL_HEADER, NEW_PANEL_HEADER);

// Update header colors to use active school
const OLD_HDR_STYLE = `style={{ background:'#1a1208', color:'white', borderColor:'#886E4C', boxShadow:'0 4px 20px rgba(136,110,76,0.3)' }}>`;
code = code.replace(
  OLD_HDR_STYLE,
  `style={{ background: ac.primary, color:'white', borderColor: ac.accent, boxShadow:\`0 4px 20px \${ac.accent}50\` }}>`
);

// Update order panel dark bg
const OLD_PANEL_BG = `style={{background:'linear-gradient(135deg, #1a1208, #2a1e0e)'}}>`;
code = code.replace(
  OLD_PANEL_BG,
  `style={{background:\`linear-gradient(135deg, \${ac.primary}, \${ac.accent})\`}}>`
);

// Update checkout button color
code = code.replace(
  `style={{background:'linear-gradient(135deg, #1a1208, #2a1e0e)', fontFamily:'Rajdhani, sans-serif', fontSize:'17px', letterSpacing:'0.03em', boxShadow:'0 8px 24px rgba(26,18,8,0.4)'}}`,
  `style={{background:\`linear-gradient(135deg, \${ac.primary}, \${ac.accent})\`, fontFamily:'Rajdhani, sans-serif', fontSize:'17px', letterSpacing:'0.03em', boxShadow:\`0 8px 24px \${ac.primary}80\`}}`
);

// Update confirm purchase button
code = code.replace(
  `style={{background:'#886E4C', fontFamily:'Rajdhani, sans-serif', fontSize:'17px'}}`,
  `style={{background: ac.accent, fontFamily:'Rajdhani, sans-serif', fontSize:'17px'}}`
);

console.log('✅ School colors applied throughout ticket hub UI');

// ============================================================
// UPDATE success screen header to use school colors
// ============================================================
const OLD_SUCCESS = `        <div className="px-8 py-10 text-center relative overflow-hidden" style={{background:'linear-gradient(135deg, #1a1208 0%, #2a1e0e 100%)'}}>`;
const NEW_SUCCESS = `        <div className="px-8 py-10 text-center relative overflow-hidden transition-all duration-500"
          style={{background:\`linear-gradient(135deg, \${ac.primary} 0%, \${ac.accent} 100%)\`}}>`;
code = code.replace(OLD_SUCCESS, NEW_SUCCESS);

// ============================================================
// UPDATE header Wofford wordmark to be dynamic
// ============================================================
const OLD_WORDMARK = `          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl" style={{background:'#1a1208'}}>
            <div style={{textAlign:'right'}}>
              <p className="futura-heading text-white" style={{fontSize:'18px',lineHeight:'1'}}>WOFFORD</p>
              <p className="mono-label" style={{color:'#886E4C',fontSize:'9px',letterSpacing:'3px'}}>TERRIERS</p>
            </div>`;
const NEW_WORDMARK = `          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-500"
            style={{background: ac.primary, border:\`2px solid \${ac.accent}\`}}>
            <div style={{textAlign:'right'}}>
              <p className="futura-heading text-white" style={{fontSize:'18px',lineHeight:'1'}}>{activeSchool.name.split(' ').slice(-1)[0].toUpperCase()}</p>
              <p className="mono-label" style={{color: ac.accent, fontSize:'9px',letterSpacing:'3px'}}>{activeSchool.mascot.toUpperCase()}</p>
            </div>`;
code = code.replace(OLD_WORDMARK, NEW_WORDMARK);
console.log('✅ Wordmark is now dynamic per school');

// ============================================================
// UPDATE page header subtitle to show school info
// ============================================================
const OLD_SUB = `          <p className="text-sm mt-2 font-semibold" style={{color:'#886E4C'}}>
            {v.sport} · {v.name} · {v.capacity} capacity
          </p>`;
const NEW_SUB = `          <p className="text-sm mt-2 font-semibold transition-all duration-300" style={{color: ac.accent}}>
            {activeSchool.conference} · {activeSchool.tier} School · {activeVenue.stadium} · {activeVenue.capacityLabel} capacity
          </p>`;
code = code.replace(OLD_SUB, NEW_SUB);
console.log('✅ Header subtitle dynamic');

// ============================================================
// WRITE OUTPUT
// ============================================================
fs.writeFileSync(APP_PATH, code);
const msg = '\n🎉 School switcher complete! ' + code.length.toLocaleString() + ' chars';
console.log(msg);
console.log('4 schools: Wofford (13k) · EKU (20k) · Ball State (22.5k) · Akron (30k)');
console.log('git add . && git commit -m "Multi-school ticket hub with venue switcher" && git push');
