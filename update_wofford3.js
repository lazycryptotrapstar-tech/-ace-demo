const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || 'C:\\Users\\dnbch\\OneDrive\\Documents\\Simple Genius\\ace-demo\\src\\App.jsx';

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');

// ── REPLACE FULL CONTACTS ARRAY ───────────────────────────────────────────────
// Find the contacts array and replace entirely with Wofford roster

const OLD_CONTACTS_START = `const contacts = [
  // ── REAL CONTACTS: Wofford / Terrier Sports Properties ──────────────────`;

// Find from the start of contacts array to the closing ];
const contactsStartIdx = code.indexOf('const contacts = [');
const contactsEndIdx = code.indexOf('];', contactsStartIdx) + 2;
const oldContactsBlock = code.slice(contactsStartIdx, contactsEndIdx);

const NEW_CONTACTS = `const contacts = [

  // ── ADMINISTRATION ────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Nayef Samhat',
    school: 'Wofford College',
    title: 'President',
    tier: 'Platinum',
    email: 'samhatnr@wofford.edu',
    phone: '(864) 597-4010',
    lastContact: '5 days ago',
    status: 'hot',
    spend: 0,
    tags: ['Administration', 'Transitioning', 'Time-Sensitive'],
    notes: 'President since 2013. Leading $470M Drive for 5 fundraising campaign. Stepping down end of 2025-26 academic year. High-priority outreach window before transition.'
  },
  {
    id: 2,
    name: 'Christopher A.P. Carpenter',
    school: 'Wofford College',
    title: 'Board of Trustees Chairman',
    tier: 'Platinum',
    email: 'carpenter@wofford.edu',
    phone: '(864) 597-4011',
    lastContact: '12 days ago',
    status: 'warm',
    spend: 0,
    tags: ['Administration', 'Alumni', 'Board', 'Decision Maker'],
    notes: 'Class of 1990 alumnus. Currently overseeing search for Wofford\'s 12th president. Key governance contact during leadership transition.'
  },
  {
    id: 3,
    name: 'Timothy Schmitz',
    school: 'Wofford College',
    title: 'Willimon Family Provost',
    tier: 'Gold',
    email: 'schmitzta@wofford.edu',
    phone: '(864) 597-4012',
    lastContact: '18 days ago',
    status: 'warm',
    spend: 0,
    tags: ['Administration', 'Academic', 'Long-Tenured'],
    notes: 'At Wofford since 2000. Key academic decision-maker for institutional technology and operations.'
  },
  {
    id: 4,
    name: 'Calhoun L. Kennedy Jr.',
    school: 'Wofford College',
    title: 'VP for Philanthropy & Engagement',
    tier: 'Gold',
    email: 'kennedycl@wofford.edu',
    phone: '(864) 597-4013',
    lastContact: '8 days ago',
    status: 'hot',
    spend: 0,
    tags: ['Administration', 'Philanthropy', 'Sponsorship', 'Drive for 5'],
    notes: 'Primary contact for sponsorships, donations, and the $470M Drive for 5 campaign. Direct alignment with revenue platform goals.'
  },

  // ── ATHLETICS ─────────────────────────────────────────────────────────────
  {
    id: 5,
    name: 'Shawn Watson',
    school: 'Wofford College',
    title: 'Head Football Coach',
    tier: 'Gold',
    email: 'watsonsc@wofford.edu',
    phone: '(864) 597-4020',
    lastContact: '3 days ago',
    status: 'hot',
    spend: 0,
    tags: ['Athletics', 'Football', 'Coach', 'Year 3'],
    notes: 'Entering 3rd season. 6-6 record in 2025. Gibbs Stadium ticket demand tied directly to team performance. Strong outreach window pre-season.'
  },
  {
    id: 6,
    name: 'Kevin Giltner',
    school: 'Wofford College',
    title: 'Head Men\'s Basketball Coach',
    tier: 'Gold',
    email: 'giltnerkj@wofford.edu',
    phone: '(864) 597-4021',
    lastContact: '6 days ago',
    status: 'hot',
    spend: 0,
    tags: ['Athletics', 'Basketball', 'Coach', 'Alumni', 'New Hire'],
    notes: 'Class of 2012 Wofford grad. Five-time SoCon champion. Returning home after 6 seasons at Virginia Tech. High fan energy around new era — prime season ticket outreach window.'
  },

  // ── TERRIER SPORTS PROPERTIES ─────────────────────────────────────────────
  {
    id: 7,
    name: 'Shawn Tyler',
    school: 'Wofford College',
    title: 'Director of Sales — Terrier Sports Properties',
    tier: 'Gold',
    email: 'shawn@terriersportsproperties.com',
    phone: '(864) 597-4000',
    lastContact: '2 days ago',
    status: 'hot',
    spend: 0,
    tags: ['Sponsor', 'Key Contact', 'Peak Sports']
  },
  {
    id: 8,
    name: 'Devin Foster',
    school: 'Wofford College',
    title: 'Ticketing — Terrier Sports Properties',
    tier: 'Gold',
    email: 'devin@terriersportsproperties.com',
    phone: '(864) 597-4001',
    lastContact: '2 days ago',
    status: 'hot',
    spend: 0,
    tags: ['Ticketing', 'Key Contact', 'Peak Sports']
  },
  {
    id: 9,
    name: 'Scott Kull',
    school: 'Wofford College',
    title: 'Director of Athletics',
    tier: 'Platinum',
    email: 'kullsr@wofford.edu',
    phone: '(864) 597-4002',
    lastContact: '5 days ago',
    status: 'warm',
    spend: 0,
    tags: ['Admin', 'Decision Maker', 'VIP', 'Institutional']
  },

];`;

if (oldContactsBlock) {
  code = code.replace(oldContactsBlock, NEW_CONTACTS);
  console.log('✅ Full Wofford CRM roster applied (9 contacts)');
} else {
  console.log('⚠️  contacts array not found — check App.jsx');
}

// ── UPDATE CRM STATS FOOTER ───────────────────────────────────────────────────
code = code.replace(
  `{ label:'Contacts',         value:'8',   sub:'In this demo' },`,
  `{ label:'Contacts',         value:'9',   sub:'Wofford roster' },`
);
code = code.replace(
  `{ label:'Hot Leads',        value:'2',   sub:'Ready to close', gold:true },`,
  `{ label:'Hot Leads',        value:'5',   sub:'Ready to close', gold:true },`
);
console.log('✅ CRM stats updated');

// ── UPDATE FILTER TO INCLUDE ROLE-BASED FILTERS ───────────────────────────────
code = code.replace(
  `{['all','hot','warm','cold','movers'].map(s => (`,
  `{['all','hot','warm','cold','admin','athletics'].map(s => (`
);

// Update filter logic to handle new role tags
code = code.replace(
  `const filteredContacts = filterStatus === 'all' ? contacts : filterStatus === 'movers' ? contacts.filter(c => c.tags.includes('New Mover')) : contacts.filter(c => c.status === filterStatus);`,
  `const filteredContacts = filterStatus === 'all' ? contacts
    : filterStatus === 'admin' ? contacts.filter(c => c.tags.includes('Administration') || c.tags.includes('Admin'))
    : filterStatus === 'athletics' ? contacts.filter(c => c.tags.includes('Athletics') || c.tags.includes('Coach'))
    : contacts.filter(c => c.status === filterStatus);`
);
console.log('✅ CRM filters updated (admin / athletics)');

// ── WRITE OUTPUT ──────────────────────────────────────────────────────────────
fs.writeFileSync(APP_PATH, code);
console.log('\n🎉 Wofford CRM roster complete!');
console.log('9 contacts: 4 Administration · 2 Athletics · 3 Terrier Sports Properties');
console.log('\ngit add . && git commit -m "Wofford CRM roster" && git push');
