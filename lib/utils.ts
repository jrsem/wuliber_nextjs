import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const STRAPI_URL = "http://localhost:1337";
//localhost:1337";

// export const CMS_URL =
//   import.meta.env.VITE_CMS_URL?.toString?.() || "http://localhost:3001";

// export const CONTACT_API_URL =
//   import.meta.env.VITE_CONTACT_API_URL?.toString?.() ||
//   `${CMS_URL}/api/contact`;