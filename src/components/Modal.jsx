import { G } from "../styles/theme";

export const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className="fade-in" style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.40)", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:G.white, borderRadius:G.radiusLg, width:"100%", maxWidth:480, padding:"2.25rem", position:"relative", boxShadow:"0 24px 64px rgba(0,0,0,0.20)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:18, right:18, background:G.bg2, border:"none", fontSize:14, color:G.text, cursor:"pointer", lineHeight:1, width:34, height:34, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        {children}
      </div>
    </div>
  );
};

// ─── CAR CARD ────────────────────────────────────────────────────────────────


export default Modal;
