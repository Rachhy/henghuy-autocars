export const API_URL = import.meta.env.VITE_API_URL || "";
export const api = (path) => `${API_URL}${path}`;

// Breakpoint for "mobile" — under this width, we stack 2-col layouts into 1 col.
