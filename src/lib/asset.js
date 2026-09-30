// Prefix public/ asset paths with the Vite base.
export const asset = (p) => `${import.meta.env.BASE_URL}${p}`;
