import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const STRAPI_URL = "http://localhost:1337";
export const STRAPI_URL = "https://admin.wuliber.com";


export const CONTACT_API_URL ="http://localhost:3000/api/send-email"
