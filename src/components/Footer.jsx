import { G } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { Divider, Label } from "./ui";

export const Footer = ({ setPage }) => {
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


export default Footer;
