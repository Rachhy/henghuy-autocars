import { useState, useEffect } from "react";

// Backend URL. Empty string in dev = use Vite proxy. In production, set
// VITE_API_URL on Vercel to the Railway backend URL.
const API_URL = import.meta.env.VITE_API_URL || "";
const api = (path) => `${API_URL}${path}`;

// Breakpoint for "mobile" — under this width, we stack 2-col layouts into 1 col.
const MOBILE_BREAKPOINT = 768;
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
};

// ─── DATA ───────────────────────────────────────────────────────────────────
const INITIAL_CARS = [
  { id:1, brand:"Rolls-Royce", model:"Cullinan", year:2023, price:750000, mileage:3500, color:"Black", engine:"6.75L Twin-Turbo V12", power:"563 hp", transmission:"8-speed auto", top_speed:"250 km/h", accel:"5.2s", status:"active", featured:true, badge:"Hot New", emoji:"⚫", desc:"The world's most extraordinary SUV. The Cullinan combines all-terrain capability with Rolls-Royce's signature 'magic carpet ride' — the ultimate statement of luxury for the modern explorer." },
  { id:2, brand:"Mercedes-Benz", model:"GLS 600 Maybach", year:2023, price:385000, mileage:8200, color:"Obsidian Black", engine:"4.0L V8 Biturbo + EQ Boost", power:"550 hp", transmission:"9-speed auto", top_speed:"250 km/h", accel:"4.9s", status:"active", featured:true, badge:"Featured", emoji:"⚫", desc:"The pinnacle of Maybach craftsmanship in SUV form. Hand-finished interior, executive rear seating with massage and reclining function — first-class travel on every road." },
  { id:3, brand:"Toyota", model:"Land Cruiser GR Sport", year:2022, price:190000, mileage:14500, color:"Pearl White", engine:"3.5L Twin-Turbo V6", power:"409 hp", transmission:"10-speed auto", top_speed:"210 km/h", accel:"6.7s", status:"active", featured:true, badge:"Hot New", emoji:"⚪", desc:"The GR Sport brings rally-bred DNA to the legendary Land Cruiser 300. Reinforced chassis, sport-tuned suspension, and aggressive styling — the most capable Land Cruiser ever built." },
  { id:4, brand:"Toyota", model:"Alphard Hybrid Executive", year:2023, price:115000, mileage:5200, color:"Pearl White", engine:"2.5L Hybrid", power:"247 hp combined", transmission:"e-CVT", top_speed:"180 km/h", accel:"8.3s", status:"active", featured:true, badge:"New", emoji:"⚪", desc:"Cambodia's most coveted executive MPV. Captain's chairs, ottoman footrests, panoramic moonroof, and Toyota's seamless hybrid powertrain — luxury seven-seater perfection." },
  { id:5, brand:"Toyota", model:"Land Cruiser VXR", year:2023, price:180000, mileage:6800, color:"Black", engine:"3.5L Twin-Turbo V6", power:"409 hp", transmission:"10-speed auto", top_speed:"210 km/h", accel:"6.9s", status:"active", featured:false, badge:"New", emoji:"⚫", desc:"The flagship Land Cruiser 300 in VXR specification. Full leather, rear entertainment, JBL premium audio, and Toyota's bulletproof reliability — the SUV that goes anywhere." },
  { id:6, brand:"Lexus", model:"LX 600 Ultra Luxury", year:2023, price:245000, mileage:4100, color:"Silver", engine:"3.4L Twin-Turbo V6", power:"409 hp", transmission:"10-speed auto", top_speed:"210 km/h", accel:"6.9s", status:"active", featured:false, badge:"New", emoji:"⚪", desc:"Lexus's flagship SUV in Ultra Luxury trim. Four-seat configuration with rear executive lounge, semi-aniline leather, and 25-speaker Mark Levinson audio." },
  { id:7, brand:"Bentley", model:"Bentayga Azure V8", year:2023, price:450000, mileage:1800, color:"British Racing Green", engine:"4.0L Twin-Turbo V8", power:"542 hp", transmission:"8-speed auto", top_speed:"290 km/h", accel:"4.5s", status:"active", featured:false, badge:"Hot New", emoji:"🟢", desc:"The wellbeing-focused Bentayga Azure. Hand-stitched leather, diamond-quilted seats with massage, and an interior crafted over 130 hours by Crewe's master artisans." },
  { id:8, brand:"Land Rover", model:"Range Rover Autobiography", year:2023, price:295000, mileage:7400, color:"Santorini Black", engine:"4.4L Twin-Turbo V8", power:"523 hp", transmission:"8-speed auto", top_speed:"250 km/h", accel:"4.4s", status:"reserved", featured:false, badge:"Reserved", emoji:"⚫", desc:"The fifth-generation Range Rover in flagship Autobiography trim. Executive rear seating, refrigerated centre console, and the unrivalled blend of off-road capability with limousine refinement." },
  { id:9, brand:"Porsche", model:"Cayenne Turbo GT", year:2023, price:225000, mileage:9800, color:"Arctic Grey", engine:"4.0L Twin-Turbo V8", power:"650 hp", transmission:"8-speed Tiptronic", top_speed:"300 km/h", accel:"3.3s", status:"active", featured:false, badge:"", emoji:"⚪", desc:"The fastest SUV around the Nürburgring. Carbon-fibre roof, race-tuned chassis, and a 4.0L twin-turbo V8 delivering 650 hp — a sports car in SUV clothing." },
  { id:10, brand:"Toyota", model:"Granvia Premium 6-Seat", year:2023, price:135000, mileage:3300, color:"Pearl White", engine:"2.8L Turbo Diesel", power:"174 hp", transmission:"6-speed auto", top_speed:"175 km/h", accel:"10.5s", status:"active", featured:false, badge:"New", emoji:"⚪", desc:"The Granvia Premium in six-seat configuration. Captain's chairs throughout, generous luggage capacity, and Toyota's renowned reliability — the choice for executives and families alike." },
];

const BRANDS = [...new Set(INITIAL_CARS.map(c => c.brand))];

// ─── STYLES ─────────────────────────────────────────────────────────────────
const G = {
  // palette
  white:   "#FFFFFF",
  bg:      "#FAFAF7",
  bg2:     "#F2EFE6",
  border:  "#E6E2D6",
  border2: "#0A0A0A",
  text:    "#000000",
  textMid: "#000000",
  textSub: "#000000",
  accent:  "#C8923D",
  accentDark: "#8A6A2A",
  // typography
  sans:    "'Inter', 'Helvetica Neue', sans-serif",
  serif:   "'Fraunces', 'Playfair Display', Georgia, serif",
  // shape
  radius:  "12px",
  radiusLg:"20px",
  radiusPill:"999px",
  shadow:  "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
  shadowHover:"0 12px 32px rgba(0,0,0,0.10)",
};

const injectStyles = () => {
  if (document.getElementById("aurum-styles")) return;
  const s = document.createElement("style");
  s.id = "aurum-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:${G.bg};color:${G.text};font-family:${G.sans};font-size:15px;line-height:1.6;font-weight:450;-webkit-font-smoothing:antialiased;letter-spacing:-0.005em}
    button{cursor:pointer;font-family:${G.sans};font-size:14px;font-weight:500}
    input,select,textarea{font-family:${G.sans};font-size:14px;color:${G.text}}
    input:focus,select:focus,textarea:focus{border-color:${G.text} !important;box-shadow:0 0 0 3px rgba(0,0,0,0.06) !important}
    p,div,span,li,td,th,label{color:inherit}
    ::-webkit-scrollbar{width:10px;height:10px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:#D0CCC0;border-radius:10px;border:2px solid ${G.bg}}
    ::-webkit-scrollbar-thumb:hover{background:#A8A399}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    .fade-up{animation:fadeUp .45s cubic-bezier(0.22,1,0.36,1) both}
    .fade-in{animation:fadeIn .3s ease}
  `;
  document.head.appendChild(s);
};

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
const Tag = ({ children, style }) => (
  <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.02em", background:G.bg2, color:G.text, padding:"5px 12px", borderRadius:G.radiusPill, display:"inline-block", ...style }}>
    {children}
  </span>
);

const Btn = ({ children, onClick, variant="primary", style, full }) => {
  const base = { border:"none", padding:"12px 26px", fontSize:14, fontWeight:600, letterSpacing:"-0.01em", transition:"transform 0.15s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s, background 0.2s", cursor:"pointer", width: full ? "100%" : "auto", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, borderRadius:G.radiusPill };
  const variants = {
    primary:  { background:G.text, color:G.white, boxShadow:"0 2px 8px rgba(0,0,0,0.12)" },
    outline:  { background:G.white, color:G.text, border:`1.5px solid ${G.text}` },
    ghost:    { background:"transparent", color:G.text, border:"none", padding:"10px 18px" },
  };
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}
    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; if(variant==="primary") e.currentTarget.style.boxShadow="0 6px 18px rgba(0,0,0,0.18)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; if(variant==="primary") e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.12)"; }}>
    {children}
  </button>;
};

const Divider = ({ style }) => <div style={{ height:1, background:G.border, ...style }} />;

const Label = ({ children }) => (
  <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:G.text, marginBottom:10 }}>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom:18 }}>
    {label && <Label>{label}</Label>}
    <input style={{ width:"100%", background:G.white, border:`1.5px solid ${G.border}`, color:G.text, padding:"12px 14px", outline:"none", fontSize:14, borderRadius:10, transition:"border-color 0.15s" }} {...props} />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div style={{ marginBottom:18 }}>
    {label && <Label>{label}</Label>}
    <select style={{ width:"100%", background:G.white, border:`1.5px solid ${G.border}`, color:G.text, padding:"12px 14px", outline:"none", fontSize:14, borderRadius:10, appearance:"none", cursor:"pointer" }} {...props}>{children}</select>
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div style={{ marginBottom:18 }}>
    {label && <Label>{label}</Label>}
    <textarea style={{ width:"100%", background:G.white, border:`1.5px solid ${G.border}`, color:G.text, padding:"12px 14px", outline:"none", fontSize:14, resize:"vertical", minHeight:100, borderRadius:10, fontFamily:G.sans }} {...props} />
  </div>
);

// ─── TOAST ───────────────────────────────────────────────────────────────────
const Toast = ({ toast }) => (
  <div style={{ position:"fixed", bottom:24, right:24, zIndex:999, background:G.text, color:G.white, padding:"14px 20px", minWidth:260, borderRadius:14, transform: toast ? "translateX(0)" : "translateX(140%)", transition:"transform 0.35s cubic-bezier(0.22,1,0.36,1)", boxShadow:"0 12px 32px rgba(0,0,0,0.20)" }}>
    <div style={{ fontSize:14, fontWeight:600, marginBottom:2 }}>{toast?.title}</div>
    <div style={{ fontSize:13, opacity:0.75 }}>{toast?.msg}</div>
  </div>
);

// ─── MODAL ───────────────────────────────────────────────────────────────────
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className="fade-in" style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.40)", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:G.white, borderRadius:G.radiusLg, width:"100%", maxWidth:480, padding:"2.25rem", position:"relative", boxShadow:"0 24px 64px rgba(0,0,0,0.20)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:18, right:18, background:G.bg2, border:"none", fontSize:14, color:G.text, cursor:"pointer", lineHeight:1, width:34, height:34, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        {children}
      </div>
    </div>
  );
};

// ─── CAR CARD ────────────────────────────────────────────────────────────────
const CarCard = ({ car, onView, onFav, isFav }) => (
  <div className="fade-up" onClick={() => onView(car.id)} style={{ background:G.white, borderRadius:G.radiusLg, cursor:"pointer", transition:"transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s", position:"relative", overflow:"hidden", boxShadow:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)" }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow=G.shadowHover; e.currentTarget.style.transform="translateY(-4px)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"; e.currentTarget.style.transform="translateY(0)"; }}>
    {/* Image area */}
    <div style={{ background:`linear-gradient(135deg, ${G.bg2} 0%, #9c9c98 100%)`, height:220, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"5.5rem", position:"relative", overflow:"hidden" }}>
      {car.images && car.images[0]
        ? <img src={car.images[0]} alt={`${car.brand} ${car.model}`} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        : car.emoji}
      {car.badge && <Tag style={{ position:"absolute", top:14, left:14, background:G.text, color:G.white }}>{car.badge}</Tag>}
      <button onClick={e => { e.stopPropagation(); onFav(car.id); }} style={{ position:"absolute", top:12, right:12, background:isFav ? G.text : G.white, border:"none", width:38, height:38, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, cursor:"pointer", transition:"all 0.15s", color: isFav ? G.white : G.text, boxShadow:"0 2px 8px rgba(0,0,0,0.10)" }}>
        {isFav ? "♥" : "♡"}
      </button>
    </div>
    {/* Info */}
    <div style={{ padding:"20px 22px" }}>
      <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:G.text, marginBottom:6, opacity:0.65 }}>{car.brand}</div>
      <div style={{ fontFamily:G.serif, fontSize:"1.4rem", fontWeight:500, marginBottom:12, letterSpacing:"-0.01em" }}>{car.model}</div>
      <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
        {[car.year, `${car.mileage.toLocaleString()} km`, car.power].map((s,i) => <span key={i} style={{ fontSize:12, fontWeight:500, color:G.text, background:G.bg2, padding:"4px 10px", borderRadius:G.radiusPill }}>{s}</span>)}
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:14, borderTop:`1px solid ${G.border}` }}>
        <div style={{ fontFamily:G.serif, fontSize:"1.4rem", fontWeight:500 }}>${car.price.toLocaleString()}</div>
        <span style={{ fontSize:13, color:G.text, fontWeight:600 }}>View →</span>
      </div>
    </div>
  </div>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────
const Nav = ({ page, setPage, user, favorites }) => {
  const isMobile = useIsMobile();
  const links = [
    { label: isMobile ? "Cars" : "Collection", page:"inventory" },
    { label:"About", page:"about" },
    { label:"Contact", page:"contact" },
  ];
  const navBtn = (active) => ({ background: active ? G.text : "transparent", border:"none", fontSize: isMobile ? 11 : 13, color: active ? G.white : G.text, padding: isMobile ? "6px 9px" : "8px 16px", fontWeight:500, cursor:"pointer", borderRadius:G.radiusPill, transition:"background 0.15s, color 0.15s", whiteSpace:"nowrap" });
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:"rgba(248, 248, 243, 0.85)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", borderBottom:`1px solid ${G.border}`, padding: isMobile ? "0 1rem" : "0 2.5rem", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div onClick={() => setPage("home")} style={{ fontFamily:G.serif, fontSize: isMobile ? "1.1rem" : "1.5rem", fontWeight:500, letterSpacing:"-0.01em", cursor:"pointer", whiteSpace:"nowrap" }}>
        {isMobile ? "HengHuy" : <>HengHuy <span style={{ color:G.accent }}>AutoCars</span></>}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap: isMobile ? 2 : 4 }}>
        {links.map(l => (
          <button key={l.page} onClick={() => setPage(l.page)} style={navBtn(page === l.page)}>
            {l.label}
          </button>
        ))}
        {user ? (
          <>
            <button onClick={() => setPage("profile")} style={navBtn(page === "profile")}>
              Account{!isMobile && favorites.length > 0 && <span style={{ background: page==="profile"?G.white:G.text, color: page==="profile"?G.text:G.white, fontSize:10, fontWeight:600, padding:"2px 7px", marginLeft:6, borderRadius:999 }}>{favorites.length}</span>}
            </button>
            {user.isAdmin && <button onClick={() => setPage("admin")} style={navBtn(page === "admin")}>Admin</button>}
          </>
        ) : (
          <Btn variant="outline" onClick={() => setPage("auth")} style={{ fontSize: isMobile ? 11 : 13, padding: isMobile ? "6px 12px" : "8px 20px", marginLeft: isMobile ? 4 : 8 }}>Sign In</Btn>
        )}
      </div>
    </nav>
  );
};

// ─── FOOTER ──────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => {
  const isMobile = useIsMobile();
  return (
  <footer style={{ background:G.white, borderTop:`1px solid ${G.border}`, padding: isMobile ? "2.5rem 1.25rem 1.5rem" : "3rem 2.5rem 2rem", marginTop:60 }}>
    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? "1.5rem" : "2rem", maxWidth:1100, margin:"0 auto", paddingBottom:"2rem" }}>
      <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
        <div style={{ fontFamily:G.serif, fontSize:"1.2rem", marginBottom:8 }}>HengHuy AutoCars</div>
        <div style={{ fontSize:12, color:G.textMid, lineHeight:1.9, maxWidth:240 }}>Cambodia's trusted dealership for luxury &amp; premium vehicles. Buy &amp; sell with confidence in Phnom Penh.</div>
      </div>
      {[["Collection", [["All Vehicles","inventory"],["New Arrivals","inventory"],["Featured","inventory"]]],["Services",[["Private Viewing","contact"],["Financing","contact"],["Consignment","contact"]]],["Company",[["Our Story","about"],["Contact","contact"],["Sign In","auth"]]]].map(([title, items]) => (
        <div key={title}>
          <Label>{title}</Label>
          {items.map(([label, pg]) => <div key={label} onClick={() => setPage(pg)} style={{ fontSize:12, color:G.textMid, marginBottom:6, cursor:"pointer" }}>{label}</div>)}
        </div>
      ))}
    </div>
    <Divider />
    <div style={{ maxWidth:1100, margin:"1.25rem auto 0", display:"flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 6 : 0, justifyContent:"space-between", fontSize:11, color:G.textSub }}>
      <span>© 2026 HengHuy AutoCars. All rights reserved.</span>
      <span>Phnom Penh, Cambodia</span>
    </div>
  </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════════════════

// ─── HOME ────────────────────────────────────────────────────────────────────
const HomePage = ({ cars, setPage, favorites, toggleFav, showToast, user }) => {
  const isMobile = useIsMobile();
  const featured = cars.filter(c => c.featured && c.status === "active");
  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: isMobile ? "auto" : "90vh", display:"flex", alignItems:"center", padding: isMobile ? "3rem 1.25rem" : "0 2.5rem", borderBottom:`1px solid ${G.border}`, background:G.white }}>
        <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "4rem", alignItems:"center" }}>
          <div className="fade-up">
            <Tag style={{ marginBottom:20 }}>Phnom Penh · Cambodia</Tag>
            <h1 style={{ fontFamily:G.serif, fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:500, color:G.text, lineHeight:1.1, marginBottom:20 }}>
              Luxury &amp;<br /><em>Premium Cars,</em><br />Delivered in Cambodia
            </h1>
            <p style={{ color:G.textMid, maxWidth:420, lineHeight:1.9, marginBottom:32, fontSize:13 }}>
              From Toyota Land Cruisers to Rolls-Royce Cullinans — every vehicle inspected, certified, and backed by HengHuy's industry-leading guarantee. 100% installment available.
            </p>
            <div style={{ display:"flex", gap:12 }}>
              <Btn onClick={() => setPage("inventory")}>Browse Collection</Btn>
              <Btn variant="outline" onClick={() => setPage("contact")}>Call 092 9999 89</Btn>
            </div>
          </div>
          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:G.border }}>
            {[["350+","Happy Buyers"],["14","Brands Stocked"],["24/7","Support Line"],["100%","Installment"]].map(([n,l]) => (
              <div key={l} style={{ background:G.bg, padding:"2rem", textAlign:"center" }}>
                <div style={{ fontFamily:G.serif, fontSize:"2.5rem", marginBottom:4 }}>{n}</div>
                <div style={{ fontSize:11, color:G.textSub, letterSpacing:"0.1em", textTransform:"uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section style={{ background:G.bg2, borderBottom:`1px solid ${G.border}`, padding: isMobile ? "1rem 1.25rem" : "1rem 2.5rem", display:"flex", gap: isMobile ? "1.25rem" : "2rem", alignItems:"center", overflowX:"auto" }}>
        <Label style={{ marginBottom:0, whiteSpace:"nowrap" }}>Our Brands</Label>
        {BRANDS.map(b => <span key={b} style={{ fontSize:12, color:G.textMid, whiteSpace:"nowrap", cursor:"pointer", letterSpacing:"0.05em" }} onClick={() => setPage("inventory")}>{b}</span>)}
      </section>

      {/* Featured */}
      <section style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "3rem 1.25rem" : "4rem 2.5rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"2rem", flexWrap:"wrap", gap:12 }}>
          <div>
            <Label>Curated Selection</Label>
            <h2 style={{ fontFamily:G.serif, fontSize: isMobile ? "1.6rem" : "2rem", fontWeight:500, color:G.text }}>Featured <em>Automobiles</em></h2>
          </div>
          <span onClick={() => setPage("inventory")} style={{ fontSize:12, color:G.textMid, textDecoration:"underline", cursor:"pointer" }}>View all →</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap: isMobile ? 18 : 24 }}>
          {featured.map(car => <CarCard key={car.id} car={car} onView={id => setPage("detail", id)} isFav={favorites.includes(car.id)} onFav={id => { if(!user){showToast("Sign in","Please sign in to save favourites.");return;} toggleFav(id); }} />)}
        </div>
      </section>

      {/* Why us */}
      <section style={{ background:G.white, borderTop:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border}`, padding: isMobile ? "3rem 1.25rem" : "4rem 2.5rem" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <Label style={{ marginBottom:8 }}>Why HengHuy</Label>
          <h2 style={{ fontFamily:G.serif, fontSize: isMobile ? "1.6rem" : "2rem", fontWeight:500, color:G.text, marginBottom: isMobile ? "1.75rem" : "2.5rem" }}>The HengHuy <em>Difference</em></h2>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap:0, background:G.border }}>
            {[["Free Accessories","Complimentary accessories on every purchase over $20,000"],["30-Day Return","Drive with confidence — return within 30 days if not satisfied"],["100% Installment","Flexible monthly installment plans on every vehicle in stock"],["24/7 Support","Our team is on call around the clock — 092 9999 89 anytime"]].map(([title,desc]) => (
              <div key={title} style={{ background:G.white, padding:"2rem", borderBottom:"none" }}>
                <div style={{ fontFamily:G.serif, fontSize:"1.1rem", marginBottom:8 }}>{title}</div>
                <div style={{ fontSize:12, color:G.textMid, lineHeight:1.8 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? "3.5rem 1.25rem" : "5rem 2.5rem", textAlign:"center" }}>
        <Label style={{ marginBottom:12 }}>Private Consultation</Label>
        <h2 style={{ fontFamily:G.serif, fontSize: isMobile ? "1.8rem" : "2.5rem", fontWeight:500, color:G.text, marginBottom:12 }}>Ready to Find Your <em>Perfect Car?</em></h2>
        <p style={{ color:G.textMid, fontSize:13, maxWidth:440, margin:"0 auto 28px" }}>Visit our Phnom Penh showroom or call 092 9999 89 — our team is ready to help you find the right car today.</p>
        <Btn onClick={() => setPage("contact")}>Visit the Showroom</Btn>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
};

// ─── INVENTORY ───────────────────────────────────────────────────────────────
const InventoryPage = ({ cars, setPage, favorites, toggleFav, showToast, user }) => {
  const isMobile = useIsMobile();
  const [filters, setFilters] = useState({ brand:"", minPrice:"", maxPrice:"", year:"", sort:"featured" });
  const F = (k,v) => setFilters(f => ({ ...f, [k]:v }));

  let filtered = cars.filter(c => c.status !== "sold");
  if (filters.brand) filtered = filtered.filter(c => c.brand === filters.brand);
  if (filters.year)  filtered = filtered.filter(c => c.year === parseInt(filters.year));
  if (filters.minPrice) filtered = filtered.filter(c => c.price >= parseInt(filters.minPrice));
  if (filters.maxPrice) filtered = filtered.filter(c => c.price <= parseInt(filters.maxPrice));
  if (filters.sort === "price-asc")  filtered.sort((a,b) => a.price - b.price);
  else if (filters.sort === "price-desc") filtered.sort((a,b) => b.price - a.price);
  else if (filters.sort === "year")  filtered.sort((a,b) => b.year - a.year);
  else filtered.sort((a,b) => (b.featured ? 1:0) - (a.featured ? 1:0));

  const sel = { background:G.white, border:`1px solid ${G.border}`, color:G.text, padding:"8px 12px", fontSize:12, outline:"none", appearance:"none", width:"100%" };

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding: isMobile ? "1.5rem 1.25rem" : "2rem 2.5rem" }}>
      <Label>Our Collection</Label>
      <h1 style={{ fontFamily:G.serif, fontSize: isMobile ? "1.8rem" : "2.5rem", fontWeight:500, color:G.text, marginBottom: isMobile ? "1.25rem" : "2rem" }}>Available <em style={{ color:G.text }}>Automobiles</em></h1>

      {/* Filters */}
      <div style={{ background:G.white, border:`1px solid ${G.border}`, padding:"1.25rem 1.5rem", marginBottom:"2rem", display:"flex", flexWrap:"wrap", gap:"1rem", alignItems:"flex-end" }}>
        {[["Brand", "brand", [["","All Brands"],...BRANDS.map(b=>[b,b])]], ["Year","year",[["","Any Year"],["2024","2024"],["2023","2023"]]], ["Sort","sort",[["featured","Featured First"],["price-asc","Price ↑"],["price-desc","Price ↓"],["year","Newest"]]]].map(([label, key, opts]) => (
          <div key={key} style={{ display:"flex", flexDirection:"column", gap:4 }}>
            <Label>{label}</Label>
            <select value={filters[key]} onChange={e => F(key, e.target.value)} style={sel}>
              {opts.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        ))}
        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
          <Label>Min Price ($)</Label>
          <input value={filters.minPrice} onChange={e => F("minPrice", e.target.value)} placeholder="0" type="number" style={{ ...sel, width:120 }} />
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
          <Label>Max Price ($)</Label>
          <input value={filters.maxPrice} onChange={e => F("maxPrice", e.target.value)} placeholder="800,000" type="number" style={{ ...sel, width:120 }} />
        </div>
        <button onClick={() => setFilters({ brand:"", minPrice:"", maxPrice:"", year:"", sort:"featured" })} style={{ background:"none", border:`1px solid ${G.border2}`, color:G.textMid, padding:"8px 16px", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer" }}>Reset</button>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"flex-end", gap:6 }}>
          <span style={{ fontFamily:G.serif, fontSize:"2rem" }}>{filtered.length}</span>
          <span style={{ fontSize:11, color:G.textSub, paddingBottom:4 }}>cars found</span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length ? (
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap: isMobile ? 18 : 24 }}>
          {filtered.map(car => <CarCard key={car.id} car={car} onView={id => setPage("detail", id)} isFav={favorites.includes(car.id)} onFav={id => { if(!user){showToast("Sign in","Please sign in to save favourites.");return;} toggleFav(id); }} />)}
        </div>
      ) : (
        <div style={{ padding:"4rem", textAlign:"center", color:G.textMid, fontFamily:G.serif, fontSize:"1.5rem" }}>No vehicles match your criteria.</div>
      )}
      <Footer setPage={setPage} />
    </div>
  );
};

// ─── DETAIL ──────────────────────────────────────────────────────────────────
const DetailPage = ({ carId, cars, setPage, favorites, toggleFav, user, showToast, addBooking }) => {
  const isMobile = useIsMobile();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [bDate, setBDate] = useState("");
  const [bTime, setBTime] = useState("10:00 AM");
  const [activeView, setActiveView] = useState(0);
  const car = cars.find(c => c.id === carId);
  if (!car) return null;
  const isFav = favorites.includes(car.id);

  const hasUploads = car.images && car.images.length > 0;
  const views = hasUploads
    ? car.images.map((url, i) => ({ url, label: i === 0 ? "Cover" : `Photo ${i + 1}` }))
    : [
        { emoji: car.emoji, label: "Exterior" },
        { emoji: "🚗",       label: "Side Profile" },
        { emoji: "🪑",       label: "Interior" },
        { emoji: "⚙️",       label: "Engine Bay" },
        { emoji: "🛞",       label: "Wheels" },
      ];

  const confirmBooking = () => {
    addBooking({ id:Date.now(), carId:car.id, carName:`${car.brand} ${car.model}`, date:bDate||"TBD", time:bTime, status:"confirmed" });
    setBookingDone(true);
  };

  const specs = [["Engine",car.engine],["Power",car.power],["Transmission",car.transmission],["Top Speed",car.top_speed],["0–100 km/h",car.accel],["Mileage",`${car.mileage.toLocaleString()} km`],["Year",car.year],["Colour",car.color]];

  return (
    <div className="fade-in">
      {/* Back */}
      <div style={{ padding:"1rem 2.5rem", borderBottom:`1px solid ${G.border}`, background:G.white }}>
        <button onClick={() => setPage("inventory")} style={{ background:"none", border:"none", fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", color:G.textMid, cursor:"pointer" }}>← Back to Collection</button>
      </div>

      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 420px", minHeight: isMobile ? "auto" : "calc(100vh - 120px)" }}>
        {/* Gallery */}
        <div style={{ background:G.bg2, display:"flex", alignItems:"center", justifyContent:"center", fontSize: isMobile ? "5rem" : "10rem", position:"relative", overflow:"hidden", borderRight: isMobile ? "none" : `1px solid ${G.border}`, borderBottom: isMobile ? `1px solid ${G.border}` : "none", minHeight: isMobile ? 280 : "auto" }}>
          {views[activeView].url
            ? <img key={activeView} className="fade-in" src={views[activeView].url} alt={`${car.brand} ${car.model}`} style={{ maxWidth:"100%", maxHeight:"100%", width:"auto", height:"auto", objectFit:"contain", display:"block" }} />
            : <span key={activeView} className="fade-in">{views[activeView].emoji}</span>}

          {views.length > 1 && (
            <>
              <button
                onClick={() => setActiveView(v => (v - 1 + views.length) % views.length)}
                aria-label="Previous image"
                style={{ position:"absolute", left:24, top:"50%", transform:"translateY(-50%)", width:52, height:52, borderRadius:"50%", background:G.white, border:"none", color:G.text, fontSize:22, fontWeight:600, cursor:"pointer", boxShadow:"0 4px 16px rgba(0,0,0,0.12)", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1, transition:"transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-50%) scale(1.06)"; e.currentTarget.style.boxShadow="0 6px 22px rgba(0,0,0,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(-50%) scale(1)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.12)"; }}
              >‹</button>
              <button
                onClick={() => setActiveView(v => (v + 1) % views.length)}
                aria-label="Next image"
                style={{ position:"absolute", right:24, top:"50%", transform:"translateY(-50%)", width:52, height:52, borderRadius:"50%", background:G.white, border:"none", color:G.text, fontSize:22, fontWeight:600, cursor:"pointer", boxShadow:"0 4px 16px rgba(0,0,0,0.12)", display:"flex", alignItems:"center", justifyContent:"center", lineHeight:1, transition:"transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-50%) scale(1.06)"; e.currentTarget.style.boxShadow="0 6px 22px rgba(0,0,0,0.18)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(-50%) scale(1)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.12)"; }}
              >›</button>
            </>
          )}

          {views.length > 1 && (
            <div style={{ position:"absolute", top:24, right:24, background:G.white, padding:"6px 14px", borderRadius:G.radiusPill, fontSize:12, fontWeight:600, color:G.text, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
              {activeView + 1} / {views.length}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: isMobile ? "1.75rem 1.25rem" : "2.5rem", overflowY:"auto", background:G.white, display:"flex", flexDirection:"column", gap:"1.5rem" }}>
          <div>
            <Tag style={{ marginBottom:10 }}>{car.brand}</Tag>
            <div style={{ fontFamily:G.serif, fontSize: isMobile ? "1.75rem" : "2.2rem", fontWeight:500, color:G.text, lineHeight:1.1, marginBottom:4 }}>{car.model}</div>
            <div style={{ fontSize:12, color:G.textSub }}>{car.year} · {car.color}</div>
          </div>

          <div style={{ fontFamily:G.serif, fontSize: isMobile ? "1.7rem" : "2rem" }}>${car.price.toLocaleString()}</div>

          <Divider />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
            {specs.map(([l,v]) => (
              <div key={l}>
                <Label>{l}</Label>
                <div style={{ fontSize:13, fontWeight:500 }}>{v}</div>
              </div>
            ))}
          </div>

          <Divider />

          <p style={{ fontSize:13, color:G.textMid, lineHeight:1.9 }}>{car.desc}</p>

          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <Btn full onClick={() => { if(!user){showToast("Sign in","Please sign in to book a test drive.");return;} setBookingOpen(true); }}>Book a Test Drive</Btn>
            <Btn variant="outline" full onClick={() => setPage("contact")}>Request Information</Btn>
            <Btn variant="outline" full onClick={() => { if(!user){showToast("Sign in","Please sign in to save favourites.");return;} toggleFav(car.id); }} style={isFav ? {borderColor:G.text} : {}}>
              {isFav ? "♥ Saved to Favourites" : "♡ Save to Favourites"}
            </Btn>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal open={bookingOpen} onClose={() => { setBookingOpen(false); setBookingDone(false); }}>
        {bookingDone ? (
          <div style={{ textAlign:"center", padding:"1rem" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:12 }}>✓</div>
            <div style={{ fontFamily:G.serif, fontSize:"1.5rem", marginBottom:8 }}>Booking Confirmed</div>
            <div style={{ fontSize:12, color:G.textMid, marginBottom:4 }}>{car.brand} {car.model} · {bDate || "Date TBD"} at {bTime}</div>
            <div style={{ fontSize:12, color:G.textMid, marginBottom:24 }}>Our concierge will contact you shortly.</div>
            <Btn variant="outline" onClick={() => { setBookingOpen(false); setBookingDone(false); }}>Close</Btn>
          </div>
        ) : (
          <>
            <div style={{ fontFamily:G.serif, fontSize:"1.5rem", marginBottom:4 }}>Book a Test Drive</div>
            <div style={{ fontSize:12, color:G.textSub, marginBottom:20 }}>{car.brand} {car.model}</div>
            <Input label="Preferred Date" type="date" value={bDate} onChange={e => setBDate(e.target.value)} />
            <Select label="Preferred Time" value={bTime} onChange={e => setBTime(e.target.value)}>
              {["10:00 AM","11:00 AM","1:00 PM","2:00 PM","4:00 PM"].map(t => <option key={t}>{t}</option>)}
            </Select>
            <Textarea label="Notes (optional)" placeholder="Any specific requirements..." />
            <Btn full onClick={confirmBooking}>Confirm Booking</Btn>
          </>
        )}
      </Modal>

      <Footer setPage={setPage} />
    </div>
  );
};

// ─── CONTACT ─────────────────────────────────────────────────────────────────
const ContactPage = ({ setPage, showToast }) => {
  const isMobile = useIsMobile();
  const [sent, setSent] = useState(false);
  const submit = () => { setSent(true); showToast("Enquiry Sent","We'll be in touch within 24 hours."); };
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "calc(100vh - 64px)" }}>
        {/* Left */}
        <div style={{ background:G.white, padding: isMobile ? "3rem 1.25rem" : "4rem 3rem", borderRight: isMobile ? "none" : `1px solid ${G.border}`, borderBottom: isMobile ? `1px solid ${G.border}` : "none", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <Label style={{ marginBottom:12 }}>Get in Touch</Label>
          <h1 style={{ fontFamily:G.serif, fontSize:"2.5rem", fontWeight:500, color:G.text, marginBottom:16 }}>We're Here<br />to <em>Assist You</em></h1>
          <p style={{ color:G.textMid, fontSize:13, lineHeight:1.9, marginBottom:"2.5rem", maxWidth:380 }}>Whether you'd like a quote, want to arrange a viewing, or need help with financing — our team replies within 24 hours, 7 days a week.</p>
          {[["📍","Visit Us","Russian Federation Blvd (110), Sangkat Sras Chork, Khan Doun Penh, Phnom Penh"],["📞","Hotline","092 9999 89 / 061 95 5555"],["✉","Email","hh.autocars@gmail.com"],["🕐","Hours","Mon–Sun 8:00–19:00 · 24/7 hotline support"]].map(([icon,label,val]) => (
            <div key={label} style={{ display:"flex", gap:"1rem", marginBottom:"1.25rem", alignItems:"flex-start" }}>
              <div style={{ width:36, height:36, border:`1px solid ${G.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:16 }}>{icon}</div>
              <div>
                <Label>{label}</Label>
                <div style={{ fontSize:13, color:G.text }}>{val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Form */}
        <div style={{ background:G.bg, padding: isMobile ? "3rem 1.25rem" : "4rem 3rem", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <Label style={{ marginBottom:12 }}>Send a Message</Label>
          <h2 style={{ fontFamily:G.serif, fontSize: isMobile ? "1.6rem" : "2rem", fontWeight:500, color:G.text, marginBottom:"1.5rem" }}>Private Enquiry</h2>
          {sent ? (
            <div style={{ textAlign:"center", padding:"2rem 0" }}>
              <div style={{ fontSize:"2rem", marginBottom:12 }}>✓</div>
              <div style={{ fontFamily:G.serif, fontSize:"1.4rem", marginBottom:8 }}>Message Received</div>
              <div style={{ fontSize:12, color:G.textMid }}>Our team will contact you within 24 hours.</div>
            </div>
          ) : (
            <>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <Input label="First Name" placeholder="Sokha" />
                <Input label="Last Name" placeholder="Chea" />
              </div>
              <Input label="Email" type="email" placeholder="you@email.com" />
              <Input label="Phone" type="tel" placeholder="+855 12 345 678" />
              <Select label="I Am Interested In">
                {["Purchasing a Vehicle","Test Drive Request","Installment Plan Enquiry","Vehicle Trade-in / Valuation","General Enquiry"].map(o => <option key={o}>{o}</option>)}
              </Select>
              <Textarea label="Your Message" placeholder="Please describe how we can assist you..." />
              <Btn full onClick={submit}>Send Enquiry</Btn>
            </>
          )}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
};

// ─── ABOUT ───────────────────────────────────────────────────────────────────
const AboutPage = ({ setPage }) => {
  const isMobile = useIsMobile();
  return (
  <div>
    {/* Hero */}
    <section style={{ background:G.white, padding: isMobile ? "3.5rem 1.25rem 3rem" : "5rem 2.5rem 4rem", borderBottom:`1px solid ${G.border}` }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Label style={{ marginBottom:12 }}>About HengHuy AutoCars</Label>
        <h1 style={{ fontFamily:G.serif, fontSize: isMobile ? "2rem" : "clamp(2.5rem,6vw,5rem)", fontWeight:500, color:G.text, maxWidth:700, lineHeight:1.1, marginBottom:20 }}>Cambodia's Trusted <em style={{ color:G.text }}>Auto Destination</em></h1>
        <p style={{ color:G.textMid, maxWidth:480, fontSize:13, lineHeight:1.9 }}>From Toyota to Rolls-Royce, HengHuy AutoCars has served Phnom Penh's most discerning buyers with honest pricing, full inspections, and the easiest installment plans in the country.</p>
      </div>
    </section>

    {/* Story + Timeline */}
    <section style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "3rem 1.25rem" : "4rem 2.5rem", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "4rem" }}>
      <div>
        <Label style={{ marginBottom:12 }}>Our Story</Label>
        <h2 style={{ fontFamily:G.serif, fontSize:"2rem", fontWeight:500, color:G.text, marginBottom:16 }}>Built on <em style={{ color:G.text }}>Trust</em></h2>
        <p style={{ color:G.textMid, fontSize:13, lineHeight:2, marginBottom:12 }}>HengHuy AutoCars was founded in Phnom Penh with a clear goal: make buying a quality vehicle in Cambodia simple, transparent, and stress-free — whether you're after a daily-driver Toyota or a Rolls-Royce.</p>
        <p style={{ color:G.textMid, fontSize:13, lineHeight:2 }}>Today we stock 14 of the world's leading brands — Toyota, Lexus, Mercedes-Benz, BMW, Porsche, Land Rover, Bentley, Rolls-Royce and more — each car inspected, priced fairly, and backed by 100% installment financing.</p>
      </div>
      <div style={{ background:G.white, border:`1px solid ${G.border}`, padding:"2rem" }}>
        <Label style={{ marginBottom:16 }}>Why Choose HengHuy</Label>
        {[["24/7","Hotline support — call us anytime"],["30 Days","Return policy on every purchase"],["100%","Installment plans available"],["$20K+","Free accessories with every premium buy"]].map(([year,event]) => (
          <div key={year} style={{ display:"flex", gap:"2rem", alignItems:"center", padding:"1rem 0", borderBottom:`1px solid ${G.border}` }}>
            <div style={{ fontFamily:G.serif, fontSize:"1.3rem", minWidth:50 }}>{year}</div>
            <div style={{ fontSize:13, color:G.textMid }}>{event}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Values */}
    <section style={{ background:G.white, borderTop:`1px solid ${G.border}`, padding: isMobile ? "3rem 1.25rem" : "4rem 2.5rem" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Label style={{ marginBottom:12 }}>Our Values</Label>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:1, background:G.border, marginTop:24 }}>
          {[["01","Integrity","We believe in complete transparency. Every vehicle comes with a full service history and an independent inspection report."],["02","Excellence","Only the finest examples make it into our collection. Our standards are uncompromising — as they should be."],["03","Discretion","Our clients value their privacy. Every enquiry and transaction is handled with the utmost confidentiality."]].map(([n,title,desc]) => (
            <div key={n} style={{ background:G.white, padding:"2rem", borderTop:`3px solid ${G.text}` }}>
              <div style={{ fontFamily:G.serif, fontSize:"2.5rem", color:G.border2, marginBottom:12 }}>{n}</div>
              <div style={{ fontFamily:G.serif, fontSize:"1.2rem", marginBottom:8 }}>{title}</div>
              <div style={{ fontSize:12, color:G.textMid, lineHeight:1.9 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer setPage={setPage} />
  </div>
  );
};

// ─── AUTH ─────────────────────────────────────────────────────────────────────
const AuthPage = ({ setUser, setPage, showToast }) => {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const login = async () => {
    if (!email || !password) { showToast("Missing fields", "Please enter email and password."); return; }
    setBusy(true);
    try {
      const res = await fetch(api("/api/auth/login"), { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ email, password }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Login failed (${res.status})`);
      setUser(body);
      showToast("Welcome back", `Signed in as ${body.name}.`);
      setPage(body.isAdmin ? "admin" : "profile");
    } catch (err) {
      showToast("Sign in failed", err.message);
    } finally { setBusy(false); }
  };

  const register = async () => {
    if (!name || !email || !password) { showToast("Missing fields", "Please complete all fields."); return; }
    if (password.length < 8)           { showToast("Password too short", "Use at least 8 characters."); return; }
    setBusy(true);
    try {
      const res = await fetch(api("/api/auth/register"), { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, password }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Registration failed (${res.status})`);
      setUser(body);
      showToast("Account created", `Welcome, ${body.name}.`);
      setPage("profile");
    } catch (err) {
      showToast("Sign up failed", err.message);
    } finally { setBusy(false); }
  };

  return (
    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "calc(100vh - 64px)" }}>
      {/* Left — hidden on mobile to skip straight to the form */}
      {!isMobile && (
      <div style={{ background:G.white, borderRight:`1px solid ${G.border}`, padding:"4rem 3rem", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <Label style={{ marginBottom:12 }}>Member Benefits</Label>
        <h1 style={{ fontFamily:G.serif, fontSize:"2.5rem", fontWeight:500, color:G.text, marginBottom:20 }}>Your Private <em>Collection</em></h1>
        {[["♥","Saved Favourites","Curate your personal collection of dream cars"],["📅","Test Drive Bookings","Book and manage your test drives online"],["🔔","Priority Alerts","Be first to know when new vehicles arrive"],["✦","Exclusive Offers","Access member-only pricing and private sales"]].map(([icon,title,desc]) => (
          <div key={title} style={{ display:"flex", gap:"1rem", marginBottom:"1.5rem" }}>
            <div style={{ width:36, height:36, border:`1px solid ${G.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
            <div><div style={{ fontSize:13, fontWeight:500, marginBottom:2 }}>{title}</div><div style={{ fontSize:12, color:G.textMid }}>{desc}</div></div>
          </div>
        ))}
      </div>
      )}

      {/* Right */}
      <div style={{ background:G.bg, padding: isMobile ? "3rem 1.25rem" : "4rem 3rem", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        {/* Tabs */}
        <div style={{ display:"flex", gap:0, marginBottom:28, borderBottom:`1px solid ${G.border}` }}>
          {[["login","Sign In"],["register","Create Account"]].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ background:"none", border:"none", borderBottom: tab===t ? `2px solid ${G.text}` : "2px solid transparent", padding:"10px 20px", fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", fontWeight: tab===t ? 500:400, color: tab===t ? G.text : G.textMid }}>
              {l}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <>
            <Input label="Email Address" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            <Btn full onClick={login} style={busy ? { opacity:0.6, pointerEvents:"none" } : {}}>{busy ? "Signing in…" : "Sign In"}</Btn>
          </>
        ) : (
          <>
            <Input label="Full Name" placeholder="Sokha Chea" value={name} onChange={e => setName(e.target.value)} />
            <Input label="Email Address" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Password" type="password" placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
            <Btn full onClick={register} style={busy ? { opacity:0.6, pointerEvents:"none" } : {}}>{busy ? "Creating…" : "Create Account"}</Btn>
          </>
        )}
      </div>
    </div>
  );
};

// ─── PROFILE ─────────────────────────────────────────────────────────────────
const ProfilePage = ({ user, setUser, cars, favorites, toggleFav, bookings, setPage, showToast }) => {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("favourites");
  if (!user) return <AuthPage setUser={() => {}} setPage={setPage} showToast={showToast} />;
  const favCars = cars.filter(c => favorites.includes(c.id));

  const tabs = [["favourites",`Favourites (${favCars.length})`],["bookings",`Test Drives (${bookings.length})`],["settings","Settings"]];

  return (
    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "260px 1fr", minHeight: isMobile ? "auto" : "calc(100vh - 64px)" }}>
      {/* Sidebar — flat top bar on mobile */}
      <div style={{ background:G.white, borderRight: isMobile ? "none" : `1px solid ${G.border}`, borderBottom: isMobile ? `1px solid ${G.border}` : "none", padding: isMobile ? "1.25rem" : "2rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom: isMobile ? 16 : 0 }}>
          <div style={{ width:48, height:48, background:G.bg2, border:`1px solid ${G.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:G.serif, fontSize:"1.3rem", flexShrink:0 }}>{user.name.charAt(0)}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:G.serif, fontSize:"1.1rem" }}>{user.name}</div>
            <div style={{ fontSize:11, color:G.textSub, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.email}</div>
          </div>
          {isMobile && <button onClick={() => { setUser(null); setPage("home"); }} style={{ background:"none", border:"none", fontSize:12, color:G.textSub, cursor:"pointer" }}>Sign Out →</button>}
        </div>
        {!isMobile && <Divider style={{ margin:"16px 0" }} />}
        <div style={{ display: isMobile ? "flex" : "block", gap:8, overflowX: isMobile ? "auto" : "visible" }}>
          {tabs.map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ display:"block", width: isMobile ? "auto" : "100%", textAlign:"left", background: isMobile && tab===t ? G.bg2 : "none", border:"none", borderLeft: !isMobile && tab===t ? `2px solid ${G.text}` : (isMobile ? "none" : "2px solid transparent"), borderRadius: isMobile ? G.radiusPill : 0, padding: isMobile ? "8px 14px" : "8px 12px", fontSize:12, fontWeight: tab===t ? 600 : 400, whiteSpace:"nowrap", letterSpacing:"0.04em", cursor:"pointer", color: tab===t ? G.text : G.textMid, marginBottom: isMobile ? 0 : 4 }}>{l}</button>
          ))}
        </div>
        {!isMobile && <>
          <Divider style={{ margin:"16px 0" }} />
          <button onClick={() => { setUser(null); setPage("home"); }} style={{ background:"none", border:"none", fontSize:12, color:G.textSub, cursor:"pointer", letterSpacing:"0.08em" }}>Sign Out →</button>
        </>}
      </div>

      {/* Main */}
      <div style={{ padding: isMobile ? "1.75rem 1.25rem" : "2.5rem 3rem" }}>
        {tab === "favourites" && (
          <>
            <h2 style={{ fontFamily:G.serif, fontSize:"1.8rem", fontWeight:500, color:G.text, marginBottom:"1.5rem" }}>Saved <em>Favourites</em></h2>
            {favCars.length ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:24 }}>
                {favCars.map(car => <CarCard key={car.id} car={car} onView={id => setPage("detail",id)} isFav={true} onFav={toggleFav} />)}
              </div>
            ) : <div style={{ color:G.textMid, fontSize:13 }}>No saved favourites yet. Browse our collection and save vehicles you love.</div>}
          </>
        )}
        {tab === "bookings" && (
          <>
            <h2 style={{ fontFamily:G.serif, fontSize:"1.8rem", fontWeight:500, color:G.text, marginBottom:"1.5rem" }}>Test Drive <em>Bookings</em></h2>
            {bookings.length ? bookings.map(b => (
              <div key={b.id} style={{ background:G.white, border:`1px solid ${G.border}`, padding:"1.25rem 1.5rem", marginBottom:8, display:"flex", alignItems:"center", gap:"1.5rem" }}>
                <div style={{ fontSize:"2rem" }}>🗓</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:G.serif, fontSize:"1.1rem" }}>{b.carName}</div>
                  <div style={{ fontSize:12, color:G.textMid }}>{b.date} at {b.time}</div>
                </div>
                <Tag style={{ background:"rgba(50,200,100,0.08)", color:"#3a9a5c", border:"1px solid rgba(50,200,100,0.2)" }}>{b.status}</Tag>
              </div>
            )) : <div style={{ color:G.textMid, fontSize:13 }}>No bookings yet. Visit a car's detail page to book a test drive.</div>}
          </>
        )}
        {tab === "settings" && (
          <>
            <h2 style={{ fontFamily:G.serif, fontSize:"1.8rem", fontWeight:500, color:G.text, marginBottom:"1.5rem" }}>Account <em>Settings</em></h2>
            <div style={{ maxWidth:460 }}>
              <Input label="Full Name" defaultValue={user.name} />
              <Input label="Email Address" type="email" defaultValue={user.email} />
              <Input label="Phone" type="tel" placeholder="+33 6 00 00 00 00" />
              <Input label="New Password" type="password" placeholder="Leave blank to keep current" />
              <Btn onClick={() => showToast("Saved","Your profile has been updated.")}>Save Changes</Btn>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── ADMIN ───────────────────────────────────────────────────────────────────
const AdminPage = ({ user, cars, setCars, bookings, setPage, showToast, apiSaveCar, apiDeleteCar, apiOnline }) => {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("dashboard");
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const emptyForm = { brand:"", model:"", year:"", price:"", mileage:"", color:"", engine:"", power:"", transmission:"", top_speed:"", accel:"", emoji:"🚗", desc:"", status:"active", featured:false, badge:"", images:[] };
  const [form, setForm] = useState(emptyForm);
  const F = (k,v) => setForm(f => ({ ...f, [k]:v }));

  const uploadImages = async (fileList) => {
    if (!fileList?.length) return;
    setUploading(true);
    try {
      const urls = [];
      for (const file of fileList) {
        const fd = new FormData();
        fd.append("image", file);
        const res = await fetch(api("/api/upload"), { method:"POST", body:fd });
        if (!res.ok) throw new Error(`Upload failed (${res.status})`);
        const { url } = await res.json();
        urls.push(url);
      }
      setForm(f => ({ ...f, images: [...(f.images || []), ...urls] }));
      showToast("Uploaded", `${urls.length} image${urls.length>1?"s":""} added.`);
    } catch (err) {
      showToast("Upload failed", err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url) => setForm(f => ({ ...f, images: (f.images || []).filter(u => u !== url) }));

  if (!user?.isAdmin) return (
    <div style={{ padding:"8rem 2.5rem", textAlign:"center" }}>
      <div style={{ fontFamily:G.serif, fontSize:"2rem", color:G.textMid, marginBottom:20 }}>Admin access required.</div>
      <Btn onClick={() => setPage("auth")}>Sign In as Admin</Btn>
    </div>
  );

  const startEdit = (car) => { setForm({...car, year:car.year.toString(), price:car.price.toString(), mileage:car.mileage.toString(), featured: !!car.featured, badge: car.badge || "", images: car.images || []}); setEditId(car.id); setTab("form"); };

  const deleteCar = async (id) => {
    if (!confirm("Delete this vehicle?")) return;
    try {
      if (apiOnline) await apiDeleteCar(id);
      else setCars(c => c.filter(x => x.id !== id));
      showToast("Deleted", "Vehicle removed.");
    } catch (err) {
      showToast("Delete failed", err.message);
    }
  };

  const toggleStatus = async (id) => {
    const car = cars.find(c => c.id === id);
    if (!car) return;
    const next = { ...car, status: car.status === "active" ? "reserved" : "active" };
    try {
      if (apiOnline) await apiSaveCar(next, id);
      else setCars(cs => cs.map(c => c.id === id ? next : c));
    } catch (err) {
      showToast("Update failed", err.message);
    }
  };

  const saveForm = async () => {
    if (!form.brand || !form.model) { showToast("Missing fields", "Brand and model are required."); return; }
    const car = { ...form, year: parseInt(form.year) || new Date().getFullYear(), price: parseInt(form.price) || 0, mileage: parseInt(form.mileage) || 0 };
    setSaving(true);
    try {
      if (apiOnline) {
        await apiSaveCar(car, editId);
      } else {
        if (editId) setCars(cs => cs.map(c => c.id === editId ? { ...c, ...car } : c));
        else setCars(cs => [...cs, { ...car, id: Date.now() }]);
      }
      showToast(editId ? "Updated" : "Added", editId ? "Vehicle updated." : "Vehicle added to inventory.");
      setEditId(null);
      setForm(emptyForm);
      setTab("inventory");
    } catch (err) {
      showToast("Save failed", err.message);
    } finally {
      setSaving(false);
    }
  };

  const navItems = [["dashboard","Dashboard"],["inventory","Inventory"],["form",editId?"Edit Vehicle":"Add Vehicle"],["leads","Enquiries"]];

  return (
    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "220px 1fr", minHeight: isMobile ? "auto" : "calc(100vh - 64px)" }}>
      <div style={{ background:G.white, borderRight: isMobile ? "none" : `1px solid ${G.border}`, borderBottom: isMobile ? `1px solid ${G.border}` : "none", padding: isMobile ? "1rem 1.25rem" : "2rem" }}>
        <div style={{ display: isMobile ? "flex" : "block", alignItems:"center", justifyContent:"space-between", gap:8, marginBottom: isMobile ? 12 : 0 }}>
          <Label style={{ marginBottom: isMobile ? 0 : 16 }}>Admin Panel</Label>
          {isMobile && <button onClick={() => setPage("home")} style={{ background:"none", border:"none", fontSize:12, color:G.textSub, cursor:"pointer", whiteSpace:"nowrap" }}>← Back to Site</button>}
        </div>
        <div style={{ display: isMobile ? "flex" : "block", gap:8, overflowX: isMobile ? "auto" : "visible" }}>
          {navItems.map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)} style={{ display:"block", width: isMobile ? "auto" : "100%", textAlign:"left", background: isMobile && tab===t ? G.bg2 : "none", border:"none", borderLeft: !isMobile && tab===t ? `2px solid ${G.text}` : (isMobile ? "none" : "2px solid transparent"), borderRadius: isMobile ? G.radiusPill : 0, padding: isMobile ? "8px 14px" : "8px 12px", fontSize:12, fontWeight: tab===t ? 600 : 400, whiteSpace:"nowrap", letterSpacing:"0.04em", cursor:"pointer", color: tab===t ? G.text : G.textMid, marginBottom: isMobile ? 0 : 4 }}>{l}</button>
          ))}
        </div>
        {!isMobile && <>
          <Divider style={{ margin:"16px 0" }} />
          <button onClick={() => setPage("home")} style={{ background:"none", border:"none", fontSize:12, color:G.textSub, cursor:"pointer" }}>← Back to Site</button>
        </>}
      </div>

      <div style={{ padding: isMobile ? "1.75rem 1.25rem" : "2.5rem 3rem", overflowX: isMobile ? "auto" : "visible" }}>
        {tab === "dashboard" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h2 style={{ fontFamily:G.serif, fontSize:"2rem", fontWeight:500, color:G.text }}>Dashboard</h2>
              <div style={{ fontSize:12, color:G.textSub }}>Welcome, {user.name}</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:G.border, marginBottom:32 }}>
              {[[cars.filter(c=>c.status==="active").length,"Active Listings"],[cars.filter(c=>c.status==="reserved").length,"Reserved"],[bookings.length,"New Enquiries"],[`$${(cars.reduce((s,c)=>s+c.price,0)/1000).toFixed(0)}K`,"Portfolio Value"]].map(([n,l]) => (
                <div key={l} style={{ background:G.white, padding:"1.5rem", borderLeft:`3px solid ${G.text}` }}>
                  <div style={{ fontFamily:G.serif, fontSize:"2rem" }}>{n}</div>
                  <div style={{ fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:G.textSub, marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
            <h3 style={{ fontFamily:G.serif, fontSize:"1.3rem", fontWeight:500, color:G.text, marginBottom:16 }}>Recent Enquiries</h3>
            <AdminTable rows={bookings.map(b=>[user.name,"Test Drive",b.carName,b.date,"New"])} />
          </>
        )}

        {tab === "inventory" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h2 style={{ fontFamily:G.serif, fontSize:"2rem", fontWeight:500, color:G.text }}>Inventory</h2>
              <Btn onClick={() => { setEditId(null); setForm(emptyForm); setTab("form"); }}>+ Add Vehicle</Btn>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr>{["Vehicle","Year","Price","Mileage","Status","Actions"].map(h => <th key={h} style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:G.textSub, textAlign:"left", padding:"8px 12px", borderBottom:`1px solid ${G.border}` }}>{h}</th>)}</tr></thead>
              <tbody>
                {cars.map(car => (
                  <tr key={car.id} style={{ borderBottom:`1px solid ${G.border}` }}>
                    <td style={{ padding:"10px 12px", fontWeight:500 }}>{car.brand} {car.model}</td>
                    <td style={{ padding:"10px 12px", color:G.textMid, fontSize:13 }}>{car.year}</td>
                    <td style={{ padding:"10px 12px", fontSize:13 }}>${car.price.toLocaleString()}</td>
                    <td style={{ padding:"10px 12px", fontSize:13, color:G.textMid }}>{car.mileage.toLocaleString()} km</td>
                    <td style={{ padding:"10px 12px" }}><Tag>{car.status}</Tag></td>
                    <td style={{ padding:"10px 12px" }}>
                      <button onClick={() => startEdit(car)} style={{ background:"none", border:"none", fontSize:11, color:G.textMid, cursor:"pointer", marginRight:12, letterSpacing:"0.08em" }}>Edit</button>
                      <button onClick={() => toggleStatus(car.id)} style={{ background:"none", border:"none", fontSize:11, color:G.textMid, cursor:"pointer", marginRight:12, letterSpacing:"0.08em" }}>{car.status==="active"?"Reserve":"Activate"}</button>
                      <button onClick={() => deleteCar(car.id)} style={{ background:"none", border:"none", fontSize:11, color:"#c0392b", cursor:"pointer", letterSpacing:"0.08em" }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === "form" && (
          <>
            <h2 style={{ fontFamily:G.serif, fontSize:"2rem", fontWeight:500, color:G.text, marginBottom:24 }}>{editId ? "Edit Vehicle" : "Add Vehicle"}</h2>
            <div style={{ background:G.white, border:`1px solid ${G.border}`, padding:"2rem", maxWidth:700 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {[["Brand","brand","Toyota"],["Model","model","Land Cruiser VXR"],["Year","year","2023"],["Price ($)","price","180000"],["Mileage (km)","mileage","5000"],["Color","color","Pearl White"],["Engine","engine","3.5L Twin-Turbo V6"],["Power","power","409 hp"],["Transmission","transmission","10-speed auto"],["Top Speed","top_speed","210 km/h"],["0–100 km/h","accel","6.9s"]].map(([label,key,placeholder]) => (
                  <div key={key}>
                    <Label>{label}</Label>
                    <input value={form[key]} onChange={e => F(key, e.target.value)} placeholder={placeholder} style={{ width:"100%", background:G.bg, border:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border2}`, color:G.text, padding:"8px 12px", fontSize:13, outline:"none" }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop:16 }}>
                <Label>Description</Label>
                <textarea value={form.desc} onChange={e => F("desc", e.target.value)} placeholder="Vehicle description..." style={{ width:"100%", background:G.bg, border:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border2}`, color:G.text, padding:"8px 12px", fontSize:13, outline:"none", resize:"vertical", minHeight:80 }} />
              </div>
              <div style={{ marginTop:16 }}>
                <Label>Car Images ({(form.images || []).length})</Label>
                <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:12 }}>
                  {(form.images || []).map((url, i) => (
                    <div key={url} style={{ position:"relative", width:110, height:80, borderRadius:10, overflow:"hidden", border: i===0 ? `2px solid ${G.text}` : `1.5px solid ${G.border}` }}>
                      <img src={url} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                      {i === 0 && <span style={{ position:"absolute", bottom:4, left:4, background:G.text, color:G.white, fontSize:10, fontWeight:600, padding:"2px 6px", borderRadius:G.radiusPill }}>Cover</span>}
                      <button type="button" onClick={() => removeImage(url)} style={{ position:"absolute", top:4, right:4, background:"rgba(0,0,0,0.7)", color:G.white, border:"none", width:22, height:22, borderRadius:"50%", cursor:"pointer", fontSize:12, lineHeight:1 }}>✕</button>
                    </div>
                  ))}
                  <label style={{ width:110, height:80, border:`2px dashed ${G.border2}`, borderRadius:10, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, cursor:"pointer", background:G.bg, color:G.text, fontSize:12, fontWeight:500, opacity: uploading ? 0.5 : 1 }}>
                    <span style={{ fontSize:20, lineHeight:1 }}>+</span>
                    <span>{uploading ? "Uploading…" : "Add photos"}</span>
                    <input type="file" accept="image/*" multiple disabled={uploading} onChange={e => { uploadImages(Array.from(e.target.files || [])); e.target.value = ""; }} style={{ display:"none" }} />
                  </label>
                </div>
                <div style={{ fontSize:11, color:G.textSub }}>First image is the cover (shown on cards). Up to 10 MB per image. JPG, PNG, WEBP, GIF, AVIF.</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:16 }}>
                <div>
                  <Label>Status</Label>
                  <select value={form.status} onChange={e => F("status", e.target.value)} style={{ width:"100%", background:G.bg, border:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border2}`, color:G.text, padding:"8px 12px", fontSize:13, outline:"none", appearance:"none" }}>
                    <option value="active">Active</option><option value="reserved">Reserved</option><option value="sold">Sold</option>
                  </select>
                </div>
                <div>
                  <Label>Badge</Label>
                  <select value={form.badge || ""} onChange={e => F("badge", e.target.value)} style={{ width:"100%", background:G.bg, border:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border2}`, color:G.text, padding:"8px 12px", fontSize:13, outline:"none", appearance:"none" }}>
                    <option value="">No badge</option><option value="New">New</option><option value="Hot New">Hot New</option><option value="Featured">Featured</option><option value="Reserved">Reserved</option>
                  </select>
                </div>
              </div>
              <label style={{ display:"flex", alignItems:"center", gap:10, marginTop:16, fontSize:13, cursor:"pointer" }}>
                <input type="checkbox" checked={!!form.featured} onChange={e => F("featured", e.target.checked)} style={{ width:16, height:16, cursor:"pointer" }} />
                Show on home page as Featured
              </label>
              <div style={{ display:"flex", gap:12, marginTop:24, alignItems:"center" }}>
                <Btn onClick={saveForm} style={saving ? { opacity:0.6, pointerEvents:"none" } : {}}>{saving ? "Saving…" : (editId ? "Update Vehicle" : "Add to Inventory")}</Btn>
                <Btn variant="outline" onClick={() => { setTab("inventory"); setEditId(null); }}>Cancel</Btn>
                {!apiOnline && <span style={{ fontSize:12, color:"#c0392b" }}>API offline — changes are local only.</span>}
              </div>
            </div>
          </>
        )}

        {tab === "leads" && (
          <>
            <h2 style={{ fontFamily:G.serif, fontSize:"2rem", fontWeight:500, color:G.text, marginBottom:24 }}>Enquiries</h2>
            <AdminTable rows={bookings.map(b=>[user.name,"Test Drive",b.carName,b.date,"New"])} />
          </>
        )}
      </div>
    </div>
  );
};

const AdminTable = ({ rows }) => (
  <table style={{ width:"100%", borderCollapse:"collapse" }}>
    <thead><tr>{["Name","Type","Vehicle","Date","Status"].map(h => <th key={h} style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:G.textSub, textAlign:"left", padding:"8px 12px", borderBottom:`1px solid ${G.border}` }}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r,i) => <tr key={i} style={{ borderBottom:`1px solid ${G.border}` }}>{r.map((cell,j) => <td key={j} style={{ padding:"10px 12px", fontSize:13, color: j===0 ? G.text : G.textMid }}>{j===4?<Tag>{cell}</Tag>:cell}</td>)}</tr>)}</tbody>
  </table>
);

// ═══════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  useEffect(() => { injectStyles(); }, []);

  const [page, setPage_] = useState("home");
  const [detailId, setDetailId] = useState(null);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState(INITIAL_CARS);
  const [toast, setToast] = useState(null);
  const [apiOnline, setApiOnline] = useState(false);

  const fetchCars = async () => {
    try {
      const res = await fetch(api("/api/cars"));
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      setCars(data);
      setApiOnline(true);
    } catch (err) {
      console.warn("Cars API unavailable, using local fallback:", err.message);
      setApiOnline(false);
    }
  };

  useEffect(() => { fetchCars(); }, []);

  const apiSaveCar = async (car, id) => {
    const method = id ? "PUT" : "POST";
    const url = id ? api(`/api/cars/${id}`) : api("/api/cars");
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(car) });
    if (!res.ok) throw new Error(`Save failed (${res.status})`);
    await fetchCars();
  };

  const apiDeleteCar = async (id) => {
    const res = await fetch(api(`/api/cars/${id}`), { method: "DELETE" });
    if (!res.ok) throw new Error(`Delete failed (${res.status})`);
    await fetchCars();
  };

  const setPage = (pg, id) => {
    setPage_(pg);
    if (pg === "detail" && id) setDetailId(id);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const showToast = (title, msg) => {
    setToast({ title, msg });
    setTimeout(() => setToast(null), 3200);
  };

  const toggleFav = (id) => {
    setFavorites(f => {
      const next = f.includes(id) ? f.filter(x => x !== id) : [...f, id];
      showToast(next.includes(id) ? "Saved" : "Removed", next.includes(id) ? "Added to your favourites." : "Removed from favourites.");
      return next;
    });
  };

  const addBooking = (b) => setBookings(bs => [...bs, b]);

  const commonProps = { setPage, user, favorites, toggleFav, showToast, cars };

  return (
    <div style={{ fontFamily:G.sans, background:G.bg, minHeight:"100vh" }}>
      <Nav page={page} setPage={setPage} user={user} favorites={favorites} />
      <div style={{ paddingTop:64 }}>
        {page === "home"      && <HomePage      {...commonProps} />}
        {page === "inventory" && <InventoryPage {...commonProps} />}
        {page === "detail"    && <DetailPage    {...commonProps} carId={detailId} addBooking={addBooking} bookings={bookings} />}
        {page === "contact"   && <ContactPage   setPage={setPage} showToast={showToast} />}
        {page === "about"     && <AboutPage     setPage={setPage} />}
        {page === "auth"      && <AuthPage      setUser={setUser} setPage={setPage} showToast={showToast} />}
        {page === "profile"   && <ProfilePage   {...commonProps} setUser={setUser} bookings={bookings} />}
        {page === "admin"     && <AdminPage     {...commonProps} setCars={setCars} bookings={bookings} apiSaveCar={apiSaveCar} apiDeleteCar={apiDeleteCar} apiOnline={apiOnline} />}
      </div>
      <Toast toast={toast} />
    </div>
  );
}
