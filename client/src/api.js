// src/api.js
const rawUrl = import.meta.env.VITE_API_URL;

// Remove trailing slash if exists
export const API_URL = rawUrl.replace(/\/$/, "");