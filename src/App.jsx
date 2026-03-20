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
// Boss mascot logo (Wofford Terriers)
const BOSS_LOGO = "data:image/png;base64,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";

const N8N_WEBHOOK_URL = 'https://may-transition-pierre-calculate.trycloudflare.com/webhook/2e28cfe9-961f-48fb-a548-3f0306448996/chat';

// ============================================================
// COLORS
// ============================================================
// Wofford College: Old Gold #886E4C | Khaki #C7B37F | Black #000000
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
};

const MOCK_DB = {
  fans: [{ id: "FAN_KULL01", name: "Scott Kull", loyaltyTier: "Platinum", lastPurchase: { section: "120", row: "A" }, title: "Director of Athletics", org: "Wofford College", fanScore: 94, tenure: "11 yrs", sports: ["Football","Basketball","Baseball"], tags: ["Decision Maker","VIP","Institutional"] }],
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
    icon: <img src={BOSS_LOGO} alt="Boss" style={{width:'20px',height:'20px',objectFit:'contain'}} />,
    initial: (fan) => `Hey ${fan.name.split(' ')[0]}! 🏈 Big game this Saturday. I noticed you were in Sec ${fan.lastPurchase.section} last time — want me to check what's available nearby?`,
    systemPrompt: (fan) => `You are Boss, an expert ticket sales rep for Peak Sports MGMT at a mid-major college athletics program. Your goal is to sell tickets — season plans, single-game tickets, flex plans, and group packages.

Fan profile: ${fan.name}, loyalty tier: ${fan.loyaltyTier}, last seat: Section ${fan.lastPurchase.section} Row ${fan.lastPurchase.row}.

Use the inventory database tool to find available seats. Suggest options near their last section first. Be conversational, energetic, and close toward a purchase. If they ask about price, pull real inventory. Keep replies under 3 sentences unless showing seat options.`
  },
  SPONSORSHIP: {
    title: "Sponsorship Sales",
    sub: "Corporate partners · Package builder",
    icon: <Trophy size={20} />,
    initial: (fan) => `Hi ${fan.name.split(' ')[0]}! I'm reaching out about sponsorship opportunities for the upcoming season. We have openings across digital signage, in-game promotions, and hospitality packages. What budget range are you working with?`,
    systemPrompt: (fan) => `You are Boss, an expert sponsorship sales rep for Peak Sports MGMT. Your goal is to sell corporate sponsorship packages to local businesses, regional brands, and corporate partners.

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
    initial: (fan) => `Good afternoon ${fan.name.split(' ')[0]}. We're opening Club Level suites for the next home stand. As a ${fan.loyaltyTier} member, you have priority access.`,
    systemPrompt: (fan) => `You are Boss, a premium hospitality sales rep for Peak Sports MGMT. Your goal is to sell Club Level suites and VIP hospitality experiences.

Contact: ${fan.name}, loyalty tier: ${fan.loyaltyTier} — they have priority access.

Suite packages include all-inclusive food and beverage, private seating for 10-20 guests, dedicated entry, and parking. Use the inventory database to check Club Level (price >= 150) and Press Box availability. Emphasize exclusivity, the premium experience, and corporate entertainment value. Ask how many guests they're planning for. Close toward a deposit. Keep tone warm but elevated.`
  },
  ALUMNI: {
    title: "Alumni Outreach",
    sub: "Class reunion · Group seating",
    icon: <Users size={20} />,
    initial: (fan) => `Hi ${fan.name.split(' ')[0]}! 🎓 We have a reunion block reserved for your class. Ready to lock in your pass?`,
    systemPrompt: (fan) => `You are Boss, an alumni relations and group sales rep for Peak Sports MGMT. Your goal is to sell group ticket packages and alumni reunion blocks.

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

    /* ── LAYOUT SHELL (Tailwind-independent — fixes md: breakpoint failures) ── */
    html, body, #root { height: 100%; margin: 0; }
    .app-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      overflow-x: hidden;
    }
    .sidebar-panel {
      width: 100%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 20;
    }
    .sidebar-nav-inner {
      display: flex;
      flex-direction: row;
      gap: 4px;
      padding: 8px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .sidebar-nav-inner::-webkit-scrollbar { display: none; }
    .content-panel {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      min-height: 0;
    }
    .sys-status-block { display: none; }

    /* ── SALES AGENT layout ── */
    .sales-agent-layout { flex-direction: column !important; }
    @media (min-width: 1024px) {
      .sales-agent-layout { flex-direction: row !important; align-items: flex-start !important; }
    }

    @media (min-width: 768px) {
      .app-shell { flex-direction: row; }
      .sidebar-panel { width: 288px; min-height: 100vh; }
      .sidebar-nav-inner {
        flex-direction: column;
        flex: 1;
        overflow-x: visible;
        overflow-y: auto;
        padding: 16px;
      }
      .content-panel { padding: 40px; }
      .sys-status-block { display: block; padding: 16px; }
    }
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
        <text x={cx} y={cy-6} fill="rgba(255,255,255,0.13)" fontSize="9" fontWeight="black" textAnchor="middle" letterSpacing="2">GIBBS</text>
        <text x={cx} y={cy+7} fill="rgba(255,255,255,0.13)" fontSize="9" fontWeight="black" textAnchor="middle" letterSpacing="2">STADIUM</text>
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
    onTransaction({ fanName: "Cara Holloway", campaign: "Direct Purchase", amount: total, fromTicketHub: true });
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
    <div className="relative w-full flex flex-col shrink-0"
      style={{
        maxWidth: '360px',
        height: 'min(740px, 80vh)',
        minHeight: '520px',
        borderRadius: '48px',
        border: '10px solid #100b04',
        background: '#1a1208',
        overflow: 'hidden',
        boxShadow: '0 40px 80px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
      {/* Notch */}
      <div style={{position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:'96px', height:'20px', borderRadius:'0 0 24px 24px', background:'#180f07', zIndex:40}}/>

      {/* Header */}
      <div className="pb-4 px-5 border-b border-white/5" style={{background:'rgba(26,18,8,0.97)', paddingTop:'28px'}}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{background:'rgba(136,110,76,0.1)', border:'1px solid rgba(136,110,76,0.25)'}}>
              <Zap size={20} style={{color:C.lime}}/>
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
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mr-2 shrink-0 mt-1 shadow-md overflow-hidden" style={{background:C.greenMid}}>
                <img src={BOSS_LOGO} alt="Boss" style={{width:'28px',height:'28px',objectFit:'contain'}} />
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
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md overflow-hidden" style={{background:C.greenMid}}>
              <img src={BOSS_LOGO} alt="Boss" style={{width:'28px',height:'28px',objectFit:'contain'}} />
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
              placeholder="Message Boss..."
              className="flex-1 bg-transparent text-sm text-white outline-none"
              style={{fontFamily:'Rajdhani, sans-serif', fontWeight:600, letterSpacing:'0.02em'}}
            />
            <button onClick={handleSend}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
              style={{background:C.lime}}>
              <Send size={15} style={{color:C.greenMid}}/>
            </button>
          </div>
          <p className="mono-label text-center mt-2" style={{color:'rgba(255,255,255,0.18)', fontSize:'8px'}}>Boss · Wofford Terriers</p>
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

  // ── ADMINISTRATION ────────────────────────────────────────────────────────
  { id:1,  name:'Nayef Samhat',               school:'Wofford College', title:'President',                        tier:'Platinum', email:'samhatnr@wofford.edu',    phone:'(864) 597-4010', lastContact:'5 days ago',  status:'hot',  spend:0, tags:['Administration','Transitioning','Time-Sensitive'],    notes:'President since 2013. Leading $470M Drive for 5 campaign. Stepping down end of 2025-26 year. Prime outreach window.' },
  { id:2,  name:'Christopher A.P. Carpenter', school:'Wofford College', title:'Board of Trustees Chairman',       tier:'Platinum', email:'carpenter@wofford.edu',   phone:'(864) 597-4011', lastContact:'12 days ago', status:'warm', spend:0, tags:['Administration','Alumni','Board','Decision Maker'],    notes:"Class of 1990 alumnus. Overseeing search for Wofford's 12th president." },
  { id:3,  name:'Timothy Schmitz',            school:'Wofford College', title:'Willimon Family Provost',          tier:'Gold',     email:'schmitzta@wofford.edu',   phone:'(864) 597-4012', lastContact:'18 days ago', status:'warm', spend:0, tags:['Administration','Academic','Long-Tenured'],            notes:'At Wofford since 2000. Key academic decision-maker.' },
  { id:4,  name:'Calhoun L. Kennedy Jr.',     school:'Wofford College', title:'VP for Philanthropy & Engagement', tier:'Gold',     email:'kennedycl@wofford.edu',   phone:'(864) 597-4013', lastContact:'8 days ago',  status:'hot',  spend:0, tags:['Administration','Philanthropy','Sponsorship','Drive for 5'], notes:'Primary contact for sponsorships and the $470M Drive for 5 campaign.' },

  // ── ATHLETICS ─────────────────────────────────────────────────────────────
  { id:5,  name:'Shawn Watson',               school:'Wofford College', title:'Head Football Coach',              tier:'Gold',     email:'watsonsc@wofford.edu',    phone:'(864) 597-4020', lastContact:'3 days ago',  status:'hot',  spend:0, tags:['Athletics','Football','Coach','Year 3'],                notes:'Entering 3rd season. 6-6 record in 2025. Gibbs Stadium demand tied to team performance.' },
  { id:6,  name:'Kevin Giltner',              school:'Wofford College', title:"Head Men's Basketball Coach",      tier:'Gold',     email:'giltnerkj@wofford.edu',   phone:'(864) 597-4021', lastContact:'6 days ago',  status:'hot',  spend:0, tags:['Athletics','Basketball','Coach','Alumni','New Hire'],   notes:'Class of 2012 Wofford grad. Five-time SoCon champion. Returned from Virginia Tech. High fan energy.' },

  // ── TERRIER SPORTS PROPERTIES ─────────────────────────────────────────────
  { id:7,  name:'Shawn Tyler',                school:'Wofford College', title:'Director of Sales — Terrier Sports Properties',  tier:'Gold',     email:'shawn@terriersportsproperties.com', phone:'(864) 597-4000', lastContact:'2 days ago',  status:'hot',  spend:0, tags:['Sponsor','Key Contact','Peak Sports'] },
  { id:8,  name:'Devin Foster',               school:'Wofford College', title:'Ticketing — Terrier Sports Properties',           tier:'Gold',     email:'devin@terriersportsproperties.com', phone:'(864) 597-4001', lastContact:'2 days ago',  status:'hot',  spend:0, tags:['Ticketing','Key Contact','Peak Sports'] },
  { id:9,  name:'Scott Kull',                 school:'Wofford College', title:'Director of Athletics',            tier:'Platinum', email:'kullsr@wofford.edu',      phone:'(864) 597-4002', lastContact:'5 days ago',  status:'warm', spend:0, tags:['Admin','Decision Maker','VIP','Institutional'] },

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

const filteredContacts = filterStatus === 'all' ? contacts
    : filterStatus === 'admin' ? contacts.filter(c => c.tags.includes('Administration') || c.tags.includes('Admin'))
    : filterStatus === 'athletics' ? contacts.filter(c => c.tags.includes('Athletics') || c.tags.includes('Coach'))
    : contacts.filter(c => c.status === filterStatus);

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
            {['all','hot','warm','cold','admin','athletics'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all"
                style={filterStatus === s
                  ? { background: s==='all' ? C.green : s==='movers' ? '#0891b2' : statusColor(s), color:'white' }
                  : { background:'#F5ECD8', color:'#4a3520' }}>
                {s === 'movers' ? '📍 Movers' : s}
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
            <p className="text-slate-400 text-sm font-semibold">Boss is personalizing based on their history</p>
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
                  <span className="text-sm font-black" style={{color:C.green}}>Boss-Drafted · {campaigns.find(c=>c.id===crmCampaign)?.label}</span>
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
export default function App() {
  const [activeTab, setActiveTab] = useState('mobile');
  const [activeCampaign, setActiveCampaign] = useState('TICKETING');
  const [localTransactions, setLocalTransactions] = useState([...MOCK_DB.initialStats]);

  const addTransaction = (tx) => setLocalTransactions(prev => [{ ...tx, id:`TX_${Date.now()}` }, ...prev]);
  // Only sum ticket-type purchases (from Ticket Hub / chat) — excludes seeded sponsorship/hospitality rows
  const ticketTransactions = localTransactions.filter(tx => tx.fromTicketHub);
  const totalTicketRevenue = ticketTransactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const navItems = [
    { id:'mobile',   label:'Sales Agent',    sub:'AI Chat · CRM',    icon:<Sparkles size={22}/> },
    { id:'store',    label:'Ticket Hub',     sub:'Marketplace',      icon:<ShoppingCart size={22}/> },
    { id:'crm',      label:'CRM Outreach',   sub:'AI Emails · Leads', icon:<Mail size={22}/> },
    { id:'dash',     label:'Analytics',      sub:'Performance',      icon:<TrendingUp size={22}/> },
    { id:'insights', label:'Data Insights',  sub:'Trends · Schools', icon:<BarChart2 size={22}/> },
    { id:'arch',     label:'How It Works',   sub:'Manual vs Automated', icon:<Network size={22}/> },
  ];

  return (
    <div className="app-shell content-bg" style={{position:'relative'}}>
      <Styles/>
      
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
      </div>

      {/* ── SIDEBAR ── */}
      <div className="sidebar-panel text-white sidebar-bg">

        {/* Logo + brand — compact row on mobile, stacked on desktop */}
        <div className="flex md:flex-col items-center md:items-start gap-3 px-4 md:px-7 py-3 md:pt-8 md:pb-7" style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative w-9 h-9 md:w-11 md:h-11 flex items-center justify-center flex-shrink-0">
              <div className="absolute inset-0 rounded-xl" style={{border:'1px solid rgba(136,110,76,0.35)', background:'rgba(136,110,76,0.08)'}}/>
              <img src={BOSS_LOGO} alt="Boss" style={{width:'20px',height:'20px',objectFit:'contain',position:'relative',filter:'drop-shadow(0 0 3px rgba(136,110,76,0.6))'}} />
            </div>
            <div>
              <h1 className="futura-heading text-white" style={{fontSize:'22px', lineHeight:'1.1'}}>
                Boss<span style={{color:C.limeBright}}>.</span><span style={{color:C.lime}}>ai</span>
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
              </div>
              <p className="mono-label text-white/25" style={{fontSize:'8px'}}>Wofford Terriers · SoCon · Go Terriers 🐾</p>
            </div>
          </div>
          <div className="hidden md:block w-full mt-4 px-3 py-2.5 rounded-lg" style={{background:'rgba(136,110,76,0.05)', border:'1px solid rgba(136,110,76,0.15)'}}>
            <p className="mono-label text-white/25" style={{fontSize:'8px', marginBottom:'2px'}}>Powered By</p>
            <p className="futura-heading text-white/70" style={{fontSize:'13px'}}>Wofford College</p>
          </div>
        </div>

        {/* Nav — horizontal scroll on mobile, vertical list on desktop */}
        <nav className="sidebar-nav-inner" style={{WebkitOverflowScrolling:'touch', scrollbarWidth:'none'}}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left flex-shrink-0 ${activeTab === item.id ? 'nav-active' : ''}`}
              style={activeTab !== item.id
                ? { color:'rgba(255,255,255,0.38)', border:'1px solid transparent' }
                : { color:'white' }}>
              <span className="flex-shrink-0" style={activeTab === item.id ? {color:C.lime} : {color:'rgba(255,255,255,0.28)'}}>
                {React.cloneElement(item.icon, {size:18})}
              </span>
              <span className="futura-heading whitespace-nowrap" style={{fontSize:'14px'}}>{item.label}</span>
              {activeTab === item.id && (
                <div className="hidden md:block ml-auto flex-shrink-0" style={{width:'5px',height:'5px',borderRadius:'50%',background:C.lime,boxShadow:`0 0 8px ${C.lime}`}}/>
              )}
            </button>
          ))}
        </nav>

        {/* System status — desktop only */}
        <div className="sys-status-block">
          <div className="p-4 rounded-xl" style={{background:'rgba(136,110,76,0.04)', border:'1px solid rgba(136,110,76,0.1)'}}>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="status-dot"/>
              <span className="futura-heading text-white/45" style={{fontSize:'13px'}}>All Systems Nominal</span>
            </div>
            <p className="mono-label" style={{fontSize:'9px', color:'rgba(255,255,255,0.18)'}}>v2.5.0 · SECURE · LIVE DATA</p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content-panel">
        <div className="max-w-7xl mx-auto">

          {/* SALES AGENT */}
          {activeTab === 'mobile' && (
            <div className="fade-in sales-agent-layout" style={{display:'flex', flexDirection:'column', gap:'40px', alignItems:'center', justifyContent:'center'}}>
              <div style={{width:'100%', maxWidth:'420px', display:'flex', flexDirection:'column', gap:'24px'}}>
                <div>
                  <p className="page-label mb-2">Sales Agent</p>
                  <h2 className="futura-heading leading-tight" style={{fontSize:'clamp(34px, 5vw, 48px)', color:C.greenMid}}>Choose a<br/>Campaign</h2>
                  <p className="text-slate-500 text-base mt-3">Select a campaign type to see Ace in action with live data</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                  {Object.keys(CAMPAIGNS).map(c => (
                    <button key={c} onClick={() => setActiveCampaign(c)}
                      className="card-hover"
                      style={{
                        display:'flex', alignItems:'center', justifyContent:'space-between',
                        width:'100%', padding:'20px', borderRadius:'16px', textAlign:'left',
                        border: activeCampaign === c ? `2px solid ${C.greenMid}` : `2px solid ${C.slateLight}`,
                        background: activeCampaign === c ? C.greenMid : 'white',
                        color: activeCampaign === c ? 'white' : C.slate,
                        boxShadow: activeCampaign === c ? '0 8px 32px rgba(26,18,8,0.25)' : 'none',
                        cursor:'pointer', transition:'all 0.2s ease',
                      }}>
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={activeCampaign === c ? { background:'rgba(136,110,76,0.15)' } : { background:C.offWhite }}>
                          <span style={activeCampaign === c ? {color:C.lime} : {color:C.greenLight}}>{CAMPAIGNS[c].icon}</span>
                        </div>
                        <div>
                          <span className="futura-heading block leading-tight" style={{fontSize:'17px'}}>{CAMPAIGNS[c].title}</span>
                          <span className="text-sm mt-0.5 block" style={{color: activeCampaign === c ? 'rgba(255,255,255,0.55)' : '#94a3b8'}}>{CAMPAIGNS[c].sub}</span>
                        </div>
                      </div>
                      <ChevronRight size={20} style={{color: activeCampaign === c ? C.lime : '#cbd5e1'}}/>
                    </button>
                  ))}
                </div>

                {/* Fan card */}
                <div className="p-5 rounded-2xl border-2 data-card">
                  <p className="mono-label mb-3" style={{color:C.greenLight}}>Active Fan Profile</p>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base" style={{background:C.greenMid}}>SK</div>
                    <div>
                      <p className="futura-heading text-slate-900" style={{fontSize:'16px'}}>Scott Kull</p>
                      <p className="text-sm text-slate-400 flex items-center gap-1.5"><span style={{color:C.lime}}>★</span> Platinum · Dir. of Athletics</p>
                    </div>
                  </div>
                </div>
              </div>

              <MobileDemo campaign={activeCampaign} currentFan={MOCK_DB.fans[0]} onTransaction={addTransaction}/>
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
                    { label:'Ticket Revenue',      value:`$${(148100 + totalTicketRevenue).toLocaleString()}`, sub:'All schools · YTD', dark:true },
                    { label:'Sponsorship Revenue', value:'$188,000',  sub:'Packages closed · YTD', dark:true },
                    { label:'Tickets Sold',        value:(1640 + ticketTransactions.length).toLocaleString(), sub:'+18% vs last season' },
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
                      <p className="mono-label text-slate-400">Ticket Sales vs Sponsorship · all 6 schools · YTD</p>
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
                        <h3 className="futura-heading" style={{fontSize:'22px', color:C.greenMid}}>Tickets by School</h3>
                        <p className="mono-label text-slate-400">Total sold per program</p>
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
          {activeTab === 'insights' && <DataInsightsTab />}

          {/* CRM OUTREACH */}
          {activeTab === 'crm' && <CRMTab />}

          {/* HOW IT WORKS */}
          {activeTab === 'arch' && (
            <div className="max-w-5xl fade-in space-y-8">
              <div>
                <p className="page-label mb-2">How It Works</p>
                <h3 className="futura-heading" style={{fontSize:'clamp(32px,5vw,52px)', color:C.greenMid}}>Manual vs Automated</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-xl">See exactly what changes when AI handles the outreach — same outcome, a fraction of the effort.</p>
              </div>

              {/* Before / After comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* BEFORE */}
                <div className="rounded-2xl overflow-hidden border-2" style={{borderColor:'#e2e8f0'}}>
                  <div className="px-6 py-4 flex items-center gap-3" style={{background:'#f8fafc', borderBottom:'2px solid #e2e8f0'}}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'#fee2e2'}}>
                      <span style={{fontSize:'16px'}}>😓</span>
                    </div>
                    <div>
                      <p className="futura-heading" style={{fontSize:'16px', color:'#1e293b'}}>Before — Manual Process</p>
                      <p className="mono-label text-slate-400" style={{fontSize:'8px'}}>How reps work today</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4" style={{background:'white'}}>
                    {[
                      { step:'1', title:'Pull contact list', detail:'Export CSV from CRM, filter manually by school and status', time:'45 min', pain:true },
                      { step:'2', title:'Research each contact', detail:'Check purchase history, last contact, notes in spreadsheet', time:'2 hrs', pain:true },
                      { step:'3', title:'Write each email', detail:'Draft one by one, copy-paste template, tweak manually', time:'3 hrs', pain:true },
                      { step:'4', title:'Send & log', detail:'Send from inbox, manually log each send in CRM', time:'1 hr', pain:true },
                      { step:'5', title:'Follow up', detail:"Remember who didn't reply, write follow-ups manually", time:'2 hrs', pain:true },
                    ].map((s,i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5" style={{background:'#fee2e2', color:'#dc2626'}}>{s.step}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="futura-heading text-slate-800" style={{fontSize:'14px'}}>{s.title}</p>
                            <span className="mono-label flex-shrink-0 px-2 py-0.5 rounded-lg" style={{background:'#fee2e2', color:'#dc2626', fontSize:'8px'}}>{s.time}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{s.detail}</p>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t-2 border-dashed" style={{borderColor:'#e2e8f0'}}>
                      <div className="flex items-center justify-between">
                        <span className="futura-heading text-slate-600" style={{fontSize:'14px'}}>Total time per campaign</span>
                        <span className="futura-heading" style={{fontSize:'22px', color:'#dc2626'}}>~9 hrs</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Per school · per rep · per week</p>
                    </div>
                  </div>
                </div>

                {/* AFTER */}
                <div className="rounded-2xl overflow-hidden border-2" style={{borderColor:C.lime}}>
                  <div className="px-6 py-4 flex items-center gap-3" style={{background:C.greenMid, borderBottom:`2px solid ${C.lime}`}}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'rgba(136,110,76,0.2)'}}>
                      <span style={{fontSize:'16px'}}>⚡</span>
                    </div>
                    <div>
                      <p className="futura-heading text-white" style={{fontSize:'16px'}}>After — Boss Automated</p>
                      <p className="mono-label" style={{fontSize:'8px', color:'rgba(136,110,76,0.7)'}}>How it works with Simple Genius</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4" style={{background:'#F5F0E8'}}>
                    {[
                      { step:'1', title:'Contacts sync automatically', detail:'Ace pulls from your CRM, filters by school, status, and campaign type', time:'0 min', auto:true },
                      { step:'2', title:'AI reads every profile', detail:'Purchase history, last contact date, spend, tags — all processed instantly', time:'0 min', auto:true },
                      { step:'3', title:'Emails drafted in seconds', detail:'Personalized for every contact — name, school, history, campaign tone', time:'2 sec', auto:true },
                      { step:'4', title:'Rep reviews & approves', detail:'One click to approve. Rep stays in control — nothing sends without sign-off', time:'5 min', auto:true },
                      { step:'5', title:'Follow-ups queued automatically', detail:'Ace tracks replies and stages follow-ups based on response — or no response', time:'0 min', auto:true },
                    ].map((s,i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5" style={{background:'rgba(136,110,76,0.2)', color:C.greenMid}}>{s.step}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="futura-heading" style={{fontSize:'14px', color:C.greenMid}}>{s.title}</p>
                            <span className="mono-label flex-shrink-0 px-2 py-0.5 rounded-lg" style={{background:'rgba(136,110,76,0.15)', color:C.greenMid, fontSize:'8px'}}>{s.time}</span>
                          </div>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{color:'#3a2e1e'}}>{s.detail}</p>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t-2 border-dashed" style={{borderColor:C.lime}}>
                      <div className="flex items-center justify-between">
                        <span className="futura-heading" style={{fontSize:'14px', color:C.greenMid}}>Total time per campaign</span>
                        <span className="futura-heading" style={{fontSize:'22px', color:C.lime}}>~5 min</span>
                      </div>
                      <p className="text-xs mt-1" style={{color:'#3a2e1e'}}>Rep reviews drafts · Ace handles everything else</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI callout */}
              <div className="rounded-2xl p-6 md:p-8" style={{background:`linear-gradient(145deg, #180f07, #2a1e0e)`, border:'1px solid rgba(136,110,76,0.12)'}}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  {[
                    { label:'Time saved per rep', value:'~9 hrs/wk', sub:'Per school per campaign cycle' },
                    { label:'Emails personalized', value:'100%', sub:'Every contact, every time' },
                    { label:'Rep stays in control', value:'Always', sub:'Review & approve before send' },
                  ].map((s,i) => (
                    <div key={i}>
                      <p className="mono-label mb-2" style={{color:'rgba(255,255,255,0.35)', fontSize:'9px'}}>{s.label}</p>
                      <p className="futura-heading" style={{fontSize:'clamp(24px,3vw,36px)', color:C.lime}}>{s.value}</p>
                      <p className="mono-label mt-1" style={{color:'rgba(136,110,76,0.5)', fontSize:'8px'}}>{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flow diagram */}
              <div className="data-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Network size={20} style={{color:C.gold}}/>
                  <p className="futura-heading" style={{fontSize:'20px', color:C.greenMid}}>The Automation Chain</p>
                </div>
                <div className="flex flex-col md:flex-row items-stretch gap-3">
                  {[
                    { step:'01', label:'CRM Data', sub:'Contacts, history, status', icon:<Database size={16}/>, color:C.greenMid },
                    { step:'02', label:'Boss AI', sub:'Reads profile, drafts email', icon:<Zap size={16}/>, color:C.lime },
                    { step:'03', label:'Rep Reviews', sub:'Approve, edit, or skip', icon:<Users size={16}/>, color:'#3b82f6' },
                    { step:'04', label:'Email Sends', sub:'Logged back to CRM', icon:<Mail size={16}/>, color:'#e07b2a' },
                    { step:'05', label:'Results Tracked', sub:'Opens, replies, revenue', icon:<TrendingUp size={16}/>, color:'#8b5cf6' },
                  ].map((s, i, arr) => (
                    <React.Fragment key={i}>
                      <div className="flex-1 rounded-xl p-4 text-center border" style={{borderColor:C.slateLight}}>
                        <p className="mono-label mb-2" style={{color:s.color, fontSize:'8px'}}>{s.step}</p>
                        <div className="flex justify-center mb-2" style={{color:s.color}}>{s.icon}</div>
                        <p className="futura-heading" style={{fontSize:'13px', color:C.greenMid}}>{s.label}</p>
                        <p className="mt-1" style={{fontSize:'10px', color:'#94a3b8'}}>{s.sub}</p>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="hidden md:flex items-center justify-center flex-shrink-0" style={{color:'#cbd5e1'}}>
                          <ChevronRight size={18}/>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          )}

        </div>
      </div>
    </div>
  );
}
