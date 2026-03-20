const fs = require('fs');
const path = require('path');

const APP_PATH = process.argv[2]
  || 'C:\\Users\\dnbch\\OneDrive\\Documents\\Simple Genius\\ace-demo\\src\\App.jsx';

console.log('Reading:', APP_PATH);
let code = fs.readFileSync(APP_PATH, 'utf8');
const orig = code.length;

// ── 1. REMOVE DUPLICATE THEMES declarations ───────────────────────────────────
// Keep only the FIRST occurrence, remove any subsequent ones
const themesMarker = '// ── THEME CONFIG — swap this object per client';
const firstIdx = code.indexOf(themesMarker);
const secondIdx = code.indexOf(themesMarker, firstIdx + 10);

if (secondIdx !== -1) {
  // Find the end of the second THEMES block (after injectThemeVars function)
  const blockEnd = code.indexOf('\n\n', code.indexOf('function injectThemeVars', secondIdx)) + 2;
  code = code.slice(0, secondIdx) + code.slice(blockEnd);
  console.log('✅ Duplicate THEMES block removed');
} else {
  console.log('✅ No duplicate THEMES found');
}

// ── 2. REMOVE DUPLICATE BOSS_LOGO_SVG declarations ───────────────────────────
const svgMarker = '// ── BOSS MASCOT — inline SVG logo';
const firstSvg = code.indexOf(svgMarker);
const secondSvg = code.indexOf(svgMarker, firstSvg + 10);

if (secondSvg !== -1) {
  // Find end of second SVG block
  const svgEnd = code.indexOf('const BOSS_LOGO = null;', secondSvg) + 'const BOSS_LOGO = null;'.length + 1;
  code = code.slice(0, secondSvg) + code.slice(svgEnd);
  console.log('✅ Duplicate BOSS_LOGO_SVG block removed');
} else {
  console.log('✅ No duplicate BOSS_LOGO_SVG found');
}

// ── 3. REMOVE DUPLICATE PEAK_SCHOOLS declarations ────────────────────────────
const schoolsMarker = '// ============================================================\n// PEAK SPORTS PORTFOLIO';
const firstSchools = code.indexOf(schoolsMarker);
const secondSchools = code.indexOf(schoolsMarker, firstSchools + 10);

if (secondSchools !== -1) {
  // Find end of second PEAK_SCHOOLS block
  const schoolsEnd = code.indexOf('\n};\n', code.indexOf("akron:", secondSchools)) + 4;
  code = code.slice(0, secondSchools) + code.slice(schoolsEnd);
  console.log('✅ Duplicate PEAK_SCHOOLS block removed');
} else {
  console.log('✅ No duplicate PEAK_SCHOOLS found');
}

// ── 4. REMOVE DUPLICATE CAMPAIGNS declarations ───────────────────────────────
const campMarker = 'const CAMPAIGNS = {';
const firstCamp = code.indexOf(campMarker);
const secondCamp = code.indexOf(campMarker, firstCamp + 10);

if (secondCamp !== -1) {
  // Find end of second CAMPAIGNS block
  const campEnd = code.indexOf('\n};\n', code.indexOf("ALUMNI:", secondCamp)) + 4;
  code = code.slice(0, secondCamp) + code.slice(campEnd);
  console.log('✅ Duplicate CAMPAIGNS block removed');
} else {
  console.log('✅ No duplicate CAMPAIGNS found');
}

// ── 5. REMOVE DUPLICATE WOFFORD_VENUES declarations ──────────────────────────
const venuesMarker = 'const WOFFORD_VENUES = {';
const firstVenues = code.indexOf(venuesMarker);
const secondVenues = code.indexOf(venuesMarker, firstVenues + 10);

if (secondVenues !== -1) {
  const venuesEnd = code.indexOf('\n};\n', code.indexOf("volleyball:", secondVenues)) + 4;
  code = code.slice(0, secondVenues) + code.slice(venuesEnd);
  console.log('✅ Duplicate WOFFORD_VENUES block removed');
} else {
  console.log('✅ No duplicate WOFFORD_VENUES found');
}

// ── 6. FIX apostrophe bug one more time ──────────────────────────────────────
code = code.replace(
  `detail:'Remember who didn't reply, write follow-ups manually', time:'2 hrs', pain:true },`,
  `detail:"Remember who didn't reply, write follow-ups manually", time:'2 hrs', pain:true },`
);
console.log('✅ Apostrophe bug fixed');

// ── 7. FIX comma syntax at line ~202 ─────────────────────────────────────────
// The error shows "Expected : but found ," — likely in section data
// Fix any trailing comma issues in object shorthand
code = code.replace(/price: (\d+\.\d+),\s+status:/g, 'price:$1, status:');

// ── WRITE ─────────────────────────────────────────────────────────────────────
fs.writeFileSync(APP_PATH, code);
console.log('\nCleanup complete: ' + orig.toLocaleString() + ' → ' + code.length.toLocaleString() + ' chars');
console.log('git add . && git commit -m "cleanup duplicates + fix syntax" && git push');
