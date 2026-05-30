import { useState } from "react";
import { G } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { api } from "../config/api";
import { Btn, Input, Label } from "../components/ui";

export const AuthPage = ({ setUser, setPage, showToast }) => {
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


export default AuthPage;
