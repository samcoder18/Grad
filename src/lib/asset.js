// Prefix public/ asset paths with the Vite base
// (GitHub Pages serves the site from /Grad/, not from the domain root).
export const asset = (p) => `${import.meta.env.BASE_URL}${p}`;
