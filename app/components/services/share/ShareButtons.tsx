"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineShare, HiOutlineLink, HiCheck, HiXMark } from "react-icons/hi2";
import { ShareData } from "./types";
import { buildShareLinks, openShareWindow } from "./shareLinks";
import ShareButton from "./ShareButton";
import { useWebShare } from "@/app/hooks/useWebShare";

const ShareButtons = (data: ShareData) => {
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSupported, share } = useWebShare();
  const links = buildShareLinks(data);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(data.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    const shared = await share(data);
    if (!shared) handleCopy();
  };

  const buttons = (
    <>
      {isSupported && (
        <ShareButton label="Share" onClick={handleNativeShare}>
          <HiOutlineShare className="h-4 w-4" />
        </ShareButton>
      )}

      <ShareButton label="Share on WhatsApp" onClick={() => openShareWindow(links.whatsapp)}>
        <FaWhatsapp className="h-4 w-4" />
      </ShareButton>

      <ShareButton label="Share on X" onClick={() => openShareWindow(links.x)}>
        <FaXTwitter className="h-4 w-4" />
      </ShareButton>

      <ShareButton label="Share on LinkedIn" onClick={() => openShareWindow(links.linkedin)}>
        <FaLinkedinIn className="h-4 w-4" />
      </ShareButton>

      <ShareButton label={copied ? "Link copied" : "Copy link"} onClick={handleCopy}>
        {copied ? <HiCheck className="h-4 w-4 text-accent" /> : <HiOutlineLink className="h-4 w-4" />}
      </ShareButton>
    </>
  );

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-foreground">Share:</span>

      {/* Desktop / tablet: all buttons inline */}
      <div className="hidden items-center gap-2 sm:flex">{buttons}</div>

      {/* Mobile: single trigger, opens a bottom sheet */}
      <div className="sm:hidden">
        <ShareButton label="Share this post" onClick={() => setMobileOpen(true)}>
          <HiOutlineShare className="h-4 w-4" />
        </ShareButton>

        {/* Backdrop */}
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        {/* Sheet */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Share this post"
          className={`fixed inset-x-0 bottom-0 z-[70] rounded-t-2xl border-t border-border bg-[var(--background)] px-5 pb-8 pt-4 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-foreground">
              Share this post
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-[var(--background-muted)] hover:text-accent"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-around gap-2">{buttons}</div>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;