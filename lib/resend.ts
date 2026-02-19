import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
// Falls back to a placeholder to prevent build errors, but runtime usage requires the key
export const resend = new Resend(process.env.RESEND_API_KEY || "re_123");
