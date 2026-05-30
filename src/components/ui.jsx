import { G } from "../styles/theme";

export const Tag = ({ children, style }) => (
  <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.02em", background:G.bg2, color:G.text, padding:"5px 12px", borderRadius:G.radiusPill, display:"inline-block", ...style }}>
    {children}
  </span>
);



export const Btn = ({ children, onClick, variant="primary", style, full }) => {
  const base = { border:"none", padding:"12px 26px", fontSize:14, fontWeight:600, letterSpacing:"-0.01em", transition:"transform 0.15s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s, background 0.2s", cursor:"pointer", width: full ? "100%" : "auto", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, borderRadius:G.radiusPill };
  const variants = {
    primary:  { background:G.text, color:G.white, boxShadow:"0 2px 8px rgba(0,0,0,0.12)" },
    outline:  { background:G.white, color:G.text, border:`1.5px solid ${G.text}` },
    ghost:    { background:"transparent", color:G.text, border:"none", padding:"10px 18px" },
  };
  return <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}
    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; if(variant==="primary") e.currentTarget.style.boxShadow="0 6px 18px rgba(0,0,0,0.18)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; if(variant==="primary") e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.12)"; }}>
    {children}
  </button>;
};



export const Divider = ({ style }) => <div style={{ height:1, background:G.border, ...style }} />;



export const Label = ({ children, style }) => (
  <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:G.text, marginBottom:10, ...style }}>
    {children}
  </div>
);



export const Input = ({ label, ...props }) => (
  <div style={{ marginBottom:18 }}>
    {label && <Label>{label}</Label>}
    <input style={{ width:"100%", background:G.white, border:`1.5px solid ${G.border}`, color:G.text, padding:"12px 14px", outline:"none", fontSize:14, borderRadius:10, transition:"border-color 0.15s" }} {...props} />
  </div>
);



export const Select = ({ label, children, ...props }) => (
  <div style={{ marginBottom:18 }}>
    {label && <Label>{label}</Label>}
    <select style={{ width:"100%", background:G.white, border:`1.5px solid ${G.border}`, color:G.text, padding:"12px 14px", outline:"none", fontSize:14, borderRadius:10, appearance:"none", cursor:"pointer" }} {...props}>{children}</select>
  </div>
);



export const Textarea = ({ label, ...props }) => (
  <div style={{ marginBottom:18 }}>
    {label && <Label>{label}</Label>}
    <textarea style={{ width:"100%", background:G.white, border:`1.5px solid ${G.border}`, color:G.text, padding:"12px 14px", outline:"none", fontSize:14, resize:"vertical", minHeight:100, borderRadius:10, fontFamily:G.sans }} {...props} />
  </div>
);

// ─── TOAST ───────────────────────────────────────────────────────────────────
