import { useState } from "react";
import { G } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { BRANDS } from "../data/cars";
import { Label } from "../components/ui";
import CarCard from "../components/CarCard";
import Footer from "../components/Footer";

export const InventoryPage = ({ cars, setPage, favorites, toggleFav, showToast, user }) => {
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


export default InventoryPage;
