"use client";

import { useEffect, useState } from "react";
import { WaitlistModal } from "./WaitlistModal";

export function WaitlistModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handler() { setOpen(true); }
    window.addEventListener("open-waitlist", handler);
    return () => window.removeEventListener("open-waitlist", handler);
  }, []);

  return (
    <>
      {children}
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
