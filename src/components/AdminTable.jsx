import { G } from "../styles/theme";
import { Tag } from "./ui";

export const AdminTable = ({ rows }) => (
  <table style={{ width:"100%", borderCollapse:"collapse" }}>
    <thead><tr>{["Name","Type","Vehicle","Date","Status"].map(h => <th key={h} style={{ fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase", color:G.textSub, textAlign:"left", padding:"8px 12px", borderBottom:`1px solid ${G.border}` }}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r,i) => <tr key={i} style={{ borderBottom:`1px solid ${G.border}` }}>{r.map((cell,j) => <td key={j} style={{ padding:"10px 12px", fontSize:13, color: j===0 ? G.text : G.textMid }}>{j===4?<Tag>{cell}</Tag>:cell}</td>)}</tr>)}</tbody>
  </table>
);

// ═══════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════


export default AdminTable;
