import { useState } from "react";
import { G } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { api } from "../config/api";
import { Btn, Divider, Label, Tag } from "../components/ui";
import AdminTable from "../components/AdminTable";
import Modal from "../components/Modal";

export const AdminPage = ({ user, cars, setCars, bookings, enquiries, setPage, showToast, apiSaveCar, apiDeleteCar, apiUpdateBookingStatus, apiDeleteBooking, apiUpdateEnquiryStatus, apiDeleteEnquiry, apiOnline }) => {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState("dashboard");
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [confirmState, setConfirmState] = useState(null);
  const askConfirm = (message, onConfirm, confirmLabel = "Delete") => setConfirmState({ message, onConfirm, confirmLabel });
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

  const deleteCar = (id) => {
    askConfirm("Delete this vehicle? This cannot be undone.", async () => {
      try {
        if (apiOnline) await apiDeleteCar(id);
        else setCars(c => c.filter(x => x.id !== id));
        showToast("Deleted", "Vehicle removed.");
      } catch (err) {
        showToast("Delete failed", err.message);
      }
    });
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

  const navItems = [["dashboard","Dashboard"],["inventory","Inventory"],["form",editId?"Edit Vehicle":"Add Vehicle"],["leads",`Bookings${bookings.length?` (${bookings.length})`:""}`],["messages",`Messages${enquiries.length?` (${enquiries.length})`:""}`]];

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
            {bookings.length === 0
              ? <div style={{ color:G.textMid, fontSize:13 }}>No bookings yet.</div>
              : <AdminTable rows={bookings.slice(0,5).map(b=>[b.userName || "—","Test Drive",b.carName,`${b.date} ${b.time}`,b.status])} />}
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
                    <input value={form[key]} onChange={e => F(key, e.target.value)} placeholder={placeholder} style={{ width:"100%", background:G.white, border:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border}`, color:G.text, padding:"8px 12px", fontSize:13, outline:"none" }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop:16 }}>
                <Label>Description</Label>
                <textarea value={form.desc} onChange={e => F("desc", e.target.value)} placeholder="Vehicle description..." style={{ width:"100%", background:G.white, border:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border}`, color:G.text, padding:"8px 12px", fontSize:13, outline:"none", resize:"vertical", minHeight:80 }} />
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
                  <select value={form.status} onChange={e => F("status", e.target.value)} style={{ width:"100%", background:G.white, border:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border}`, color:G.text, padding:"8px 12px", fontSize:13, outline:"none", appearance:"none" }}>
                    <option value="active">Active</option><option value="reserved">Reserved</option><option value="sold">Sold</option>
                  </select>
                </div>
                <div>
                  <Label>Badge</Label>
                  <select value={form.badge || ""} onChange={e => F("badge", e.target.value)} style={{ width:"100%", background:G.white, border:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border}`, color:G.text, padding:"8px 12px", fontSize:13, outline:"none", appearance:"none" }}>
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
            <h2 style={{ fontFamily:G.serif, fontSize:"2rem", fontWeight:500, color:G.text, marginBottom:24 }}>Test Drive Bookings ({bookings.length})</h2>
            {bookings.length === 0 ? (
              <div style={{ color:G.textMid, fontSize:13 }}>No bookings yet. When customers book a test drive, they'll appear here.</div>
            ) : (
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr>{["Customer","Vehicle","Date / Time","Notes","Status","Actions"].map(h => <th key={h} style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:G.textSub, textAlign:"left", padding:"8px 12px", borderBottom:`1px solid ${G.border}` }}>{h}</th>)}</tr></thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id} style={{ borderBottom:`1px solid ${G.border}` }}>
                      <td style={{ padding:"10px 12px", fontSize:13 }}>
                        <div style={{ fontWeight:500 }}>{b.userName || "—"}</div>
                        <div style={{ fontSize:11, color:G.textSub }}>{b.userEmail || ""}</div>
                      </td>
                      <td style={{ padding:"10px 12px", fontSize:13 }}>{b.carName}</td>
                      <td style={{ padding:"10px 12px", fontSize:13, color:G.textMid }}>{b.date}<br /><span style={{ fontSize:11 }}>{b.time}</span></td>
                      <td style={{ padding:"10px 12px", fontSize:12, color:G.textMid, maxWidth:200 }}>{b.notes || <span style={{ color:G.textSub }}>—</span>}</td>
                      <td style={{ padding:"10px 12px" }}><Tag>{b.status}</Tag></td>
                      <td style={{ padding:"10px 12px", whiteSpace:"nowrap" }}>
                        {b.status !== "confirmed" && <button onClick={() => apiUpdateBookingStatus(b.id, "confirmed").then(() => showToast("Updated","Marked as confirmed.")).catch(e => showToast("Failed", e.message))} style={{ background:"none", border:"none", fontSize:11, color:G.textMid, cursor:"pointer", marginRight:12, letterSpacing:"0.08em" }}>Confirm</button>}
                        {b.status !== "completed" && <button onClick={() => apiUpdateBookingStatus(b.id, "completed").then(() => showToast("Updated","Marked as completed.")).catch(e => showToast("Failed", e.message))} style={{ background:"none", border:"none", fontSize:11, color:G.textMid, cursor:"pointer", marginRight:12, letterSpacing:"0.08em" }}>Done</button>}
                        <button onClick={() => askConfirm("Delete this booking?", () => apiDeleteBooking(b.id).then(() => showToast("Deleted","Booking removed.")).catch(e => showToast("Failed", e.message)))} style={{ background:"none", border:"none", fontSize:11, color:"#c0392b", cursor:"pointer", letterSpacing:"0.08em" }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

        {tab === "messages" && (
          <>
            <h2 style={{ fontFamily:G.serif, fontSize:"2rem", fontWeight:500, color:G.text, marginBottom:24 }}>Contact Messages ({enquiries.length})</h2>
            {enquiries.length === 0 ? (
              <div style={{ color:G.textMid, fontSize:13 }}>No messages yet. Customer enquiries from the Contact page will show up here.</div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {enquiries.map(e => (
                  <div key={e.id} style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:"1.25rem 1.5rem" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:10 }}>
                      <div>
                        <div style={{ fontFamily:G.serif, fontSize:"1.15rem", marginBottom:2 }}>{[e.firstName, e.lastName].filter(Boolean).join(" ") || e.email}</div>
                        <div style={{ fontSize:12, color:G.textMid }}>
                          <a href={`mailto:${e.email}`} style={{ color:G.textMid, textDecoration:"underline" }}>{e.email}</a>
                          {e.phone && <> · <a href={`tel:${e.phone}`} style={{ color:G.textMid, textDecoration:"underline" }}>{e.phone}</a></>}
                        </div>
                        {e.topic && <div style={{ fontSize:11, color:G.textSub, marginTop:4, letterSpacing:"0.04em", textTransform:"uppercase" }}>{e.topic}</div>}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <Tag>{e.status}</Tag>
                        <span style={{ fontSize:11, color:G.textSub }}>{new Date(e.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={{ fontSize:13, color:G.text, lineHeight:1.7, padding:"12px 14px", background:G.bg, borderRadius:10, marginBottom:12, whiteSpace:"pre-wrap" }}>{e.message}</div>
                    <div style={{ display:"flex", gap:14, fontSize:11, letterSpacing:"0.08em" }}>
                      {e.status !== "read"     && <button onClick={() => apiUpdateEnquiryStatus(e.id, "read").then(() => showToast("Updated","Marked as read.")).catch(err => showToast("Failed", err.message))} style={{ background:"none", border:"none", color:G.textMid, cursor:"pointer" }}>Mark Read</button>}
                      {e.status !== "replied"  && <button onClick={() => apiUpdateEnquiryStatus(e.id, "replied").then(() => showToast("Updated","Marked as replied.")).catch(err => showToast("Failed", err.message))} style={{ background:"none", border:"none", color:G.textMid, cursor:"pointer" }}>Mark Replied</button>}
                      <button onClick={() => askConfirm("Delete this message?", () => apiDeleteEnquiry(e.id).then(() => showToast("Deleted","Message removed.")).catch(err => showToast("Failed", err.message)))} style={{ background:"none", border:"none", color:"#c0392b", cursor:"pointer" }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Modal open={!!confirmState} onClose={() => setConfirmState(null)}>
        <div style={{ fontFamily:G.serif, fontSize:"1.5rem", marginBottom:8 }}>Please confirm</div>
        <div style={{ fontSize:13, color:G.textMid, lineHeight:1.7, marginBottom:24 }}>{confirmState?.message}</div>
        <div style={{ display:"flex", gap:12, justifyContent:"flex-end" }}>
          <Btn variant="outline" onClick={() => setConfirmState(null)}>Cancel</Btn>
          <Btn onClick={() => { const fn = confirmState?.onConfirm; setConfirmState(null); fn && fn(); }} style={{ background:"#c0392b", color:"#FFFFFF" }}>{confirmState?.confirmLabel || "Confirm"}</Btn>
        </div>
      </Modal>
    </div>
  );
};



export default AdminPage;
