import { G } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { Label } from "../components/ui";
import Footer from "../components/Footer";

export const AboutPage = ({ setPage }) => {
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


export default AboutPage;
