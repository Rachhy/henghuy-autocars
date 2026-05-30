import { G } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { BRANDS } from "../data/cars";
import { Btn, Label, Tag } from "../components/ui";
import BrandLogo from "../components/BrandLogo";
import CarCard from "../components/CarCard";
import Footer from "../components/Footer";

export const HomePage = ({ cars, setPage, favorites, toggleFav, showToast, user }) => {
  const isMobile = useIsMobile();
  const featured = cars.filter((car) => car.featured && car.status === "active");

  return (
    <div>
      <section style={{ minHeight: isMobile ? "auto" : "90vh", display:"flex", alignItems:"center", padding: isMobile ? "3rem 1.25rem" : "0 2.5rem", borderBottom:`1px solid ${G.border}`, position:"relative", backgroundImage:"linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url(/storefront.jpg)", backgroundSize:"cover", backgroundPosition:"center" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "4rem", alignItems:"center", position:"relative", zIndex:1 }}>
          <div className="fade-up">
            <Tag style={{ marginBottom:20, background:"rgba(255,255,255,0.15)", color:"#FFFFFF" }}>Phnom Penh - Cambodia</Tag>
            <h1 style={{ fontFamily:G.serif, fontSize:"clamp(2.5rem,5vw,4rem)", fontWeight:500, color:"#FFFFFF", lineHeight:1.1, marginBottom:20, textShadow:"0 2px 20px rgba(0,0,0,0.4)" }}>
              Luxury &amp;<br /><em>Premium Cars,</em><br />Delivered in Cambodia
            </h1>
            <p style={{ color:"rgba(255,255,255,0.85)", maxWidth:420, lineHeight:1.9, marginBottom:32, fontSize:13 }}>
              From Toyota Land Cruisers to Rolls-Royce Cullinans, every vehicle is inspected, certified, and backed by HengHuy's industry-leading guarantee. 100% installment available.
            </p>
            <div style={{ display:"flex", gap:12 }}>
              <Btn onClick={() => setPage("inventory")} style={{ background:"#FFFFFF", color:"#000000" }}>Browse Collection</Btn>
              <Btn variant="outline" onClick={() => setPage("contact")} style={{ background:"transparent", color:"#FFFFFF", border:"1.5px solid rgba(255,255,255,0.6)" }}>Call 092 9999 89</Btn>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"rgba(255,255,255,0.12)", borderRadius:G.radiusLg, overflow:"hidden", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.15)" }}>
            {[["350+","Happy Buyers"],["14","Brands Stocked"],["24/7","Support Line"],["100%","Installment"]].map(([number, label]) => (
              <div key={label} style={{ background:"rgba(0,0,0,0.35)", padding:"2rem", textAlign:"center" }}>
                <div style={{ fontFamily:G.serif, fontSize:"2.5rem", marginBottom:4, color:"#FFFFFF" }}>{number}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", letterSpacing:"0.1em", textTransform:"uppercase" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:G.bg2, borderBottom:`1px solid ${G.border}`, padding: isMobile ? "1rem 0 1rem 1.25rem" : "1.25rem 0 1.25rem 2.5rem", display:"flex", gap:"1.5rem", alignItems:"center", overflow:"hidden" }}>
        <Label style={{ marginBottom:0, whiteSpace:"nowrap", flexShrink:0, color:G.accent }}>Our Brands</Label>
        <div style={{ overflow:"hidden", flex:1, WebkitMaskImage:"linear-gradient(90deg, transparent, #000 3%, #000 90%, transparent)", maskImage:"linear-gradient(90deg, transparent, #000 3%, #000 90%, transparent)" }}>
          <div className="marquee-track">
            {[...BRANDS, ...BRANDS].map((brand, index) => (
              <div key={`${brand}-${index}`} onClick={() => setPage("inventory")} style={{ display:"flex", alignItems:"center", gap:9, whiteSpace:"nowrap", cursor:"pointer", marginRight: isMobile ? 28 : 44 }}>
                <BrandLogo brand={brand} size={28} />
                <span style={{ fontSize:12, color:G.textMid, letterSpacing:"0.05em" }}>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth:1100, margin:"0 auto", padding: isMobile ? "3rem 1.25rem" : "4rem 2.5rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:"2rem", flexWrap:"wrap", gap:12 }}>
          <div>
            <Label>Curated Selection</Label>
            <h2 style={{ fontFamily:G.serif, fontSize: isMobile ? "1.6rem" : "2rem", fontWeight:500, color:G.text }}>Featured <em>Automobiles</em></h2>
          </div>
          <span onClick={() => setPage("inventory")} style={{ fontSize:12, color:G.textMid, textDecoration:"underline", cursor:"pointer" }}>View all -</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap: isMobile ? 18 : 24 }}>
          {featured.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onView={(id) => setPage("detail", id)}
              isFav={favorites.includes(car.id)}
              onFav={(id) => {
                if (!user) {
                  showToast("Sign in", "Please sign in to save favourites.");
                  return;
                }
                toggleFav(id);
              }}
            />
          ))}
        </div>
      </section>

      <section style={{ background:G.white, borderTop:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border}`, padding: isMobile ? "3rem 1.25rem" : "4rem 2.5rem" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <Label style={{ marginBottom:8 }}>Why HengHuy</Label>
          <h2 style={{ fontFamily:G.serif, fontSize: isMobile ? "1.6rem" : "2rem", fontWeight:500, color:G.text, marginBottom: isMobile ? "1.75rem" : "2.5rem" }}>The HengHuy <em>Difference</em></h2>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap:0, background:G.border }}>
            {[
              ["Free Accessories","Complimentary accessories on every purchase over $20,000"],
              ["30-Day Return","Drive with confidence. Return within 30 days if not satisfied"],
              ["100% Installment","Flexible monthly installment plans on every vehicle in stock"],
              ["24/7 Support","Our team is on call around the clock. 092 9999 89 anytime"],
            ].map(([title, desc]) => (
              <div key={title} style={{ background:G.white, padding:"2rem", borderBottom:"none" }}>
                <div style={{ fontFamily:G.serif, fontSize:"1.1rem", marginBottom:8 }}>{title}</div>
                <div style={{ fontSize:12, color:G.textMid, lineHeight:1.8 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? "3.5rem 1.25rem" : "5rem 2.5rem", textAlign:"center" }}>
        <Label style={{ marginBottom:12 }}>Private Consultation</Label>
        <h2 style={{ fontFamily:G.serif, fontSize: isMobile ? "1.8rem" : "2.5rem", fontWeight:500, color:G.text, marginBottom:12 }}>Ready to Find Your <em>Perfect Car?</em></h2>
        <p style={{ color:G.textMid, fontSize:13, maxWidth:440, margin:"0 auto 28px" }}>Visit our Phnom Penh showroom or call 092 9999 89. Our team is ready to help you find the right car today.</p>
        <Btn onClick={() => setPage("contact")}>Visit the Showroom</Btn>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
};

export default HomePage;
