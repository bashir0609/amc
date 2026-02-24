"use client";

/**
 * ProtectedEmail
 * Renders an email address as a clickable mailto link, but
 * obfuscates it in the HTML so bots cannot harvest it easily.
 *
 * Strategy: encode every character as an HTML entity (decimal)
 * and reconstruct via a client-side useEffect so the raw address
 * never appears in the server-rendered markup.
 */

import { useEffect, useState } from "react";

interface ProtectedEmailProps {
  /** CSS class(es) applied to the <a> tag */
  className?: string;
}

const ENCODED_USER = "&#105;&#110;&#102;&#111;";           // info
const ENCODED_DOMAIN = "&#97;&#117;&#116;&#111;&#109;&#111;&#116;&#99;&#101;&#110;&#116;&#114;&#101;&#46;&#99;&#111;&#109;"; // automotcentre.com

export default function ProtectedEmail({ className }: ProtectedEmailProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Only runs in the browser — invisible to crawlers
    const user = "info";
    const domain = "automotcentre.com";
    setEmail(`${user}@${domain}`);
  }, []);

  if (!email) {
    // Server-rendered placeholder: looks like text to humans but broken for bots
    return (
      <span
        className={className}
        aria-label="Email address"
        dangerouslySetInnerHTML={{
          __html: `${ENCODED_USER}&#64;${ENCODED_DOMAIN}`,
        }}
      />
    );
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
