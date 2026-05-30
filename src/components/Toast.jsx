import { G } from "../styles/theme";

export const Toast = ({ toast }) => (
  <div style={{ position:"fixed", bottom:24, right:24, zIndex:999, background:G.text, color:G.white, padding:"14px 20px", minWidth:260, borderRadius:14, transform: toast ? "translateX(0)" : "translateX(140%)", transition:"transform 0.35s cubic-bezier(0.22,1,0.36,1)", boxShadow:"0 12px 32px rgba(0,0,0,0.20)" }}>
    <div style={{ fontSize:14, fontWeight:600, marginBottom:2 }}>{toast?.title}</div>
    <div style={{ fontSize:13, opacity:0.75 }}>{toast?.msg}</div>
  </div>
);

// ─── MODAL ───────────────────────────────────────────────────────────────────


export default Toast;
