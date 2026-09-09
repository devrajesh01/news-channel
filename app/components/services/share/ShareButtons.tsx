"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineShare, HiOutlineLink, HiCheck } from "react-icons/hi2";
import { ShareData } from "./types";
import { buildShareLinks, openShareWindow } from "./shareLinks";
import ShareButton from "./ShareButton";
import { useWebShare } from "@/app/hooks/useWebShare";

const ShareButtons = (data: ShareData) => {
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSupported, share } = useWebShare();
  const links = buildShareLinks(data);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close the mobile popover on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [mobileOpen]);

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
    <div ref={containerRef} className="relative flex items-center gap-2">
      <span className="text-sm font-semibold text-foreground">Share:</span>

      {/* Desktop / tablet: all buttons inline */}
      <div className="hidden items-center gap-2 sm:flex">{buttons}</div>

      {/* Mobile: single trigger, buttons revealed in a popover */}
      <div className="sm:hidden">
        <ShareButton
          label={mobileOpen ? "Close share options" : "Share this post"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <HiOutlineShare className="h-4 w-4" />
        </ShareButton>

        <div
          className={`absolute left-0 top-full z-50 mt-2 flex items-center gap-2 rounded-full border border-border bg-[var(--background)] p-1.5 shadow-lg transition-all duration-200 ${
            mobileOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-1 scale-95 opacity-0"
          }`}
        >
          {buttons}
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;