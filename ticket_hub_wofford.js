const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || 'C:\\Users\\dnbch\\OneDrive\\Documents\\Simple Genius\\ace-demo\\src\\App.jsx';

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');

// ============================================================
// WOFFORD TICKET HUB — Full replacement
// Gibbs Stadium (Football) + Jerry Richardson (Basketball/Volleyball)
// Real sections, real pricing, real Wofford branding
// ============================================================

const NEW_TICKET_HUB = `
// ============================================================
// WOFFORD VENUE DATA
// ============================================================
const WOFFORD_VENUES = {
  football: {
    id: 'football',
    name: 'Gibbs Stadium',
    subtitle: 'Mike Ayers Field · Spartanburg, SC',
    capacity: '13,000',
    sport: 'Football',
    icon: '🏈',
    color: '#886E4C',
    description: 'Home of Wofford Terriers Football since 1996',
    sections: [
      // Home Sideline — Chairback (between the 40s)
      { id:'H1', name:'Section H1', zone:'home_chairback', label:'H1', price:27, status:'HIGH', seats:180, desc:'Home Sideline · Chairback · 40-50 yd' },
      { id:'H2', name:'Section H2', zone:'home_chairback', label:'H2', price:27, status:'MED',  seats:180, desc:'Home Sideline · Chairback · 40-50 yd' },
      { id:'H3', name:'Section H3', zone:'home_chairback', label:'H3', price:27, status:'HIGH', seats:180, desc:'Home Sideline · Chairback · 50 yd line' },
      { id:'H4', name:'Section H4', zone:'home_chairback', label:'H4', price:27, status:'MED',  seats:180, desc:'Home Sideline · Chairback · 40-50 yd' },
      { id:'H5', name:'Section H5', zone:'home_chairback', label:'H5', price:27, status:'LOW',  seats:180, desc:'Home Sideline · Chairback · 40-50 yd' },
      // Home Sideline — Bleachers (end zone to 40)
      { id:'HB1', name:'Section HB1', zone:'home_bleacher', label:'HB1', price:15, status:'HIGH', seats:220, desc:'Home Sideline · Bleacher · 20-40 yd' },
      { id:'HB2', name:'Section HB2', zone:'home_bleacher', label:'HB2', price:15, status:'HIGH', seats:220, desc:'Home Sideline · Bleacher · 20-40 yd' },
      { id:'HB3', name:'Section HB3', zone:'home_bleacher', label:'HB3', price:15, status:'MED',  seats:220, desc:'Home Sideline · Bleacher · 5-20 yd' },
      { id:'HB4', name:'Section HB4', zone:'home_bleacher', label:'HB4', price:15, status:'LOW',  seats:220, desc:'Home Sideline · Bleacher · 5-20 yd' },
      // Press Box / Mungo Room (VIP)
      { id:'MR',  name:'Mungo Room',   zone:'vip',          label:'VIP',  price:85, status:'LOW',  seats:40,  desc:'President\'s Box · Mungo Room · 50 yd line' },
      // Visitor Sideline
      { id:'V1',  name:'Section V1',   zone:'visitor',      label:'V1',   price:12, status:'HIGH', seats:200, desc:'Visitor Sideline · Bleacher · 40-50 yd' },
      { id:'V2',  name:'Section V2',   zone:'visitor',      label:'V2',   price:12, status:'HIGH', seats:200, desc:'Visitor Sideline · Bleacher · 40-50 yd' },
      { id:'V3',  name:'Section V3',   zone:'visitor',      label:'V3',   price:12, status:'MED',  seats:200, desc:'Visitor Sideline · Bleacher · 20-40 yd' },
      // North End Zone
      { id:'N1',  name:'North End Zone A', zone:'north_ez', label:'NEZ-A', price:10, status:'HIGH', seats:300, desc:'North End Zone · Video Board End' },
      { id:'N2',  name:'North End Zone B', zone:'north_ez', label:'NEZ-B', price:10, status:'MED',  seats:300, desc:'North End Zone · Video Board End' },
      // South End Zone (Verandah Lot)
      { id:'S1',  name:'Verandah Lot A',   zone:'south_ez', label:'VER-A', price:20, status:'MED',  seats:280, desc:'South End Zone · Verandah Lot · Terrier Club Donors' },
      { id:'S2',  name:'Verandah Lot B',   zone:'south_ez', label:'VER-B', price:20, status:'LOW',  seats:280, desc:'South End Zone · Verandah Lot · Premium Tailgate' },
      // Student Section
      { id:'STU', name:'Student Section',  zone:'student',  label:'STU',  price:0,  status:'MED',  seats:500, desc:'Student Section · Free with Wofford ID' },
    ],
    zones: {
      home_chairback: { label:'Home Chairback', color:'#886E4C', desc:'Premium seats between the 40s' },
      home_bleacher:  { label:'Home Bleacher',  color:'#6b5538', desc:'Home side, end zone to 40' },
      vip:            { label:'Mungo Room VIP', color:'#C7B37F', desc:'President\'s Box hospitality' },
      visitor:        { label:'Visitor Side',   color:'#3a2e1e', desc:'Visitor sideline seating' },
      north_ez:       { label:'North End Zone', color:'#2a1e0e', desc:'Video board end zone' },
      south_ez:       { label:'Verandah Lot',   color:'#4a3520', desc:'Donor tailgate end zone' },
      student:        { label:'Student Section',color:'#1a1208', desc:'Free with Wofford ID' },
    }
  },
  basketball: {
    id: 'basketball',
    name: 'Jerry Richardson Indoor Stadium',
    subtitle: 'The JRIS · Spartanburg, SC',
    capacity: '3,400',
    sport: 'Basketball',
    icon: '🏀',
    color: '#886E4C',
    description: 'Home of Wofford Terriers Basketball since 2017',
    sections: [
      // Courtside
      { id:'CS1', name:'Courtside A', zone:'courtside',  label:'CS-A', price:65, status:'LOW',  seats:40,  desc:'Courtside · Chairback · Home sideline' },
      { id:'CS2', name:'Courtside B', zone:'courtside',  label:'CS-B', price:65, status:'LOW',  seats:40,  desc:'Courtside · Chairback · Visitor sideline' },
      // Club 51 (Lower Bowl Chairback)
      { id:'C51A', name:'Club 51 A', zone:'club51',      label:'C51-A', price:45, status:'MED',  seats:120, desc:'Club 51 · Lower Bowl · Home sideline · Full kitchen access' },
      { id:'C51B', name:'Club 51 B', zone:'club51',      label:'C51-B', price:45, status:'HIGH', seats:120, desc:'Club 51 · Lower Bowl · Center court' },
      { id:'C51C', name:'Club 51 C', zone:'club51',      label:'C51-C', price:45, status:'MED',  seats:120, desc:'Club 51 · Lower Bowl · Visitor sideline' },
      // Lower Bowl General
      { id:'LB1', name:'Section 1',  zone:'lower_bowl',  label:'Sec 1', price:25, status:'HIGH', seats:160, desc:'Lower Bowl · Home sideline' },
      { id:'LB2', name:'Section 2',  zone:'lower_bowl',  label:'Sec 2', price:25, status:'HIGH', seats:160, desc:'Lower Bowl · Center court' },
      { id:'LB3', name:'Section 3',  zone:'lower_bowl',  label:'Sec 3', price:25, status:'MED',  seats:160, desc:'Lower Bowl · Visitor sideline' },
      { id:'LB4', name:'Section 4',  zone:'lower_bowl',  label:'Sec 4', price:25, status:'MED',  seats:160, desc:'Lower Bowl · Behind basket' },
      { id:'LB5', name:'Section 5',  zone:'lower_bowl',  label:'Sec 5', price:25, status:'HIGH', seats:160, desc:'Lower Bowl · Behind basket' },
      // Corner Suites (open-air theater box style)
      { id:'SUA', name:'Suite A',    zone:'suite',       label:'Suite A', price:120, status:'LOW', seats:20, desc:'Corner Suite A · Open-air · Theater box seating' },
      { id:'SUB', name:'Suite B',    zone:'suite',       label:'Suite B', price:120, status:'LOW', seats:20, desc:'Corner Suite B · Open-air · Theater box seating' },
      { id:'SUC', name:'Suite C',    zone:'suite',       label:'Suite C', price:120, status:'MED', seats:20, desc:'Corner Suite C · Open-air · Theater box seating' },
      { id:'SUD', name:'Suite D',    zone:'suite',       label:'Suite D', price:120, status:'MED', seats:20, desc:'Corner Suite D · Open-air · Theater box seating' },
      // Upper Level
      { id:'UL1', name:'Upper Level A', zone:'upper',   label:'UL-A', price:18, status:'HIGH', seats:200, desc:'Upper Level · Sideline · Wide angle view' },
      { id:'UL2', name:'Upper Level B', zone:'upper',   label:'UL-B', price:18, status:'HIGH', seats:200, desc:'Upper Level · Sideline' },
      // The Boneyard (Student Section)
      { id:'BY',  name:'The Boneyard', zone:'boneyard', label:'BONE', price:0,  status:'MED',  seats:400, desc:'The Boneyard · Student Section · Private entertainment area · Free with ID' },
    ],
    zones: {
      courtside:  { label:'Courtside',     color:'#C7B37F', desc:'Best seats in the house' },
      club51:     { label:'Club 51',       color:'#886E4C', desc:'Premium lower bowl · full kitchen' },
      lower_bowl: { label:'Lower Bowl',    color:'#6b5538', desc:'Main floor seating' },
      suite:      { label:'Corner Suites', color:'#4a3520', desc:'Open-air theater box suites' },
      upper:      { label:'Upper Level',   color:'#3a2e1e', desc:'Second level sideline' },
      boneyard:   { label:'The Boneyard',  color:'#1a1208', desc:'Student section · free with ID' },
    }
  },
  volleyball: {
    id: 'volleyball',
    name: 'Jerry Richardson Indoor Stadium',
    subtitle: 'Volleyball Arena · Spartanburg, SC',
    capacity: '350',
    sport: 'Volleyball',
    icon: '🏐',
    color: '#886E4C',
    description: 'Volleyball Competition Venue at JRIS',
    sections: [
      { id:'VA1', name:'Section A', zone:'sideline',  label:'Sec A', price:10, status:'HIGH', seats:80,  desc:'Court sideline · Lower bowl' },
      { id:'VA2', name:'Section B', zone:'sideline',  label:'Sec B', price:10, status:'MED',  seats:80,  desc:'Court sideline · Lower bowl' },
      { id:'VB1', name:'Section C', zone:'end_line',  label:'Sec C', price:8,  status:'HIGH', seats:60,  desc:'End line · Behind serving' },
      { id:'VB2', name:'Section D', zone:'end_line',  label:'Sec D', price:8,  status:'MED',  seats:60,  desc:'End line · Behind serving' },
      { id:'VC1', name:'Premium',   zone:'premium',   label:'Prem',  price:20, status:'LOW',  seats:40,  desc:'Premium floor seats · Courtside' },
      { id:'STU', name:'Student',   zone:'student',   label:'STU',   price:0,  status:'HIGH', seats:30,  desc:'Student Section · Free with Wofford ID' },
    ],
    zones: {
      sideline: { label:'Sideline',      color:'#886E4C', desc:'Court sideline seating' },
      end_line: { label:'End Line',      color:'#6b5538', desc:'Behind the serving line' },
      premium:  { label:'Premium Floor', color:'#C7B37F', desc:'Courtside premium seats' },
      student:  { label:'Student',       color:'#1a1208', desc:'Free with Wofford ID' },
    }
  }
};

// ============================================================
// WOFFORD TICKET HUB COMPONENT
// ============================================================
const WoffordTicketHub = ({ onTransaction }) => {
  const [venue, setVenue] = React.useState('football');
  const [selectedSection, setSelectedSection] = React.useState(null);
  const [qty, setQty] = React.useState(2);
  const [hubState, setHubState] = React.useState('browse');
  const [filterZone, setFilterZone] = React.useState('all');

  const v = WOFFORD_VENUES[venue];
  const fees = { facility: 2.50, processing: 1.50 };

  const filteredSections = filterZone === 'all'
    ? v.sections.filter(s => s.price > 0)
    : v.sections.filter(s => s.zone === filterZone && s.price > 0);

  const subtotal = selectedSection ? selectedSection.price * qty : 0;
  const totalFees = selectedSection ? (fees.facility + fees.processing) * qty : 0;
  const total = subtotal + totalFees;

  const statusColor = s => s === 'HIGH' ? '#ef4444' : s === 'MED' ? '#f59e0b' : '#886E4C';
  const statusLabel = s => s === 'HIGH' ? 'Selling Fast' : s === 'MED' ? 'Limited' : 'Available';

  const handlePurchase = () => {
    setHubState('success');
    onTransaction({ fanName:'Scott Kull', campaign:'Ticket Sales', amount:total, fromTicketHub:true });
  };

  if (hubState === 'success') return (
    <div className="max-w-xl mx-auto py-8 fade-in">
      <div className="rounded-3xl overflow-hidden shadow-2xl" style={{background:'#ffffff'}}>
        {/* Success header with Wofford branding */}
        <div className="px-8 py-10 text-center relative overflow-hidden" style={{background:'linear-gradient(135deg, #1a1208 0%, #2a1e0e 100%)'}}>
          <div className="absolute inset-0 flex items-center justify-center opacity-5">
            <svg viewBox="0 0 200 200" style={{width:'300px',height:'300px'}}>
              <ellipse cx="100" cy="90" rx="68" ry="62" fill="#886E4C"/>
              <ellipse cx="100" cy="94" rx="62" ry="56" fill="#000"/>
              <ellipse cx="100" cy="78" rx="28" ry="36" fill="#fff"/>
              <circle cx="74" cy="72" r="16" fill="#fff"/><circle cx="126" cy="72" r="16" fill="#fff"/>
              <circle cx="76" cy="74" r="9" fill="#000"/><circle cx="128" cy="74" r="9" fill="#000"/>
              <ellipse cx="100" cy="106" rx="22" ry="14" fill="#000"/>
              <rect x="32" y="148" width="136" height="22" rx="11" fill="#886E4C"/>
            </svg>
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background:'rgba(136,110,76,0.2)', border:'2px solid #886E4C'}}>
              <CheckCircle2 size={32} style={{color:'#C7B37F'}}/>
            </div>
            <p className="futura-heading text-white" style={{fontSize:'32px'}}>Purchase Complete!</p>
            <p className="text-white/50 text-sm mt-1 mono-label" style={{fontSize:'9px'}}>GO TERRIERS 🐾</p>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label:'Venue', value:v.name.split(' ').slice(0,2).join(' ') },
              { label:'Section', value:selectedSection?.label || '—' },
              { label:'Quantity', value:\`\${qty} tickets\` },
              { label:'Total Paid', value:\`$\${total.toFixed(2)}\`, gold:true },
            ].map((item,i) => (
              <div key={i} className="p-4 rounded-2xl" style={{background:'#F5F0E8'}}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{color:'#886E4C'}}>{item.label}</p>
                <p className="futura-heading" style={{fontSize:'20px', color: item.gold ? '#886E4C' : '#1a1208'}}>{item.value}</p>
              </div>
            ))}
          </div>
          <QrCode size={80} className="mx-auto mb-6" style={{color:'#e8dfc8'}}/>
          <p className="text-center text-xs text-slate-400 mb-6">Confirmation sent · Tickets delivered to your email</p>
          <button onClick={() => { setHubState('browse'); setSelectedSection(null); setQty(2); }}
            className="w-full py-4 rounded-2xl font-black text-white"
            style={{background:'#1a1208', fontFamily:'Rajdhani, sans-serif', fontSize:'16px'}}>
            ← Back to Tickets
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* ── HEADER ── */}
      <div className="mb-8 pb-6 border-b-2" style={{borderColor:'#e8dfc8'}}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <p className="page-label mb-2">Wofford Terriers · Ticket Marketplace</p>
            <h2 className="futura-heading leading-none" style={{fontSize:'clamp(36px,6vw,56px)', color:'#1a1208'}}>
              Ticket Hub
            </h2>
            <p className="text-sm mt-2 font-semibold" style={{color:'#886E4C'}}>
              {v.sport} · {v.name} · {v.capacity} capacity
            </p>
          </div>
          {/* Wofford wordmark strip */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl" style={{background:'#1a1208'}}>
            <div style={{textAlign:'right'}}>
              <p className="futura-heading text-white" style={{fontSize:'18px',lineHeight:'1'}}>WOFFORD</p>
              <p className="mono-label" style={{color:'#886E4C',fontSize:'9px',letterSpacing:'3px'}}>TERRIERS</p>
            </div>
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
              <ellipse cx="50" cy="50" rx="42" ry="38" fill="#886E4C"/>
              <ellipse cx="50" cy="54" rx="36" ry="30" fill="#000"/>
              <ellipse cx="50" cy="42" rx="18" ry="22" fill="#fff"/>
              <circle cx="36" cy="38" r="10" fill="#fff"/>
              <circle cx="64" cy="38" r="10" fill="#fff"/>
              <circle cx="37" cy="39" r="5" fill="#000"/><circle cx="65" cy="39" r="5" fill="#000"/>
              <ellipse cx="50" cy="58" rx="14" ry="9" fill="#000"/>
              <rect x="20" y="76" width="60" height="14" rx="7" fill="#886E4C"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── VENUE SELECTOR ── */}
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
      </div>

      {/* ── ZONE FILTER PILLS ── */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => setFilterZone('all')}
          className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
          style={filterZone === 'all'
            ? { background:'#886E4C', color:'white' }
            : { background:'#F5F0E8', color:'#3a2e1e', border:'1px solid #e8dfc8' }}>
          All Sections
        </button>
        {Object.entries(v.zones).map(([zk, zv]) => (
          <button key={zk} onClick={() => setFilterZone(zk)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
            style={filterZone === zk
              ? { background:zv.color, color:'white' }
              : { background:'#F5F0E8', color:'#3a2e1e', border:'1px solid #e8dfc8' }}>
            {zv.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">

        {/* ── SECTION GRID ── */}
        <div className="xl:col-span-2">
          {/* Venue banner with Boss watermark */}
          <div className="rounded-2xl mb-4 p-5 relative overflow-hidden" style={{background:'linear-gradient(135deg, #1a1208, #2a1e0e)', minHeight:'80px'}}>
            {/* Boss watermark */}
            <div className="absolute right-4 top-0 bottom-0 flex items-center opacity-10">
              <svg viewBox="0 0 100 100" style={{width:'80px',height:'80px'}} fill="none">
                <ellipse cx="50" cy="46" rx="38" ry="34" fill="#886E4C"/>
                <ellipse cx="50" cy="50" rx="32" ry="28" fill="#000"/>
                <ellipse cx="50" cy="38" rx="16" ry="20" fill="#fff"/>
                <circle cx="34" cy="34" r="10" fill="#fff"/><circle cx="66" cy="34" r="10" fill="#fff"/>
                <circle cx="35" cy="35" r="5" fill="#000"/><circle cx="67" cy="35" r="5" fill="#000"/>
                <ellipse cx="50" cy="54" rx="12" ry="8" fill="#000"/>
                <rect x="18" y="72" width="64" height="12" rx="6" fill="#886E4C"/>
              </svg>
            </div>
            <div className="relative z-10">
              <p className="futura-heading text-white" style={{fontSize:'18px'}}>{v.name}</p>
              <p className="mono-label mt-1" style={{color:'#C7B37F', fontSize:'9px'}}>{v.subtitle} · {v.description}</p>
            </div>
          </div>

          {/* Section cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredSections.map(sec => {
              const zoneInfo = v.zones[sec.zone];
              const isSelected = selectedSection?.id === sec.id;
              return (
                <button key={sec.id} onClick={() => setSelectedSection(isSelected ? null : sec)}
                  className="text-left rounded-2xl border-2 transition-all overflow-hidden"
                  style={{
                    borderColor: isSelected ? '#886E4C' : '#e8dfc8',
                    background: isSelected ? '#1a1208' : 'white',
                    boxShadow: isSelected ? '0 8px 32px rgba(136,110,76,0.25)' : '0 2px 8px rgba(26,18,8,0.04)',
                    transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                  }}>
                  {/* Zone color bar */}
                  <div className="h-1.5" style={{background: isSelected ? '#886E4C' : zoneInfo?.color || '#e8dfc8'}}/>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="futura-heading" style={{fontSize:'16px', color: isSelected ? 'white' : '#1a1208'}}>{sec.name}</p>
                        <p className="text-xs font-semibold mt-0.5" style={{color: isSelected ? '#C7B37F' : '#886E4C'}}>{zoneInfo?.label}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="futura-heading" style={{fontSize:'22px', color: isSelected ? '#C7B37F' : '#886E4C'}}>\${sec.price}</p>
                        <p className="mono-label" style={{fontSize:'8px', color: isSelected ? 'rgba(255,255,255,0.5)' : '#94a3b8'}}>per ticket</p>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed mb-3" style={{color: isSelected ? 'rgba(255,255,255,0.6)' : '#64748b'}}>{sec.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{
                        background: isSelected ? 'rgba(136,110,76,0.2)' : \`\${statusColor(sec.status)}15\`,
                        color: isSelected ? '#C7B37F' : statusColor(sec.status)
                      }}>
                        {statusLabel(sec.status)}
                      </span>
                      {isSelected && (
                        <span className="mono-label text-white/60" style={{fontSize:'8px'}}>✓ SELECTED</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── ORDER PANEL ── */}
        <div className="sticky top-6">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-2" style={{borderColor:'#e8dfc8'}}>
            {/* Panel header with Wofford branding */}
            <div className="px-6 py-5 relative overflow-hidden" style={{background:'linear-gradient(135deg, #1a1208, #2a1e0e)'}}>
              <div className="absolute right-0 top-0 bottom-0 opacity-8 flex items-center pr-2">
                <svg viewBox="0 0 100 100" style={{width:'60px',height:'60px'}} fill="none">
                  <ellipse cx="50" cy="46" rx="38" ry="34" fill="#886E4C"/>
                  <ellipse cx="50" cy="50" rx="32" ry="28" fill="#000"/>
                  <ellipse cx="50" cy="38" rx="16" ry="20" fill="#fff"/>
                  <circle cx="34" cy="34" r="10" fill="#fff"/><circle cx="66" cy="34" r="10" fill="#fff"/>
                  <circle cx="35" cy="35" r="5" fill="#000"/><circle cx="67" cy="35" r="5" fill="#000"/>
                  <ellipse cx="50" cy="54" rx="12" ry="8" fill="#000"/>
                  <rect x="18" y="72" width="64" height="12" rx="6" fill="#886E4C"/>
                </svg>
              </div>
              <p className="futura-heading text-white relative z-10" style={{fontSize:'20px'}}>Order Summary</p>
              <p className="mono-label relative z-10 mt-1" style={{color:'#C7B37F', fontSize:'9px'}}>WOFFORD TERRIERS · {v.sport.toUpperCase()}</p>
            </div>

            <div className="bg-white p-6">
              {!selectedSection ? (
                <div className="py-10 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background:'#F5F0E8'}}>
                    <span style={{fontSize:'28px'}}>{v.icon}</span>
                  </div>
                  <p className="futura-heading mb-1" style={{fontSize:'18px', color:'#1a1208'}}>Select a Section</p>
                  <p className="text-sm text-slate-400">Choose from the sections on the left</p>
                  <p className="futura-heading mt-4" style={{fontSize:'36px', color:'#e8dfc8'}}>$0.00</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Selected section */}
                  <div className="p-4 rounded-2xl" style={{background:'#F5F0E8', border:'2px solid #e8dfc8'}}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{background:'#886E4C'}}/>
                      <p className="font-black text-sm" style={{color:'#1a1208'}}>{selectedSection.name}</p>
                    </div>
                    <p className="text-xs text-slate-500 pl-4">{selectedSection.desc}</p>
                  </div>

                  {/* Quantity selector */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:'#886E4C'}}>Quantity</p>
                    <div className="flex items-center gap-3">
                      {[1,2,3,4,5,6].map(n => (
                        <button key={n} onClick={() => setQty(n)}
                          className="w-10 h-10 rounded-xl font-black text-sm transition-all"
                          style={qty === n
                            ? { background:'#1a1208', color:'white', boxShadow:'0 4px 12px rgba(26,18,8,0.3)' }
                            : { background:'#F5F0E8', color:'#3a2e1e' }}>
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{qty}x {selectedSection.label}</span>
                      <span className="font-bold" style={{color:'#1a1208'}}>\${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Facility fee ({qty}x)</span>
                      <span className="text-slate-400">\${(fees.facility * qty).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Processing ({qty}x)</span>
                      <span className="text-slate-400">\${(fees.processing * qty).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-3 border-t-4" style={{borderColor:'#1a1208'}}>
                      <span className="futura-heading" style={{fontSize:'18px', color:'#1a1208'}}>Total</span>
                      <span className="futura-heading" style={{fontSize:'32px', color:'#886E4C'}}>\${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Purchase button */}
                  <button onClick={() => setHubState('checkout')}
                    className="w-full py-4 rounded-2xl font-black text-white transition-all active:scale-95 hover:opacity-90"
                    style={{background:'linear-gradient(135deg, #1a1208, #2a1e0e)', fontFamily:'Rajdhani, sans-serif', fontSize:'17px', letterSpacing:'0.03em', boxShadow:'0 8px 24px rgba(26,18,8,0.4)'}}>
                    Proceed to Payment →
                  </button>

                  {hubState === 'checkout' && (
                    <div className="space-y-4 fade-in">
                      <div className="p-4 rounded-2xl flex items-center justify-between" style={{background:'#F5F0E8'}}>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white" style={{background:'#1a1208'}}>CC</div>
                          <div>
                            <p className="font-bold" style={{color:'#1a1208'}}>Primary Card</p>
                            <p className="text-xs text-slate-400 font-mono">•••• 4242</p>
                          </div>
                        </div>
                        <CheckCircle2 size={24} style={{color:'#886E4C'}}/>
                      </div>
                      <button onClick={handlePurchase}
                        className="w-full py-4 rounded-2xl font-black text-white transition-all active:scale-95"
                        style={{background:'#886E4C', fontFamily:'Rajdhani, sans-serif', fontSize:'17px'}}>
                        Confirm Purchase · \${total.toFixed(2)}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Shield */}
              <div className="mt-4 p-3 rounded-xl flex items-center gap-2" style={{background:'#F5F0E8'}}>
                <ShieldCheck size={16} style={{color:'#886E4C'}}/>
                <p className="text-xs font-semibold" style={{color:'#886E4C'}}>Secure checkout · Official Wofford tickets</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
`;

// ── INJECT THE NEW COMPONENT BEFORE THE MAIN APP ─────────────────────────────
// Find the TicketHub component and replace it, plus inject new data
const ticketHubStart = code.indexOf('// ============================================================\n// TICKET HUB');
const ticketHubEnd = code.indexOf('// ============================================================\n// MOBILE DEMO');

if (ticketHubStart !== -1 && ticketHubEnd !== -1) {
  code = code.slice(0, ticketHubStart) + NEW_TICKET_HUB + '\n' + code.slice(ticketHubEnd);
  console.log('✅ New Wofford Ticket Hub injected');
} else {
  // Fallback: inject before MAIN APP section
  const mainAppIdx = code.indexOf('// ============================================================\n// MAIN APP');
  if (mainAppIdx !== -1) {
    code = code.slice(0, mainAppIdx) + NEW_TICKET_HUB + '\n' + code.slice(mainAppIdx);
    console.log('✅ Ticket Hub injected before Main App (fallback)');
  } else {
    console.log('⚠️  Could not find injection point — add manually');
  }
}

// ── UPDATE THE STORE TAB TO USE WoffordTicketHub ──────────────────────────────
code = code.replace(
  `{activeTab === 'store' && <div className="fade-in"><TicketHub onTransaction={addTransaction}/></div>}`,
  `{activeTab === 'store' && <div className="fade-in"><WoffordTicketHub onTransaction={addTransaction}/></div>}`
);
console.log('✅ Store tab wired to WoffordTicketHub');

// ── UPDATE MOCK_DB inventory to Wofford pricing ───────────────────────────────
code = code.replace(
  `inventory: {
    sections: [
      { id: "101", name: "North End Zone", price: 35.00, status: 'HIGH', zone: 'endzone' },
      { id: "105", name: "North End Zone", price: 40.00, status: 'MED',  zone: 'endzone' },
      { id: "109", name: "South End Zone", price: 35.00, status: 'LOW',  zone: 'endzone' },
      { id: "113", name: "South End Zone", price: 40.00, status: 'HIGH', zone: 'endzone' },
      { id: "120", name: "Home Sideline",  price: 85.00, status: 'HIGH', zone: 'sideline' },
      { id: "124", name: "Home Sideline",  price: 95.00, status: 'MED',  zone: 'sideline' },
      { id: "128", name: "Away Sideline",  price: 75.00, status: 'HIGH', zone: 'sideline' },
      { id: "132", name: "Away Sideline",  price: 80.00, status: 'LOW',  zone: 'sideline' },
      { id: "200", name: "Club Level",     price: 175.00, status: 'MED', zone: 'club' },
      { id: "204", name: "Club Level",     price: 175.00, status: 'HIGH',zone: 'club' },
      { id: "210", name: "Press Box",      price: 225.00, status: 'LOW', zone: 'club' },
    ],
    fees: { facility: 12.50, processing: 4.50 }
  },`,
  `inventory: {
    sections: [
      { id: "H1",  name: "Home Chairback H1",   price: 27.00, status: 'HIGH', zone: 'home_chairback' },
      { id: "H3",  name: "Home Chairback H3",   price: 27.00, status: 'MED',  zone: 'home_chairback' },
      { id: "MR",  name: "Mungo Room VIP",      price: 85.00, status: 'LOW',  zone: 'vip' },
      { id: "HB1", name: "Home Bleacher HB1",   price: 15.00, status: 'HIGH', zone: 'home_bleacher' },
      { id: "N1",  name: "North End Zone",      price: 10.00, status: 'HIGH', zone: 'north_ez' },
      { id: "S1",  name: "Verandah Lot",        price: 20.00, status: 'MED',  zone: 'south_ez' },
      { id: "V1",  name: "Visitor Side",        price: 12.00, status: 'HIGH', zone: 'visitor' },
      { id: "CS1", name: "Courtside",           price: 65.00, status: 'LOW',  zone: 'courtside' },
      { id: "C51A","Club 51 A",                 price: 45.00, status: 'MED',  zone: 'club51' },
      { id: "SUA", name: "Corner Suite A",      price:120.00, status: 'LOW',  zone: 'suite' },
      { id: "LB1", name: "Lower Bowl Sec 1",    price: 25.00, status: 'HIGH', zone: 'lower_bowl' },
    ],
    fees: { facility: 2.50, processing: 1.50 }
  },`
);
console.log('✅ MOCK_DB inventory updated to Wofford pricing');

// ── WRITE ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(APP_PATH, code);
console.log('\n🏈🏀🐾 Wofford Ticket Hub complete!');
console.log('3 venues: Gibbs Stadium · Jerry Richardson · Volleyball');
console.log('git add . && git commit -m "Wofford Ticket Hub — all venues" && git push');
