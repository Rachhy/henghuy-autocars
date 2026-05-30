import { useState } from "react";
import { G } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { Btn, Divider, Input, Label, Select, Tag, Textarea } from "../components/ui";
import Footer from "../components/Footer";
import Modal from "../components/Modal";

export const DetailPage = ({ carId, cars, setPage, favorites, toggleFav, user, showToast, addBooking }) => {
  const isMobile = useIsMobile();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);
  const [bDate, setBDate] = useState("");
  const [bTime, setBTime] = useState("10:00 AM");
  const [bNotes, setBNotes] = useState("");
  const [bookingBusy, setBookingBusy] = useState(false);
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

  const confirmBooking = async () => {
    if (!user) { showToast("Sign in", "Please sign in first."); return; }
    if (!bDate) { showToast("Pick a date", "Please choose a preferred date."); return; }
    setBookingBusy(true);
    try {
      await addBooking({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        carId: car.id,
        carName: `${car.brand} ${car.model}`,
        date: bDate,
        time: bTime,
        notes: bNotes || null,
      });
      setBookingDone(true);
    } catch (err) {
      showToast("Booking failed", err.message);
    } finally {
      setBookingBusy(false);
    }
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
      <Modal open={bookingOpen} onClose={() => { setBookingOpen(false); setBookingDone(false); setBNotes(""); setBDate(""); }}>
        {bookingDone ? (
          <div style={{ textAlign:"center", padding:"1rem" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:12 }}>✓</div>
            <div style={{ fontFamily:G.serif, fontSize:"1.5rem", marginBottom:8 }}>Booking Confirmed</div>
            <div style={{ fontSize:12, color:G.textMid, marginBottom:4 }}>{car.brand} {car.model} · {bDate || "Date TBD"} at {bTime}</div>
            <div style={{ fontSize:12, color:G.textMid, marginBottom:24 }}>Our concierge will contact you shortly.</div>
            <Btn variant="outline" onClick={() => { setBookingOpen(false); setBookingDone(false); setBNotes(""); setBDate(""); }}>Close</Btn>
          </div>
        ) : (
          <>
            <div style={{ fontFamily:G.serif, fontSize:"1.5rem", marginBottom:4 }}>Book a Test Drive</div>
            <div style={{ fontSize:12, color:G.textSub, marginBottom:20 }}>{car.brand} {car.model}</div>
            <Input label="Preferred Date" type="date" value={bDate} onChange={e => setBDate(e.target.value)} />
            <Select label="Preferred Time" value={bTime} onChange={e => setBTime(e.target.value)}>
              {["10:00 AM","11:00 AM","1:00 PM","2:00 PM","4:00 PM"].map(t => <option key={t}>{t}</option>)}
            </Select>
            <Textarea label="Notes (optional)" placeholder="Any specific requirements..." value={bNotes} onChange={e => setBNotes(e.target.value)} />
            <Btn full onClick={confirmBooking} style={bookingBusy ? { opacity:0.6, pointerEvents:"none" } : {}}>{bookingBusy ? "Submitting…" : "Confirm Booking"}</Btn>
          </>
        )}
      </Modal>

      <Footer setPage={setPage} />
    </div>
  );
};

// ─── CONTACT ─────────────────────────────────────────────────────────────────


export default DetailPage;
