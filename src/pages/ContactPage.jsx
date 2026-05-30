import { useState } from "react";
import { G } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { api } from "../config/api";
import { Btn, Input, Label, Select, Textarea } from "../components/ui";
import Footer from "../components/Footer";

const TOPICS = ["Purchasing a Vehicle","Test Drive Request","Installment Plan Enquiry","Vehicle Trade-in / Valuation","General Enquiry"];

export const ContactPage = ({ setPage, showToast }) => {
  const isMobile = useIsMobile();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", phone:"", topic: TOPICS[0], message:"" });
  const F = (k,v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.email || !form.message) {
      showToast("Missing fields", "Email and message are required.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(api("/api/enquiries"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Send failed (${res.status})`);
      setSent(true);
      showToast("Enquiry Sent","We'll be in touch within 24 hours.");
    } catch (err) {
      showToast("Send failed", err.message);
    } finally {
      setBusy(false);
    }
  };
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
                <Input label="First Name" placeholder="Sokha" value={form.firstName} onChange={e => F("firstName", e.target.value)} />
                <Input label="Last Name" placeholder="Chea" value={form.lastName} onChange={e => F("lastName", e.target.value)} />
              </div>
              <Input label="Email" type="email" placeholder="you@email.com" value={form.email} onChange={e => F("email", e.target.value)} />
              <Input label="Phone" type="tel" placeholder="+855 12 345 678" value={form.phone} onChange={e => F("phone", e.target.value)} />
              <Select label="I Am Interested In" value={form.topic} onChange={e => F("topic", e.target.value)}>
                {TOPICS.map(o => <option key={o}>{o}</option>)}
              </Select>
              <Textarea label="Your Message" placeholder="Please describe how we can assist you..." value={form.message} onChange={e => F("message", e.target.value)} />
              <Btn full onClick={submit} style={busy ? { opacity:0.6, pointerEvents:"none" } : {}}>{busy ? "Sending…" : "Send Enquiry"}</Btn>
            </>
          )}
        </div>
      </div>
      <Footer setPage={setPage} />
    </div>
  );
};

// ─── ABOUT ───────────────────────────────────────────────────────────────────


export default ContactPage;
