import { G } from "../styles/theme";
import { useIsMobile } from "../hooks/useIsMobile";
import { useTheme } from "../hooks/useTheme";
import { Btn } from "./ui";

export const Nav = ({ page, setPage, user, favorites }) => {
  const isMobile = useIsMobile();
  const [theme, toggleTheme] = useTheme();
  const links = [
    { label: isMobile ? "Cars" : "Collection", page:"inventory" },
    { label:"About", page:"about" },
    { label:"Contact", page:"contact" },
  ];
  const navBtn = (active) => ({ background: active ? G.text : "transparent", border:"none", fontSize: isMobile ? 11 : 13, color: active ? G.white : G.text, padding: isMobile ? "6px 9px" : "8px 16px", fontWeight:500, cursor:"pointer", borderRadius:G.radiusPill, transition:"background 0.15s, color 0.15s", whiteSpace:"nowrap" });
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:"var(--nav-bg)", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", borderBottom:`1px solid ${G.border}`, padding: isMobile ? "0 1rem" : "0 2.5rem", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <div onClick={() => setPage("home")} style={{ fontFamily:G.serif, fontSize: isMobile ? "1.1rem" : "1.5rem", fontWeight:500, letterSpacing:"-0.01em", cursor:"pointer", whiteSpace:"nowrap" }}>
        {isMobile ? "HengHuy" : <>HengHuy <span style={{ color:G.accent }}>AutoCars</span></>}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap: isMobile ? 2 : 4 }}>
        {links.map(l => (
          <button key={l.page} onClick={() => setPage(l.page)} style={navBtn(page === l.page)}>
            {l.label}
          </button>
        ))}
        {user ? (
          <>
            <button onClick={() => setPage("profile")} style={navBtn(page === "profile")}>
              Account{!isMobile && favorites.length > 0 && <span style={{ background: page==="profile"?G.white:G.text, color: page==="profile"?G.text:G.white, fontSize:10, fontWeight:600, padding:"2px 7px", marginLeft:6, borderRadius:999 }}>{favorites.length}</span>}
            </button>
            {user.isAdmin && <button onClick={() => setPage("admin")} style={navBtn(page === "admin")}>Admin</button>}
          </>
        ) : (
          <Btn variant="outline" onClick={() => setPage("auth")} style={{ fontSize: isMobile ? 11 : 13, padding: isMobile ? "6px 12px" : "8px 20px", marginLeft: isMobile ? 4 : 8 }}>Sign In</Btn>
        )}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          style={{ background:"transparent", border:`1px solid ${G.border}`, color:G.text, width: isMobile ? 30 : 34, height: isMobile ? 30 : 34, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize: isMobile ? 14 : 15, cursor:"pointer", marginLeft: isMobile ? 4 : 8, transition:"background 0.15s, color 0.15s, border-color 0.15s" }}
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </nav>
  );
};

// ─── FOOTER ──────────────────────────────────────────────────────────────────


export default Nav;
