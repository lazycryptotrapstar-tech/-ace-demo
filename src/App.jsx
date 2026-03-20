import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard, Network, Send, CheckCircle2,
  ShieldCheck, Zap, ShoppingCart, ChevronRight, QrCode,
  Trophy, Activity, ArrowLeft, MousePointer2, Sparkles,
  TrendingUp, Users, Star, Eye, MapPin, BarChart2, Database,
  Mail, RefreshCw, ThumbsUp, Edit3, Filter, Phone
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// ============================================================
// CONFIG
// ============================================================
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://testimony-traveller-nicholas-ideas.trycloudflare.com/webhook/2e28cfe9-961f-48fb-a548-3f0306448996/chat';

// ============================================================
// COLORS
// ============================================================
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
  // aliases so existing code that references gold still works
  gold:       '#886E4C',
  goldLight:  '#C7B37F',
  cognac:     '#6b5538',
  cognacDim:  'rgba(107,85,56,0.12)',
};

const MOCK_DB = {
  fans: [{ id: "FAN_KULL01", name: "Scott Kull", loyaltyTier: "Platinum", lastPurchase: { section: "120", row: "A" }, title: "Director of Athletics", org: "Wofford College" }],
  inventory: {
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
  },
  initialStats: [
    { fanName: "Cara H.",    campaign: "Ticket Sales",      amount: 102.50,   id: "TX_1" },
    { fanName: "Cara S.",   campaign: "Hospitality",       amount: 3500.00,  id: "TX_2" },
    { fanName: "Marcus T.", campaign: "Alumni Outreach",   amount: 280.00,   id: "TX_3" },
    { fanName: "Sandra L.", campaign: "Sponsorship Sales", amount: 12500.00, id: "TX_4" },
  ]
};

const CAMPAIGNS = {
  TICKETING: {
    title: "Ticket Sales",
    sub: "Live inventory · Real-time pricing",
    icon: <span style={{fontSize:'20px'}}>🐾</span>,
    initial: (fan) => `Woof! Hey ${fan.name.split(' ')[0]}! 🐾 Boss here — your Wofford Terriers ticket rep. Next home game at Gibbs Stadium is coming up fast. Want me to find you something near Sec ${fan.lastPurchase.section}?`,
    systemPrompt: (fan) => `You are Ace, an expert ticket sales rep for Peak Sports MGMT at a mid-major college athletics program. Your goal is to sell tickets — season plans, single-game tickets, flex plans, and group packages.

Fan profile: ${fan.name}, loyalty tier: ${fan.loyaltyTier}, last seat: Section ${fan.lastPurchase.section} Row ${fan.lastPurchase.row}.

Use the inventory database tool to find available seats. Suggest options near their last section first. Be conversational, energetic, and close toward a purchase. If they ask about price, pull real inventory. Keep replies under 3 sentences unless showing seat options.`
  },
  SPONSORSHIP: {
    title: "Sponsorship Sales",
    sub: "Corporate partners · Package builder",
    icon: <Trophy size={20} />,
    initial: (fan) => `Hey ${fan.name.split(' ')[0]}! 🏆 Boss here from Terrier Sports Properties. We have some strong sponsorship openings for Wofford athletics this season — football at Gibbs and basketball at JRIS. What's your primary goal — visibility, leads, or hospitality?`,
    systemPrompt: (fan) => `You are Ace, an expert sponsorship sales rep for Peak Sports MGMT. Your goal is to sell corporate sponsorship packages to local businesses, regional brands, and corporate partners.

Contact: ${fan.name}, tier: ${fan.loyaltyTier}.

CRITICAL INSTRUCTIONS:
- You have access to a live sponsorship_packages database table. ALWAYS query it to find real available packages before making recommendations.
- Use this SQL to find available packages: SELECT school, package_tier, package_name, sport, annual_price, contract_years, status, highlights, remaining_spots FROM sponsorship_packages WHERE status = 'Available' AND remaining_spots > 0 ORDER BY annual_price ASC
- To find packages in a specific budget range, add: AND annual_price BETWEEN [low] AND [high]
- To find Renewal Due packages (hot leads): WHERE status = 'Renewal Due'
- Present real package data from the database — tier, price, inclusions, and remaining spots.
- Package tiers: Bronze ($2,000–$3,000) · Silver ($5,500–$8,000) · Gold ($12,000–$20,000) · Presenting ($35,000–$50,000)
- Every package includes some combination of: digital signage rotations per game, fixed venue signage, PA/scoreboard mentions, in-game promo activations, social media posts, radio spots, comp tickets, VIP parking, and suite access at higher tiers.
- Multi-Sport packages cover both football and basketball and offer the best value.
- Be consultative: ask about their budget, marketing goals, and target audience first, then pull matching packages from the DB.
- Highlight urgency when remaining_spots is low (1 = "only one left").
- Packages marked 'Renewal Due' are warm leads — mention the renewal opportunity and lock in the rate.
- Keep tone professional and confident. Close toward a commitment or next-step meeting.`
  },
  PREMIUM: {
    title: "Hospitality & Suites",
    sub: "VIP access · Priority booking",
    icon: <Star size={20} />,
    initial: (fan) => `Good afternoon ${fan.name.split(' ')[0]}. The Mungo Room at Gibbs Stadium and Club 51 at JRIS are both open for the upcoming season. As a ${fan.loyaltyTier} member you have priority. Football or basketball first?`,
    systemPrompt: (fan) => `You are Ace, a premium hospitality sales rep for Peak Sports MGMT. Your goal is to sell Club Level suites and VIP hospitality experiences.

Contact: ${fan.name}, loyalty tier: ${fan.loyaltyTier} — they have priority access.

Suite packages include all-inclusive food and beverage, private seating for 10-20 guests, dedicated entry, and parking. Use the inventory database to check Club Level (price >= 150) and Press Box availability. Emphasize exclusivity, the premium experience, and corporate entertainment value. Ask how many guests they're planning for. Close toward a deposit. Keep tone warm but elevated.`
  },
  ALUMNI: {
    title: "Alumni Outreach",
    sub: "Class reunion · Group seating",
    icon: <Users size={20} />,
    initial: (fan) => `Hey ${fan.name.split(' ')[0]}! 🎓 Once a Terrier, always a Terrier. We're building out alumni sections for Wofford home games this season — Gibbs Stadium in the fall, JRIS in the winter. What year did you graduate?`,
    systemPrompt: (fan) => `You are Ace, an alumni relations and group sales rep for Peak Sports MGMT. Your goal is to sell group ticket packages and alumni reunion blocks.

Contact: ${fan.name}, loyalty tier: ${fan.loyaltyTier}.

Group packages: 10+ tickets get 15% off, 25+ get 20% off, plus a reserved section block. Use the inventory database to find available sections that can accommodate groups — look for sections with multiple adjacent seats at lower price points (under $60). Lead with nostalgia and community. Ask how many people they're organizing. Mention tailgate packages and pregame meetup options. Keep it warm and fun.`
  }
};

// ============================================================
// n8n API
// ============================================================
const askAce = async (query, sessionId, systemContext = '') => {
  try {
    const fullInput = systemContext
      ? `[SYSTEM CONTEXT — follow these instructions for this entire conversation]\n${systemContext}\n[END SYSTEM CONTEXT]\n\nUser: ${query}`
      : query;
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chatInput: fullInput, sessionId })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw = await response.text();
    const lines = raw.split('\n').filter(l => l.trim());
    let assembled = '';
    for (const line of lines) {
      try {
        const obj = JSON.parse(line);
        if (obj.type === 'item' && obj.content !== undefined) assembled += obj.content;
      } catch { }
    }
    if (assembled) return assembled;
    try {
      const data = JSON.parse(raw);
      return data.output || data.text || data.message || data.response || JSON.stringify(data);
    } catch { return raw; }
  } catch (err) {
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
};

// ============================================================
// STYLES
// ============================================================
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap');

    * { box-sizing: border-box; }
    input, textarea, select { font-size: 16px !important; }

    @keyframes fadeSlideUp {
      from { opacity:0; transform:translateY(10px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes pulseDot {
      0%,80%,100%{transform:scale(0.5);opacity:0.3}
      40%{transform:scale(1);opacity:1}
    }
    @keyframes breathe {
      0%,100% { opacity:0.55; }
      50%     { opacity:1; }
    }

    .msg-enter  { animation: fadeSlideUp 0.35s cubic-bezier(0.4,0,0.2,1) forwards; }
    .fade-in    { animation: fadeIn 0.4s ease forwards; }
    .dot-1 { animation: pulseDot 1.3s infinite 0s; }
    .dot-2 { animation: pulseDot 1.3s infinite 0.18s; }
    .dot-3 { animation: pulseDot 1.3s infinite 0.36s; }
    .section-path { transition: all 0.18s ease; cursor:pointer; }
    .section-path:hover { filter: brightness(1.3); }

    .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .card-hover:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(26,18,8,0.14); }

    /* ── TYPOGRAPHY ── */
    .futura-heading { font-family: 'Rajdhani', system-ui, sans-serif !important; font-weight: 700; letter-spacing: 0.02em; }
    .mono-label { font-family: 'Space Mono', monospace !important; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; }
    .page-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #886E4C; }

    /* ── SIDEBAR — deep forest, subtle grain ── */
    .sidebar-bg {
      background-color: #120d06;
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"),
        linear-gradient(170deg, #1a1208 0%, #0d0905 100%);
    }

    /* ── NAV ITEM ACTIVE — lime left bar ── */
    .nav-active {
      background: rgba(136,110,76,0.12) !important;
      border: 1px solid rgba(136,110,76,0.28) !important;
      box-shadow: inset 3px 0 0 #886E4C;
    }

    /* ── CONTENT AREA — crisp green-tinted grid ── */
    .content-bg {
      background-color: #F5F0E8;
      background-image:
        linear-gradient(rgba(136,110,76,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(136,110,76,0.06) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* ── DATA CARD ── */
    .data-card {
      background: #ffffff;
      border: 1px solid #e8dfc8;
      border-radius: 20px;
      box-shadow: 0 2px 20px rgba(136,110,76,0.07);
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }
    .data-card:hover {
      box-shadow: 0 6px 32px rgba(136,110,76,0.18), 0 2px 12px rgba(26,18,8,0.08);
      transform: translateY(-2px);
    }

    /* ── KPI CARD DARK ── */
    .kpi-dark {
      background: linear-gradient(145deg, #1a1208 0%, #2a1e0e 100%);
      border: 1px solid rgba(136,110,76,0.30);
      box-shadow: 0 4px 28px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03);
      border-radius: 20px;
    }

    /* ── STATUS DOT — lime pulse ── */
    .status-dot {
      width:8px; height:8px; border-radius:50%;
      background:#886E4C;
      box-shadow: 0 0 8px rgba(136,110,76,0.8);
      animation: breathe 2.8s ease-in-out infinite;
      flex-shrink: 0;
    }

    /* ── GLOW TEXT ── */
    .gold-glow { text-shadow: 0 0 28px rgba(136,110,76,0.55); }
    .cognac-glow { text-shadow: 0 0 20px rgba(199,179,127,0.5); }
  `}</style>
);

// ============================================================
// COLLEGE FOOTBALL STADIUM MAP — Ticketmaster-style concentric rings
// ============================================================
const CollegeStadiumMap = ({ onSelectSection, activeSection, showSeatView, onSeatView }) => {
  const [hoveredId, setHoveredId] = React.useState(null);

  const cx = 255, cy = 258;
  const toRad = d => d * Math.PI / 180;
  const ovalPt = (rx, ry, deg) => [
    cx + rx * Math.cos(toRad(deg)),
    cy + ry * Math.sin(toRad(deg))
  ];

  const makePath = (a1, a2, iRx, iRy, oRx, oRy) => {
    const p1 = ovalPt(iRx, iRy, a1);
    const p2 = ovalPt(iRx, iRy, a2);
    const p3 = ovalPt(oRx, oRy, a2);
    const p4 = ovalPt(oRx, oRy, a1);
    const lg = (a2 - a1) > 180 ? 1 : 0;
    return `M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} A${iRx} ${iRy} 0 ${lg} 1 ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} L${p3[0].toFixed(1)} ${p3[1].toFixed(1)} A${oRx} ${oRy} 0 ${lg} 0 ${p4[0].toFixed(1)} ${p4[1].toFixed(1)}Z`;
  };

  const lb = { iRx:102, iRy:136, oRx:162, oRy:200 };
  const ud = { iRx:170, iRy:208, oRx:228, oRy:258 };

  const getZone = a => {
    const n = ((a % 360) + 360) % 360;
    if (n > 250 && n < 290) return 'north_ez';
    if (n > 70  && n < 110) return 'south_ez';
    if (n > 135 && n < 225) return 'home';
    if (n > 315 || n < 45)  return 'away';
    return 'corner';
  };

  const zoneFill = (zone, level, isActive, isHover, sold) => {
    if (isActive) return C.gold;
    if (sold) return 'rgba(255,255,255,0.06)';
    if (level === 'upper') {
      const map = { home:'#1e3f6e', away:'#1a3560', north_ez:'#1a3458', south_ez:'#1a3458', corner:'#182f54' };
      return map[zone] || '#1a3252';
    }
    const map = { home:'#0a5028', away:'#1a4a3a', north_ez:'#1e6b44', south_ez:'#1e7044', corner:'#226040' };
    return map[zone] || '#1e6040';
  };

  const gap = 1.4;
  const numL = 26, numU = 32;
  const soldLower = new Set([4, 11, 19]);
  const soldUpper = new Set([2, 14, 22, 28]);

  const lowerSections = Array.from({ length: numL }, (_, i) => {
    const step = 360 / numL;
    const a1 = i * step + gap / 2, a2 = (i + 1) * step - gap / 2;
    const mid = (a1 + a2) / 2;
    const zone = getZone(mid);
    const sold = soldLower.has(i);
    const priceMap = { home: 125, away: 95, north_ez: 45, south_ez: 45, corner: 70 };
    return { id: String(101 + i), label: String(101 + i), zone, mid, sold, level: 'lower', price: priceMap[zone] || 70,
      path: makePath(a1, a2, lb.iRx, lb.iRy, lb.oRx, lb.oRy),
      lx: ovalPt((lb.iRx + lb.oRx) / 2, (lb.iRy + lb.oRy) / 2, mid)[0],
      ly: ovalPt((lb.iRx + lb.oRx) / 2, (lb.iRy + lb.oRy) / 2, mid)[1]
    };
  });

  const upperSections = Array.from({ length: numU }, (_, i) => {
    const step = 360 / numU;
    const a1 = i * step + gap / 2, a2 = (i + 1) * step - gap / 2;
    const mid = (a1 + a2) / 2;
    const zone = getZone(mid);
    const sold = soldUpper.has(i);
    return { id: String(201 + i), label: String(201 + i), zone, mid, sold, level: 'upper', price: 35,
      path: makePath(a1, a2, ud.iRx, ud.iRy, ud.oRx, ud.oRy),
      lx: ovalPt((ud.iRx + ud.oRx) / 2, (ud.iRy + ud.oRy) / 2, mid)[0],
      ly: ovalPt((ud.iRx + ud.oRx) / 2, (ud.iRy + ud.oRy) / 2, mid)[1]
    };
  });

  const allSections = [...lowerSections, ...upperSections];
  const activeSec = allSections.find(s => s.id === activeSection);
  const hoveredSec = allSections.find(s => s.id === hoveredId);
  const displaySec = activeSec || hoveredSec;
  const zoneLabel = zone => ({ home: 'Home Sideline', away: 'Away Sideline', north_ez: 'North End Zone', south_ez: 'South End Zone', corner: 'Corner' }[zone] || zone);

  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl" style={{background:'#120d06'}}>
      <div className="flex items-start justify-between px-4 pt-4 pb-2 gap-2">
        <div>
          <p className="mono-label mb-0.5" style={{color:C.lime, fontSize:'8px'}}>Interactive Seating Chart</p>
          <p className="text-white font-black text-sm leading-tight" style={{fontFamily:'Rajdhani, sans-serif'}}>Select Your Section</p>
        </div>
        <div className="flex flex-col gap-1 text-right shrink-0">
          <span className="flex items-center gap-1 justify-end"><span className="w-2.5 h-2.5 rounded-sm inline-block shrink-0" style={{background:'#2a1e0e'}}/><span className="text-white/45 text-xs">Home</span></span>
          <span className="flex items-center gap-1 justify-end"><span className="w-2.5 h-2.5 rounded-sm inline-block shrink-0" style={{background:'#1e3f6e'}}/><span className="text-white/45 text-xs">Upper</span></span>
          <span className="flex items-center gap-1 justify-end"><span className="w-2.5 h-2.5 rounded-sm inline-block bg-white/10 shrink-0"/><span className="text-white/35 text-xs">Sold</span></span>
        </div>
      </div>

      <svg viewBox="0 0 510 520" className="w-full" style={{display:'block'}}>
        <rect width="510" height="520" fill="#120d06"/>
        <ellipse cx={cx} cy={cy} rx="245" ry="270" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="2"/>

        {upperSections.map(s => (
          <g key={s.id} onClick={() => !s.sold && onSelectSection(s)}
            onMouseEnter={() => !s.sold && setHoveredId(s.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{cursor: s.sold ? 'default' : 'pointer'}}>
            <path d={s.path} fill={zoneFill(s.zone, s.level, s.id === activeSection, s.id === hoveredId, s.sold)}
              stroke="#120d06" strokeWidth="1.2" style={{transition:'fill 0.15s ease'}}/>
            <text x={s.lx.toFixed(1)} y={(s.ly + 3).toFixed(1)}
              fill={s.sold ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.7)'}
              fontSize="5.5" fontWeight="bold" textAnchor="middle"
              className="select-none pointer-events-none">{s.label}</text>
          </g>
        ))}

        {lowerSections.map(s => (
          <g key={s.id} onClick={() => !s.sold && onSelectSection(s)}
            onMouseEnter={() => !s.sold && setHoveredId(s.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{cursor: s.sold ? 'default' : 'pointer'}}>
            <path d={s.path} fill={zoneFill(s.zone, s.level, s.id === activeSection, s.id === hoveredId, s.sold)}
              stroke="#120d06" strokeWidth="1.5" style={{transition:'fill 0.15s ease'}}/>
            <text x={s.lx.toFixed(1)} y={(s.ly + 3).toFixed(1)}
              fill={s.id === activeSection ? C.green : s.sold ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.9)'}
              fontSize="7" fontWeight="bold" textAnchor="middle"
              className="select-none pointer-events-none">{s.label}</text>
          </g>
        ))}

        <ellipse cx={cx} cy={cy} rx="95" ry="130" fill="#1a5230" stroke="#226640" strokeWidth="1.5"/>
        {[-4,-3,-2,-1,0,1,2,3,4].map(i => (
          <line key={i} x1={cx + i*20} y1={cy - 118} x2={cx + i*20} y2={cy + 118}
            stroke="rgba(255,255,255,0.07)" strokeWidth="0.8"/>
        ))}
        <line x1={cx - 85} y1={cy} x2={cx + 85} y2={cy} stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
        {[-3,-2,-1,0,1,2,3].map(i => (
          <g key={i}>
            <line x1={cx + i*20 - 8} y1={cy - 30} x2={cx + i*20 + 8} y2={cy - 30} stroke="rgba(255,255,255,0.15)" strokeWidth="0.7"/>
            <line x1={cx + i*20 - 8} y1={cy + 30} x2={cx + i*20 + 8} y2={cy + 30} stroke="rgba(255,255,255,0.15)" strokeWidth="0.7"/>
          </g>
        ))}
        <ellipse cx={cx} cy={cy} rx="95" ry="130" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"/>
        <line x1={cx} y1={cy-128} x2={cx} y2={cy-108} stroke="rgba(255,220,80,0.6)" strokeWidth="1.5"/>
        <line x1={cx-14} y1={cy-108} x2={cx+14} y2={cy-108} stroke="rgba(255,220,80,0.6)" strokeWidth="1.2"/>
        <line x1={cx-14} y1={cy-108} x2={cx-14} y2={cy-90} stroke="rgba(255,220,80,0.6)" strokeWidth="1.2"/>
        <line x1={cx+14} y1={cy-108} x2={cx+14} y2={cy-90} stroke="rgba(255,220,80,0.6)" strokeWidth="1.2"/>
        <line x1={cx} y1={cy+128} x2={cx} y2={cy+108} stroke="rgba(255,220,80,0.6)" strokeWidth="1.5"/>
        <line x1={cx-14} y1={cy+108} x2={cx+14} y2={cy+108} stroke="rgba(255,220,80,0.6)" strokeWidth="1.2"/>
        <line x1={cx-14} y1={cy+108} x2={cx-14} y2={cy+90} stroke="rgba(255,220,80,0.6)" strokeWidth="1.2"/>
        <line x1={cx+14} y1={cy+108} x2={cx+14} y2={cy+90} stroke="rgba(255,220,80,0.6)" strokeWidth="1.2"/>
        <text x={cx} y={cy+5} fill="rgba(255,255,255,0.12)" fontSize="11" fontWeight="black" textAnchor="middle" letterSpacing="3">FIELD</text>
        <text x={cx} y="18" fill="rgba(255,255,255,0.25)" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="2">NORTH END ZONE</text>
        <text x={cx} y="510" fill="rgba(255,255,255,0.25)" fontSize="9" fontWeight="bold" textAnchor="middle" letterSpacing="2">SOUTH END ZONE</text>
        <text x="14" y={cy+4} fill="rgba(255,255,255,0.25)" fontSize="8" fontWeight="bold" textAnchor="middle" transform={`rotate(-90 14 ${cy})`} letterSpacing="1">HOME</text>
        <text x="496" y={cy+4} fill="rgba(255,255,255,0.25)" fontSize="8" fontWeight="bold" textAnchor="middle" transform={`rotate(90 496 ${cy})`} letterSpacing="1">AWAY</text>
      </svg>

      <div className="border-t border-white/5 px-4 py-3 min-h-[60px] flex items-center justify-between gap-2" style={{background:'rgba(0,0,0,0.3)'}}>
        {displaySec ? (
          <>
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs shrink-0"
                style={{background: displaySec.id === activeSection ? C.lime : 'rgba(255,255,255,0.08)',
                        color: displaySec.id === activeSection ? C.greenMid : 'white'}}>
                {displaySec.level === 'upper' ? 'U' : 'L'}
              </div>
              <div className="min-w-0">
                <p className="text-white font-black text-sm leading-tight truncate" style={{fontFamily:'Rajdhani, sans-serif'}}>Section {displaySec.id}</p>
                <p className="text-white/40 text-xs font-semibold mt-0.5 truncate">{zoneLabel(displaySec.zone)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {showSeatView && displaySec.id === activeSection && (
                <button onClick={() => onSeatView(displaySec)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                  style={{background:'rgba(136,110,76,0.12)', color:C.lime, border:`1px solid rgba(136,110,76,0.25)`}}>
                  <Eye size={12}/> View
                </button>
              )}
              <div className="text-right">
                <p className="text-xs text-white/30 font-semibold leading-none mb-0.5">From</p>
                <p className="font-black leading-none" style={{fontSize:'18px', color: displaySec.sold ? '#666' : C.lime}}>
                  {displaySec.sold ? 'SOLD' : `$${displaySec.price}`}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-white/25 text-xs font-semibold mx-auto">Tap a section to see details</p>
        )}
      </div>
    </div>
  );
};

// ============================================================
// 3D SEAT VIEW
// ============================================================
const SeatView = ({ section, onClose }) => {
  const W = 800, H = 460;

  // Field trapezoid — runs LEFT to RIGHT, viewer is on near (bottom) sideline
  // Near sideline = bottom edge, far sideline = upper-middle area
  const nL = 20,  nR = 780, nY = 360;   // near sideline (bottom of field)
  const fL = 110, fR = 690, fY = 178;   // far sideline (perspective shrink)
  const nW = nR - nL;   // 760
  const fW = fR - fL;   // 580
  // x interpolation: yard 0-120, bottom or top edge
  const xN = y => nL + (y/120) * nW;
  const xF = y => fL + (y/120) * fW;
  // vertical blend 0=near 1=far
  const blendY = t => nY + t * (fY - nY);
  const blendX = (yard, t) => xN(yard) + t * (xF(yard) - xN(yard));

  const ezW = 10; // 10 yard end zones

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.88)'}}>
      <div className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl" style={{background:C.green}}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/10">
          <div>
            <p className="mono-label mb-1" style={{color:C.lime, fontSize:'8px'}}>Seat View Preview</p>
            <p className="futura-heading text-white" style={{fontSize:'clamp(15px,4vw,20px)'}}>Section {section?.id} · Row G · Seat 14</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors font-bold text-lg shrink-0 ml-3">✕</button>
        </div>

        {/* SVG Seat View */}
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{display:'block'}}>
          <defs>
            <linearGradient id="sv_sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#100b04"/>
              <stop offset="60%" stopColor="#1a1208"/>
              <stop offset="100%" stopColor="#1a1208"/>
            </linearGradient>
            <linearGradient id="sv_field_main" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a3520"/>
              <stop offset="100%" stopColor="#6b5538"/>
            </linearGradient>
            <linearGradient id="sv_ez_left" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a1208"/>
              <stop offset="100%" stopColor="#2a1e0e"/>
            </linearGradient>
            <linearGradient id="sv_ez_right" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2a1e0e"/>
              <stop offset="100%" stopColor="#1a1208"/>
            </linearGradient>
            <linearGradient id="sv_far_stands" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#071510"/>
              <stop offset="100%" stopColor="#1a1208"/>
            </linearGradient>
            <linearGradient id="sv_near_seats" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a1e0e"/>
              <stop offset="100%" stopColor="#1a1208"/>
            </linearGradient>
            <radialGradient id="sv_glow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,220,0.10)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
            </radialGradient>
            <clipPath id="sv_field_clip">
              <polygon points={`${nL},${nY} ${nR},${nY} ${fR},${fY} ${fL},${fY}`}/>
            </clipPath>
          </defs>

          {/* Sky background */}
          <rect width={W} height={H} fill="url(#sv_sky)"/>
          <rect width={W} height={H} fill="url(#sv_glow)"/>

          {/* ── STADIUM LIGHTS ── high up, spread across */}
          {[60, 190, 340, 460, 610, 740].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="0" x2={x} y2="68" stroke="rgba(200,200,180,0.1)" strokeWidth="4"/>
              <rect x={x-20} y="62" width="40" height="11" rx="3" fill="rgba(255,255,210,0.5)"/>
              <ellipse cx={x} cy="67" rx="35" ry="18" fill="rgba(255,255,180,0.07)"/>
            </g>
          ))}

          {/* ── FAR STANDS (opposite sideline, upper portion) ── */}
          <rect x="0" y="82" width={W} height="96" fill="url(#sv_far_stands)"/>
          {/* Tiered rows */}
          {[0,1,2,3,4,5,6].map(r => (
            <rect key={r} x="0" y={84+r*12} width={W} height="10"
              fill={r%2===0 ? '#0e3d28' : '#1a1208'} opacity="0.9"/>
          ))}
          {/* Far crowd dots */}
          {Array.from({length:110}).map((_,i) => (
            <circle key={i}
              cx={3 + i*7.2}
              cy={92 + (i%5)*9 + Math.sin(i*0.9)*3}
              r={2.5 + (i%2)*1}
              fill={['#886E4C','#fff','#3498db','#e74c3c','#2ecc71','#e67e22'][i%6]}
              opacity="0.6"/>
          ))}

          {/* ── END ZONE corner stands (left and right edges) ── */}
          <polygon points={`0,${fY} ${fL},${fY} ${nL},${nY} 0,${nY}`} fill="#071510"/>
          {[0,1,2,3,4].map(r => {
            const t1 = r/5, t2 = (r+1)/5;
            const y1 = blendY(t1), y2 = blendY(t2);
            const xr1 = xN(0) + t1*(xF(0)-xN(0));
            const xr2 = xN(0) + t2*(xF(0)-xN(0));
            return <polygon key={r}
              points={`0,${y1} ${xr1},${y1} ${xr2},${y2} 0,${y2}`}
              fill={r%2===0?'#0e3d28':'#1a1208'} opacity="0.85"/>;
          })}
          <polygon points={`${fR},${fY} ${W},${fY} ${W},${nY} ${nR},${nY}`} fill="#071510"/>
          {[0,1,2,3,4].map(r => {
            const t1 = r/5, t2 = (r+1)/5;
            const y1 = blendY(t1), y2 = blendY(t2);
            const xl1 = xN(120) + t1*(xF(120)-xN(120));
            const xl2 = xN(120) + t2*(xF(120)-xN(120));
            return <polygon key={r}
              points={`${xl1},${y1} ${W},${y1} ${W},${y2} ${xl2},${y2}`}
              fill={r%2===0?'#0e3d28':'#1a1208'} opacity="0.85"/>;
          })}

          {/* ── LEFT END ZONE ── */}
          <polygon
            points={`${xN(0)},${nY} ${xN(ezW)},${nY} ${xF(ezW)},${fY} ${xF(0)},${fY}`}
            fill="url(#sv_ez_left)"/>
          <text x={(xN(0)+xN(ezW)+xF(0)+xF(ezW))/4} y={(nY+fY)/2+4}
            fill="rgba(255,255,255,0.35)" fontSize="10" fontWeight="black" textAnchor="middle" letterSpacing="2">
            END ZONE
          </text>

          {/* ── RIGHT END ZONE ── */}
          <polygon
            points={`${xN(110)},${nY} ${xN(120)},${nY} ${xF(120)},${fY} ${xF(110)},${fY}`}
            fill="url(#sv_ez_right)"/>
          <text x={(xN(110)+xN(120)+xF(110)+xF(120))/4} y={(nY+fY)/2+4}
            fill="rgba(255,255,255,0.35)" fontSize="10" fontWeight="black" textAnchor="middle" letterSpacing="2">
            END ZONE
          </text>

          {/* ── PLAYING FIELD ── */}
          <polygon
            points={`${xN(ezW)},${nY} ${xN(110)},${nY} ${xF(110)},${fY} ${xF(ezW)},${fY}`}
            fill="url(#sv_field_main)"/>

          {/* Alternating stripe bands */}
          {[1,3,5,7,9].map(i => {
            const y1 = ezW + i*10, y2 = ezW + (i+1)*10;
            return (
              <polygon key={i}
                points={`${xN(y1)},${nY} ${xN(y2)},${nY} ${xF(y2)},${fY} ${xF(y1)},${fY}`}
                fill="rgba(0,0,0,0.06)"/>
            );
          })}

          {/* ── YARD LINES (every 10 yards, 20-90) ── */}
          {[1,2,3,4,5,6,7,8,9].map(i => {
            const yard = ezW + i*10;
            return (
              <line key={i}
                x1={xN(yard)} y1={nY}
                x2={xF(yard)} y2={fY}
                stroke={i===5 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)'}
                strokeWidth={i===5 ? 2.5 : 1.5}/>
            );
          })}
          {/* End zone boundary lines */}
          <line x1={xN(ezW)} y1={nY} x2={xF(ezW)} y2={fY} stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
          <line x1={xN(110)} y1={nY} x2={xF(110)} y2={fY} stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>

          {/* ── SIDELINES ── */}
          <line x1={xN(0)} y1={nY} x2={xF(0)} y2={fY} stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
          <line x1={xN(120)} y1={nY} x2={xF(120)} y2={fY} stroke="rgba(255,255,255,0.55)" strokeWidth="2.5"/>
          <line x1={xN(0)} y1={nY} x2={xN(120)} y2={nY} stroke="rgba(255,255,255,0.7)" strokeWidth="3"/>
          <line x1={xF(0)} y1={fY} x2={xF(120)} y2={fY} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>

          {/* ── YARD NUMBERS ── */}
          {[[20,20],[30,30],[40,40],[50,50],[40,60],[30,70],[20,80]].map(([label,yard]) => {
            const mx = (xN(yard) + xF(yard)) / 2;
            const my = (nY + fY) / 2 + 10;
            return (
              <text key={yard} x={mx} y={my}
                fill="rgba(255,255,255,0.35)" fontSize="13" fontWeight="black" textAnchor="middle">
                {label}
              </text>
            );
          })}

          {/* ── HASH MARKS ── */}
          {Array.from({length:19}).map((_,i) => {
            const yard = ezW + (i+1)*5;
            if (yard >= 110) return null;
            const t = 0.42;
            const mx = blendX(yard, t);
            const my = blendY(t);
            const hw = 10 - t*4;
            return (
              <g key={i}>
                <line x1={mx-hw} y1={my-8} x2={mx-hw} y2={my+8} stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
                <line x1={mx+hw} y1={my-8} x2={mx+hw} y2={my+8} stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
              </g>
            );
          })}

          {/* ── GOAL POSTS ── */}
          {/* Left goal post — at back of left end zone */}
          {(() => {
            const gxN = xN(2), gxF = xF(2);
            const gx = (gxN + gxF*2) / 3;
            const gy = blendY(0.6);
            const s = 0.7;
            return (
              <g>
                <line x1={gx} y1={gy+22*s} x2={gx} y2={gy-8*s} stroke="rgba(255,215,60,0.85)" strokeWidth="3.5"/>
                <line x1={gx-22*s} y1={gy-8*s} x2={gx+22*s} y2={gy-8*s} stroke="rgba(255,215,60,0.85)" strokeWidth="2.5"/>
                <line x1={gx-22*s} y1={gy-8*s} x2={gx-22*s} y2={gy-34*s} stroke="rgba(255,215,60,0.85)" strokeWidth="2.5"/>
                <line x1={gx+22*s} y1={gy-8*s} x2={gx+22*s} y2={gy-34*s} stroke="rgba(255,215,60,0.85)" strokeWidth="2.5"/>
              </g>
            );
          })()}
          {/* Right goal post — at back of right end zone */}
          {(() => {
            const gxN = xN(118), gxF = xF(118);
            const gx = (gxN + gxF*2) / 3;
            const gy = blendY(0.6);
            const s = 0.7;
            return (
              <g>
                <line x1={gx} y1={gy+22*s} x2={gx} y2={gy-8*s} stroke="rgba(255,215,60,0.85)" strokeWidth="3.5"/>
                <line x1={gx-22*s} y1={gy-8*s} x2={gx+22*s} y2={gy-8*s} stroke="rgba(255,215,60,0.85)" strokeWidth="2.5"/>
                <line x1={gx-22*s} y1={gy-8*s} x2={gx-22*s} y2={gy-34*s} stroke="rgba(255,215,60,0.85)" strokeWidth="2.5"/>
                <line x1={gx+22*s} y1={gy-8*s} x2={gx+22*s} y2={gy-34*s} stroke="rgba(255,215,60,0.85)" strokeWidth="2.5"/>
              </g>
            );
          })()}

          {/* ── NEAR SEAT ROWS (viewer's section foreground) ── */}
          {[0,1,2,3,4].map(row => {
            const y = nY + 14 + row * 17;
            const xl = -20 - row*30;
            const xr = W + 20 + row*30;
            const rowW = xr - xl;
            const nSeats = 28 + row*4;
            const sw = rowW / nSeats;
            return (
              <g key={row}>
                <rect x={xl} y={y} width={rowW} height="14" fill="url(#sv_near_seats)" rx="2"/>
                {Array.from({length:nSeats}).map((_,si) => {
                  const sx = xl + si * sw + 1.5;
                  const isOurs = row === 0 && si === Math.floor(nSeats/2) - 2;
                  return (
                    <rect key={si} x={sx} y={y+1.5} width={sw-3} height="11"
                      rx="2"
                      fill={isOurs ? C.gold : ['#2a1e0e','#4a3520','#1a1208'][si%3]}
                      opacity={isOurs ? 1 : 0.85}
                      stroke={isOurs ? 'rgba(255,255,255,0.6)' : 'none'}
                      strokeWidth={isOurs ? 1 : 0}/>
                  );
                })}
              </g>
            );
          })}

          {/* ── YOU ARE HERE marker ── */}
          {(() => {
            const nSeats = 28;
            const sw = (W+40) / nSeats;
            const sx = -20 + (Math.floor(nSeats/2) - 2) * sw + sw/2;
            const sy = nY + 14 + 8;
            return (
              <g>
                <line x1={sx} y1={sy-6} x2={sx} y2={sy-24} stroke={C.gold} strokeWidth="2" strokeDasharray="3,2"/>
                <circle cx={sx} cy={sy-30} r="14" fill={C.gold} opacity="0.95"/>
                <text x={sx} y={sy-25} fill={C.green} fontSize="13" fontWeight="black" textAnchor="middle">★</text>
                <text x={sx} y={sy-48} fill={C.gold} fontSize="11" fontWeight="bold" textAnchor="middle">YOU</text>
              </g>
            );
          })()}

          {/* ── INFO OVERLAY bottom-left ── */}
          <rect x="12" y={H-58} width="210" height="48" rx="10" fill="rgba(0,0,0,0.65)"/>
          <text x="28" y={H-35} fill={C.gold} fontSize="12" fontWeight="bold">Section {section?.id} · Row G · Seat 14</text>
          <text x="28" y={H-16} fill="rgba(255,255,255,0.45)" fontSize="10">
            {section?.zone === 'home' ? '~30 yds from near end zone' :
             section?.zone === 'north_ez' || section?.zone === 'south_ez' ? 'End zone view — 15 yds out' :
             '~Midfield · Home sideline'}
          </text>
        </svg>

        {/* Footer */}
        <div className="px-4 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/10">
          <div className="flex gap-6">
            <div><p className="text-white/40 text-xs font-semibold mb-0.5">Row</p><p className="futura-heading text-white" style={{fontSize:'20px'}}>G</p></div>
            <div><p className="text-white/40 text-xs font-semibold mb-0.5">Seat</p><p className="futura-heading text-white" style={{fontSize:'20px'}}>14</p></div>
            <div><p className="text-white/40 text-xs font-semibold mb-0.5">Level</p><p className="futura-heading text-white" style={{fontSize:'20px'}}>{section?.zone === 'club' ? 'Club' : 'Lower Bowl'}</p></div>
          </div>
          <button onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm transition-all hover:opacity-90 active:scale-95"
            style={{background:C.lime, color:C.greenMid, fontFamily:'Rajdhani, sans-serif', fontSize:'15px'}}>
            Select These Seats
          </button>
        </div>
      </div>
    </div>
  );
};


// ============================================================
// SEAT PICKER
// ============================================================
const GranularSeatPicker = ({ sectionId, onSelect, selectedSeats }) => {
  const rows = ['A','B','C','D','E','F','G','H'];
  const toggleSeat = (id) => {
    if (selectedSeats.includes(id)) onSelect(selectedSeats.filter(s => s !== id));
    else if (selectedSeats.length < 8) onSelect([...selectedSeats, id]);
  };
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 fade-in">
      <div className="px-4 md:px-8 py-4 flex justify-between items-center" style={{background:C.greenMid}}>
        <div>
          <p className="mono-label mb-1" style={{color:C.lime, fontSize:'8px'}}>Seat Selection Grid</p>
          <h4 className="futura-heading text-white" style={{fontSize:'18px'}}>Section {sectionId}</h4>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <div className="flex items-center gap-1.5 justify-end"><div className="w-2.5 h-2.5 rounded shrink-0" style={{background:C.lime}}/><span className="text-white/60 text-xs">Selected</span></div>
          <div className="flex items-center gap-1.5 justify-end"><div className="w-2.5 h-2.5 rounded bg-white/10 shrink-0"/><span className="text-white/40 text-xs">Sold</span></div>
        </div>
      </div>
      <div className="bg-white p-3 md:p-6 space-y-1.5 md:space-y-2">
        {/* Back of section label */}
        <div className="text-center mb-3 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase text-slate-300 bg-slate-50 border border-slate-100">
          ↑ BACK OF SECTION ↑
        </div>
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-1 md:gap-2">
            <div className="w-6 h-7 md:w-8 md:h-8 shrink-0 flex items-center justify-center rounded-lg font-black text-xs text-white" style={{background:C.greenMid}}>
              {row}
            </div>
            <div className="flex gap-0.5 md:gap-1.5 flex-1">
              {[...Array(12)].map((_, i) => {
                const id = `${row}${i+1}`;
                const isTaken = (i === 3 && row === 'C') || (i === 7 && row === 'E') || (i === 1 && row === 'F') || (i === 9 && row === 'B');
                const isSelected = selectedSeats.includes(id);
                return (
                  <button key={id} disabled={isTaken} onClick={() => toggleSeat(id)}
                    className="flex-1 h-7 md:h-9 rounded-md md:rounded-lg text-xs font-bold transition-all duration-150 border md:border-2"
                    style={{
                      background: isSelected ? C.gold : isTaken ? '#f8f8f8' : 'white',
                      borderColor: isSelected ? C.gold : isTaken ? '#e5e5e5' : '#e2e8f0',
                      color: isSelected ? C.green : isTaken ? '#ccc' : '#374151',
                      transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      cursor: isTaken ? 'not-allowed' : 'pointer',
                      minWidth: 0,
                    }}>{i+1}</button>
                );
              })}
            </div>
          </div>
        ))}
        {/* Field side label */}
        <div className="text-center mt-3 py-2 rounded-lg text-xs font-bold tracking-widest uppercase bg-green-50 border border-green-100" style={{color:C.greenLight}}>
          ← FIELD →
        </div>
      </div>
    </div>
  );
};

// ============================================================
// TICKET HUB
// ============================================================
const TicketHub = ({ onTransaction }) => {
  const [hubState, setHubState] = useState('select');
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatViewSection, setSeatViewSection] = useState(null);
  const sectionDetails = selectedSection
    ? { price: selectedSection.price || MOCK_DB.inventory.sections.find(s => s.id === selectedSection.id)?.price || 0 }
    : { price: 0 };
  const hasSelection = selectedSeats.length > 0;
  const subtotal = hasSelection ? sectionDetails.price * selectedSeats.length : 0;
  const total = subtotal + (hasSelection ? MOCK_DB.inventory.fees.facility + MOCK_DB.inventory.fees.processing : 0);

  const handlePurchase = () => {
    if (!hasSelection) return;
    setHubState('success');
    onTransaction({ fanName: "Scott Kull", campaign: "Direct Purchase", amount: total, fromTicketHub: true });
  };

  if (hubState === 'success') return (
    <div className="max-w-xl mx-auto py-8 text-center fade-in">
      <div className="bg-white p-8 md:p-16 shadow-2xl rounded-3xl">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{background:'rgba(136,110,76,0.10)'}}>
          <CheckCircle2 size={36} style={{color:C.greenMid}}/>
        </div>
        <h2 className="futura-heading mb-2" style={{fontSize:'clamp(28px,5vw,40px)', color:C.greenMid}}>Purchase Complete!</h2>
        <p className="text-slate-400 text-sm mb-8">Confirmation #AUTH-992-WEB · Tickets sent to your email</p>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-4 md:p-6 rounded-2xl" style={{background:C.offWhite}}>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">Section</p>
            <p className="futura-heading" style={{fontSize:'clamp(22px,5vw,32px)', color:C.greenMid}}>{selectedSection?.id}</p>
          </div>
          <div className="p-4 md:p-6 rounded-2xl" style={{background:C.offWhite}}>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">Total Paid</p>
            <p className="futura-heading" style={{fontSize:'clamp(22px,5vw,32px)', color:C.gold}}>${total.toFixed(2)}</p>
          </div>
        </div>
        <QrCode size={100} className="mx-auto mb-8 text-slate-200"/>
        <button onClick={() => { setHubState('select'); setSelectedSection(null); setSelectedSeats([]); }}
          className="font-bold text-sm hover:underline" style={{color:C.greenMid}}>← Back to marketplace</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {seatViewSection && <SeatView section={seatViewSection} onClose={() => setSeatViewSection(null)}/>}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-8 pb-6 border-b-2" style={{borderColor:C.slateLight}}>
        <div>
          <p className="page-label mb-2">Marketplace</p>
          <h2 className="futura-heading leading-none" style={{fontSize:'clamp(36px, 6vw, 56px)', color:C.greenMid}}>Ticket Hub</h2>
        </div>
        {hubState === 'checkout' && (
          <button onClick={() => setHubState('select')} className="flex items-center gap-2 font-semibold text-base hover:opacity-70 transition-opacity pb-2" style={{color:C.slate}}>
            <ArrowLeft size={18}/> Back to map
          </button>
        )}
      </div>

      {/* UNIFIED LAYOUT — map + picker + cart equal width */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">

        {/* Left: Map + Seat Picker stacked tight */}
        <div className="min-w-0 space-y-4">
          {hubState === 'select' ? (
            <>
              <CollegeStadiumMap
                onSelectSection={(s) => { setSelectedSection(s); setSelectedSeats([]); }}
                activeSection={selectedSection?.id}
                onSeatView={(s) => setSeatViewSection(s)}
                showSeatView={true}
              />
              {selectedSection && (
                <GranularSeatPicker
                  sectionId={selectedSection.id}
                  onSelect={setSelectedSeats}
                  selectedSeats={selectedSeats}
                />
              )}
            </>
          ) : (
            <div className="bg-white p-10 rounded-3xl shadow-sm border" style={{borderColor:C.slateLight}}>
              <h3 className="text-3xl font-black mb-8 pb-6 border-b" style={{color:C.green, borderColor:C.slateLight}}>Payment Details</h3>
              <div className="p-8 rounded-2xl flex items-center justify-between" style={{background:C.offWhite}}>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-lg" style={{background:C.green}}>CC</div>
                  <div>
                    <p className="font-bold text-lg text-slate-900">Primary Card</p>
                    <p className="text-base text-slate-400 font-mono">•••• 4242</p>
                  </div>
                </div>
                <CheckCircle2 size={32} style={{color:C.greenLight}}/>
              </div>
            </div>
          )}
        </div>

        {/* Right: Sticky cart */}
        <div className="w-full">
          <div className="sticky top-6 rounded-3xl overflow-hidden shadow-2xl border" style={{borderColor:C.slateLight}}>
            <div className="px-7 py-6 text-white" style={{background:C.green}}>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black">Order Summary</h3>
                {hasSelection && <span className="text-sm font-bold px-3 py-1 rounded-full" style={{background:C.gold, color:C.green}}>{selectedSeats.length} seats</span>}
              </div>
            </div>
            <div className="bg-white p-7 space-y-6">
              {!hasSelection ? (
                <div className="py-14 text-center space-y-4">
                  <MousePointer2 className="mx-auto" size={44} style={{color:C.slateLight}}/>
                  <p className="text-base text-slate-400 font-semibold">Select a section, then pick your seats</p>
                  <p className="text-6xl font-black" style={{color:C.slateLight}}>$0.00</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="pb-5 border-b" style={{borderColor:C.slateLight}}>
                    <p className="text-2xl font-black" style={{color:C.green}}>Section {selectedSection?.id}</p>
                    <p className="text-sm font-semibold mt-1" style={{color:C.greenLight}}>{selectedSeats.length} seats selected · {selectedSeats.join(', ')}</p>
                  </div>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between"><span className="text-slate-500">Base price</span><span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Facility fee</span><span className="text-slate-400">$12.50</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Processing</span><span className="text-slate-400">$4.50</span></div>
                  </div>
                  <div className="flex justify-between items-baseline pt-4 border-t-4" style={{borderColor:C.green}}>
                    <span className="text-xl font-black" style={{color:C.green}}>Total</span>
                    <span className="text-4xl font-black" style={{color:C.gold}}>${total.toFixed(2)}</span>
                  </div>
                  <button onClick={() => hubState === 'select' ? setHubState('checkout') : handlePurchase()}
                    className="w-full py-5 rounded-2xl font-black text-xl shadow-lg transition-all active:scale-95 hover:opacity-90"
                    style={{background:C.green, color:'white'}}>
                    {hubState === 'select' ? 'Proceed to Payment →' : 'Confirm Purchase'}
                  </button>
                </div>
              )}
              <div className="p-4 rounded-xl flex items-start gap-3" style={{background:'rgba(26,18,8,0.06)'}}>
                <ShieldCheck size={20} style={{color:C.greenLight}} className="shrink-0 mt-0.5"/>
                <p className="text-sm font-semibold leading-relaxed" style={{color:C.greenLight}}>University-grade secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MOBILE DEMO (SALES AGENT)
// ============================================================
const MobileDemo = ({ campaign, currentFan, onTransaction }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [flowState, setFlowState] = useState('chat');
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const sessionId = useRef(`demo_${Date.now()}`);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!currentFan) return;
    sessionId.current = `demo_${Date.now()}`;
    setMessages([{ role:'ai', text:CAMPAIGNS[campaign]?.initial(currentFan), id:Date.now() }]);
    setFlowState('chat');
    fetch(N8N_WEBHOOK_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({chatInput:'ping',sessionId:'test'}) })
      .then(() => setConnectionStatus('live'))
      .catch(() => setConnectionStatus('offline'));
  }, [campaign, currentFan]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMsg = inputValue;
    setMessages(prev => [...prev, { role:'user', text:userMsg, id:Date.now() }]);
    setInputValue('');
    setIsTyping(true);
    // Inject campaign system context on the first real user message (messages has only the AI greeting so far)
    const isFirstMessage = messages.length <= 1;
    const systemCtx = isFirstMessage ? CAMPAIGNS[campaign]?.systemPrompt?.(currentFan) : '';
    const aiText = await askAce(userMsg, sessionId.current, systemCtx);
    setIsTyping(false);
    setMessages(prev => [...prev, { role:'ai', text:aiText, id:Date.now() }]);
    if (['map','section','available','select','seat'].some(k => aiText.toLowerCase().includes(k))) {
      setTimeout(() => setFlowState('stadium'), 400);
    }
  };

  const commitSale = () => {
    setFlowState('success');
    onTransaction({ fanName:currentFan.name, campaign, amount:102.50, fromTicketHub: true });
  };

  return (
    <div className="relative flex flex-col shrink-0"
      style={{
        width: '360px',
        maxWidth: '360px',
        height: 'min(740px, 80vh)',
        minHeight: '520px',
        borderRadius: '48px',
        border: '10px solid #100b04',
        background: '#1a1208',
        overflow: 'hidden',
        boxShadow: '0 40px 80px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
      <div style={{position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:'96px', height:'20px', borderRadius:'0 0 24px 24px', background:'#100b04', zIndex:40}}/>

      {/* Header */}
      <div className="pt-7 pb-4 px-5 border-b border-white/5" style={{background:'rgba(26,18,8,0.97)'}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{background:'rgba(136,110,76,0.1)', border:'1px solid rgba(136,110,76,0.25)'}}>
              <span style={{fontSize:'20px'}}>🐾</span>
            </div>
            <div>
              <p className="futura-heading text-white" style={{fontSize:'17px', lineHeight:'1.2'}}>{CAMPAIGNS[campaign]?.title}</p>
              <p className="mono-label mt-0.5" style={{color:'rgba(136,110,76,0.6)', fontSize:'8px'}}>{CAMPAIGNS[campaign]?.sub}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full mono-label ${
            connectionStatus === 'live' ? 'bg-emerald-500/10 text-emerald-400' :
            connectionStatus === 'offline' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
          }`} style={{fontSize:'9px'}}>
            <div className={`w-1.5 h-1.5 rounded-full ${connectionStatus === 'live' ? 'bg-emerald-400 animate-pulse' : connectionStatus === 'offline' ? 'bg-red-400' : 'bg-yellow-400 animate-pulse'}`}/>
            {connectionStatus === 'live' ? 'Live' : connectionStatus === 'offline' ? 'Offline' : '...'}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 px-4 py-4 overflow-y-auto space-y-3" style={{background:'#F5F0E8'}}>
        {messages.map(m => (
          <div key={m.id} className={`flex msg-enter ${m.role==='user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'ai' && (
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mr-2 shrink-0 mt-1 shadow-md" style={{background:C.greenMid}}>
                <span style={{fontSize:'13px'}}>🐾</span>
              </div>
            )}
            <div className="max-w-[88%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed"
              style={m.role === 'user'
                ? { background:C.greenMid, color:'white', borderTopRightRadius:'4px', fontFamily:'Rajdhani, sans-serif', fontWeight:600 }
                : { background:'white', color:'#1a2e1a', borderTopLeftRadius:'4px', borderLeft:`3px solid ${C.lime}`, fontFamily:'inherit' }}>
              {m.role === 'user' ? m.text : (() => {
                const lines = m.text.split('\n');
                return lines.map((line, li) => {
                  const numMatch = line.match(/^(\d+)\.\s+(.*)/);
                  if (numMatch) {
                    const raw = numMatch[2];
                    const titleMatch = raw.match(/\*\*(.*?)\*\*/);
                    const title = titleMatch ? titleMatch[1] : raw.split(' - ')[0];
                    const rest = raw.replace(/\*\*(.*?)\*\*/g, '').replace(/^[\s\-·]+/, '');
                    const kvPairs = rest.split(/\s*[-·]\s*/).filter(Boolean);
                    const kvMap = {};
                    kvPairs.forEach(pair => {
                      const m = pair.match(/^([\w\s]+):\s*(.+)$/);
                      if (m) kvMap[m[1].trim().toLowerCase()] = m[2].trim();
                    });
                    const date = kvMap['date'] || kvMap['event date'] || kvMap['game date'] || null;
                    const section = kvMap['section'] || kvMap['section name'] || null;
                    const price = kvMap['price'] || null;
                    const row = kvMap['row'] || null;
                    return (
                      <div key={li} className="mb-2.5 rounded-xl overflow-hidden" style={{border:'1px solid #e8dfc8'}}>
                        <div className="px-3 py-2" style={{background:C.greenMid}}>
                          <div className="flex items-center justify-between gap-2">
                            <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                              style={{background:C.lime, color:C.greenMid, fontSize:'10px', fontWeight:900, fontFamily:'Rajdhani, sans-serif'}}>{numMatch[1]}</span>
                            <p className="flex-1 text-xs font-black text-white leading-tight" style={{fontFamily:'Rajdhani, sans-serif'}}>{title}</p>
                            {price && <span className="mono-label shrink-0" style={{color:C.lime, fontSize:'9px'}}>{price}</span>}
                          </div>
                        </div>
                        <div className="px-3 py-2 flex flex-wrap gap-x-3 gap-y-1" style={{background:'#F5F0E8'}}>
                          {date && <span className="text-xs font-semibold text-slate-500">📅 {date}</span>}
                          {section && <span className="text-xs font-semibold text-slate-500">🎟 {section}{row ? ` · Row ${row}` : ''}</span>}
                          {!date && !section && <span className="text-xs text-slate-400">{rest}</span>}
                        </div>
                      </div>
                    );
                  }
                  if (line.includes('**')) {
                    const parts = line.split(/\*\*(.*?)\*\*/g);
                    return <p key={li} className="mb-1 text-sm">{parts.map((p,pi) => pi%2===1 ? <strong key={pi} style={{color:C.greenMid, fontFamily:'Rajdhani, sans-serif'}}>{p}</strong> : p)}</p>;
                  }
                  if (!line.trim()) return <div key={li} className="h-1"/>;
                  return <p key={li} className="mb-1 text-sm">{line}</p>;
                });
              })()}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md" style={{background:C.greenMid}}>
              <span style={{fontSize:'13px'}}>🐾</span>
            </div>
            <div className="px-4 py-3 rounded-2xl shadow-sm bg-white flex gap-1.5 items-center" style={{borderTopLeftRadius:'4px'}}>
              <div className="w-2 h-2 rounded-full dot-1" style={{background:C.lime}}/>
              <div className="w-2 h-2 rounded-full dot-2" style={{background:C.lime}}/>
              <div className="w-2 h-2 rounded-full dot-3" style={{background:C.lime}}/>
            </div>
          </div>
        )}
        {flowState === 'stadium' && (
          <div className="mt-2 msg-enter">
            <CollegeStadiumMap onSelectSection={() => setFlowState('checkout')} activeSection={null} onSeatView={() => {}} showSeatView={false}/>
          </div>
        )}
        {flowState === 'checkout' && (
          <div className="bg-white rounded-2xl p-5 shadow-lg border msg-enter" style={{borderColor:C.slateLight}}>
            <p className="futura-heading text-base mb-4" style={{color:C.greenMid, fontSize:'17px'}}>Complete Purchase</p>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-slate-500">Seats</span><span className="font-bold" style={{color:C.greenLight}}>$90.00</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Fees</span><span className="text-slate-400">$12.50</span></div>
              <div className="flex justify-between text-base pt-3 border-t" style={{borderColor:C.slateLight}}>
                <span className="futura-heading" style={{color:C.greenMid, fontSize:'18px'}}>Total</span>
                <span className="futura-heading" style={{color:C.lime, fontSize:'18px'}}>$102.50</span>
              </div>
            </div>
            <button onClick={commitSale} className="w-full py-3.5 rounded-xl font-black text-base text-white shadow-lg active:scale-95 transition-transform"
              style={{background:C.greenMid, fontFamily:'Rajdhani, sans-serif', fontSize:'16px', letterSpacing:'0.03em'}}>
              Confirm Purchase
            </button>
          </div>
        )}
        {flowState === 'success' && (
          <div className="rounded-2xl p-8 text-white text-center shadow-2xl msg-enter" style={{background:C.greenMid}}>
            <QrCode size={80} className="mx-auto mb-3 opacity-80"/>
            <p className="futura-heading" style={{fontSize:'22px'}}>Confirmed! 🎉</p>
          </div>
        )}
      </div>

      {/* Input bar */}
      {flowState === 'chat' && (
        <div className="px-4 py-3 border-t border-white/5" style={{background:'rgba(26,18,8,0.97)'}}>
          <div className="flex gap-2 items-center rounded-2xl px-4 py-2.5 border" style={{background:'rgba(255,255,255,0.07)', borderColor:'rgba(136,110,76,0.2)'}}>
            <input type="text" value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
              placeholder="Message Ace..."
              className="flex-1 bg-transparent text-sm text-white outline-none"
              style={{fontFamily:'Rajdhani, sans-serif', fontWeight:600, letterSpacing:'0.02em'}}
            />
            <button onClick={handleSend}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
              style={{background:C.lime}}>
              <Send size={15} style={{color:C.greenMid}}/>
            </button>
          </div>
          <p className="mono-label text-center mt-2" style={{color:'rgba(255,255,255,0.18)', fontSize:'8px'}}>Ace · Wofford Terriers</p>
        </div>
      )}
    </div>
  );
};

// ============================================================
// DATA INSIGHTS TAB
// ============================================================
const SPORT_DATA = {
  all: {
    label: 'All Sports', icon: '🏆', progress: 75, season: 'Jul–Jun',
    schools: [
      { school:'Ball State University',       mascot:'Cardinals', conf:'MAC',      revenue:134100, tickets:1157, growth:'+24%', topZone:'Home Sideline', avgPrice:116, primary:'#BA0C2F', secondary:'#ffffff' },
      { school:'Eastern Kentucky University', mascot:'Colonels',  conf:'ASUN',     revenue:115000, tickets:1016, growth:'+18%', topZone:'Club Level',    avgPrice:113, primary:'#8A0039', secondary:'#ffffff' },
      { school:'University of Akron',         mascot:'Zips',      conf:'MAC',      revenue:101000, tickets:963,  growth:'+31%', topZone:'End Zone',      avgPrice:105, primary:'#041E42', secondary:'#A89968' },
      { school:'University of West Georgia',  mascot:'Wolves',    conf:'ASUN',     revenue:97200,  tickets:899,  growth:'+12%', topZone:'Upper Deck',    avgPrice:108, primary:'#003DA5', secondary:'#E4002B' },
      { school:'Wofford College',             mascot:'Terriers',  conf:'SoCon',    revenue:77800,  tickets:736,  growth:'+9%',  topZone:'Home Sideline', avgPrice:106, primary:'#886E4C', secondary:'#000000' },
      { school:'SE Louisiana University',     mascot:'Lions',     conf:'Southland',revenue:62200,  tickets:594,  growth:'+7%',  topZone:'Upper Deck',    avgPrice:105, primary:'#007843', secondary:'#C8A035' },
    ],
    trend: [
      { wk:'W1', BallSt:134, EKU:122, Akron:110, WGa:104, Wofford:84, SELa:68 },
      { wk:'W2', BallSt:148, EKU:138, Akron:127, WGa:115, Wofford:93, SELa:78 },
      { wk:'W3', BallSt:161, EKU:146, Akron:138, WGa:128, Wofford:101, SELa:87 },
      { wk:'W4', BallSt:178, EKU:162, Akron:152, WGa:141, Wofford:112, SELa:94 },
      { wk:'W5', BallSt:192, EKU:176, Akron:168, WGa:154, Wofford:122, SELa:104 },
      { wk:'W6', BallSt:204, EKU:188, Akron:182, WGa:166, Wofford:132, SELa:112 },
    ]
  },
  football: {
    label: 'Football', icon: '🏈', progress: 100, season: 'Sep–Dec · Complete',
    schools: [
      { school:'Ball State University',       mascot:'Cardinals', conf:'MAC',      revenue:57400, tickets:524, growth:'+28%', topZone:'Home Sideline', avgPrice:110, primary:'#BA0C2F', secondary:'#ffffff' },
      { school:'Eastern Kentucky University', mascot:'Colonels',  conf:'ASUN',     revenue:51200, tickets:468, growth:'+22%', topZone:'Club Level',    avgPrice:109, primary:'#8A0039', secondary:'#ffffff' },
      { school:'University of Akron',         mascot:'Zips',      conf:'MAC',      revenue:46800, tickets:429, growth:'+35%', topZone:'End Zone',      avgPrice:109, primary:'#041E42', secondary:'#A89968' },
      { school:'University of West Georgia',  mascot:'Wolves',    conf:'ASUN',     revenue:44100, tickets:406, growth:'+15%', topZone:'Upper Deck',    avgPrice:109, primary:'#003DA5', secondary:'#E4002B' },
      { school:'Wofford College',             mascot:'Terriers',  conf:'SoCon',    revenue:35200, tickets:334, growth:'+11%', topZone:'Home Sideline', avgPrice:105, primary:'#886E4C', secondary:'#000000' },
      { school:'SE Louisiana University',     mascot:'Lions',     conf:'Southland',revenue:30100, tickets:284, growth:'+8%',  topZone:'Upper Deck',    avgPrice:106, primary:'#007843', secondary:'#C8A035' },
    ],
    trend: [
      { wk:'Wk1', BallSt:88,  EKU:78,  Akron:72,  WGa:68,  Wofford:55, SELa:46 },
      { wk:'Wk2', BallSt:102, EKU:94,  Akron:88,  WGa:80,  Wofford:64, SELa:54 },
      { wk:'Wk3', BallSt:118, EKU:106, Akron:98,  WGa:90,  Wofford:72, SELa:60 },
      { wk:'Wk4', BallSt:130, EKU:116, Akron:110, WGa:100, Wofford:80, SELa:66 },
      { wk:'Wk5', BallSt:143, EKU:128, Akron:120, WGa:110, Wofford:87, SELa:72 },
      { wk:'Wk6', BallSt:152, EKU:136, Akron:128, WGa:118, Wofford:92, SELa:78 },
    ]
  },
  mbball: {
    label: "Men's Basketball", icon: '🏀', progress: 85, season: 'Nov–Mar · 85%',
    schools: [
      { school:'Ball State University',       mascot:'Cardinals', conf:'MAC',      revenue:39200, tickets:356, growth:'+18%', topZone:'Lower Bowl',    avgPrice:110, primary:'#BA0C2F', secondary:'#ffffff' },
      { school:'Eastern Kentucky University', mascot:'Colonels',  conf:'ASUN',     revenue:35100, tickets:312, growth:'+15%', topZone:'Court Side',    avgPrice:113, primary:'#8A0039', secondary:'#ffffff' },
      { school:'University of Akron',         mascot:'Zips',      conf:'MAC',      revenue:32400, tickets:296, growth:'+27%', topZone:'Lower Bowl',    avgPrice:109, primary:'#041E42', secondary:'#A89968' },
      { school:'University of West Georgia',  mascot:'Wolves',    conf:'ASUN',     revenue:30200, tickets:276, growth:'+10%', topZone:'Lower Bowl',    avgPrice:109, primary:'#003DA5', secondary:'#E4002B' },
      { school:'Wofford College',             mascot:'Terriers',  conf:'SoCon',    revenue:23500, tickets:214, growth:'+7%',  topZone:'Lower Bowl',    avgPrice:110, primary:'#886E4C', secondary:'#000000' },
      { school:'SE Louisiana University',     mascot:'Lions',     conf:'Southland',revenue:19800, tickets:180, growth:'+5%',  topZone:'Lower Bowl',    avgPrice:110, primary:'#007843', secondary:'#C8A035' },
    ],
    trend: [
      { wk:'W1', BallSt:42,  EKU:38,  Akron:35,  WGa:33,  Wofford:26, SELa:22 },
      { wk:'W2', BallSt:54,  EKU:48,  Akron:44,  WGa:41,  Wofford:32, SELa:28 },
      { wk:'W3', BallSt:68,  EKU:60,  Akron:56,  WGa:52,  Wofford:40, SELa:34 },
      { wk:'W4', BallSt:80,  EKU:72,  Akron:66,  WGa:62,  Wofford:48, SELa:40 },
      { wk:'W5', BallSt:92,  EKU:82,  Akron:76,  WGa:71,  Wofford:55, SELa:46 },
      { wk:'W6', BallSt:104, EKU:90,  Akron:84,  WGa:78,  Wofford:60, SELa:50 },
    ]
  },
  wbball: {
    label: "Women's Basketball", icon: '🏀', progress: 85, season: 'Nov–Mar · 85%',
    schools: [
      { school:'Ball State University',       mascot:'Cardinals', conf:'MAC',      revenue:25800, tickets:236, growth:'+21%', topZone:'Lower Bowl',    avgPrice:109, primary:'#BA0C2F', secondary:'#ffffff' },
      { school:'Eastern Kentucky University', mascot:'Colonels',  conf:'ASUN',     revenue:21400, tickets:196, growth:'+12%', topZone:'Lower Bowl',    avgPrice:109, primary:'#8A0039', secondary:'#ffffff' },
      { school:'University of Akron',         mascot:'Zips',      conf:'MAC',      revenue:16400, tickets:150, growth:'+22%', topZone:'Lower Bowl',    avgPrice:109, primary:'#041E42', secondary:'#A89968' },
      { school:'University of West Georgia',  mascot:'Wolves',    conf:'ASUN',     revenue:14200, tickets:130, growth:'+8%',  topZone:'Lower Bowl',    avgPrice:109, primary:'#003DA5', secondary:'#E4002B' },
      { school:'Wofford College',             mascot:'Terriers',  conf:'SoCon',    revenue:11200, tickets:102, growth:'+6%',  topZone:'Lower Bowl',    avgPrice:110, primary:'#886E4C', secondary:'#000000' },
      { school:'SE Louisiana University',     mascot:'Lions',     conf:'Southland',revenue:8800,  tickets:80,  growth:'+4%',  topZone:'Lower Bowl',    avgPrice:110, primary:'#007843', secondary:'#C8A035' },
    ],
    trend: [
      { wk:'W1', BallSt:28, EKU:22, Akron:18, WGa:16, Wofford:12, SELa:10 },
      { wk:'W2', BallSt:38, EKU:32, Akron:26, WGa:22, Wofford:17, SELa:13 },
      { wk:'W3', BallSt:50, EKU:42, Akron:34, WGa:29, Wofford:22, SELa:18 },
      { wk:'W4', BallSt:60, EKU:50, Akron:42, WGa:36, Wofford:27, SELa:22 },
      { wk:'W5', BallSt:70, EKU:58, Akron:48, WGa:42, Wofford:31, SELa:26 },
      { wk:'W6', BallSt:78, EKU:64, Akron:54, WGa:46, Wofford:34, SELa:28 },
    ]
  },
  baseball: {
    label: 'Baseball', icon: '⚾', progress: 15, season: 'Feb–May · Early Season',
    schools: [
      { school:'Ball State University',       mascot:'Cardinals', conf:'MAC',      revenue:11700, tickets:41,  growth:'+31%', topZone:'Behind Plate',  avgPrice:285, primary:'#BA0C2F', secondary:'#ffffff' },
      { school:'Eastern Kentucky University', mascot:'Colonels',  conf:'ASUN',     revenue:7300,  tickets:40,  growth:'+19%', topZone:'Infield Box',   avgPrice:183, primary:'#8A0039', secondary:'#ffffff' },
      { school:'University of Akron',         mascot:'Zips',      conf:'MAC',      revenue:5400,  tickets:88,  growth:'+24%', topZone:'Infield Box',   avgPrice:61,  primary:'#041E42', secondary:'#A89968' },
      { school:'University of West Georgia',  mascot:'Wolves',    conf:'ASUN',     revenue:8700,  tickets:87,  growth:'+13%', topZone:'Infield Box',   avgPrice:100, primary:'#003DA5', secondary:'#E4002B' },
      { school:'Wofford College',             mascot:'Terriers',  conf:'SoCon',    revenue:7900,  tickets:86,  growth:'+8%',  topZone:'Infield Box',   avgPrice:92,  primary:'#886E4C', secondary:'#000000' },
      { school:'SE Louisiana University',     mascot:'Lions',     conf:'Southland',revenue:3500,  tickets:50,  growth:'+5%',  topZone:'Infield Box',   avgPrice:70,  primary:'#007843', secondary:'#C8A035' },
    ],
    trend: [
      { wk:'Wk1', BallSt:8,  EKU:6,  Akron:14, WGa:14, Wofford:13, SELa:8  },
      { wk:'Wk2', BallSt:12, EKU:10, Akron:20, WGa:20, Wofford:19, SELa:12 },
      { wk:'Wk3', BallSt:16, EKU:14, Akron:26, WGa:26, Wofford:24, SELa:16 },
      { wk:'Wk4', BallSt:20, EKU:17, Akron:32, WGa:30, Wofford:28, SELa:20 },
    ]
  },
};

const SCHOOL_COLORS = ['#BA0C2F','#8A0039','#041E42','#003DA5','#886E4C','#007843'];
const SCHOOL_KEYS   = ['BallSt','EKU','Akron','WGa','Wofford','SELa'];
const SCHOOL_LABELS = ['Ball St.','EKU','Akron','W. Ga.','Wofford','SE La.'];

// Defined OUTSIDE DataInsightsTab so its reference is stable across renders (fixes Recharts tooltip flicker)
const InsightsTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 shadow-xl text-xs" style={{background:C.green, border:`1px solid rgba(136,110,76,0.3)`}}>
      <p className="font-black text-white mb-2">{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{color:p.color}} className="font-semibold">{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

const DataInsightsTab = () => {
  const [sport, setSport] = useState('all');
  const data = SPORT_DATA[sport];
  const schools = data.schools;

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div>
        <p className="page-label mb-2">Data Insights</p>
        <h2 className="futura-heading" style={{fontSize:'clamp(32px,5vw,52px)', color:C.greenMid}}>School Intelligence</h2>
        <p className="text-slate-500 mt-2">Drill-down metrics across all 6 partner programs</p>
      </div>

      {/* Sport filter + season progress */}
      <div className="data-card p-5">
        <div className="flex flex-wrap gap-2 mb-5">
          {Object.entries(SPORT_DATA).map(([key, val]) => (
            <button key={key} onClick={() => setSport(key)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={sport === key
                ? { background:C.greenMid, color:'white', boxShadow:`0 4px 14px rgba(26,18,8,0.3)` }
                : { background:'#F5F0E8', color:'#3a2e1e', border:'1px solid #e8dfc8' }}>
              <span>{val.icon}</span> {val.label}
            </button>
          ))}
        </div>
        {/* Season progress */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="mono-label text-slate-400" style={{fontSize:'9px'}}>SEASON PROGRESS</span>
              <span className="mono-label font-bold" style={{color:C.greenLight, fontSize:'9px'}}>{data.season}</span>
            </div>
            <div className="h-2 rounded-full" style={{background:'#e8dfc8'}}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{width:`${data.progress}%`, background: data.progress === 100 ? C.lime : data.progress < 20 ? '#e07b2a' : C.greenLight}}/>
            </div>
          </div>
          <span className="futura-heading shrink-0" style={{fontSize:'22px', color: data.progress === 100 ? C.lime : C.greenMid}}>
            {data.progress}%
          </span>
        </div>
      </div>

      {/* School cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {schools.map((s,i) => (
          <div key={i} className="data-card overflow-hidden">
            <div style={{height:'4px', background:s.secondary === '#ffffff' ? 'rgba(255,255,255,0.4)' : s.secondary}}/>
            <div className="px-6 py-5 flex items-center justify-between" style={{background:s.primary}}>
              <div>
                <p className="futura-heading text-white" style={{fontSize:'18px', lineHeight:'1.2'}}>{s.school}</p>
                <p className="mono-label text-white/60 mt-1" style={{fontSize:'9px'}}>{s.mascot} · {s.conf}</p>
              </div>
              <div className="text-right">
                <p className="mono-label text-white/40" style={{fontSize:'8px'}}>GROWTH</p>
                <p className="futura-heading" style={{fontSize:'22px', color:s.secondary === '#ffffff' ? 'rgba(255,255,255,0.9)' : s.secondary}}>{s.growth}</p>
              </div>
            </div>
            <div className="px-6 py-5 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Revenue</p>
                <p className="text-lg font-black" style={{color:s.primary}}>${(s.revenue/1000).toFixed(1)}k</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Tickets</p>
                <p className="text-lg font-black" style={{color:s.primary}}>{s.tickets}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">Avg Price</p>
                <p className="text-lg font-black" style={{color:s.primary}}>${s.avgPrice}</p>
              </div>
            </div>
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold" style={{background:`${s.primary}12`, color:s.primary}}>
                <MapPin size={12}/> Top zone: {s.topZone}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly ticket velocity trend */}
      <div className="data-card p-4 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={22} style={{color:C.gold}}/>
          <div>
            <h3 className="futura-heading" style={{fontSize:'22px', color:C.greenMid}}>Weekly Ticket Velocity</h3>
            <p className="mono-label text-slate-400">{data.label} · tickets sold per week</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data.trend} margin={{top:4,right:16,left:0,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="wk" tick={{fontSize:12, fontWeight:700, fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11, fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
            <Tooltip content={InsightsTooltip}/>
            <Legend wrapperStyle={{fontSize:11, fontWeight:700, paddingTop:12}}/>
            {SCHOOL_KEYS.map((k,i) => (
              <Line key={k} type="monotone" dataKey={k} name={SCHOOL_LABELS[i]} stroke={SCHOOL_COLORS[i]}
                strokeWidth={2} dot={{r:3, fill:SCHOOL_COLORS[i]}} activeDot={{r:5}}/>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue vs Tickets by school */}
      <div className="data-card p-4 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Database size={22} style={{color:C.gold}}/>
          <div>
            <h3 className="futura-heading" style={{fontSize:'22px', color:C.greenMid}}>Revenue vs Tickets · By School</h3>
            <p className="mono-label text-slate-400">{data.label} · side-by-side comparison</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={schools.map((s,i) => ({ school:SCHOOL_LABELS[i], revenue:s.revenue, tickets:s.tickets }))}
            margin={{top:4,right:8,left:0,bottom:0}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
            <XAxis dataKey="school" tick={{fontSize:11, fontWeight:700, fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
            <YAxis yAxisId="left"  tick={{fontSize:11, fill:'#94a3b8'}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
            <YAxis yAxisId="right" orientation="right" tick={{fontSize:11, fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
            <Tooltip content={InsightsTooltip}/>
            <Legend wrapperStyle={{fontSize:12, fontWeight:700, paddingTop:8}}/>
            <Bar yAxisId="left"  dataKey="revenue" name="Revenue" fill={C.green} radius={[6,6,0,0]} opacity={0.9}>
              {schools.map((_,i) => <Cell key={i} fill={SCHOOL_COLORS[i]} opacity={0.85}/>)}
            </Bar>
            <Bar yAxisId="right" dataKey="tickets" name="Tickets" fill={C.gold}  radius={[6,6,0,0]} opacity={0.85}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// ============================================================
// CRM OUTREACH TAB
// ============================================================
const CRMTab = () => {
const contacts = [
  { id:1,  name:'Nayef Samhat',               school:'Wofford College', title:'President',                              tier:'Platinum', email:'samhatnr@wofford.edu',              phone:'(864) 597-4010', lastContact:'5 days ago',  status:'hot',  spend:0, tags:['Administration','Transitioning'] },
  { id:2,  name:'Christopher A.P. Carpenter', school:'Wofford College', title:'Board of Trustees Chairman',             tier:'Platinum', email:'carpenter@wofford.edu',             phone:'(864) 597-4011', lastContact:'12 days ago', status:'warm', spend:0, tags:['Administration','Alumni','Board'] },
  { id:3,  name:'Timothy Schmitz',            school:'Wofford College', title:'Willimon Family Provost',                tier:'Gold',     email:'schmitzta@wofford.edu',             phone:'(864) 597-4012', lastContact:'18 days ago', status:'warm', spend:0, tags:['Administration','Academic'] },
  { id:4,  name:'Calhoun L. Kennedy Jr.',     school:'Wofford College', title:'VP Philanthropy & Engagement',           tier:'Gold',     email:'kennedycl@wofford.edu',             phone:'(864) 597-4013', lastContact:'8 days ago',  status:'hot',  spend:0, tags:['Administration','Sponsorship'] },
  { id:5,  name:'Shawn Watson',               school:'Wofford College', title:'Head Football Coach',                    tier:'Gold',     email:'watsonsc@wofford.edu',              phone:'(864) 597-4020', lastContact:'3 days ago',  status:'hot',  spend:0, tags:['Athletics','Football'] },
  { id:6,  name:'Kevin Giltner',              school:'Wofford College', title:"Head Basketball Coach",                  tier:'Gold',     email:'giltnerkj@wofford.edu',             phone:'(864) 597-4021', lastContact:'6 days ago',  status:'hot',  spend:0, tags:['Athletics','Basketball'] },
  { id:7,  name:'Shawn Tyler',                school:'Wofford College', title:'Director of Sales — TSP',           tier:'Gold',     email:'shawn@terriersportsproperties.com', phone:'(864) 597-4000', lastContact:'2 days ago',  status:'hot',  spend:0, tags:['Sponsor','Key Contact'] },
  { id:8,  name:'Devin Foster',               school:'Wofford College', title:'Ticketing — TSP',                   tier:'Gold',     email:'devin@terriersportsproperties.com', phone:'(864) 597-4001', lastContact:'2 days ago',  status:'hot',  spend:0, tags:['Ticketing','Key Contact'] },
  { id:9,  name:'Scott Kull',                 school:'Wofford College', title:'Director of Athletics',                  tier:'Platinum', email:'kullsr@wofford.edu',               phone:'(864) 597-4002', lastContact:'5 days ago',  status:'warm', spend:0, tags:['Admin','Decision Maker','VIP'] },
];

const campaigns = [
  { id:'season',  label:'Season Ticket Renewal',   desc:'Re-engage lapsed holders',    color:C.green },
  { id:'suite',   label:'Premium Suite Upsell',    desc:'Convert warm prospects',       color:'#7c3aed' },
  { id:'sponsor', label:'Corporate Sponsorship',   desc:'New & renewal sponsors',       color:'#0369a1' },
  { id:'alumni',  label:'Alumni Homecoming',       desc:'Drive game-day attendance',    color:C.gold },
  { id:'group',   label:'Group Ticket Drive',      desc:'Org & family packages',        color:'#0f766e' },
];

const [crmCampaign, setCrmCampaign]   = React.useState('season');
const [selectedContact, setSelectedContact] = React.useState(null);
const [generatedEmail, setGeneratedEmail]   = React.useState('');
const [emailLoading, setEmailLoading]       = React.useState(false);
const [emailApproved, setEmailApproved]     = React.useState(false);
const [filterStatus, setFilterStatus]       = React.useState('all');
const [editMode, setEditMode]               = React.useState(false);
const [editedEmail, setEditedEmail]         = React.useState('');

const statusColor = s => ({ hot:'#ef4444', warm:'#f59e0b', cold:'#64748b' }[s] || '#64748b');
const tierColor   = t => ({ Gold:'#886E4C', Silver:'#94a3b8', Bronze:'#e07b2a', Prospect:'#3b82f6' }[t] || '#64748b');

const filteredContacts = filterStatus === 'all' ? contacts : contacts.filter(c => c.status === filterStatus);

const generateEmail = async (contact) => {
  setSelectedContact(contact);
  setGeneratedEmail('');
  setEmailApproved(false);
  setEditMode(false);
  setEmailLoading(true);
  const campaign = campaigns.find(c => c.id === crmCampaign);
  const prompt = `You are an expert sports ticket sales rep for Peak Sports MGMT, a collegiate athletics revenue management company. Write a short, personalized outreach email for the following contact. Be warm, specific, and persuasive — reference their actual details.

Contact: ${contact.name}
School: ${contact.school}
Title/Role: ${contact.title}
Loyalty Tier: ${contact.tier}
Past Spend: $${contact.spend}
Last Contact: ${contact.lastContact}
Tags: ${contact.tags.join(', ')}
Campaign: ${campaign.label} — ${campaign.desc}

Write a compelling 3-4 paragraph email. Include a subject line at the top formatted as "Subject: [subject here]". Sign off from "The Peak Sports MGMT Team". Keep it under 200 words. No filler, no fluff — make every sentence count.`;

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ chatInput: prompt, sessionId: `crm_${contact.id}_${Date.now()}` })
    });
    const raw = await res.text();
    // Handle n8n streaming (newline-delimited JSON tokens)
    const lines = raw.split('\n').filter(l => l.trim());
    let text = '';
    for (const line of lines) {
      try {
        const obj = JSON.parse(line);
        if (obj.type === 'item' && obj.content !== undefined) text += obj.content;
      } catch {}
    }
    // Fallback: try plain JSON response formats
    if (!text) {
      try {
        const j = JSON.parse(raw);
        text = j.output || j.text || j.message || j.response || '';
      } catch { text = raw; }
    }
    setGeneratedEmail(text || 'No response received. Try again.');
    setEditedEmail(text || 'No response received. Try again.');
  } catch(e) {
    setGeneratedEmail('Error connecting to AI. Check that your n8n tunnel is running.');
  }
  setEmailLoading(false);
};

return (
  <div className="fade-in -mx-5 md:-mx-10 -mt-5 md:-mt-10 px-5 md:px-12 pt-8 md:pt-12 pb-12 min-h-screen" style={{background:'#1a1208'}}>
  <div className="space-y-8 max-w-7xl mx-auto">
    <div>
      <p className="page-label mb-2">Pillar 3</p>
      <h2 className="futura-heading text-white" style={{fontSize:'clamp(36px,5vw,52px)'}}>CRM Outreach</h2>
      <p className="mt-2 text-sm" style={{color:'rgba(255,255,255,0.45)'}}>AI-drafted personalized emails for every contact — reviewed and sent by your reps</p>
    </div>

    {/* Campaign selector */}
    <div className="flex flex-wrap gap-2">
      {campaigns.map(c => (
        <button key={c.id} onClick={() => { setCrmCampaign(c.id); setGeneratedEmail(''); setSelectedContact(null); }}
          className="px-3 md:px-5 py-2 md:py-3 rounded-2xl text-xs md:text-sm font-bold transition-all border-2"
          style={crmCampaign === c.id
            ? { background:'white', color:c.color, borderColor:'white', boxShadow:`0 4px 16px rgba(0,0,0,0.3)`, fontWeight:900 }
            : { background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.6)', borderColor:'rgba(255,255,255,0.12)' }}>
          {c.label}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* Contact list — left panel */}
      <div className="xl:col-span-2 bg-white rounded-3xl border-2 overflow-hidden shadow-sm" style={{borderColor:'#d4c4a0'}}>
        {/* List header */}
        <div className="px-6 py-5 border-b flex items-center justify-between" style={{borderColor:'#d4c4a0'}}>
          <div>
            <h3 className="text-lg font-black" style={{color:C.green}}>Contacts</h3>
            <p className="text-xs text-slate-400 font-semibold">{filteredContacts.length} of {contacts.length} shown</p>
          </div>
          <div className="flex gap-2">
            {['all','hot','warm','cold'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all"
                style={filterStatus === s
                  ? { background: s==='all' ? C.green : statusColor(s), color:'white' }
                  : { background:'#F5ECD8', color:'#4a3520' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        {/* Contact rows */}
        <div className="overflow-y-auto" style={{maxHeight:'520px'}}>
          {filteredContacts.map(contact => (
            <div key={contact.id}
              onClick={() => generateEmail(contact)}
              className="px-6 py-4 border-b cursor-pointer transition-all"
              style={{
                borderColor:'#d4c4a0',
                background: selectedContact?.id === contact.id ? '#e4ede4' : 'white',
                borderLeft: selectedContact?.id === contact.id ? `4px solid ${C.gold}` : '4px solid transparent'
              }}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white text-sm font-black"
                    style={{background: C.green}}>
                    {contact.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-sm text-slate-900 truncate">{contact.name}</p>
                    <p className="text-xs text-slate-400 font-semibold truncate">{contact.school.split(' ')[0]} · {contact.title.split('·')[0].trim()}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full" style={{background: statusColor(contact.status)}}/>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
                    style={{background: `${tierColor(contact.tier)}20`, color: tierColor(contact.tier)}}>
                    {contact.tier}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {contact.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-lg font-semibold"
                    style={{background:'#ede3cc', color:'#4a3520'}}>{tag}</span>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">Last contact: {contact.lastContact}
                {contact.spend > 0 && <span className="ml-2 font-bold" style={{color:C.greenLight}}>· ${contact.spend.toLocaleString()} spend</span>}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Email composer — right panel */}
      <div className="xl:col-span-3 flex flex-col gap-5">
        {!selectedContact && !emailLoading && (
          <div className="bg-white rounded-3xl border-2 flex flex-col items-center justify-center text-center p-16 shadow-sm" style={{borderColor:'#d4c4a0', minHeight:'400px'}}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5" style={{background:'rgba(136,110,76,0.10)'}}>
              <Mail size={28} style={{color:C.green}}/>
            </div>
            <p className="text-xl font-black mb-2" style={{color:C.green}}>Select a Contact</p>
            <p className="text-slate-400 text-sm font-semibold max-w-xs">Choose any contact on the left and Ace will instantly draft a personalized outreach email</p>
          </div>
        )}

        {emailLoading && (
          <div className="bg-white rounded-3xl border-2 flex flex-col items-center justify-center text-center p-16 shadow-sm" style={{borderColor:'#d4c4a0', minHeight:'400px'}}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 animate-pulse" style={{background:'rgba(136,110,76,0.12)'}}>
              <Sparkles size={28} style={{color:C.gold}}/>
            </div>
            <p className="text-xl font-black mb-2" style={{color:C.green}}>Drafting for {selectedContact?.name}...</p>
            <p className="text-slate-400 text-sm font-semibold">Ace is personalizing based on their history</p>
          </div>
        )}

        {selectedContact && generatedEmail && !emailLoading && (
          <>
            {/* Contact detail bar */}
            <div className="bg-white rounded-2xl border-2 px-4 md:px-6 py-4 shadow-sm" style={{borderColor:'#d4c4a0'}}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black shrink-0 text-sm" style={{background:C.greenMid}}>
                  {selectedContact.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <p className="font-black text-slate-900 truncate">{selectedContact.name}</p>
                  <p className="text-xs text-slate-400 font-semibold truncate">{selectedContact.title} · {selectedContact.school}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 pl-1">
                <span className="flex items-center gap-1 text-xs text-slate-400"><Mail size={11}/>{selectedContact.email}</span>
                <span className="flex items-center gap-1 text-xs text-slate-400"><Phone size={11}/>{selectedContact.phone}</span>
              </div>
            </div>

            {/* Email body */}
            <div className="bg-white rounded-3xl border-2 overflow-hidden shadow-sm flex flex-col" style={{borderColor:'#d4c4a0'}}>
              <div className="px-6 py-4 border-b flex items-center justify-between" style={{borderColor:'#d4c4a0', background:'#F5ECD8'}}>
                <div className="flex items-center gap-2">
                  <Sparkles size={16} style={{color:C.gold}}/>
                  <span className="text-sm font-black" style={{color:C.green}}>AI-Drafted · {campaigns.find(c=>c.id===crmCampaign)?.label}</span>
                </div>
                <button onClick={() => { setEditMode(!editMode); setEditedEmail(generatedEmail); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  style={{background: editMode ? C.green : '#e4ede4', color: editMode ? 'white' : '#3a5c38'}}>
                  <Edit3 size={12}/> {editMode ? 'Editing' : 'Edit'}
                </button>
              </div>

              {editMode ? (
                <textarea
                  value={editedEmail}
                  onChange={e => setEditedEmail(e.target.value)}
                  className="w-full p-6 text-sm text-slate-700 leading-relaxed font-mono resize-none outline-none"
                  style={{minHeight:'320px', fontFamily:'inherit'}}/>
              ) : (
                <div className="p-6 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap" style={{minHeight:'320px'}}>
                  {generatedEmail}
                </div>
              )}

              {/* Action bar */}
              <div className="px-4 md:px-6 py-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3" style={{borderColor:'#d4c4a0', background:'#F5ECD8'}}>
                <button onClick={() => generateEmail(selectedContact)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all border-2"
                  style={{background:'#F5ECD8', color:'#4a3520', borderColor:'#d4c4a0'}}>
                  <RefreshCw size={14}/> Regenerate
                </button>
                <div className="flex items-center gap-3 justify-end">
                  {emailApproved && (
                    <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600">
                      <CheckCircle2 size={15}/> Queued
                    </span>
                  )}
                  <button
                    onClick={() => setEmailApproved(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black transition-all"
                    style={{
                      background: emailApproved ? '#10b981' : C.lime,
                      color: emailApproved ? 'white' : C.greenMid,
                      boxShadow: `0 4px 16px ${emailApproved ? '#10b98140' : `${C.lime}50`}`
                    }}>
                    {emailApproved ? <><CheckCircle2 size={14}/> Approved</> : <><ThumbsUp size={14}/> Approve & Send</>}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>

    {/* CRM stats footer */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {[
        { label:'Contacts',         value:'9',   sub:'Wofford roster' },
        { label:'Hot Leads',        value:'5',   sub:'Ready to close', gold:true },
        { label:'Emails Drafted',   value:'∞',   sub:'AI-powered' },
        { label:'Avg Response Rate',value:'34%', sub:'Industry avg: 21%', gold:true },
      ].map((s,i) => (
        <div key={i} className="bg-white rounded-2xl border-2 p-6 shadow-sm" style={{borderColor:'#d4c4a0'}}>
          <p className="text-xs text-slate-400 font-semibold mb-1">{s.label}</p>
          <p className="text-3xl font-black" style={{color: s.gold ? C.gold : C.green}}>{s.value}</p>
          <p className="text-xs text-slate-400 font-semibold mt-1">{s.sub}</p>
        </div>
      ))}
    </div>
  </div>
  </div>
);
};

// ============================================================
// MAIN APP
// ============================================================

const SCHOOL_LIBRARY = {
  wofford:        { id:'wofford',        name:'Wofford College',             short:'Wofford',       mascot:'Terriers',     mascotName:'Boss',            conference:'SoCon',     location:'Spartanburg, SC', tier:'Small',     colors:{ primary:'#1a1208', accent:'#886E4C', accent2:'#C7B37F', bg:'#F5F0E8', border:'#e8dfc8' }, agent:{ name:'Shawn Tyler',    email:'shawn@terriersportsproperties.com', title:'Director of Sales'           }, venue:{ football:'Gibbs Stadium',        capacity:'13,000', basketball:'Jerry Richardson Indoor Stadium', bCap:'3,400'  }, sponsors:['Hub City Tap House','Beacon Drive-In','Spartanburg Regional Medical','R.J. Rockers Brewing'],      emoji:'🐾' },
  eku:            { id:'eku',            name:'Eastern Kentucky',            short:'EKU',           mascot:'Colonels',     mascotName:'Colonel',         conference:'ASUN',      location:'Richmond, KY',    tier:'Small',     colors:{ primary:'#3d0018', accent:'#8A0039', accent2:'#ffffff', bg:'#FFF5F8', border:'#f0d0da' }, agent:{ name:'Hunter Ellis',   email:'hellis@ekusports.com',              title:'Director Ticket Sales'       }, venue:{ football:'Roy Kidd Stadium',     capacity:'20,000', basketball:'McBrayer Arena',                  bCap:'6,500'  }, sponsors:["Mango's Restaurant","Rick's White Light Diner",'Eastern Kentucky Power','Jerzees Bar & Grill'], emoji:'⚔️' },
  ballstate:      { id:'ballstate',      name:'Ball State University',       short:'Ball State',    mascot:'Cardinals',    mascotName:'Charlie Cardinal',conference:'MAC',       location:'Muncie, IN',      tier:'Mid-Major', colors:{ primary:'#4a0010', accent:'#BA0C2F', accent2:'#ffffff', bg:'#FFF5F6', border:'#f0d0d4' }, agent:{ name:'Kyle Teegardin', email:'kteegardin@peaksportsmgmt.com',    title:'Regional Sales Director'     }, venue:{ football:'Scheumann Stadium',    capacity:'22,500', basketball:'Worthen Arena',                   bCap:'11,500' }, sponsors:['Elm Street Brewing','Muncie Power Products','IU Health Ball Memorial',"Vera Mae's Bistro"],     emoji:'🔴' },
  akron:          { id:'akron',          name:'University of Akron',         short:'Akron',         mascot:'Zips',         mascotName:'Zippy',           conference:'MAC',       location:'Akron, OH',       tier:'Mid-Major', colors:{ primary:'#010e24', accent:'#041E42', accent2:'#A89968', bg:'#F5F6FA', border:'#d0d4e8' }, agent:{ name:'Zach Vos',       email:'zvos@peaksportsmgmt.com',           title:'VP Revenue Generation'       }, venue:{ football:'InfoCision Stadium',   capacity:'30,000', basketball:'Rhodes Arena',                    bCap:'5,500'  }, sponsors:['Goodyear Tire','FirstEnergy','Swensons Drive-In','Akron Childrens Hospital'],               emoji:'🦘' },
  westgeorgia:    { id:'westgeorgia',    name:'Univ. of West Georgia',       short:'West Georgia',  mascot:'Wolves',       mascotName:'Wolfie',          conference:'ASUN',      location:'Carrollton, GA',  tier:'Small',     colors:{ primary:'#0a1a38', accent:'#003087', accent2:'#C8A951', bg:'#F5F7FF', border:'#d0d8f0' }, agent:{ name:'Katie Moore',    email:'kmoore@peaksportsmgmt.com',         title:'Sr. Director Revenue Ops'    }, venue:{ football:'University Stadium',   capacity:'11,000', basketball:'Coliseum',                        bCap:'4,200'  }, sponsors:['TrueCore Federal Credit Union','Southwire','Georgia Primary Bank','Fork in the Road'],          emoji:'🐺' },
  selouisiana:    { id:'selouisiana',    name:'SE Louisiana University',     short:'SE Louisiana',  mascot:'Lions',        mascotName:'Leo',             conference:'Southland', location:'Hammond, LA',     tier:'Small',     colors:{ primary:'#1a0a00', accent:'#006341', accent2:'#FFD100', bg:'#F5FFF9', border:'#c8eedd' }, agent:{ name:'Greyson Allen',  email:'gallen@peaksportsmgmt.com',         title:'Chief of Staff'              }, venue:{ football:'Strawberry Stadium',   capacity:'16,000', basketball:'University Center',               bCap:'7,500'  }, sponsors:['Smoothie King','City Pork',"Raising Cane's",'Hammond Brewing Co.'],                             emoji:'🦁' },
  lindenwood:     { id:'lindenwood',     name:'Lindenwood University',       short:'Lindenwood',    mascot:'Lions',        mascotName:'Louie',           conference:'OVC',       location:'St. Charles, MO', tier:'Small',     colors:{ primary:'#1a0a08', accent:'#8B0000', accent2:'#FFD700', bg:'#FFF5F5', border:'#f0d0d0' }, agent:{ name:'Kyle Teegardin', email:'kteegardin@peaksportsmgmt.com',    title:'Regional Sales Director'     }, venue:{ football:'Hunter Stadium',       capacity:'5,000',  basketball:'Hyland Arena',                    bCap:'3,500'  }, sponsors:['World Wide Technology','Brown Shoe Company','St. Charles Toyota','Lewis Rice LLC'],              emoji:'🦁' },
  easternillinois:{ id:'easternillinois',name:'Eastern Illinois University', short:'Eastern IL',    mascot:'Panthers',     mascotName:'Billy',           conference:'OVC',       location:'Charleston, IL',  tier:'Small',     colors:{ primary:'#001F5B', accent:'#004B8D', accent2:'#A89A6F', bg:'#F5F7FF', border:'#d0d8f0' }, agent:{ name:'Greyson Allen',  email:'gallen@peaksportsmgmt.com',         title:'Chief of Staff'              }, venue:{ football:"O'Brien Field",        capacity:'10,000', basketball:'Groniger Arena',                  bCap:'5,300'  }, sponsors:['First Mid Bank','Checkered Flag Sports Bar','Sarah Bush Lincoln Health'],                        emoji:'🐾' },
  centralarkansas: { id:'centralarkansas',name:'Central Arkansas',          short:'UCA',           mascot:'Bears',        mascotName:'Sugar Bear',      conference:'Southland', location:'Conway, AR',      tier:'Small',     colors:{ primary:'#1a0830', accent:'#4B0082', accent2:'#A89A6F', bg:'#F8F5FF', border:'#e0d0f0' }, agent:{ name:'Zach Vos',       email:'zvos@peaksportsmgmt.com',           title:'VP Revenue Generation'       }, venue:{ football:'Estes Stadium',        capacity:'11,000', basketball:'Farris Center',                   bCap:'7,200'  }, sponsors:['Acxiom','Snap-on Tools','Conway Regional Health','Bear State Financial'],                        emoji:'🐻' },
  northerncolorado:{ id:'northerncolorado',name:'Northern Colorado',        short:'UNC Bears',     mascot:'Bears',        mascotName:'Klawz',           conference:'Big Sky',   location:'Greeley, CO',     tier:'Small',     colors:{ primary:'#001a2e', accent:'#013C65', accent2:'#F4BC00', bg:'#F5F9FF', border:'#c8dcf0' }, agent:{ name:'Katie Moore',    email:'kmoore@peaksportsmgmt.com',         title:'Sr. Director Revenue Ops'    }, venue:{ football:'Nottingham Field',     capacity:'8,500',  basketball:'Bank of Colorado Arena',          bCap:'4,500'  }, sponsors:['Aims Community College','Scheels Sports','Banner Health','Greeley Stampede'],                    emoji:'🐻' },
  southernutah:   { id:'southernutah',   name:'Southern Utah University',   short:'SUU',           mascot:'Thunderbirds', mascotName:'Thunder',         conference:'WAC',       location:'Cedar City, UT',  tier:'Small',     colors:{ primary:'#1a0808', accent:'#CC0000', accent2:'#ffffff', bg:'#FFF5F5', border:'#f0d0d0' }, agent:{ name:'Shawn Tyler',    email:'shawn@terriersportsproperties.com', title:'Director of Sales'           }, venue:{ football:'Eccles Coliseum',      capacity:'11,500', basketball:'America First Event Center',       bCap:'5,300'  }, sponsors:['Utah Shakespeare Festival','Zions Bank','IHC Health','Cedar City Ford'],                         emoji:'⚡' },
  utahtech:       { id:'utahtech',       name:'Utah Tech University',       short:'Utah Tech',     mascot:'Trailblazers', mascotName:'Blaze',           conference:'WAC',       location:'St. George, UT',  tier:'Small',     colors:{ primary:'#0a1a08', accent:'#1B5E20', accent2:'#FF6F00', bg:'#F5FFF5', border:'#c8eec8' }, agent:{ name:'Hunter Ellis',   email:'hellis@ekusports.com',              title:'Director Ticket Sales'       }, venue:{ football:'Greater Zion Stadium', capacity:'10,000', basketball:'Burns Arena',                     bCap:'5,000'  }, sponsors:['Sunroc Corporation','Red Cliffs Mall','Dixie Regional Medical','Zions Bank'],                    emoji:'🔥' },
};

// Membership tiers
const MEMBERSHIP_TIERS = {
  standard: { id:'standard', label:'Standard',        color:'#94a3b8', bg:'#f8fafc', price:0,   perks:['General admission access','Standard pricing','Mobile ticketing'],                                                                              sections:['general','bleacher','visitor'],                                      discount:0    },
  gold:     { id:'gold',     label:'Gold Member',     color:'#d97706', bg:'#fffbeb', price:99,  perks:['Priority ticket access','10% discount on all tickets','Exclusive Gold sections','Free parking (select games)'],                               sections:['general','bleacher','visitor','home_chairback','home_bleacher'],     discount:0.10 },
  platinum: { id:'platinum', label:'Platinum Member', color:'#7c3aed', bg:'#faf5ff', price:249, perks:['Early presale access (48 hrs)','20% discount on all tickets','Club & VIP sections unlocked','Complimentary parking','In-seat food delivery'], sections:['all'],                                                               discount:0.20 },
  alumni:   { id:'alumni',   label:'Alumni Member',   color:'#886E4C', bg:'#fdf8f0', price:149, perks:['Alumni reunion section access','15% loyalty discount','Exclusive alumni events','Legacy pricing locked in'],                                   sections:['general','bleacher','home_chairback','south_ez','alumni'],           discount:0.15 },
};

// Bundle deals
const BUNDLE_DEALS = [
  { minQty:2,  label:'Pair Deal',    discount:0,    badge:null,             msg:'' },
  { minQty:4,  label:'Group of 4',  discount:0.10, badge:'10% OFF',        msg:'Save 10% — perfect for families!' },
  { minQty:6,  label:'Group of 6+', discount:0.15, badge:'15% OFF',        msg:'Group discount applied automatically!' },
  { minQty:10, label:'Group of 10+',discount:0.20, badge:'20% OFF + PERKS',msg:'Best value! 20% off + group check-in lane.' },
];
const getBundleDeal = (qty) => { const d = BUNDLE_DEALS.filter(b => qty >= b.minQty); return d.length ? d[d.length-1] : BUNDLE_DEALS[0]; };



const SchoolGallery = ({ activeId, onSelect }) => {
  const [search, setSearch] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  const schools = Object.values(SCHOOL_LIBRARY);
  const filtered = search ? schools.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.conference.toLowerCase().includes(search.toLowerCase()) ||
    s.location.toLowerCase().includes(search.toLowerCase())
  ) : schools;
  const activeSchool = SCHOOL_LIBRARY[activeId] || SCHOOL_LIBRARY.wofford;

  return (
    <div style={{background:'#ffffff', borderBottom:'2px solid #e8dfc8', padding:'10px 16px'}}>
      {/* Top row: label + active school + toggle */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
        <div style={{display:'flex', alignItems:'center', gap:8, minWidth:0}}>
          <div style={{width:8, height:8, borderRadius:'50%', background:'#886E4C', flexShrink:0}}/>
          <span style={{fontFamily:"'Space Mono',monospace", fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', color:'#886E4C', flexShrink:0}}>Demo</span>
          {/* Active school chip */}
          <div style={{display:'flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:20, background:activeSchool.colors.primary, flexShrink:0}}>
            <span style={{fontSize:14}}>{activeSchool.emoji}</span>
            <span style={{fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13, color:'white', whiteSpace:'nowrap'}}>{activeSchool.short}</span>
            <span style={{fontFamily:"'Space Mono',monospace", fontSize:10, color:activeSchool.colors.accent2, opacity:0.8}}>{activeSchool.conference}</span>
          </div>
        </div>
        {/* Toggle button — min 44px touch target */}
        <button
          type="button"
          onClick={() => setExpanded(e => !e)}
          style={{minWidth:44, minHeight:44, padding:'0 12px', borderRadius:10, border:'1px solid #e8dfc8', background:'#F5F0E8', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:4, flexShrink:0}}
        >
          <span style={{fontFamily:"'Space Mono',monospace", fontSize:10, color:'#886E4C'}}>Switch</span>
          <span style={{color:'#886E4C', fontSize:12}}>{expanded ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div style={{marginTop:10}}>
          {/* Search */}
          <div style={{position:'relative', marginBottom:10}}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search schools, conference, city..."
              style={{width:'100%', boxSizing:'border-box', padding:'10px 12px 10px 34px', borderRadius:10, border:'1px solid #e8dfc8', fontSize:14, fontFamily:'Arial', outline:'none', background:'#F5F0E8'}}
            />
            <span style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:14}}>🔍</span>
          </div>
          {/* School cards — horizontal scroll with momentum */}
          <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:6, WebkitOverflowScrolling:'touch', msOverflowStyle:'none', scrollbarWidth:'none'}}>
            {filtered.map(school => {
              const active = school.id === activeId;
              return (
                <button
                  key={school.id}
                  type="button"
                  onClick={() => { onSelect(school.id); setExpanded(false); setSearch(''); }}
                  style={{
                    flexShrink:0, display:'flex', alignItems:'center', gap:8,
                    padding:'10px 16px', minHeight:48, borderRadius:12, border:'2px solid',
                    borderColor: active ? school.colors.accent : '#e8dfc8',
                    background: active ? school.colors.primary : 'white',
                    cursor:'pointer', transition:'all 0.2s ease',
                    boxShadow: active ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
                  }}>
                  <span style={{fontSize:18}}>{school.emoji}</span>
                  <div style={{textAlign:'left'}}>
                    <p style={{margin:0, fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:14, color: active ? 'white' : '#1a1208', lineHeight:1.2}}>{school.short}</p>
                    <p style={{margin:0, fontFamily:"'Space Mono',monospace", fontSize:10, color: active ? school.colors.accent2 : '#94a3b8'}}>{school.conference} · {school.tier}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <p style={{margin:'6px 0 0 0', fontFamily:"'Space Mono',monospace", fontSize:10, color:'#94a3b8', textAlign:'right'}}>{filtered.length} of {schools.length} schools</p>
        </div>
      )}
    </div>
  );
};


export default function App() {
  const [activeSchoolId, setActiveSchoolId] = useState('wofford');
  const [memberTier, setMemberTier] = useState('platinum');
  const school = SCHOOL_LIBRARY[activeSchoolId] || SCHOOL_LIBRARY.wofford;
  const sc = school.colors;
  const [localTransactions, setLocalTransactions] = useState([...MOCK_DB.initialStats]);
  const [activeCampaign, setActiveCampaign] = useState('TICKETING');

  const addTransaction = (tx) => setLocalTransactions(prev => [{ ...tx, id:`TX_${Date.now()}` }, ...prev]);
  // Only sum ticket-type purchases (from Ticket Hub / chat) — excludes seeded sponsorship/hospitality rows
  const ticketTransactions = localTransactions.filter(tx => tx.fromTicketHub);
  const totalTicketRevenue = ticketTransactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const navItems = [
    { id:'mobile',   label:'Sales Agent',    sub:'AI Chat · CRM',    icon:<Sparkles size={22}/> },
    { id:'store',    label:'Ticket Hub',     sub:'Marketplace',      icon:<ShoppingCart size={22}/> },
    { id:'crm',      label:'CRM Outreach',   sub:'AI Emails · Leads', icon:<Mail size={22}/> },
    { id:'dash',     label:'Analytics',      sub:'Performance',      icon:<TrendingUp size={22}/> },
    { id:'insights', label:'AI Productivity', sub:'AI vs Manual', icon:<BarChart2 size={22}/> },
    { id:'arch',     label:'Tech Stack',     sub:'Infrastructure',   icon:<Network size={22}/> },
  ];

  return (
    <div className="content-bg" style={{minHeight:'100vh', display:'flex', flexDirection:'column', overflowX:'hidden'}}>
      <Styles/>
      <style>{`
        @media (min-width: 768px) {
          .app-outer { flex-direction: row !important; overflow: hidden !important; height: 100vh !important; }
          .app-sidebar { width: 272px !important; min-width: 272px !important; height: 100vh !important; position: sticky !important; top: 0 !important; overflow-y: auto !important; }
          .app-nav { flex-direction: column !important; overflow-x: visible !important; padding: 16px !important; flex: 1 !important; }
          .app-nav-dot { display: block !important; }
          .app-content { padding: 40px !important; overflow-y: auto !important; }
          .app-footer { display: flex !important; }
        }
        .app-outer { overflow-x: hidden; }
        .app-content { overflow-x: hidden; }
      `}</style>
      <div className="app-outer" style={{display:'flex', flexDirection:'column', flex:1, minHeight:'100vh'}}>

      {/* ── SIDEBAR ── */}
      <div className="app-sidebar sidebar-bg" style={{width:'100%', color:'white', display:'flex', flexDirection:'column', flexShrink:0, zIndex:20}}>

        {/* Logo */}
        <div style={{padding:'20px 28px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:'12px'}}>
          <img src="data:image/png;base64,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" alt="Peak Sports" style={{width:'44px', height:'44px', borderRadius:'10px', objectFit:'contain', flexShrink:0}}/>
          <div>
            <h1 className="futura-heading" style={{fontSize:'22px', lineHeight:'1.1', color:'white', margin:0}}>
              Boss<span style={{color:C.limeBright}}>.</span><span style={{color:C.lime}}>ai</span>
            </h1>
            <p className="mono-label" style={{fontSize:'8px', color:'rgba(255,255,255,0.25)', margin:0}}>Wofford Terriers · SoCon</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="app-nav" style={{display:'flex', flexDirection:'row', gap:'4px', padding:'6px 8px', overflowX:'auto', scrollbarWidth:'none', WebkitOverflowScrolling:'touch'}}>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                style={{display:'flex', alignItems:'center', gap:'10px', padding:'9px 13px', borderRadius:'12px', textAlign:'left', cursor:'pointer', flexShrink:0, background: isActive ? 'rgba(136,110,76,0.09)' : 'transparent', border: isActive ? '1px solid rgba(136,110,76,0.22)' : '1px solid transparent', boxShadow: isActive ? 'inset 3px 0 0 #886E4C' : 'none', color: isActive ? 'white' : 'rgba(255,255,255,0.38)', transition:'all 0.18s ease'}}>
                <span style={{flexShrink:0, display:'flex', color: isActive ? C.lime : 'rgba(255,255,255,0.28)'}}>
                  {React.cloneElement(item.icon, {size:16})}
                </span>
                <span className="futura-heading" style={{fontSize:'13px', whiteSpace:'nowrap'}}>{item.label}</span>
                {isActive && <div className="app-nav-dot" style={{display:'none', marginLeft:'auto', flexShrink:0, width:'5px', height:'5px', borderRadius:'50%', background:C.lime, boxShadow:`0 0 8px ${C.lime}`}}/>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* CONTENT */}
      <div className="app-content" style={{flex:1, padding:'16px', minWidth:0}}>
        <div style={{maxWidth:'1280px', margin:'0 auto'}}>

          {/* SALES AGENT */}
          {activeTab === 'mobile' && (
            <div className="fade-in" style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'40px'}}>
              {/* Two-col on wide screens */}
              <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', gap:'40px', alignItems:'flex-start', justifyContent:'center', width:'100%'}}>

                {/* LEFT COLUMN — campaigns + fan card */}
                <div style={{flex:'1 1 340px', maxWidth:'420px', minWidth:'280px', display:'flex', flexDirection:'column', gap:'24px'}}>
                  <div>
                    <p className="page-label" style={{marginBottom:'8px'}}>Sales Agent</p>
                    <h2 className="futura-heading" style={{fontSize:'clamp(34px, 5vw, 48px)', color:C.greenMid, lineHeight:'1.1', margin:'0 0 12px'}}>Choose a<br/>Campaign</h2>
                    <p style={{color:'#64748b', fontSize:'15px', margin:0}}>Select a campaign type to see Ace in action with live data</p>
                  </div>

                  {/* Campaign cards — vertical stack, explicit block layout */}
                  <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                    {Object.keys(CAMPAIGNS).map(c => {
                      const isActive = activeCampaign === c;
                      return (
                        <button key={c} onClick={() => setActiveCampaign(c)}
                          style={{
                            display:'flex', alignItems:'center', justifyContent:'space-between',
                            width:'100%', padding:'18px 20px', borderRadius:'16px',
                            textAlign:'left', cursor:'pointer',
                            border: isActive ? `2px solid ${C.greenMid}` : `2px solid ${C.slateLight}`,
                            background: isActive ? C.greenMid : 'white',
                            color: isActive ? 'white' : C.slate,
                            boxShadow: isActive ? '0 8px 32px rgba(26,18,8,0.25)' : '0 2px 8px rgba(26,18,8,0.04)',
                            transition:'all 0.2s ease',
                          }}>
                          <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
                            <div style={{
                              width:'44px', height:'44px', borderRadius:'12px',
                              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                              background: isActive ? 'rgba(136,110,76,0.15)' : C.offWhite,
                            }}>
                              <span style={{color: isActive ? C.lime : C.greenLight, display:'flex'}}>{CAMPAIGNS[c].icon}</span>
                            </div>
                            <div>
                              <span className="futura-heading" style={{display:'block', fontSize:'17px', lineHeight:'1.2'}}>{CAMPAIGNS[c].title}</span>
                              <span style={{display:'block', fontSize:'13px', marginTop:'3px', color: isActive ? 'rgba(255,255,255,0.55)' : '#94a3b8'}}>{CAMPAIGNS[c].sub}</span>
                            </div>
                          </div>
                          <ChevronRight size={20} style={{color: isActive ? C.lime : '#cbd5e1', flexShrink:0}}/>
                        </button>
                      );
                    })}
                  </div>

                  {/* Fan profile card */}
                  <div style={{
                    padding:'20px', borderRadius:'16px',
                    background:'white', border:`2px solid ${C.slateLight}`,
                    boxShadow:'0 2px 20px rgba(26,18,8,0.05)',
                  }}>
                    <p className="mono-label" style={{color:C.greenLight, marginBottom:'12px'}}>Active Fan Profile</p>
                    <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
                      <div style={{
                        width:'44px', height:'44px', borderRadius:'50%',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        background:C.greenMid, color:'white', fontWeight:900, fontSize:'15px', flexShrink:0,
                      }}>SK</div>
                      <div>
                        <p className="futura-heading" style={{fontSize:'16px', color:'#0f172a', margin:0}}> Scott Kull</p>
                        <p style={{fontSize:'13px', color:'#94a3b8', margin:'3px 0 0', display:'flex', alignItems:'center', gap:'6px'}}>
                          <span style={{color:C.lime}}>★</span> Platinum · Dir. of Athletics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN — phone mockup */}
                <div style={{flexShrink:0}}>
                  <MobileDemo campaign={activeCampaign} currentFan={MOCK_DB.fans[0]} onTransaction={addTransaction}/>
                </div>
              </div>
            </div>
          )}

          {/* TICKET HUB */}
          {activeTab === 'store' && <div className="fade-in"><TicketHub onTransaction={addTransaction}/></div>}

          {/* ANALYTICS */}
          {activeTab === 'dash' && (() => {
            // ── Seed chart data ──
            const revenueData = [
              { month:'Sep', tickets:18400, sponsorship:24000 },
              { month:'Oct', tickets:24800, sponsorship:18500 },
              { month:'Nov', tickets:31200, sponsorship:41000 },
              { month:'Dec', tickets:19600, sponsorship:35000 },
              { month:'Jan', tickets:27300, sponsorship:28000 },
              { month:'Feb', tickets:38900, sponsorship:22000 },
              { month:'Mar', tickets:44100 + totalTicketRevenue, sponsorship:19500 },
            ];
            const schoolData = [
              { school:'Ball St.',   tickets:341, revenue:31600 },
              { school:'EKU',        tickets:312, revenue:28400 },
              { school:'Akron',      tickets:289, revenue:26100 },
              { school:'W. Georgia', tickets:276, revenue:24800 },
              { school:'Wofford',    tickets:224, revenue:19800 },
              { school:'SE La.',     tickets:198, revenue:17200 },
            ];
            const zoneData = [
              { zone:'Home Sideline', sales:892, revenue:89200, fill:'#2a1e0e' },
              { zone:'Club Level',    sales:156, revenue:35880, fill:'#886E4C' },
              { zone:'End Zones',     sales:634, revenue:28530, fill:'#1e6b44' },
              { zone:'Upper Deck',    sales:1102, revenue:38570, fill:'#1e3f6e' },
              { zone:'Away Side',     sales:420, revenue:31500, fill:'#2d6a4f' },
            ];
            const campaignData = [
              { name:'Sponsorship',       leads:148, converted:74,  revenue:188000 },
              { name:'Ticket Sales',      leads:420, converted:188, revenue:148100 },
              { name:'Hospitality',       leads:96,  converted:52,  revenue:41600  },
              { name:'Alumni Outreach',   leads:310, converted:124, revenue:18600  },
            ];
            const CustomTooltip = ({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-xl px-4 py-3 shadow-xl text-sm" style={{background:C.green, border:`1px solid rgba(136,110,76,0.3)`}}>
                  <p className="font-black text-white mb-1">{label}</p>
                  {payload.map((p,i) => (
                    <p key={i} style={{color:p.color || C.gold}} className="font-semibold">
                      {p.name}: {typeof p.value === 'number' && p.name?.toLowerCase().includes('rev') ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
                    </p>
                  ))}
                </div>
              );
            };
            return (
              <div className="space-y-8 fade-in">
                <div>
                  <p className="page-label mb-2">Analytics</p>
                  <h2 className="futura-heading" style={{fontSize:'clamp(32px,5vw,52px)', color:C.greenMid}}>Performance Overview</h2>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {[
                    { label:'Ticket Revenue',      value:`${(74700 + totalTicketRevenue).toLocaleString()}`, sub:'Wofford Terriers · YTD', dark:true },
                    { label:'Sponsorship Revenue', value:'$48,500',   sub:'Wofford · Packages closed', dark:true },
                    { label:'Tickets Sold',        value:(745 + ticketTransactions.length).toLocaleString(),  sub:'+22% vs last season' },
                    { label:'Conversion Rate',     value:'44.2%',     sub:'Lead → purchase', cognac:true },
                  ].map((k,i) => (
                    <div key={i} className={`p-4 md:p-7 ${k.dark ? 'kpi-dark' : 'data-card'}`}>
                      <p className="mono-label mb-2" style={{color: k.dark ? 'rgba(255,255,255,0.35)' : '#94a3b8'}}>{k.label}</p>
                      <p className={`futura-heading leading-none ${k.dark ? 'gold-glow' : ''} ${k.cognac ? 'cognac-glow' : ''}`}
                        style={{fontSize:'clamp(22px,4vw,36px)', color: k.dark ? C.gold : k.cognac ? C.cognac : C.greenMid}}>{k.value}</p>
                      <p className="mono-label mt-2 md:mt-3" style={{color: k.dark ? 'rgba(136,110,76,0.6)' : '#94a3b8'}}>{k.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Revenue over time */}
                <div className="data-card p-4 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp size={22} style={{color:C.gold}}/>
                    <div>
                      <h3 className="futura-heading" style={{fontSize:'22px', color:C.greenMid}}>Revenue Over Time</h3>
                      <p className="mono-label text-slate-400">Ticket Sales vs Sponsorship · Wofford Terriers · YTD</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={revenueData} margin={{top:4,right:16,left:0,bottom:0}}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                      <XAxis dataKey="month" tick={{fontSize:12, fontWeight:700, fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fontSize:11, fill:'#94a3b8'}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`}/>
                      <Tooltip content={<CustomTooltip/>}/>
                      <Legend wrapperStyle={{fontSize:12, fontWeight:700, paddingTop:12}}/>
                      <Line type="monotone" dataKey="tickets"     name="Ticket Sales"  stroke={C.green} strokeWidth={3} dot={{fill:C.green, r:5}} activeDot={{r:7, fill:C.gold}}/>
                      <Line type="monotone" dataKey="sponsorship" name="Sponsorship"   stroke="#e07b2a" strokeWidth={2} strokeDasharray="5 3" dot={{fill:'#e07b2a', r:4}}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Bottom row: schools + campaigns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Tickets by school */}
                  <div className="data-card p-4 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Users size={22} style={{color:C.gold}}/>
                      <div>
                        <h3 className="futura-heading" style={{fontSize:'22px', color:C.greenMid}}>Tickets by Sport</h3>
                        <p className="mono-label text-slate-400">Wofford Terriers · Tickets sold per sport</p>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={schoolData} margin={{top:4,right:8,left:0,bottom:0}}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
                        <XAxis dataKey="school" tick={{fontSize:11, fontWeight:700, fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fontSize:11, fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                        <Tooltip content={<CustomTooltip/>}/>
                        <Bar dataKey="tickets" name="Tickets" fill={C.green} radius={[6,6,0,0]}>
                          {schoolData.map((_,i) => <Cell key={i} fill={i%2===0 ? C.green : C.greenLight}/>)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Campaign performance */}
                  <div className="data-card p-4 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Trophy size={22} style={{color:C.gold}}/>
                      <div>
                        <h3 className="futura-heading" style={{fontSize:'22px', color:C.greenMid}}>Campaign Performance</h3>
                        <p className="mono-label text-slate-400">Leads vs conversions</p>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={campaignData} margin={{top:4,right:8,left:0,bottom:0}} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false}/>
                        <XAxis type="number" tick={{fontSize:11, fill:'#94a3b8'}} axisLine={false} tickLine={false}/>
                        <YAxis type="category" dataKey="name" tick={{fontSize:11, fontWeight:700, fill:'#64748b'}} axisLine={false} tickLine={false} width={110}/>
                        <Tooltip content={<CustomTooltip/>}/>
                        <Legend wrapperStyle={{fontSize:12, fontWeight:700, paddingTop:8}}/>
                        <Bar dataKey="leads"     name="Leads"      fill="#e2e8f0" radius={[0,4,4,0]}/>
                        <Bar dataKey="converted" name="Converted"  fill={C.gold}  radius={[0,4,4,0]}/>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Sales by zone */}
                <div className="data-card p-4 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin size={22} style={{color:C.gold}}/>
                    <div>
                      <h3 className="futura-heading" style={{fontSize:'22px', color:C.greenMid}}>Sales by Section Zone</h3>
                      <p className="mono-label text-slate-400">Tickets sold & revenue per zone · all venues</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie data={zoneData} dataKey="sales" nameKey="zone" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3}>
                          {zoneData.map((z,i) => <Cell key={i} fill={z.fill}/>)}
                        </Pie>
                        <Tooltip formatter={(v,n)=>[v.toLocaleString()+' tickets', n]}
                          contentStyle={{background:C.green, border:`1px solid rgba(136,110,76,0.3)`, borderRadius:12, color:'white', fontSize:12, fontWeight:700}}/>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-3">
                      {zoneData.map((z,i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full shrink-0" style={{background:z.fill}}/>
                            <span className="text-sm font-bold text-slate-700">{z.zone}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black" style={{color:C.green}}>{z.sales.toLocaleString()}</span>
                            <span className="text-xs text-slate-400 ml-2">${(z.revenue/1000).toFixed(1)}k</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="data-card overflow-hidden">
                  <div className="px-4 md:px-8 py-5 border-b flex items-center gap-3" style={{borderColor:'#dce8dc'}}>
                    <Activity size={20} style={{color:C.gold}}/>
                    <h3 className="futura-heading" style={{fontSize:'20px', color:C.greenMid}}>Live Transactions</h3>
                    <span className="ml-auto flex items-center gap-2 mono-label" style={{color:C.cognac}}>
                      <span className="status-dot" style={{width:'7px',height:'7px'}}/>Live
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                  <table className="w-full text-left" style={{minWidth:'320px'}}>
                    <thead>
                      <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest border-b" style={{borderColor:C.slateLight}}>
                        <th className="px-4 md:px-8 py-3">Customer</th>
                        <th className="px-4 md:px-8 py-3">Campaign</th>
                        <th className="px-4 md:px-8 py-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {localTransactions.length === 0 && (
                        <tr><td colSpan={3} className="px-4 py-8 text-center text-slate-400 font-semibold text-sm">No transactions yet — buy some tickets!</td></tr>
                      )}
                      {localTransactions.map(tx => (
                        <tr key={tx.id} className="border-b hover:bg-green-50/40 transition-colors" style={{borderColor:C.slateLight}}>
                          <td className="px-4 md:px-8 py-3 font-bold text-slate-900 text-sm">{tx.fanName}</td>
                          <td className="px-4 md:px-8 py-3 text-xs font-bold uppercase tracking-wider" style={{color:C.greenLight}}>{tx.campaign}</td>
                          <td className="px-4 md:px-8 py-3 text-right font-black" style={{fontSize:'clamp(14px,3vw,20px)', color:C.gold}}>${tx.amount?.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* DATA INSIGHTS */}
          {activeTab === 'insights' && <ProductivityTab />}

          {/* CRM OUTREACH */}
          {activeTab === 'crm' && <CRMTab />}

          {/* TECH STACK */}
          {activeTab === 'arch' && (
            <div className="max-w-5xl fade-in space-y-8">
              <div>
                <p className="page-label mb-2">Infrastructure</p>
                <h3 className="futura-heading" style={{fontSize:'clamp(32px,5vw,52px)', color:C.greenMid}}>Tech Stack</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-xl">Purpose-built for collegiate athletics revenue ops — every layer chosen for speed, reliability, and zero vendor lock-in.</p>
              </div>

              {/* Core stack cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: <Zap size={22}/>,
                    label: 'AI Engine',
                    name: 'OpenAI GPT-4o',
                    desc: 'Powers Ace — live inventory queries, personalized CRM drafts, and fan-facing conversation in real time.',
                    color: C.lime,
                    tag: 'Live'
                  },
                  {
                    icon: <Network size={22}/>,
                    label: 'Workflow Automation',
                    name: 'n8n (Self-Hosted)',
                    desc: 'Orchestrates every AI call, database query, and webhook. No SaaS dependency — runs on your infrastructure.',
                    color: '#e07b2a',
                    tag: 'Self-Hosted'
                  },
                  {
                    icon: <Database size={22}/>,
                    label: 'Inventory Database',
                    name: 'PostgreSQL',
                    desc: 'Real seat-level inventory for all 6 partner schools — section, row, price, availability, event data.',
                    color: '#3b82f6',
                    tag: 'Live Data'
                  },
                  {
                    icon: <Activity size={22}/>,
                    label: 'Frontend',
                    name: 'React + Vite',
                    desc: 'Lightning-fast SPA. Mobile-first, no page reloads. Deployable to any CDN or white-labeled per school.',
                    color: C.greenLight,
                    tag: 'This App'
                  },
                  {
                    icon: <TrendingUp size={22}/>,
                    label: 'Secure Tunnel',
                    name: 'Cloudflare Tunnel',
                    desc: 'Exposes the platform publicly without open firewall ports. Zero-trust access, DDoS protection included.',
                    color: '#f59e0b',
                    tag: 'Active'
                  },
                  {
                    icon: <Trophy size={22}/>,
                    label: 'Deployment',
                    name: 'Docker + Local',
                    desc: 'Entire stack runs containerized. Can be migrated to AWS, Azure, or school-managed cloud with one command.',
                    color: '#8b5cf6',
                    tag: 'Portable'
                  },
                ].map((s,i) => (
                  <div key={i} className="data-card p-5 space-y-3" style={{borderTop:`3px solid ${s.color}`}}>
                    <div className="flex items-center justify-between">
                      <span style={{color:s.color}}>{s.icon}</span>
                      <span className="mono-label px-2 py-1 rounded-lg" style={{background:`${s.color}18`, color:s.color, fontSize:'8px'}}>{s.tag}</span>
                    </div>
                    <div>
                      <p className="mono-label text-slate-400 mb-0.5" style={{fontSize:'9px'}}>{s.label}</p>
                      <p className="futura-heading" style={{fontSize:'18px', color:C.greenMid}}>{s.name}</p>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Architecture flow */}
              <div className="rounded-2xl p-5 md:p-8" style={{background:`linear-gradient(145deg, #180f07, #2a1e0e)`, border:'1px solid rgba(136,110,76,0.12)'}}>
                <div className="flex items-center gap-3 mb-6">
                  <Activity size={18} style={{color:C.lime}}/>
                  <p className="futura-heading text-white" style={{fontSize:'20px'}}>How It All Connects</p>
                </div>
                <div className="flex flex-col md:flex-row items-stretch gap-3">
                  {[
                    { step:'01', label:'Fan or Rep', sub:'Sends a message', icon:<Users size={16}/> },
                    { step:'02', label:'n8n Agent', sub:'Routes & orchestrates', icon:<Network size={16}/> },
                    { step:'03', label:'GPT-4o', sub:'Reasons + responds', icon:<Zap size={16}/> },
                    { step:'04', label:'PostgreSQL', sub:'Live inventory query', icon:<Database size={16}/> },
                    { step:'05', label:'React UI', sub:'Renders result', icon:<Activity size={16}/> },
                  ].map((s, i, arr) => (
                    <React.Fragment key={i}>
                      <div className="flex-1 rounded-xl p-4 text-center" style={{background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)'}}>
                        <p className="mono-label mb-2" style={{color:C.lime, fontSize:'8px'}}>{s.step}</p>
                        <div className="flex justify-center mb-2" style={{color:'rgba(255,255,255,0.5)'}}>{s.icon}</div>
                        <p className="futura-heading text-white" style={{fontSize:'14px'}}>{s.label}</p>
                        <p className="text-white/35 mt-1" style={{fontSize:'10px'}}>{s.sub}</p>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="hidden md:flex items-center justify-center text-white/20 shrink-0">
                          <ChevronRight size={18}/>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Three pillars + system status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="data-card p-5 space-y-4">
                  <p className="futura-heading" style={{fontSize:'18px', color:C.greenMid}}>Three Revenue Pillars</p>
                  {[
                    { label:'Sales Agent (Ace)', sub:'AI chat → live DB → ticket sale', color:C.lime },
                    { label:'Ticket Hub', sub:'Interactive map → seat picker → checkout', color:'#3b82f6' },
                    { label:'CRM Outreach', sub:'Contact data → AI draft → rep approves → sends', color:'#e07b2a' },
                  ].map((p,i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{background:p.color}}/>
                      <div>
                        <p className="futura-heading" style={{fontSize:'15px', color:C.greenMid}}>{p.label}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{p.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-5" style={{background:`linear-gradient(145deg, #180f07, #2a1e0e)`, border:'1px solid rgba(136,110,76,0.12)'}}>
                  <p className="mono-label mb-4" style={{color:C.lime, fontSize:'9px', letterSpacing:'0.14em'}}>SYSTEM STATUS</p>
                  <div className="space-y-3">
                    {[
                      { label:'AI Agent (n8n)',     value:'Online',   ok:true },
                      { label:'PostgreSQL DB',       value:'Connected',ok:true },
                      { label:'Cloudflare Tunnel',   value:'Active',   ok:true },
                      { label:'Avg Response Time',   value:'~1.2s',    ok:true },
                      { label:'Seats in Inventory',  value:'2,400+',   ok:true },
                    ].map((s,i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-white/45 text-xs font-semibold">{s.label}</span>
                        <span className="flex items-center gap-1.5 mono-label" style={{color: s.ok ? C.lime : '#ef4444', fontSize:'10px'}}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{background: s.ok ? C.lime : '#ef4444'}}/>
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
      {/* Footer accent */}
      <div className="app-footer" style={{display:"none", alignItems:"center", justifyContent:"space-between", padding:"6px 24px", borderTop:"1px solid rgba(26,18,8,0.08)", background:"rgba(244,247,242,0.8)"}}>
        <div className="flex items-center gap-1.5">
          <div className="status-dot" style={{width:'6px', height:'6px'}}/>
          <span className="mono-label" style={{fontSize:'8px', color:'#94a3b8'}}>All Systems Nominal · v2.5.0</span>
        </div>
        <span className="mono-label" style={{fontSize:'8px', color:'#b8c8b8'}}>Powered by <span style={{color:'#886E4C'}}>Peak Sports MGMT</span></span>
      </div>
      </div>
    </div>
  );
}
