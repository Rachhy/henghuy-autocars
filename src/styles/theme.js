export const G = {
  white:   "var(--surface)",
  bg:      "var(--bg)",
  bg2:     "var(--bg2)",
  border:  "var(--border)",
  border2: "var(--border2)",
  text:    "var(--text)",
  textMid: "var(--text)",
  textSub: "var(--text)",
  accent:  "var(--accent)",
  accentDark: "var(--accent-dark)",
  // typography
  sans:    "'Inter', 'Helvetica Neue', sans-serif",
  serif:   "'Fraunces', 'Playfair Display', Georgia, serif",
  // shape
  radius:  "12px",
  radiusLg:"20px",
  radiusPill:"999px",
  shadow:  "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
  shadowHover:"0 12px 32px rgba(0,0,0,0.10)",
};

export const injectStyles = () => {
  if (document.getElementById("aurum-styles")) return;
  const s = document.createElement("style");
  s.id = "aurum-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap');
    :root {
      --bg:          #FAFAF7;
      --bg2:         #F2EFE6;
      --surface:     #FFFFFF;
      --border:      #E6E2D6;
      --border2:     #0A0A0A;
      --text:        #000000;
      --accent:      #C8923D;
      --accent-dark: #8A6A2A;
      --nav-bg:      rgba(248, 248, 243, 0.85);
      --scrollbar:   #D0CCC0;
      --scrollbar-hover: #A8A399;
      --focus-ring:  rgba(0,0,0,0.08);
      --card-grad-end: #EAE5D6;
      color-scheme: light;
    }
    .dark {
      --bg:          #000000;
      --bg2:         #161616;
      --surface:     #1A1A1A;
      --border:      #2A2A2A;
      --border2:     #FFFFFF;
      --text:        #FFFFFF;
      --accent:      #E5B85C;
      --accent-dark: #C8923D;
      --nav-bg:      rgba(10, 10, 10, 0.85);
      --scrollbar:   #2A2A2A;
      --scrollbar-hover: #444;
      --focus-ring:  rgba(255,255,255,0.10);
      --card-grad-end: #1F1F1F;
      color-scheme: dark;
    }
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:var(--bg);color:var(--text);font-family:${G.sans};font-size:15px;line-height:1.6;font-weight:450;-webkit-font-smoothing:antialiased;letter-spacing:-0.005em;transition:background-color 0.25s ease, color 0.25s ease}
    button{cursor:pointer;font-family:${G.sans};font-size:14px;font-weight:500}
    input,select,textarea{font-family:${G.sans};font-size:14px;color:var(--text);background:var(--surface)}
    input:focus,select:focus,textarea:focus{border-color:var(--text) !important;box-shadow:0 0 0 3px var(--focus-ring) !important}
    p,div,span,li,td,th,label{color:inherit}
    ::-webkit-scrollbar{width:10px;height:10px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:var(--scrollbar);border-radius:10px;border:2px solid var(--bg)}
    ::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-hover)}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    .fade-up{animation:fadeUp .45s cubic-bezier(0.22,1,0.36,1) both}
    .fade-in{animation:fadeIn .3s ease}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .marquee-track{display:flex;width:max-content;animation:marquee 30s linear infinite}
    .marquee-track:hover{animation-play-state:paused}
  `;
  document.head.appendChild(s);
};

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
