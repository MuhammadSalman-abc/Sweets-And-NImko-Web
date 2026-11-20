"use client";

import type { MouseEvent, ReactNode } from "react";

const phoneNumber = "923128869242";

const createWhatsAppUrls = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return {
    app: `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`,
    fallback: `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
    web: `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
  };
};

type WhatsAppOrderLinkProps = {
  message: string;
  children: ReactNode;
  className: string;
};

const WhatsAppOrderLink = ({ message, children, className }: WhatsAppOrderLinkProps) => {
  const urls = createWhatsAppUrls(message);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    window.location.href = urls.app;

    window.setTimeout(() => {
      if (document.visibilityState === "visible") window.location.href = urls.fallback;
    }, 1200);
  };

  return (
    <a href={urls.web} target="_blank" rel="noreferrer" onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default WhatsAppOrderLink;
