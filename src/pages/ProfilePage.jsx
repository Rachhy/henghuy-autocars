import { useState } from "react";
import { G } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { Btn, Divider, Input, Tag } from "../components/ui";
import CarCard from "../components/CarCard";
import AuthPage from "./AuthPage";

export const ProfilePage = ({ user, setUser, cars, favorites, toggleFav, bookings, setPage, showToast }) => {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("favourites");
  if (!user) return <AuthPage setUser={setUser} setPage={setPage} showToast={showToast} />;
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


export default ProfilePage;
