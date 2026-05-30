import { G } from "../styles/theme";
import { Tag } from "./ui";

export const CarCard = ({ car, onView, onFav, isFav }) => (
  <div className="fade-up" onClick={() => onView(car.id)} style={{ background:G.white, borderRadius:G.radiusLg, cursor:"pointer", transition:"transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s", position:"relative", overflow:"hidden", boxShadow:"0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)" }}
    onMouseEnter={e => { e.currentTarget.style.boxShadow=G.shadowHover; e.currentTarget.style.transform="translateY(-4px)"; }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)"; e.currentTarget.style.transform="translateY(0)"; }}>
    {/* Image area */}
    <div style={{ background:`linear-gradient(135deg, ${G.bg2} 0%, var(--card-grad-end) 100%)`, height:220, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"5.5rem", position:"relative", overflow:"hidden" }}>
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


export default CarCard;
